function CallbackFilter(target, parent) {
	this.onFound = function(child){
		
		let userChannelName;
		
		let linkInnerArr = child.getElementsByTagName("a");
		if(linkInnerArr.length >= 3){
			userChannelName = linkInnerArr[2].textContent;
			
			//GridVideo-Container
			checkVideoTitle(userChannelName, linkInnerArr[1].textContent, child);
			
			if(debug){
				linkInnerArr[1].style.color = "darkgray";
				linkInnerArr[2].style.color = "darkgray";
			}
		}else{
			
			//Channel-Container
			for(let elem of child.getElementsByClassName("style-scope ytd-grid-channel-renderer")){
				if(elem.id == "title"){
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
	}
	
	Filter.call(this, target, parent);
}

VideoContainerFilter.prototype = Object.create(Filter.prototype);

VideoContainerFilter.prototype.constructor = VideoContainerFilter;

VideoContainerFilter.prototype.onFoundInit = function(child){
	this.onFound(child);
	
	if(debug){
		child.style.background = "green";
	}
};

VideoContainerFilter.prototype.onFoundObs = function(child){
	this.onFound(child);
	
	if(debug){
		child.style.background = "blue";
	}
};