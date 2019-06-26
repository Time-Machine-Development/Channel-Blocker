//VideoPage filter 3d/8
function VideoPageChatIFrameFilter(target, parent) {
	Filter.call(this, target, parent);
}

VideoPageChatIFrameFilter.prototype = Object.create(Filter.prototype);

VideoPageChatIFrameFilter.prototype.constructor = VideoPageChatIFrameFilter;

VideoPageChatIFrameFilter.prototype.onFound = function(child){
	console.log("VideoPageChatIFrameFilter", child);
	for(let item of elem.getElementsByClassName("style-scope yt-live-chat-item-list-renderer")){
			console.log("items", item);
		if(item.id === "items"){
			console.log("items", item);
		}
	}
};

//If the callbackFilter register a change they invoke this function
VideoPageChatIFrameFilter.prototype.reload = function(){
	console.log("reload");
	for(let childElement of this.target.children){
		this.onFound(childElement);
	}
};
