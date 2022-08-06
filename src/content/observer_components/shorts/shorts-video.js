const SHORTS_VIDEO_CONFIG = Object.freeze({
    //anchorSelector: ["div#shorts-inner-container"],
    anchorSelector: ["ytd-reel-video-renderer[class='reel-video-in-sequence style-scope ytd-shorts']"],
    characterDataSelectors: {
        videoTitle: ["yt-formatted-string[class='style-scope ytd-reel-player-header-renderer']"],
        userChannelName: ["a[class='yt-simple-endpoint style-scope yt-formatted-string']"],
    },
});

async function onShortsVideoObserved(video, characterData, characterDataParents) {
    insertBlockBtnBefore(characterDataParents.userChannelName, characterData.userChannelName);

    if (video.nextElementSibling.tagName === "YTD-REEL-VIDEO-RENDERER") {
        toggleVisibiltyHorizontal(
            video,
            await isVideoTitleBlocked(characterData.userChannelName, characterData.videoTitle),
        );
    }
}
