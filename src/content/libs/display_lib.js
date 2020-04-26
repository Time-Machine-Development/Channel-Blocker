function toggleVisibilty(element, isBlocked){
	if(isBlocked){
		$(element).hide(contentUIConfig[ContentUI.ANIMATION_SPEED]);
	}else{
		$(element).show(contentUIConfig[ContentUI.ANIMATION_SPEED]);
	}
}
