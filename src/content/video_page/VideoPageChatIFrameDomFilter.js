//VideoPage filter 3d/8
function VideoPageChatIFrameDomFilter(target, parent) {
	Filter.call(this, target, parent, { attributes: true, childList: true, subtree: true });
}

VideoPageChatIFrameDomFilter.prototype = Object.create(Filter.prototype);

VideoPageChatIFrameDomFilter.prototype.constructor = VideoPageChatIFrameDomFilter;

function getIFrameContent(iframe) {
	return iframe.contentWindow
	 ? iframe.contentWindow.document
	 : iframe.contentDocument
}

VideoPageChatIFrameDomFilter.prototype.onFound = function(child){
	console.log("VideoPageChatIFrameDomFilter", child);
	for(let item of child.getElementsByClassName("style-scope yt-live-chat-text-message-renderer")){
		if(item.id === "message"){
			console.log("message: ", item);
		}
	}
};

//If the callbackFilter register a change they invoke this function
VideoPageChatIFrameDomFilter.prototype.reload = function(){
	console.log("reload");
	for(let childElement of this.target.children){
		this.onFound(childElement);
	}
};
