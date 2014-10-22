/**
 * Module to initialize game
 * @version 1.0
 * @author Bruno C. Ramos <bruno@wee.ag>
 * See more at: http://bitbucket.org/brunocramos/gameBoilerplate
 */
(function () {
    "use strict";


	window.baseUrl = "/";
    if (typeof console === "undefined"){ console={}; console.log = function(){return;}};


    window.Game = window.Game || {};  
    window.Game.Main = {
    	/**
    	 * Set true to enable some debug features
    	 * @type {Boolean}
    	 */
    	debug : true,

        init : function() {
        	// Get DOM instances
        	this.getInstances();
			
        	// Transfer debug value to debug class
        	Game.Debug.debug = this.debug;

			// Get DOM instances
        	this.getInstances();

            // Prepare GUI
            Game.GUI.init();

            
        	// Prepare map class
        	Game.Map.init();



        	// Render a map
        	Game.Map.load('001.json');
        },

        getInstances : function() {
        	this.canvas = document.getElementById('game');
        }
    };
}());