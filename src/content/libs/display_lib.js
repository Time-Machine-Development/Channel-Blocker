function toggleVisibilty(element, isBlocked){
	//return if and only if either element is hidden and should be blocked or element is not hidden and should not be blocked
	if((element.style.display === "none") === isBlocked){
		return;
	}

	if(isBlocked){
		$(element).hide(contentUIConfig[ContentUI.ANIMATION_SPEED]);
	}else{
		$(element).show(contentUIConfig[ContentUI.ANIMATION_SPEED]);
	}
}

function fade(element, isBlocked){
	//return if and only if either element is hidden and should be blocked or element is not hidden and should not be blocked
	if((element.style.display === "none") === isBlocked){
		return;
	}

	if(isBlocked){
		$(element).fadeOut(contentUIConfig[ContentUI.ANIMATION_SPEED]);
	}else{
		$(element).fadeIn(contentUIConfig[ContentUI.ANIMATION_SPEED]);
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

		$(element).animate({width: "hide"}, contentUIConfig[ContentUI.ANIMATION_SPEED]);
	}else if(element.style.display === "none"){
		$(element).animate({width: "show"}, contentUIConfig[ContentUI.ANIMATION_SPEED], () => {
			//To "enable" the default behaviour (e.g. a forced width-height-ratio) the style.width is set to "" s.t. the "default" style.width is used.
			for (let child of element.children) {
				child.style.width = "";
			}
		});
	}
}

function toggleVisibiltyHorizontal(element, isBlocked){
	//return if and only if either element is hidden and should be blocked or element is not hidden and should not be blocked
	if((element.style.display === "none") === isBlocked){
		return;
	}

	if(isBlocked){
		$(element).animate({height: "hide"}, contentUIConfig[ContentUI.ANIMATION_SPEED]);
	}else{
		$(element).animate({height: "show"}, contentUIConfig[ContentUI.ANIMATION_SPEED]);
	}
}
