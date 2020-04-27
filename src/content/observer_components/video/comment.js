const COMMENT_CONFIG = Object.freeze({
	anchorSelector: ["ytd-comment-thread-renderer"],
	characterDataSelectors: {
		commentContent: ["yt-formatted-string#content-text"]
	}
});

const REPLY_COMMENT_CONFIG = Object.freeze({
	anchorSelector: ["ytd-comment-renderer[is-reply]"],
	characterDataSelectors: {
		userChannelName: ["a#author-text", "span"],
		commentContent: ["yt-formatted-string#content-text"]
	}
});

async function onCommentObserved(comment, characterDatas){
	let authorText = $(comment).find("a#author-text")[0];
	let userChannelName;

	if(authorText.hidden){
		/* ASSUMPTION: The user/channel-name of this comment is inside "ytd-author-comment-badge-renderer"-Element,
		because "a#author-text" is hidden.
		This seems to be the case, if the user/channel-name is inside a visual badge.*/

		userChannelName = $(comment).find("yt-formatted-string[class='style-scope ytd-channel-name']")[0].innerText.trim();
	}else{
		userChannelName = $(authorText).find("span")[0].innerText.trim();
	}

	insertBlockBtnBefore(authorText, userChannelName);

	toggleVisibiltyHorizontal(comment, await isCommentContentBlocked(userChannelName, characterDatas.commentContent));
}

async function onReplyCommentObserved(replyComment, characterDatas){
	insertBlockBtnBefore($(replyComment).find("a#author-text")[0], characterDatas.userChannelName);

	toggleVisibiltyHorizontal(replyComment, await isCommentContentBlocked(characterDatas.userChannelName, characterDatas.commentContent));
}
