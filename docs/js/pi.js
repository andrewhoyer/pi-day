$(document).ready(function() {
	
	var digitPosition = 0;
	
	// The Reset button is pressed
	$("#reset").click(function() {

		digitPosition = 0;
		
		$(".digit p").each(function(index) {
			$(this).html("?");
		});
		
		$(".period p").html(".");
		
	});

	// Any of the number buttons is pressed
	$(".keys").click(function() {
		console.log($(this).attr("id"));
		
		$("#p" + digitPosition + " p").html($(this).attr("id"));
		
		digitPosition++;
		
	});	

}); 