//VideoPage filter 4/8
function VideoPageContentFilter(target, parent) {
	Filter.call(this, target, parent);
}

VideoPageContentFilter.prototype = Object.create(Filter.prototype);

VideoPageContentFilter.prototype.constructor = VideoPageContentFilter;

VideoPageContentFilter.prototype.onFound = function(child, useCallbackFilter){
	let userName = undefined;
	let isPlaylist = child.tagName === "YTD-COMPACT-PLAYLIST-RENDERER";

	//Found a gridVideo
	//Check the videos and insert buttons
	for(let elem of child.getElementsByClassName("style-scope ytd-channel-name")){

		if(elem.id === "text"){
			userName = elem.textContent;

			//the block button needs to be added on different nodes depending on if this gridVideo is a playlist or not
			//if the username is empty ("") this means it is a playlist generated by yt, so no block btn is created

			if(userName !== ""){
				//insert button to block channel/user..
				if(isPlaylist){
					//.. on playlist gridVideo
					createBtnAfterWithOneCheck(elem.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode, createBtnNode(userName));
				}else{
					//.. on video gridVideo
					let btn = createBtnNode(userName);
					btn.style.position = "absolute";
					btn.style.top = "50%";
					btn.style.right = "0%";
					createBtnAfterWithOneCheck(elem.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode, btn);
					elem.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.width = "90%";
					elem.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = "block";
					elem.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.paddingRight = "0px";
				}
			}

			//Create callbackFilter to listen to changes
			if(useCallbackFilter === undefined){
				new CallbackFilter(elem, this, child);
			}
		}
	}

	//check the videoTitle and userName
	if(isPlaylist){
		for(let elem of child.getElementsByClassName("style-scope ytd-compact-playlist-renderer")){
			if(elem.id === "video-title"){
				checkVideoTitle(userName, elem.textContent, child);
			}
		}
	}else{
		for(let elem of child.getElementsByClassName("style-scope ytd-compact-video-renderer")){
			if(elem.id === "video-title"){
				checkVideoTitle(userName, elem.textContent, child);
			}
		}
	}
};

//If the callbackFilter register a change they invoke this function
VideoPageContentFilter.prototype.reload = function(child){
	if(child === undefined){
		for(let childElement of this.target.children){
			this.onFound(childElement, true);
		}
	}else{
		this.onFound(child, true);
	}
};
