/**
 * Module to manipulate maps
 * @version 1.0
 * @author Bruno C. Ramos <bruno@wee.ag>
 * See more at: http://bitbucket.org/brunocramos/gameBoilerplate
 */
(function () {
    "use strict";
    window.Game = window.Game || {};  
    window.Game.GUI = {
        /**
         * GUI Settings
         * @type {Object}
         */
        settings: {
            viewportWidth : 800,
            viewportHeight: 640,
        },


        /**
         * Canvas object
         * @type {Object}
         */
        canvas : null,

        /**
         * Viewport canvas object
         * @type {Object}
         */
        viewport : null,
        
        /**
         * Viewport context
         * @type {Object}
         */
        vCtx : null,


        /**
         * Init GUI
         */
        init: function() {
            this.viewport = document.getElementById('game');
            this.vCtx = this.viewport.getContext('2d');

            this.canvas = document.createElement("canvas");
            this.startFPS();
        },

        /**
         * Start FPS timer
         */
        startFPS: function() {
            var $this = this;

            setInterval(function() {
                $this.fpsMain();
            }, 10);
        },

        /**
         * FPS method to call all render methods
         */
        fpsMain: function() {
            // Trigger event so other objects can also update
            $.event.trigger('update');

            // Rerender
            this.render();
        },



        /**
         * Render window
         */
        render: function() {

            // Render Canvas to viewport
            this.vCtx.drawImage(Game.GUI.canvas, 0, 0, Game.GUI.settings.viewportWidth, Game.GUI.settings.viewportHeight);

            return this;
        }
    };
}());