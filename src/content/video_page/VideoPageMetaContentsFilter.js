//VideoPage filter 4c/8
function VideoPageMetaContentsFilter(target, parent) {
	Filter.call(this, target, parent);
}

VideoPageMetaContentsFilter.prototype = Object.create(Filter.prototype);

VideoPageMetaContentsFilter.prototype.constructor = VideoPageMetaContentsFilter;

VideoPageMetaContentsFilter.prototype.onFound = function (child) {
	if(child.id === undefined){
		child = child.parentNode.parentNode;
	}
	//Check if the child is the searched node
	if(child.className === "yt-simple-endpoint style-scope yt-formatted-string"){
		//Get the videoplayer
		let vPlayer = document.getElementsByClassName("style-scope ytd-watch-flexy")[9];
		//Filter the endscreen
		let endscreenNode = vPlayer.getElementsByClassName("ytp-endscreen-content")[0];
		if(endscreenNode !== undefined){
			new EndscreenContentFilter(endscreenNode, this);
		}

		checkUserChannelName(child.textContent, vPlayer, true);
		createBtnAtStart(child.parentNode, createBtnNode(child.textContent), child);

		//set an eventlistenner to the menubar
		for (let elem of child.parentNode.parentNode.parentNode.getElementsByClassName("style-scope ytd-video-primary-info-renderer")) {
			if (elem.id === "menu") {
				new MenuFilter(elem, this, child.textContent);
			}
		}

		return;
	}

	//Seach for the a-tag node (dosen't work for first visit)
	let elements = child.getElementsByClassName("yt-simple-endpoint style-scope yt-formatted-string");

	if (elements.length > 0) {
		new CallbackFilter(elements[0], this, child);

		//Get the videoplayer
		let vPlayer = document.getElementsByClassName("style-scope ytd-watch-flexy")[9];
		//Filter the endscreen
		let endscreenNode = vPlayer.getElementsByClassName("ytp-endscreen-content")[0];
		if(endscreenNode !== undefined){
			new EndscreenContentFilter(endscreenNode, this);
		}

		checkUserChannelName(elements[0].textContent, vPlayer, true);
		createBtnAtStart(elements[0].parentNode, createBtnNode(elements[0].textContent), child);

		//set an eventlistenner to the menubar
		for (let elem of child.parentNode.parentNode.parentNode.getElementsByClassName("style-scope ytd-video-primary-info-renderer")) {
			if (elem.id === "menu") {
				new MenuFilter(elem, this, elements[0].textContent);
			}
		}
	}else{
		//At the first visit of the Videopage this fallback will be used!
		elements = child.getElementsByClassName("style-scope ytd-video-owner-renderer");
		new VideoPageMetaContentsFilter(elements[4], this);
	}
};

//If the callbackFilter register a change they invoke this function
VideoPageMetaContentsFilter.prototype.reload = function(){
	for(let childElement of this.target.children){
		this.onFound(childElement);
	}
};
