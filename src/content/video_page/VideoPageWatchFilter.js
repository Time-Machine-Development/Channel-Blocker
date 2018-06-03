function VideoPageWatchFilter(target, parent) {
	Filter.call(this, target, parent);
}

VideoPageWatchFilter.prototype = Object.create(Filter.prototype);

VideoPageWatchFilter.prototype.constructor = VideoPageWatchFilter;

VideoPageWatchFilter.prototype.onFound = function(child){
	if(child.id === "items"){
		new VideoPageContentFilter(child, this);
	}
};
