//VideoPage filter 3d/8
function VideoPageChatFrameFilter(target, parent) {
	Filter.call(this, target, parent);
}

VideoPageChatFrameFilter.prototype = Object.create(Filter.prototype);

VideoPageChatFrameFilter.prototype.constructor = VideoPageChatFrameFilter;

VideoPageChatFrameFilter.prototype.onFound = function(child){
	
	for(let elem of child.children){
		console.log(elem);
		if(elem.id === "chat"){
			console.log("chat");
			var inside = elem.contents();
			console.log(inside);
		}
	}
};

//If the callbackFilter register a change they invoke this function
VideoPageChatFrameFilter.prototype.reload = function(){
	for(let childElement of this.target.children){
		this.onFound(childElement);
	}
};
