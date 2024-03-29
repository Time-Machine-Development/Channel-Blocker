const CHANNEL_CONFIG = Object.freeze({
	anchorSelector: ["ytd-channel-renderer[class='style-scope ytd-item-section-renderer']"],
	characterDataSelectors: {
        userChannelName: ["yt-formatted-string#text[class='style-scope ytd-channel-name']"]
	}
});

async function onChannelObserved(channel, characterDatas){
	let beforeBlockBtn = $(channel).find("div#text-container[class='style-scope ytd-channel-name']")[0];

	insertBlockBtnBefore(beforeBlockBtn, characterDatas.userChannelName);

	toggleVisibiltyHorizontal(channel, await isUserChannelNameBlocked(characterDatas.userChannelName));
}
