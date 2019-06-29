//VideoPage filter 3d/8
function VideoPageChatIFrameFilter(target, parent) {
	Filter.call(this, target, parent, { attributes: true, childList: true, subtree: true });
}

VideoPageChatIFrameFilter.prototype = Object.create(Filter.prototype);

VideoPageChatIFrameFilter.prototype.constructor = VideoPageChatIFrameFilter;

VideoPageChatIFrameFilter.prototype.onFound = function(child){
	console.log("VideoPageChatIFrameFilter", child);
	console.log("getElementsByClassName", child.body);
	for(let item of child.getElementsByClassName("style-scope yt-live-chat-app")){
		console.log("item", item);
		if(item.id = "items"){
			console.log("ITEM--> ", item);
		}
	}
	
	if(child.tagName === "YT-LIVE-CHAT-TEXT-MESSAGE-RENDERER"){
		console.log("ITEM child--> ", child);
		new VideoPageChatIFrameDomFilter(child, this);
	}
	
};

//If the callbackFilter register a change they invoke this function
VideoPageChatIFrameFilter.prototype.reload = function(){
	console.log("reload");
	for(let childElement of this.target.children){
		this.onFound(childElement);
	}
};
