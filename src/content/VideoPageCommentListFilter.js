function VideoPageCommentListFilter(target, parent) {
	this.onFound = function(child){
		if(child.id === "contents"){
			let videoPageCommentFilter = new VideoPageCommentFilter(child, this);
		}
	}
	
	Filter.call(this, target, parent);
}

VideoPageCommentListFilter.prototype = Object.create(Filter.prototype);

VideoPageCommentListFilter.prototype.constructor = VideoPageCommentListFilter;

VideoPageCommentListFilter.prototype.onFoundInit = function(child){
	this.onFound(child);
};

VideoPageCommentListFilter.prototype.onFoundObs = function(child){
	this.onFound(child);
};