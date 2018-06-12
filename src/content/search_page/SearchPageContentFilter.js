//SearchPage filter 4/4
function SearchPageContentFilter(target, parent) {
	Filter.call(this, target, parent);
}

SearchPageContentFilter.prototype = Object.create(Filter.prototype);

SearchPageContentFilter.prototype.constructor = SearchPageContentFilter;

SearchPageContentFilter.prototype.onFound = function(child, useCallbackFilter){

	//Found a VideoContainer
	//Create a new SearchPageContentFilter on it
	if(child.tagName === "YTD-SHELF-RENDERER"){
		for(elem of child.getElementsByClassName("style-scope ytd-vertical-list-renderer")){
			if(elem.id === "items"){
				new SearchPageContentFilter(elem, this);
			}
		}
	}

	//Found a largeVideo
	//Check the videos and insert buttons
	if(child.tagName === "YTD-VIDEO-RENDERER"){
		let linkInnerArr = child.getElementsByTagName("a");
		if(linkInnerArr.length >= 3){
			//Create callbackFilter to listen to changes
			if(useCallbackFilter === undefined){
				new CallbackFilter(linkInnerArr[2], this, child);
			}

			//check the videoTitle and userName
			checkVideoTitle(linkInnerArr[2].textContent, linkInnerArr[1].textContent, child);

			//insert the buttons to block the user
			for(let btnContainerElem of child.getElementsByClassName("style-scope ytd-video-meta-block")){
				if(btnContainerElem.id === "metadata"){
					createBtnAtStart(btnContainerElem, createBtnNode(linkInnerArr[2].textContent), btnContainerElem.firstChild);
				}
			}
		}
	}
};

//If the callbackFilter register a change they invoke this function
//Invokes the 'onFound()' with the child that has changed
SearchPageContentFilter.prototype.reload = function(child){
	this.onFound(child, true);
};
