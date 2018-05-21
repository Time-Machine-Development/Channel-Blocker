function VideoPageContentFilter(target, parent) {
	this.onFound = function(child){
		
		let userName = undefined;
		
		for(let elem of child.getElementsByClassName("style-scope ytd-video-meta-block")){
			if(elem.id == "byline"){
				userName = elem.textContent;
				if(userName.length >= 25){
					elem.textContent = userName.substring(0, 21)+"...";
				}
				
				//insert button to block channel/user
				createBtnAtStart(elem.parentNode.parentNode, createBtnNode(elem.textContent), elem.parentNode);
				let cFilter = new CallbackFilter(elem, this);
			}
		}
		
		for(let elem of child.getElementsByClassName("style-scope ytd-compact-video-renderer")){
			if(elem.id == "video-title"){
				//let cFilter = new CallbackFilter(elem, this);
				checkVideoTitle(userName, elem.textContent, child);
			}
		}
	}
	
	this.reload = function(){
		console.log("--RELOAD--");
		for(let childElement of this.target.children){
			this.onFoundInit(childElement);
		}
	}
	
	Filter.call(this, target, parent);
}

VideoPageContentFilter.prototype = Object.create(Filter.prototype);

VideoPageContentFilter.prototype.constructor = VideoPageContentFilter;

VideoPageContentFilter.prototype.onFoundInit = function(child){
	this.onFound(child);
};

VideoPageContentFilter.prototype.onFoundObs = function(child){
	this.onFound(child);
};