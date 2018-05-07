
	console.log("VideoPageCommentFilter.js");
				
	function VideoPageCommentFilter(target, parent) {
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
			for(let elem of child.getElementsByClassName("style-scope ytd-comment-replies-renderer")){
				if(elem.id === "loaded-replies"){
					console.log(elem);
					let videoPageCommentRepliesFilter = new VideoPageCommentRepliesFilter(elem, this);
				}
			}
		}
		
		Filter.call(this, target, parent);
	}

	VideoPageCommentFilter.prototype = Object.create(Filter.prototype);

	VideoPageCommentFilter.prototype.constructor = VideoPageCommentFilter;

	VideoPageCommentFilter.prototype.onFoundInit = function(child){
		this.onFound(child);
	};
	
	VideoPageCommentFilter.prototype.onFoundObs = function(child){
		this.onFound(child);
	};