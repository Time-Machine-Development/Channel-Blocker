
const RESPONSE_CONFIG = Object.freeze({
	anchorSelector: ["ytm-comment-renderer"],
	characterDataSelectors: {
        userChannelName: ["span[class='comment-title']"],
        commentContent: ["p[class='comment-text user-text']"]
	}
});

async function onResponseObserved(video, characterDatas){
	toggleVisibiltyHorizontal(video, await isCommentContentBlocked(characterDatas.userChannelName, characterDatas.commentContent));
}
