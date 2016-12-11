/**
 * The Code Force Hackathon Prototype
 *
 * Created by: TheCoffeeForce Team
 * Last Modified: 11/12/2016
 */
(function($, config){

	// ON PRESS 'ENTER'
	$("#message").keyup(function(e){
	    if(e.keyCode == 13) {
	        $("[role=send]").trigger("click");
	    }
	});

	// ON CLICK 'SEND'
	$("[role=send]").on("click", function(e) {
		var message = $("#message").val();
		$("#message").val("");

		render({
			imgsrc: "https://image.freepik.com/icones-gratis/perfil-nerd-avatar-masculino_318-68813.jpg",
			person: "Bruce Dickinson",
			time: new Date().toLocaleTimeString(),
			message: message
		});

        $.ajax({
            url: config.botendpoint,
            type: 'post',
            dataType: 'json',
            data: JSON.stringify({ question: message }),
            success: function (data) {
            	render({
					imgsrc: "https://image.freepik.com/icones-gratis/avatar-mulher_318-68929.jpg",
					person: "T-800",
					time: new Date().toLocaleTimeString(),
					message: data.answer
				});
            }
        });
	});

	function render(data) {
		$(".chat-widget").append("<div class='row'><div class='col-lg-12'><div class='media'><a class='pull-left' href='#'><img class='media-object img-circle' src='"+data.imgsrc+"' width='30px' height='30px' alt=''></a><div class='media-body'><h4 class='media-heading'>"+data.person+"<span class='small pull-right'>"+data.time+"</span></h4><p>"+data.message+"</p></div></div></div></div>");
		$(".portlet-body").animate({ scrollTop: $(this).height() }, "slow");
  			return false;		
	}

})(window.jQuery, window.env);