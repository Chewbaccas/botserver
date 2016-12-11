/**
 * The Code Force Hackathon Prototype
 *
 * Created by: TheCoffeeForce Team
 * Last Modified: 11/12/2016
 */
(function(scope, $){
	
	$.ajaxSetup({
	  crossDomain: true,
	  xhrFields: {
	    withCredentials: true
	  }
	});

	scope.env = {
		botendpoint: "http://127.0.0.1:8080/chat/"
	}

	return scope;

})(window, window.jQuery);