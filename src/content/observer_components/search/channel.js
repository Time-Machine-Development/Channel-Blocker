const CHANNEL_CONFIG = Object.freeze({
	anchorSelector: ["ytd-channel-renderer[class='style-scope ytd-item-section-renderer']"],
	characterDataSelectors: {
        userChannelName: ["yt-formatted-string#text[class='style-scope ytd-channel-name']"]
	}
});

async function onChannelObserved(channel, characterDatas){
	let beforeBlockBtn = $(channel).find("div#avatar-section[class='style-scope ytd-channel-renderer']")[0];

	insertBlockBtnBefore(beforeBlockBtn, characterDatas.userChannelName, undefined);

	toggleVisibilty(channel, await isUserChannelNameBlocked(characterDatas.userChannelName));
}