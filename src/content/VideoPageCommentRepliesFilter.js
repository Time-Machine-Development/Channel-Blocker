function VideoPageCommentRepliesFilter(target, parent) {
	this.onFound = function(child){
		
		let userName = undefined;
		
		//UserChannelName of author
		for(let elem of child.getElementsByClassName("yt-simple-endpoint style-scope ytd-comment-renderer")){
			if(elem.id === "author-text"){
				userName = elem.firstElementChild.textContent;
				
				//insert button to block channel/user
				createBtnAtStart(elem.parentNode, createBtnNode(elem.firstElementChild.textContent), elem);
			}
		}
		
		//CommentContent
		for(let elem of child.getElementsByClassName("style-scope ytd-comment-renderer")){
			if(elem.id === "content-text"){
				checkCommentContent(userName, elem.textContent, child);
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