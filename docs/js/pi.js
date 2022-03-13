$(document).ready(function() {
	
	let gamestatus = "active";
	
	let digitPosition = 0;
	
	let pi = [3,1,4,1,5,9,2,6,5,3];
	
	// The Reset button is pressed
	$("#reset").click(function() {

		digitPosition = 0;
		
		$(".digit p").each(function(index) {
			$(this).html("?");
		});
		
		$(".digit").each(function(index) {
			$(this).css("background-color", "#cccccc");
		});
		
		
		$(".period p").html(".");
		
		gamestatus = "active";
		
		$("#message").html("Enter each digit of π in order!");
		
	});

	// Any of the number buttons is pressed
	$(".keys").click(function() {
		if (gamestatus == "active") {
		
			//console.log($(this).attr("id"));
			console.log(pi[digitPosition]);
			console.log($(this).attr("id"));
			if (pi[digitPosition] == $(this).attr("id")) {
				$("#p" + digitPosition).css("background-color","#008000");
			} else {
				$("#p" + digitPosition).css("background-color","#800000");
				$("#message").html("Uh oh! Digit " + (digitPosition + 1) + " of π is " + pi[digitPosition] + "!");
				gamestatus = "stopped";
			}
			$("#p" + digitPosition + " p").html($(this).attr("id"));
		
			digitPosition++;
		}
	});	

});
