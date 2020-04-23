function toggleVisibilty(element, isBlocked){
	if(isBlocked){
		$(element).hide(contentConfig[ConfigId.CONTENT_ANIMATION_SPEED]);
	}else{
		$(element).show(contentConfig[ConfigId.CONTENT_ANIMATION_SPEED]);
	}
}

function fade(element, isBlocked){
	if(isBlocked){
		$(element).fadeOut(contentConfig[ConfigId.CONTENT_ANIMATION_SPEED]);
	}else{
		$(element).fadeIn(contentConfig[ConfigId.CONTENT_ANIMATION_SPEED]);
	}
}

function toggleVisibiltyVertical(element, isBlocked){
	console.log("vertical");

	if(isBlocked){
		$(element).fadeOut(contentConfig[ConfigId.CONTENT_ANIMATION_SPEED]);
	}else{
		$(element).animate({width: "show"}, contentConfig[ConfigId.CONTENT_ANIMATION_SPEED]);
	}
}

function toggleVisibiltyHorizontal(element, isBlocked){
	console.log("hirizontal");
	if(isBlocked){
		$(element).animate({height: "hide"}, contentConfig[ConfigId.CONTENT_ANIMATION_SPEED]);
	}else{
		$(element).animate({height: "show"}, contentConfig[ConfigId.CONTENT_ANIMATION_SPEED]);
	}
}
