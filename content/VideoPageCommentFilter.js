
	function VideoPageCommentFilter(target, parent) {
		this.onFound = function(child){
			
			let userName = undefined;
			
			//UserChannelName of author
			for(let elem of child.getElementsByClassName("yt-simple-endpoint style-scope ytd-comment-renderer")){
				if(elem.id === "author-text"){
					userName = elem.firstElementChild.textContent;
					
					//insert button to block channel/user
					elem.parentNode.insertBefore(createBtnNode(elem.firstElementChild.textContent), elem);
				}
			}
			
			//CommentContent
			for(let elem of child.getElementsByClassName("style-scope ytd-comment-renderer")){
				if(elem.id === "content-text"){
					checkCommentContent(userName, elem.textContent, child);
				}
			}
			
			//Replies
			for(let elem of child.getElementsByClassName("style-scope ytd-comment-replies-renderer")){
				if(elem.id === "loaded-replies"){
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