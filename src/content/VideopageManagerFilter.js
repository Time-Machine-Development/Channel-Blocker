function VideoPageManagerFilter(target, parent) {
	this.onFound = function(child){
		for(let elem of child.getElementsByClassName("style-scope ytd-watch")){
			if(elem.tagName === "YTD-WATCH-NEXT-SECONDARY-RESULTS-RENDERER"){
				let videoPageWatchFilter = new VideoPageWatchFilter(elem, this);
			}
		}
		
		for(let elem of child.getElementsByClassName("style-scope ytd-watch")){
			if(elem.id === "comments"){
				let videoPageCommentContainerFilter = new VideoPageCommentContainerFilter(elem, this);
			}
		}
	}
	
	Filter.call(this, target, parent);
}

VideoPageManagerFilter.prototype = Object.create(Filter.prototype);

VideoPageManagerFilter.prototype.constructor = VideoPageManagerFilter;

VideoPageManagerFilter.prototype.onFoundInit = function(child){
	this.onFound(child);
};

VideoPageManagerFilter.prototype.onFoundObs = function(child){
	this.onFound(child);
};