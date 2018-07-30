//VideoPage filter 2/8
function VideoPageManagerFilter(target, parent) {
	Filter.call(this, target, parent);
}

VideoPageManagerFilter.prototype = Object.create(Filter.prototype);

VideoPageManagerFilter.prototype.constructor = VideoPageManagerFilter;

VideoPageManagerFilter.prototype.onFound = function(child){
	for(let elem of child.getElementsByClassName("style-scope ytd-watch-flexy")){
		if(elem.tagName === "YTD-WATCH-NEXT-SECONDARY-RESULTS-RENDERER"){
			new VideoPageWatchFilter(elem, this);
		}

		if(elem.id === "comments"){
			new VideoPageCommentContainerFilter(elem, this);
		}
	}
};
