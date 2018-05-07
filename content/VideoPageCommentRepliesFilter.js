
	console.log("VideoPageCommentRepliesFilter.js");
				
	function VideoPageCommentRepliesFilter(target, parent) {
		this.onFound = function(child){
			console.log("Commant:");
			for(let elem of child.getElementsByClassName("yt-simple-endpoint style-scope ytd-comment-renderer")){
				if(elem.id === "author-text"){
					console.log(elem.firstElementChild.textContent);
				}
			}
			for(let elem of child.getElementsByClassName("style-scope ytd-comment-renderer")){
				if(elem.id === "content-text"){
					console.log(elem.textContent);
				}
			}
		}
		
		Filter.call(this, target, parent);
	}

	VideoPageCommentRepliesFilter.prototype = Object.create(Filter.prototype);

	VideoPageCommentRepliesFilter.prototype.constructor = VideoPageCommentRepliesFilter;

	VideoPageCommentRepliesFilter.prototype.onFoundInit = function(child){
		this.onFound(child);
	};
	
	VideoPageCommentRepliesFilter.prototype.onFoundObs = function(child){
		this.onFound(child);
	};