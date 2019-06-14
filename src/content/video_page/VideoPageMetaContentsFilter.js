//VideoPage filter 4c/8
function VideoPageMetaContentsFilter(target, parent) {
	Filter.call(this, target, parent);
}

VideoPageMetaContentsFilter.prototype = Object.create(Filter.prototype);

VideoPageMetaContentsFilter.prototype.constructor = VideoPageMetaContentsFilter;

VideoPageMetaContentsFilter.prototype.onFound = function (child) {
	
	let elements = child.getElementsByClassName("yt-simple-endpoint style-scope yt-formatted-string");

	if (elements.length > 0) {
		new CallbackFilter(elements[0], this, child);
		
		let vPlayer = document.getElementsByClassName("style-scope ytd-watch-flexy")[9];
		try{
			checkUserChannelName(elements[0].textContent, vPlayer, true);
			
			createBtnAtStart(elements[0].parentNode, createBtnNode(elements[0].textContent), child);
		}catch(e){
			console.error(e,e.stack);
		}
	}
};

//If the callbackFilter register a change they invoke this function
VideoPageMetaContentsFilter.prototype.reload = function(){
	for(let childElement of this.target.children){
		this.onFound(childElement);
	}
};
