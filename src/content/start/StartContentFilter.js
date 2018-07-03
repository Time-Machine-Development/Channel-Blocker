//StartPage filter 2/2
function StartContentFilter(target, parent) {
	Filter.call(this, target, parent);
}

StartContentFilter.prototype = Object.create(Filter.prototype);

StartContentFilter.prototype.constructor = StartContentFilter;

//If a childFilter is reloading, it invokes this function
StartContentFilter.prototype.reloadFromChild = function(child){
	//Found a OuterVideo-container
	//Check the name and insert buttons
	for(let elem of child.getElementsByClassName("style-scope ytd-shelf-renderer")){
		if(elem.id === "title"){
			//check the userName
			checkUserChannelName(elem.textContent, child);

			//insert button to block channel/user
			//if the parentNode is a 'H2' tag the button must be insertet at another position
			if(elem.textContent !== ""){
				if(elem.parentNode.tagName !== "H2"){
					createBtnAfter(elem.parentNode.parentNode, createContainerBtnNode(elem.textContent));
				}else{
					createBtnAfter(elem.parentNode, createContainerBtnNode(elem.textContent));
				}
			}
		}
	}
}

StartContentFilter.prototype.onFound = function(child, useCallbackFilter){

	//Found a OuterVideo-container
	//Check the name and insert buttons
	for(let elem of child.getElementsByClassName("style-scope ytd-shelf-renderer")){
		if(elem.id === "title"){
			//check the userName
			checkUserChannelName(elem.textContent, child);

			//insert button to block channel/user
			//if the parentNode is a 'H2' tag the button must be insertet at another position
			if(elem.textContent !== ""){
				if(elem.parentNode.tagName !== "H2"){
					createBtnAfter(elem.parentNode.parentNode, createContainerBtnNode(elem.textContent));
				}else{
					createBtnAfter(elem.parentNode, createContainerBtnNode(elem.textContent));
				}
			}
		}
	}

	//Found a Recommended-container
	//Create new 'StartContainerFilter' on it
	for(let elem of child.getElementsByClassName("style-scope yt-horizontal-list-renderer")){
		if(elem.id === "items"){
			new StartContainerFilter(elem, this, child);
		}
	}

	//Found a SingleVideo-container
	//Check the name, title and insert buttons
	for(let elem of child.getElementsByClassName("style-scope ytd-expanded-shelf-contents-renderer")){
		if(elem.id === "grid-container"){
			for(videoElem of elem.children){
				let linkInnerArr = videoElem.getElementsByTagName("a");
				if(linkInnerArr.length >= 3){
					//Create callbackFilter to listen to changes
					if(useCallbackFilter === undefined){
						new CallbackFilter(linkInnerArr[2].parentNode, this, child);
					}
					//check the userName and title
					checkVideoTitle(linkInnerArr[2].textContent, linkInnerArr[1].textContent, videoElem);

					//insert button to block channel/user
					for(let btnContainerElem of videoElem.getElementsByClassName("style-scope ytd-video-meta-block")){
						if(btnContainerElem.id === "metadata" && linkInnerArr[2].textContent !== ""){
							createBtnAtStart(btnContainerElem, createBtnNode(linkInnerArr[2].textContent));
						}
					}
				}
			}
		}
	}

	//Found a GridVideo/channel-container
	//Create new 'StartContainerFilter' on it
	for(let elem of child.getElementsByClassName("style-scope ytd-grid-renderer")){
		if(elem.id === "items"){
			new StartContainerFilter(elem, this, child);
		}
	}
};

//If the callbackFilter register a change they invoke this function
StartContentFilter.prototype.reload = function(child){
	this.onFound(child, true);
};
