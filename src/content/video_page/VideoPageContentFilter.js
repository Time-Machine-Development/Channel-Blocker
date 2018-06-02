function VideoPageContentFilter(target, parent) {
	Filter.call(this, target, parent);
}

VideoPageContentFilter.prototype = Object.create(Filter.prototype);

VideoPageContentFilter.prototype.constructor = VideoPageContentFilter;

VideoPageContentFilter.prototype.onFound = function(child, useCallbackFilter){
	let userName = undefined;

	for(let elem of child.getElementsByClassName("style-scope ytd-video-meta-block")){
		if(elem.id === "byline"){
			userName = elem.textContent;
			if(userName.length >= 25){
				elem.textContent = userName.substring(0, 21)+"...";
			}

			//insert button to block channel/user
			createBtnAtStart(elem.parentNode.parentNode, createBtnNode(elem.textContent), elem.parentNode);
			if(useCallbackFilter === undefined){
				let cFilter = new CallbackFilter(elem, this, child);
			}
		}
	}

	for(let elem of child.getElementsByClassName("style-scope ytd-compact-video-renderer")){
		if(elem.id === "video-title"){
			//let cFilter = new CallbackFilter(elem, this);
			checkVideoTitle(userName, elem.textContent, child);
		}
	}
};

VideoPageContentFilter.prototype.reload = function(child){
	if(child === undefined){
		for(let childElement of this.target.children){
			this.onFound(childElement, true);
		}
	}else{
		this.onFound(child, true);
	}
};
