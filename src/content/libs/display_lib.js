function toggleVisibilty(element, isBlocked){
	if(isBlocked){
		$(element).hide(contentConfig[ConfigId.CONTENT_ANIMATION_SPEED]);
	}else{
		$(element).show(contentConfig[ConfigId.CONTENT_ANIMATION_SPEED]);
	}
}
