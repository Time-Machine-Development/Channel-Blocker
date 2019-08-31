//VideoPage filter 2/8
function VideoPageManagerFilter(target, parent) {
	Filter.call(this, target, parent);
}

VideoPageManagerFilter.prototype = Object.create(Filter.prototype);

VideoPageManagerFilter.prototype.constructor = VideoPageManagerFilter;

VideoPageManagerFilter.prototype.onFound = function(child){
	for(let elem of child.getElementsByClassName("style-scope ytd-watch-flexy")){
		//Next video on side
		if(elem.tagName === "YTD-WATCH-NEXT-SECONDARY-RESULTS-RENDERER"){
			new VideoPageWatchFilter(elem, this);
		}

		//Comments under the Video
		if(elem.id === "comments"){
			new VideoPageCommentContainerFilter(elem, this);
		}

		//MetaData under the video (channelname)
		if(elem.id === "meta"){
			new VideoPageMetaFilter(elem.parentElement, this);
		}
	}
};
