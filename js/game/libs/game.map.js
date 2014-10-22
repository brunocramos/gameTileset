/**
 * Module to manipulate maps
 * @version 1.0
 * @author Bruno C. Ramos <bruno@wee.ag>
 * See more at: http://bitbucket.org/brunocramos/gameBoilerplate
 */
(function () {
    "use strict";
    window.Game = window.Game || {};  
    window.Game.Map = {
        /**
         * System settings related to map stuff
         * @type {Object}
         */
        settings: {
            /**
             * Path to map dir. This will be used to render maps
             */
            "mapPath" : 'js/game/maps/',

            /**
             * Path to the map tileset image
             */
            "tilesetPath" : 'img/game/tileset/'
        },

        /**
         * Viewport Context
         * @type {Object}
         */
        ctx : null,

        /**
         * Object used to render image from maps
         * @type {Object}
         */
        mapTile : null,

        /**
         * Object used to load a map with XML Http Request
         * @type {Object}
         */
        XHR : null,

        /**
         * Current map info
         * @type {JSON}
         */
        currMap : null,

        /**
         * Flag to trigger if map is being loaded
         * @type {Boolean}
         */
        mapLoading : false,


        init : function() {
            this.mapTile = new Image();
            this.ctx = Game.GUI.canvas.getContext('2d');
        },

        /**
         * Loads a map file
         * @param  {String} map Map's filename
         */
        load: function(map) {
            var xhr = this.XHR,
                $this = this;

            if(this.mapLoading) {
                Game.Debug.log('Cannot load a new map while another map is being loaded!')
                return false;
            }
            // Map is now loading
            this.mapLoading = true;
            
            // Let's load using jQuery's getJSON method
            $.getJSON(baseUrl + this.settings.mapPath + map, function(data) {
                // Success, let's assign values
                $this.currMap = data;
                // Now let's prepare the map to be rendered.
                $this.prepareMap();

            }).fail(function(status){
                // Failed :(
                Game.Debug.log('Could not load map. Please, verify requisition. Status following:')
                Game.Debug.log(status);
            });
        },

        /**
         * Prepare map before rendering it
         */
        prepareMap: function() {
            var $this = this;

            // Let's load the map image and when it's ready, let's render it! :D
            this.mapTile.src = baseUrl + this.settings.tilesetPath + this.currMap.tileset.file;
            this.mapTile.onload = function() { $this.renderMap(); }

        },

        /**
         * Let's finally render our map! The base idea of the generator was based on this
         * article: http://blog.sklambert.com/create-a-canvas-tileset-background/#disqus_thread
         */
        renderMap: function() {
            var i, j, 
                iTotal = this.currMap.tileset.numRow, 
                jTotal = this.currMap.tileset.numCol,
                tS = this.currMap.tileset.tileSize,
                tPR = this.currMap.tileset.tilesPerRow,
                tile, row, col,

                layers = this.currMap.settings.layers,
                currLayer = null;

            Game.GUI.canvas.width = this.currMap.settings.width;
            Game.GUI.canvas.height = this.currMap.settings.height;

            // Let's load each layer, one by one, in order
            for(var x in layers) {
                currLayer = this.currMap.layers[layers[x]].tiles;

                for(i=0;i<iTotal;i++)
                    for(j=0;j<jTotal;j++) {
                        // Get position
                        tile = currLayer[i][j];
                        row = (tile / tPR) | 0;
                        col = (tile % tPR) | 0;

                        // Time to do some draws :D
                        this.ctx.drawImage(this.mapTile, (col * tS), (row * tS), tS, tS, (j * tS), (i * tS), tS, tS);
                    }
            }
        }
    };
}());