const VIDEO_CONTAINER_CONFIG = Object.freeze({
	anchorSelector: ["ytd-item-section-renderer[class='style-scope ytd-section-list-renderer']"],
	characterDataSelectors: {
        userChannelName: ["div#title-text[class='style-scope ytd-shelf-renderer']"]
	}
});

async function onVideoContainerObserved(videoContainer, characterDatas, characterDataParents){
    insertBlockBtnAfter(characterDataParents.userChannelName, characterDatas.userChannelName, {
        paddingLeft: "8px",
        paddingRight: "0",
    });

	toggleVisibiltyHorizontal(videoContainer, await isUserChannelNameBlocked(characterDatas.userChannelName));
}
