//VideoPage filter 8/8
function VideoPageCommentRepliesFilter(target, parent) {
	Filter.call(this, target, parent);
}

VideoPageCommentRepliesFilter.prototype = Object.create(Filter.prototype);

VideoPageCommentRepliesFilter.prototype.constructor = VideoPageCommentRepliesFilter;

VideoPageCommentRepliesFilter.prototype.onFound = function(child){

	let userName = undefined;

	//UserChannelName of author
	for(let elem of child.getElementsByClassName("yt-simple-endpoint style-scope ytd-comment-renderer")){
		if(elem.id === "author-text"){
			//Create callbackFilter to listen to changes
			new CallbackFilter(elem, this);
			userName = elem.firstElementChild.textContent;

			//insert button to block channel/user
			createBtnAtStart(elem.parentNode, createBtnNode(elem.firstElementChild.textContent.trim()), elem);
		}
	}

	//CommentContent
	for(let elem of child.getElementsByClassName("style-scope ytd-comment-renderer")){
		if(elem.id === "content-text"){
			new CallbackFilter(elem, this);
			checkCommentContent(userName, elem.textContent, child);
		}
	}
};

//If the callbackFilter register a change they invoke this function
VideoPageCommentRepliesFilter.prototype.reload = function(){
	for(let childElement of this.target.children){
		this.onFound(childElement);
	}
};
