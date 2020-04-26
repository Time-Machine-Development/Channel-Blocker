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
	//return if and only if either element is hidden and should be blocked or element is not hidden and should not be blocked
	if((element.style.display === "none") === isBlocked){
		return;
	}

	/* Youtube may enforce a width-height-ratio of elements s.t. for example the height of a thumbnail whose width is decreased during the animation
	will also be decreased to match the width-height-ratio. */
	if(isBlocked){
		//To "disable" a forced width-height-ratio the style.width of element is overwritten and thereby fixed.
		for (let child of element.children) {
			child.style.width = child.clientWidth + "px";
		}

		$(element).animate({width: "hide"}, contentConfig[ConfigId.CONTENT_ANIMATION_SPEED]);
	}else if(element.style.display === "none"){
		$(element).animate({width: "show"}, contentConfig[ConfigId.CONTENT_ANIMATION_SPEED], () => {
			//To "enable" the default behaviour (e.g. a forced width-height-ratio) the style.width is set to "" s.t. the "default" style.width is used.
			for (let child of element.children) {
				child.style.width = "";
			}
		});
	}
}

function toggleVisibiltyHorizontal(element, isBlocked){
	if(isBlocked){
		$(element).animate({height: "hide"}, contentConfig[ConfigId.CONTENT_ANIMATION_SPEED]);
	}else{
		$(element).animate({height: "show"}, contentConfig[ConfigId.CONTENT_ANIMATION_SPEED]);
	}
}
