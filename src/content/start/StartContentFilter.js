function StartContentFilter(target, parent) {
	
	this.reloadFromChild = function(child){
		for(let elem of child.getElementsByClassName("style-scope ytd-shelf-renderer")){
		if(elem.id === "title"){
			checkUserChannelName(elem.textContent, child);

			//insert button to block channel/user
			if(elem.textContent !== ""){
				if(elem.parentNode.tagName !== "H2"){
					createBtnAfter(elem, createContainerBtnNode(elem.textContent));
				}else{
					createBtnAfter(elem.parentNode, createContainerBtnNode(elem.textContent));
				}
			}
		}
	}
	}
	
	Filter.call(this, target, parent);
}

StartContentFilter.prototype = Object.create(Filter.prototype);

StartContentFilter.prototype.constructor = StartContentFilter;

StartContentFilter.prototype.onFound = function(child, useCallbackFilter){

	//OuterVideo-container
	for(let elem of child.getElementsByClassName("style-scope ytd-shelf-renderer")){
		if(elem.id === "title"){
			checkUserChannelName(elem.textContent, child);

			//insert button to block channel/user
			if(elem.textContent !== ""){
				if(elem.parentNode.tagName !== "H2"){
					createBtnAfter(elem, createContainerBtnNode(elem.textContent));
				}else{
					createBtnAfter(elem.parentNode, createContainerBtnNode(elem.textContent));
				}
			}
		}
	}

	//Recommended-container
	for(let elem of child.getElementsByClassName("style-scope yt-horizontal-list-renderer")){
		if(elem.id === "items"){
			new StartContainerFilter(elem, this, child);
		}
	}

	//SingleVideo-container
	for(let elem of child.getElementsByClassName("style-scope ytd-expanded-shelf-contents-renderer")){
		if(elem.id === "grid-container"){
			for(videoElem of elem.children){
				let linkInnerArr = videoElem.getElementsByTagName("a");
				if(linkInnerArr.length >= 3){
					if(useCallbackFilter === undefined){
						new CallbackFilter(linkInnerArr[2].parentNode, this, child);
					}
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

	//gridVideo/channel-container
	for(let elem of child.getElementsByClassName("style-scope ytd-grid-renderer")){
		if(elem.id === "items"){
			new StartContainerFilter(elem, this, child);
		}
	}
};

StartContentFilter.prototype.reload = function(child){
	console.log("RELOAD");
	console.log(child);
	this.onFound(child, true);
};
