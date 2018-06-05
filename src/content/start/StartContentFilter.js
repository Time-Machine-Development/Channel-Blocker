function StartContentFilter(target, parent) {
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
					console.log("!H2");
					if(useCallbackFilter === undefined){
						new CallbackFilter(elem.parentNode.parentNode.parentNode, this, child, true);
						console.log(elem.parentNode.parentNode.parentNode);
					}
					createBtnAfter(elem, createContainerBtnNode(elem.textContent));
				}else{
					console.log("H2");
					if(useCallbackFilter === undefined){
						new CallbackFilter(elem.parentNode, this, child);
						console.log(elem.parentNode);
					}
					createBtnAfter(elem.parentNode, createContainerBtnNode(elem.textContent));
				}
			}
		}
	}

	//Recommended-container
	for(let elem of child.getElementsByClassName("style-scope yt-horizontal-list-renderer")){
		if(elem.id === "items"){
			new StartContainerFilter(elem, this);
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
			new StartContainerFilter(elem, this);
		}
	}
};

StartContentFilter.prototype.reload = function(child){
	console.log("RELOAD");
	console.log(child);
	this.onFound(child, true);
};
