function StartContentFilter(target, parent) {
	this.onFound = function(child){
		
		//OuterVideo-container
		for(let elem of child.getElementsByClassName("style-scope ytd-shelf-renderer")){
			if(elem.id == "title"){
				let cFilter = new CallbackFilter(elem, this);
				checkUserChannelName(elem.textContent, child);
				
				//insert button to block channel/user
				createBtnAfter(elem.parentNode.parentNode, createContainerBtnNode(elem.textContent));
			}
		}
		
		//Empfohlen-container
		for(let elem of child.getElementsByClassName("style-scope yt-horizontal-list-renderer")){
			if(elem.id == "items"){
				var filter2 = new VideoContainerFilter(elem, this);
			}
		}
		
		//SingleVideo-container
		for(let elem of child.getElementsByClassName("style-scope ytd-expanded-shelf-contents-renderer")){
			if(elem.id == "grid-container"){
				for(videoElem of elem.children){
					let linkInnerArr = videoElem.getElementsByTagName("a");
					if(linkInnerArr.length >= 3){
						let cFilter = new CallbackFilter(linkInnerArr[2].parentNode, this);
						
						checkVideoTitle(linkInnerArr[2].textContent, linkInnerArr[1].textContent, videoElem);
						
						//insert button to block channel/user
						for(let btnContainerElem of videoElem.getElementsByClassName("style-scope ytd-video-meta-block")){
							if(btnContainerElem.id === "metadata" && linkInnerArr[2].textContent != ""){
								
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
			if(elem.id == "items"){
				var filter2 = new VideoContainerFilter(elem, this);
			}
		}
	}
	
	this.reload = function(){
		console.log("--RELOAD--");
		for(let childElement of this.target.children){
			this.onFound(childElement);
		}
	}
	
	Filter.call(this, target, parent);
}

StartContentFilter.prototype = Object.create(Filter.prototype);

StartContentFilter.prototype.constructor = StartContentFilter;

StartContentFilter.prototype.onFoundInit = function(child){
	this.onFound(child);
	
	if(debug){
		child.style.background = "red";
	}
};

StartContentFilter.prototype.onFoundObs = function(child){
	this.onFound(child);
	
	if(debug){
		child.style.background = "orange";
	}
};