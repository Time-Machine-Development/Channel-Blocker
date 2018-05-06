
	console.log("VideoPageCommentContainerFilterFilter.js");
				
	function VideoPageCommentContainerFilter(target, parent) {
		this.onFound = function(child){
			if(child.tagName === "YTD-ITEM-SECTION-RENDERER"){
				console.log("new VideoPageCommentListFilter");
				let videoPageCommentListFilter = new VideoPageCommentListFilter(child, this);
				console.log("/new VideoPageCommentListFilter");
			}
		}
		
		Filter.call(this, target, parent);
	}

	VideoPageCommentContainerFilter.prototype = Object.create(Filter.prototype);

	VideoPageCommentContainerFilter.prototype.constructor = VideoPageCommentContainerFilter;

	VideoPageCommentContainerFilter.prototype.onFoundInit = function(child){
		this.onFound(child);
		
		if(debug){
			child.style.background = "green";
		}
	};
	
	VideoPageCommentContainerFilter.prototype.onFoundObs = function(child){
		this.onFound(child);
		
		if(debug){
			child.style.background = "blue";
		}
	};