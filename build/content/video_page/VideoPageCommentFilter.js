//VideoPage filter 7/8
function VideoPageCommentFilter(target, parent) {
	Filter.call(this, target, parent);
}

VideoPageCommentFilter.prototype = Object.create(Filter.prototype);

VideoPageCommentFilter.prototype.constructor = VideoPageCommentFilter;

VideoPageCommentFilter.prototype.onFound = function(child, useCallbackFilter){

	let userName = undefined;

	//UserChannelName of author
	for(let elem of child.getElementsByClassName("yt-simple-endpoint style-scope ytd-comment-renderer")){
		if(elem.id === "author-text"){
			//Create callbackFilter to listen to changes
			if(useCallbackFilter === undefined){
				new CallbackFilter(elem, this, child);
			}
			userName = elem.firstElementChild.textContent;
			//insert button to block channel/user
			createBtnAtStart(elem.parentNode, createBtnNode(elem.firstElementChild.textContent.trim()), elem);
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
			new VideoPageCommentRepliesFilter(elem, this);
		}
	}


};

//If the callbackFilter register a change they invoke this function
VideoPageCommentFilter.prototype.reload = function(child){
	this.onFound(child, true);
};
