const SHORTS_VIDEO_CONFIG = Object.freeze({
    //anchorSelector: ["div#shorts-inner-container"],
    anchorSelector: ["ytd-reel-video-renderer[class='reel-video-in-sequence style-scope ytd-shorts']"],
    characterDataSelectors: {
        videoTitle: ["yt-formatted-string[class='style-scope ytd-reel-player-header-renderer']"],
        userChannelName: ["a[class='yt-simple-endpoint style-scope yt-formatted-string']"],
    },
});

async function onShortsVideoObserved(channel, characterData) {
    console.log("channel", channel);
    console.log("characterData.userChannelName", characterData.userChannelName);
    let beforeBlockBtn = $(channel).find("div#text-container[class='style-scope ytd-channel-name']")[0];

    console.log("beforeBlockBtn", beforeBlockBtn);
    insertBlockBtnBefore(beforeBlockBtn, characterData.userChannelName);

    toggleVisibiltyHorizontal(channel, await isUserChannelNameBlocked(characterDatas.userChannelName));
}
