		
	function VideoPageCommentRepliesFilter(target, parent) {
		this.onFound = function(child){
			//UserChannelName of author
			for(let elem of child.getElementsByClassName("yt-simple-endpoint style-scope ytd-comment-renderer")){
				if(elem.id === "author-text"){
					checkUserChannelName(elem.firstElementChild.textContent, child);
					
					//insert button to block channel/user
					elem.parentNode.insertBefore(createBtnNode(elem.firstElementChild.textContent), elem);
				}
			}
			
			//CommentContent
			for(let elem of child.getElementsByClassName("style-scope ytd-comment-renderer")){
				if(elem.id === "content-text"){
					checkCommentContent(elem.textContent, child);
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