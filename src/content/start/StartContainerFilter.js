//StartPage filter 1/2
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
	
	//Found a GridVideo-Container
	//Check the title and insert buttons
	if(linkInnerArr.length >= 3){
		//Create callbackFilter to listen to changes
		if(useCallbackFilter === undefined){
			new CallbackFilter(linkInnerArr[2], this, child);
		}
		userChannelName = linkInnerArr[2].textContent;

		//check the videoTitle and userName
		checkVideoTitle(userChannelName, linkInnerArr[1].textContent, child);
	}else{
		//Found a Channel-Container
		//Check the name and insert buttons
		for(let elem of child.getElementsByClassName("style-scope ytd-grid-channel-renderer")){
			if(elem.id === "title"){
				userChannelName = elem.textContent;
				checkUserChannelName(userChannelName, elem.textContent, child);
			}
		}
	}

	//Insert button to block channel/user
	for(let btnContainerElem of child.getElementsByClassName("style-scope ytd-grid-video-renderer")){
		if(btnContainerElem.id === "byline-container"){
			createBtnAtStart(btnContainerElem, createBtnNode(userChannelName));
		}
	}
};

//If the callbackFilter register a change they invoke this function
//Invokes the 'reloadFromChild()'-function of 'parent'
StartContainerFilter.prototype.reload = function(child){
	this.onFound(child, true);
	this.parent.reloadFromChild(this.containerParent);
};
