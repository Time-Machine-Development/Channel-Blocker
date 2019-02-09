{
	$(".btn").each(function( index ){
		this.onclick = function() {
			$("#"+index).slideToggle("slow");
		};
	});
}
