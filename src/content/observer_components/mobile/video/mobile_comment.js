
const MOBILE_COMMENT_CONFIG = Object.freeze({
	anchorSelector: ["ytm-comment-thread-renderer[class='section']"],
	characterDataSelectors: {
        userChannelName: ["span[class='comment-title']"],
        commentContent: ["p[class='comment-text user-text']"]
	}
});

async function onMobileCommentObserved(video, characterDatas){
	toggleVisibiltyHorizontal(video, await isCommentContentBlocked(characterDatas.userChannelName, characterDatas.commentContent));
}
