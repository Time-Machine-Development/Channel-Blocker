//VideoPage filter 3/8
function VideoPageWatchFilter(target, parent) {
	Filter.call(this, target, parent);
}

VideoPageWatchFilter.prototype = Object.create(Filter.prototype);

VideoPageWatchFilter.prototype.constructor = VideoPageWatchFilter;

VideoPageWatchFilter.prototype.onFound = function(child){
	console.log("onFound111",child);
	if(child.id === "items"){
		console.log("onFound",child);
		new VideoPageContentFilter(child, this);
	}
};
