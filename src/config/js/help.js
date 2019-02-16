//TODO: move out of here

{
	$(".btn").each(function( index ){
		this.onclick = function() {
			$("#"+index).slideToggle("slow");
		};
	});
}
