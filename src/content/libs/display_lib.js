function toggleVisibilty(element, isBlocked){
	if(isBlocked){
		$(element).hide("fast");
	}else{
		$(element).show("fast");
	}
}
