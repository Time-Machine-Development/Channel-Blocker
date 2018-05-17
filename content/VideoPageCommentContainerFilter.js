		
	function VideoPageCommentContainerFilter(target, parent) {
		this.onFound = function(child){
			if(child.tagName === "YTD-ITEM-SECTION-RENDERER"){
				let videoPageCommentListFilter = new VideoPageCommentListFilter(child, this);
			}
		}
		
		Filter.call(this, target, parent);
	}

	VideoPageCommentContainerFilter.prototype = Object.create(Filter.prototype);

	VideoPageCommentContainerFilter.prototype.constructor = VideoPageCommentContainerFilter;

	VideoPageCommentContainerFilter.prototype.onFoundInit = function(child){
		this.onFound(child);
	};
	
	VideoPageCommentContainerFilter.prototype.onFoundObs = function(child){
		this.onFound(child);
	};