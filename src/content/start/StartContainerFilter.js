function StartContainerFilter(target, parent, containerParent) {
	this.parent = parent;
	this.containerParent = containerParent;
	Filter.call(this, target, parent);
}

StartContainerFilter.prototype = Object.create(Filter.prototype);

StartContainerFilter.prototype.constructor = StartContainerFilter;

StartContainerFilter.prototype.onFound = function(child, useCallbackFilter){

	let userChannelName;

	let linkInnerArr = child.getElementsByTagName("a");
	if(linkInnerArr.length >= 3){
		if(useCallbackFilter === undefined){
			new CallbackFilter(linkInnerArr[2], this, child);
		}
		userChannelName = linkInnerArr[2].textContent;

		//GridVideo-Container
		checkVideoTitle(userChannelName, linkInnerArr[1].textContent, child);
	}else{

		//Channel-Container
		for(let elem of child.getElementsByClassName("style-scope ytd-grid-channel-renderer")){
			if(elem.id === "title"){
				userChannelName = elem.textContent;
				checkUserChannelName(userChannelName, elem.textContent, child);
			}
		}
	}

	//insert button to block channel/user
	for(let btnContainerElem of child.getElementsByClassName("style-scope ytd-grid-video-renderer")){
		if(btnContainerElem.id === "byline-container"){
			createBtnAtStart(btnContainerElem, createBtnNode(userChannelName));
		}
	}
};

StartContainerFilter.prototype.reload = function(child){
	this.onFound(child, true);
	this.parent.reloadFromChild(this.containerParent);
};
