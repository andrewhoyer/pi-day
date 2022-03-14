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
			$(this).css("background-color", "rgb(72, 72, 72)");
		});
		
		
		$(".period p").html(".");
		$(".period").css("background-color", "rgb(72, 72, 72)");
		
		gamestatus = "active";
		
		$("#message").html("Enter each digit of π in order!");
		
	});

	// Any of the number buttons is pressed
	$(".keys").click(function() {
		if (gamestatus == "active") {
		
			if (pi[digitPosition] == $(this).attr("id")) {
				$("#p" + digitPosition).css("background-color","#008000");
				
				if (digitPosition == 0) {
					$(".period").css("background-color", "#008000");
				}
				
				if (digitPosition == 9) {
					$("#message").html("Nice, you got all 10!");
					gamestatus = "stopped";
					$("#reset").css("background-image", "linear-gradient(to bottom, #21db21, #008000)");
				}
				

				
			} else {
				$("#p" + digitPosition).css("background-color","#800000");
				$("#reset").css("background-image", "linear-gradient(to bottom, #21db21, #008000)");
				
				let suffix = "th";
				
				if (digitPosition == 0) {
					suffix = "st";
				} else if (digitPosition == 1) {
					suffix = "nd";
				} else if (digitPosition == 2) {
					suffix = "rd";
				}
				
				$("#message").html("Uh oh! The " + (digitPosition + 1) + suffix + " digit of π is " + pi[digitPosition] + ". Try again!");
				
				gamestatus = "stopped";
				
			}
			
			$("#p" + digitPosition + " p").html($(this).attr("id"));
		
			digitPosition++;
		}
	});	

});
