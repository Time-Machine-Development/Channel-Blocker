const VERTICAL_VIDEO_CONFIG = Object.freeze({
    anchorSelector: ["ytd-video-renderer[class='style-scope ytd-vertical-list-renderer']"],
    characterDataSelectors: {
        videoTitle: ["a#video-title[class='yt-simple-endpoint style-scope ytd-video-renderer']"],
        userChannelName: ["a[class='yt-simple-endpoint style-scope yt-formatted-string']"],
    },
});

async function onVerticalSearchVideoObserved(video, characterDatas, characterDataParents) {
    let beforeBlockBtnList = $(video).find("a[class='yt-simple-endpoint style-scope yt-formatted-string']");

    // YouTube added another channelNameATag and kept the old one hidden
    // This might be changed in the future
    for (const beforeBlockBtn of beforeBlockBtnList) {
        insertBlockBtnBefore(beforeBlockBtn, characterDatas.userChannelName);
    }

    toggleVisibiltyHorizontal(
        video,
        await isVideoTitleBlocked(characterDatas.userChannelName, characterDatas.videoTitle),
    );
}
