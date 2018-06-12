//VideoPage filter 6/8
function VideoPageCommentListFilter(target, parent) {
	Filter.call(this, target, parent);
}

VideoPageCommentListFilter.prototype = Object.create(Filter.prototype);

VideoPageCommentListFilter.prototype.constructor = VideoPageCommentListFilter;

VideoPageCommentListFilter.prototype.onFound = function(child){
	if(child.id === "contents"){
		new VideoPageCommentFilter(child, this);
	}
};
