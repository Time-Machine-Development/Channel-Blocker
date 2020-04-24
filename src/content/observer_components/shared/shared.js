let lastUserChannelNameWhereContextOpened;

async function onVideoObserved(video, characterDatas, characterDataParents){
	insertBlockBtnBefore(characterDataParents.userChannelName, characterDatas.userChannelName);

	$(video).contextmenu(e => {
		console.log("e", characterDatas.userChannelName, e);
		lastUserChannelNameWhereContextOpened = characterDatas.userChannelName;
		console.log("lastUserChannelNameWhereContextOpened", lastUserChannelNameWhereContextOpened);
	});

	toggleVisibilty(video, await isVideoTitleBlocked(characterDatas.userChannelName, characterDatas.videoTitle));

	console.log("lastUserChannelNameWhereContextOpened", lastUserChannelNameWhereContextOpened);
}

{
	const SENDER = "content_observer_components_shared";

	browser.runtime.onMessage.addListener((msg) => {
		console.log("msg", msg);
		if(msg.receiver !== SENDER)
			return;

		if(msg.info === "channelname_request"){
			/* msg.content is of the form:
			undefined
			*/

			if(msg.sender === "background_contextmenu_blocking"){
				console.log("lastUserChannelNameWhereContextOpened", lastUserChannelNameWhereContextOpened);
				return new Promise((resolve) => {
					resolve(lastUserChannelNameWhereContextOpened);
				});
			}
		}
	});
}