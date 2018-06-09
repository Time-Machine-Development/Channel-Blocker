//VideoPage filter 5/8
function VideoPageCommentContainerFilter(target, parent) {
	Filter.call(this, target, parent);
}

VideoPageCommentContainerFilter.prototype = Object.create(Filter.prototype);

VideoPageCommentContainerFilter.prototype.constructor = VideoPageCommentContainerFilter;

VideoPageCommentContainerFilter.prototype.onFound = function(child){
	if(child.tagName === "YTD-ITEM-SECTION-RENDERER"){
		new VideoPageCommentListFilter(child, this);
	}
};
