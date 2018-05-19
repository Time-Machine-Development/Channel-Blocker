function VideoPageWatchFilter(target, parent) {
	this.onFound = function(child){
		if(child.id === "items"){
			let videoPageContentFilter = new VideoPageContentFilter(child, this);
		}
	}
	
	Filter.call(this, target, parent);
}

VideoPageWatchFilter.prototype = Object.create(Filter.prototype);

VideoPageWatchFilter.prototype.constructor = VideoPageWatchFilter;

VideoPageWatchFilter.prototype.onFoundInit = function(child){
	this.onFound(child);
};

VideoPageWatchFilter.prototype.onFoundObs = function(child){
	this.onFound(child);
};