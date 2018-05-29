function VideoPageCommentRepliesFilter(target, parent) {
	this.onFound = function(child){
		
		let userName = undefined;
		
		//UserChannelName of author
		for(let elem of child.getElementsByClassName("yt-simple-endpoint style-scope ytd-comment-renderer")){
			if(elem.id === "author-text"){
				let cFilter = new CallbackFilter(elem, this);
				userName = elem.firstElementChild.textContent;
				
				//insert button to block channel/user
				createBtnAtStart(elem.parentNode, createBtnNode(elem.firstElementChild.textContent.trim()), elem);
			}
		}
		
		//CommentContent
		for(let elem of child.getElementsByClassName("style-scope ytd-comment-renderer")){
			if(elem.id === "content-text"){
				let cFilter = new CallbackFilter(elem, this);
				checkCommentContent(userName, elem.textContent, child);
			}
		}
	}
	
	this.reload = function(){
		console.log("--RELOAD--");
		for(let childElement of this.target.children){
			this.onFoundInit(childElement);
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