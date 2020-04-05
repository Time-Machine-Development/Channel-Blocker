function toggleVisibilty(element, isBlocked){
	if(isBlocked !== $(element).is(":hidden")){
		$(element).toggle("fast");
	}
}

function insertBefore(element, blockBtn){
	$(element).prev("button.cb_button").remove();

	$(element).before(blockBtn);
}

function insertAfter(element, blockBtn){
	$(element).next("button.cb_button").remove();

	$(element).after(blockBtn);
}

/* Comment */

const COMMENT_CONFIG = Object.freeze({
	anchorSelector: "ytd-comment-renderer",
	characterDataSelectors: {
		commentContent: ["yt-formatted-string#content-text"]
	}
});

async function onCommentObserved(comment, characterDatas){
	let userChannelName;
	let afterBlockBtn;
	let hideElement;

	let authorText = $(comment).find("a#author-text")[0];

	if(authorText.hidden){
		//this comment does not display the name of the writer inside a#author-text
		//assume this comment is pinned by the channel of the main video

		//userChannelName = $(comment).find("yt-formatted-string[class='style-scope ytd-channel-name']")[0].innerHTML.trim();
		//afterBlockBtn;

		return;
	}else{
		/* this comment displays the name of the writer inside a#author-text
		therefore it is a normal comment or a reply-comment */

		let isReplyComment = ($(comment).parent("div#loaded-replies").length > 0) ? true : false;

		if(isReplyComment){
			hideElement = comment;
		}else{
			hideElement = $(comment).parent("ytd-comment-thread-renderer")[0];
		}

		userChannelName = $(authorText).find("span")[0].innerHTML.trim();
		afterBlockBtn = authorText;
	}

	let blockBtn = createBtnNode(userChannelName);

	insertBefore(afterBlockBtn, blockBtn);

	console.log(hideElement);

	toggleVisibilty(hideElement, await checkCommentContent(userChannelName, characterDatas.commentContent));
}


/* Next Autoplay, Video or Playlist */

const NEXT_CHARACTER_DATA_SELECTORS = Object.freeze({
	videoTitle: ["span#video-title"],
	userChannelName: ["yt-formatted-string#text"]
});

const NEXT_AUTOPLAY_CONFIG = Object.freeze({
	anchorSelector: "ytd-compact-autoplay-renderer[class='style-scope ytd-watch-next-secondary-results-renderer']",
	characterDataSelectors: NEXT_CHARACTER_DATA_SELECTORS
});

const NEXT_VIDEO_CONFIG = Object.freeze({
	anchorSelector: "ytd-compact-video-renderer[class='style-scope ytd-watch-next-secondary-results-renderer']",
	characterDataSelectors: NEXT_CHARACTER_DATA_SELECTORS
});

const NEXT_PLAYLIST_CONFIG = Object.freeze({
	anchorSelector: "ytd-compact-playlist-renderer[class='style-scope ytd-watch-next-secondary-results-renderer']",
	characterDataSelectors: NEXT_CHARACTER_DATA_SELECTORS
});

async function onNextObserved(next, characterDatas){
	let beforeBlockBtn;
	if($(next).is(NEXT_AUTOPLAY_CONFIG.anchorSelector) || $(next).is(NEXT_VIDEO_CONFIG.anchorSelector)){
		beforeBlockBtn = $(next).find("a[class='yt-simple-endpoint style-scope ytd-compact-video-renderer']")[0];
	}else if($(next).is(NEXT_PLAYLIST_CONFIG.anchorSelector)){
		beforeBlockBtn = $(next).find("a[class='yt-simple-endpoint style-scope ytd-compact-playlist-renderer']")[0];
	}

	let blockBtn = createBtnNode(characterDatas.userChannelName);
	blockBtn.style.position = "absolute";
	blockBtn.style.top = "50%";
	blockBtn.style.right = "0%";

	insertAfter(beforeBlockBtn, blockBtn);

	toggleVisibilty(next, await checkVideoTitle(characterDatas.userChannelName, characterDatas.videoTitle));
}


/* Endscreen Next Video */

const ENDSCREEN_NEXT_VIDEO_ANCHOR = Object.freeze({
	tagName: "a",
	classValue: "ytp-videowall-still ytp-suggestion-set"
});

function onEndscreenNextVideoObserved(nextVideo){
	$(nextVideo).find("span.ytp-videowall-still-info-title")[0].innerHTML = "VIDEO TITLE";
	$(nextVideo).find("span.ytp-videowall-still-info-author")[0].innerHTML = "CHANNEL NAME";
}


/* Iron Dropdown */

const IRON_DROPDOWN_ANCHOR = Object.freeze({
	tagName: "iron-dropdown",
	classValue: "style-scope ytd-popup-container"
});

function onIronDropdownObserved(ironDropdown){
	$(ironDropdown).find("yt-formatted-string[class='style-scope ytd-menu-service-item-renderer']")[0].innerHTML = "IRON DROPDOWN";
}


/* PRIMARY INFO */

const PRIMARY_INFO_ANCHOR = Object.freeze({
	tagName: "ytd-video-primary-info-renderer",
	classValue: "style-scope ytd-watch-flexy"
});

function onPrimaryInfoObserved(primaryInfo){
	$(primaryInfo).find("yt-formatted-string[class='style-scope ytd-video-primary-info-renderer']")[0].innerHTML = "MAIN VIDEO TITLE";
}


/* SECONDARY INFO */


const SECONDARY_INFO_ANCHOR = Object.freeze({
	tagName: "ytd-video-secondary-info-renderer",
	classValue: "style-scope ytd-watch-flexy"
});

function onSecondaryInfoObserved(secondaryInfo){
	$(secondaryInfo).find("a[class='yt-simple-endpoint style-scope yt-formatted-string']")[0].innerHTML = "MAIN CHANNEL NAME";
}



function createVideoPageObservers(){
	let obs = [];

	obs.push(new Observer(COMMENT_CONFIG, onCommentObserved));

	//obs.push(new Observer(NEXT_AUTOPLAY_CONFIG, onNextObserved));
	//obs.push(new Observer(NEXT_VIDEO_CONFIG, onNextObserved));
	//obs.push(new Observer(NEXT_PLAYLIST_CONFIG, onNextObserved));

	return obs;
}
