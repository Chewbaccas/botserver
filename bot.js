/**
 * The Code Force Hackathon Prototype
 *
 * Created by: TheCoffeeForce Team
 * Last Modified: 11/12/2016
 */
(function(exports, messages){
	
	exports.handle = fn_handle;

	function fn_handle(text) {
		var response = messages.get(text);
		response ? response : messages.getDefault();
	}


})(module.exports = {}, require("./messages"));