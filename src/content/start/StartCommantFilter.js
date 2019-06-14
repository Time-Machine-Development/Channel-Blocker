//StartPage filter 2/2
function StartCommantFilter(target, parent, containerParent) {
	this.parent = parent;
	this.containerParent = containerParent;
	Filter.call(this, target, parent);
}

StartCommantFilter.prototype = Object.create(Filter.prototype);

StartCommantFilter.prototype.constructor = StartCommantFilter;

StartCommantFilter.prototype.onFound = function(child, useCallbackFilter){

	let userChannelName;
	let linkInnerArr = child.getElementsByTagName("a");
	
	//Found a GridVideo-Container
	//Check the title and insert buttons
	if(linkInnerArr.length >= 2){
		if(linkInnerArr[1].id !== "author-text")return;
		//Create callbackFilter to listen to changes
		if(useCallbackFilter === undefined){
			new CallbackFilter(linkInnerArr[1], this, child);
		}
		userChannelName = linkInnerArr[1].textContent.trim();

		//check the userName
		checkUserChannelName(userChannelName, child);
		
		createBtnAtStart(linkInnerArr[1].parentNode.parentNode, createBtnNode(userChannelName));
	}
};

//If the callbackFilter register a change they invoke this function
//Invokes the 'reloadFromChild()'-function of 'parent'
StartCommantFilter.prototype.reload = function(child){
	this.onFound(child, true);
	this.parent.reloadFromChild(this.containerParent);
};
