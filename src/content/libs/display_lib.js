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
	if(isBlocked){
		if(element.style.display !== "none"){
			// set the style of children
			for (let child of element.children) {
				child.style.width = child.clientWidth + "px";
			}
			$(element).animate({width: "hide"}, contentConfig[ConfigId.CONTENT_ANIMATION_SPEED]);
		}
	}else if(element.style.display === "none"){
		$(element).animate({width: "show"}, contentConfig[ConfigId.CONTENT_ANIMATION_SPEED], function() {
			// animation complete. Reset children style
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
