/**
 * Module to initialize game
 * @version 1.0
 * @author Bruno C. Ramos <bruno@wee.ag>
 * See more at: http://bitbucket.org/brunocramos/gameBoilerplate
 */
(function () {
    "use strict";

    window.Game = window.Game || {};  
    window.Game.Debug = {
    	/**
    	 * Set true to enable some debug features
    	 * @type {Boolean}
    	 */
    	debug : true,


        /**
         * Log error. You can define your own sort of logging here
         */
    	log: function(data) {
            if(this.debug) 
                console.log(data);
            
            return this;
        }
    };
}());