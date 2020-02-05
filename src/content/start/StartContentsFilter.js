//New StartPage filter 2/2
function StartContentsFilter(target, parent, containerParent) {
	this.parent = parent;
	this.containerParent = containerParent;
	Filter.call(this, target, parent);
}

StartContentsFilter.prototype = Object.create(Filter.prototype);

StartContentsFilter.prototype.constructor = StartContentsFilter;

StartContentsFilter.prototype.onFound = function(child, useCallbackFilter){
	if(child.children[0].className === "style-scope ytd-rich-item-renderer"){
		for(let elem of child.getElementsByClassName("yt-simple-endpoint style-scope ytd-post-renderer")){
			if(elem.id === "author-text"){
				checkCommentContent(elem.textContent.trim(), "", child);
				createBtnAtStart(elem.parentNode.parentNode, createBtnNode(elem.textContent.trim(), true));
				for(let elem2 of child.getElementsByClassName("style-scope ytd-post-renderer")){
					if(elem2.id === "home-content-text"){
						checkCommentContent(elem.textContent.trim(), elem2.textContent, child);
					}
				}
				return;
			}
		}

		let channelATags = child.getElementsByClassName("yt-simple-endpoint style-scope yt-formatted-string");
		let videoTitle = "";
		for(let elem of child.getElementsByTagName("A")){
			if(elem.id === "video-title"){
				videoTitle = elem.textContent;
			}
			if(elem.id === "thumbnail"){
				new ThumbChangeFiler(elem, this, child);
			}
		}

		createBtnAtStart(channelATags[0].parentNode, createBtnNode(channelATags[0].textContent , true));

		checkVideoTitle(channelATags[0].textContent, videoTitle, child);

		//set an eventlistenner to the menubar
		for (let elem of child.getElementsByClassName("style-scope ytd-rich-grid-video-renderer")) {
			if (elem.id == "menu") {
				new MenuFilter(elem, this, channelATags[0].textContent);
			}
		}

		if(child.hidden){
			new HiddenChangeFilter(child, this, child);
		}

	}else{
		for(let elem of child.getElementsByClassName("style-scope ytd-rich-shelf-renderer")){
			if(elem.id === "contents"){
				new StartContentsFilter(elem, this);
			}
		}
	}
};

//If the callbackFilter register a change they invoke this function
//Invokes the 'reloadFromChild()'-function of 'parent'
StartContentsFilter.prototype.reload = function(child){
	this.onFound(child, true);
};
