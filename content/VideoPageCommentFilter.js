
	console.log("VideoPageCommentFilter.js");
				
	function VideoPageCommentFilter(target, parent) {
		this.onFound = function(child){
			for(let elem of child.getElementsByClassName("style-scope ytd-comment-renderer")){
				console.log(elem);
			}
		}
		
		Filter.call(this, target, parent);
	}

	VideoPageCommentFilter.prototype = Object.create(Filter.prototype);

	VideoPageCommentFilter.prototype.constructor = VideoPageCommentFilter;

	VideoPageCommentFilter.prototype.onFoundInit = function(child){
		this.onFound(child);
		
		if(debug){
			child.style.background = "green";
		}
	};
	
	VideoPageCommentFilter.prototype.onFoundObs = function(child){
		this.onFound(child);
		
		if(debug){
			child.style.background = "blue";
		}
	};