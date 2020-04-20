const POST_CONFIG = Object.freeze({
	anchorSelector: ["ytd-rich-item-renderer[class='style-scope ytd-rich-shelf-renderer']"],
	characterDataSelectors: {
        commentContent: ["div#post-text[class='style-scope ytd-post-renderer']"],
        userChannelName: ["a#author-text[class='yt-simple-endpoint style-scope ytd-post-renderer']"]
	}
});

async function onPostObserved(item, characterDatas){
	let beforeBlockBtn = $(item).find("div#author-thumbnail[class='style-scope ytd-post-renderer']")[0];

	insertBlockBtnBefore(beforeBlockBtn, characterDatas.userChannelName, undefined);

	toggleVisibilty(item, await isCommentContentBlocked(characterDatas.userChannelName, characterDatas.commentContent));
}