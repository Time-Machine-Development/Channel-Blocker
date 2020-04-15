/* Comment */

const COMMENT_CONFIG = Object.freeze({
	anchorSelector: ["ytd-comment-thread-renderer"],
	characterDataSelectors: {
		commentContent: ["yt-formatted-string#content-text"]
	}
});

const REPLY_COMMENT_CONFIG = Object.freeze({
	anchorSelector: ["ytd-comment-renderer[is-reply]"],
	characterDataSelectors: {
		userChannelName: ["a#author-text", "span"],
		commentContent: ["yt-formatted-string#content-text"]
	}
});

async function onCommentObserved(comment, characterDatas){
	let authorText = $(comment).find("a#author-text")[0];
	let userChannelName;

	if(authorText.hidden){
		/* ASSUMPTION: The user/channel-name of this comment is inside "ytd-author-comment-badge-renderer"-Element,
		because "a#author-text" is hidden.
		This seems to be the case, if the user/channel-name is inside a visual badge.*/

		userChannelName = $(comment).find("yt-formatted-string[class='style-scope ytd-channel-name']")[0].innerText;
	}else{
		userChannelName = $(authorText).find("span")[0].innerText;
	}

	insertBlockBtnBefore(authorText, userChannelName);

	toggleVisibilty(comment, await isCommentContentBlocked(userChannelName, characterDatas.commentContent));
}

async function onReplyCommentObserved(replyComment, characterDatas){
	insertBlockBtnBefore($(replyComment).find("a#author-text")[0], characterDatas.userChannelName);

	toggleVisibilty(replyComment, await isCommentContentBlocked(characterDatas.userChannelName, characterDatas.commentContent));
}


/* Next Autoplay, Video or Playlist */

const NEXT_CHARACTER_DATA_SELECTORS = Object.freeze({
	videoTitle: ["span#video-title"],
	userChannelName: ["yt-formatted-string#text"]
});

const NEXT_AUTOPLAY_CONFIG = Object.freeze({
	anchorSelector: ["ytd-compact-autoplay-renderer[class='style-scope ytd-watch-next-secondary-results-renderer']"],
	characterDataSelectors: NEXT_CHARACTER_DATA_SELECTORS
});

const NEXT_VIDEO_CONFIG = Object.freeze({
	anchorSelector: ["ytd-compact-video-renderer[class='style-scope ytd-watch-next-secondary-results-renderer']"],
	characterDataSelectors: NEXT_CHARACTER_DATA_SELECTORS
});

const NEXT_PLAYLIST_CONFIG = Object.freeze({
	anchorSelector: ["ytd-compact-playlist-renderer[class='style-scope ytd-watch-next-secondary-results-renderer']"],
	characterDataSelectors: NEXT_CHARACTER_DATA_SELECTORS
});

async function onNextObserved(next, characterDatas, characterDataParents, config){
	let beforeBlockBtn;
	if(config === NEXT_AUTOPLAY_CONFIG || config === NEXT_VIDEO_CONFIG){
		beforeBlockBtn = $(next).find("a[class='yt-simple-endpoint style-scope ytd-compact-video-renderer']")[0];
	}else if(config === NEXT_PLAYLIST_CONFIG){
		beforeBlockBtn = $(next).find("a[class='yt-simple-endpoint style-scope ytd-compact-playlist-renderer']")[0];
	}

	insertBlockBtnAfter(beforeBlockBtn, characterDatas.userChannelName, {
		position: "absolute",
		top: "50%",
		right: "0%"
	});

	toggleVisibilty(next, await isVideoTitleBlocked(characterDatas.userChannelName, characterDatas.videoTitle));
}


/* Videowall Video */

const VIDEOWALL_VIDEO_CONFIG = Object.freeze({
	anchorSelector: ["a[class='ytp-videowall-still ytp-suggestion-set']"],
	characterDataSelectors: {
		videoTitle: ["span.ytp-videowall-still-info-title"],
		userChannelName: ["span.ytp-videowall-still-info-author"]
	}
});

async function onVideowallVideoObserved(videowallVideo, characterDatas){
	if(characterDatas.userChannelName === ""){
		//this videowall-video is a Mix, therefore ignore it
		return;
	}

	//extract the user/channel-name by removing the Views-part from characterDatas.userChannelName
	const USER_CHANNEL_NAME_VIEW_SEPERATOR = "•";
	let userChannelNameArray = characterDatas.userChannelName.split(USER_CHANNEL_NAME_VIEW_SEPERATOR);
	userChannelNameArray.pop();

	let userChannelName = userChannelNameArray.join("");

	toggleVisibilty(videowallVideo, await isVideoTitleBlocked(userChannelName, characterDatas.videoTitle));
}


/* Main Video */

const MAIN_VIDEO_CONFIG = Object.freeze({
	anchorSelector: ["div#primary-inner"],
	characterDataSelectors: {
		videoTitle: ["yt-formatted-string[class='style-scope ytd-video-primary-info-renderer']"],
		userChannelName: [
			"div#top-row[class='style-scope ytd-video-secondary-info-renderer']",
			"a[class='yt-simple-endpoint style-scope yt-formatted-string']"
		]
	}
});

async function onMainVideoObserved(mainVideo, characterDatas, characterDataParents){
	//add block-btn
	insertBlockBtnBefore(characterDataParents.userChannelName, characterDatas.userChannelName);

	//(hide and pause) or show player
	let player = $(mainVideo).find("ytd-player")[0];
	if(await isVideoTitleBlocked(characterDatas.userChannelName, characterDatas.videoTitle)){
		$(player).fadeOut("fast");

		$(player).find("video")[0].pause();
	}else{
		$(player).fadeIn("fast");
	}
}


/* Iron Dropdown */

const IRON_DROPDOWN_ANCHOR = Object.freeze({
	tagName: "iron-dropdown",
	classValue: "style-scope ytd-popup-container"
});

function onIronDropdownObserved(ironDropdown){
	$(ironDropdown).find("yt-formatted-string[class='style-scope ytd-menu-service-item-renderer']")[0].innerText = "IRON DROPDOWN";
}



function createVideoPageObservers(){
	let obs = [];

	obs.push(new Observer(COMMENT_CONFIG, onCommentObserved));
	obs.push(new Observer(REPLY_COMMENT_CONFIG, onReplyCommentObserved));

	obs.push(new Observer(NEXT_AUTOPLAY_CONFIG, onNextObserved));
	obs.push(new Observer(NEXT_VIDEO_CONFIG, onNextObserved));
	obs.push(new Observer(NEXT_PLAYLIST_CONFIG, onNextObserved));

	obs.push(new Observer(VIDEOWALL_VIDEO_CONFIG, onVideowallVideoObserved));

	obs.push(new Observer(MAIN_VIDEO_CONFIG, onMainVideoObserved));

	return obs;
}
