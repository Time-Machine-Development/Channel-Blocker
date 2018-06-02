function StartContentFilter(target, parent) {
	Filter.call(this, target, parent);
}

StartContentFilter.prototype = Object.create(Filter.prototype);

StartContentFilter.prototype.constructor = StartContentFilter;

StartContentFilter.prototype.onFound = function(child){

	//OuterVideo-container
	for(let elem of child.getElementsByClassName("style-scope ytd-shelf-renderer")){
		if(elem.id === "title"){
			//CallbackFilter to listen to 
			new CallbackFilter(elem, this);
			checkUserChannelName(elem.textContent, child);

			//insert button to block channel/user
			console.log("TAGNAME: " + elem.parentNode.tagName);
			if(elem.textContent !== ""){
				if(elem.parentNode.tagName !== "H2"){
					createBtnAfter(elem.parentNode.parentNode, createContainerBtnNode(elem.textContent));
				}else{
					createBtnAfter(elem.parentNode, createContainerBtnNode(elem.textContent));
				}
			}
		}
	}

	//Empfohlen-container
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
					let cFilter = new CallbackFilter(linkInnerArr[2].parentNode, this);

					checkVideoTitle(linkInnerArr[2].textContent, linkInnerArr[1].textContent, videoElem);

					//insert button to block channel/user
					for(let btnContainerElem of videoElem.getElementsByClassName("style-scope ytd-video-meta-block")){
						if(btnContainerElem.id === "metadata" && linkInnerArr[2].textContent !== ""){

							createBtnAtStart(btnContainerElem, createBtnNode(linkInnerArr[2].textContent));
						}
					}

					if(debug){
						linkInnerArr[1].style.color = "darkgray";
						linkInnerArr[2].style.color = "darkgray";
					}
				}

				if(debug){
					videoElem.style.background = "green";
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

StartContentFilter.prototype.reload = function(){
	for(let childElement of this.target.children){
		this.onFound(childElement);
	}
};
