//VideoPage filter 3d/8
function VideoPageChatFrameFilter(target, parent) {
	Filter.call(this, target, parent);
}

VideoPageChatFrameFilter.prototype = Object.create(Filter.prototype);

VideoPageChatFrameFilter.prototype.constructor = VideoPageChatFrameFilter;

function getIFrameContent(iframe) {
	return iframe.contentWindow
	 ? iframe.contentWindow.document
	 : iframe.contentDocument
}

VideoPageChatFrameFilter.prototype.onFound = function (child) {
	try {
		if (child.id === "chatframe") {
			console.log("chatframe", getIFrameContent(child));
			new VideoPageChatIFrameFilter(getIFrameContent(child), this);
		}

		for (let elem of child.children) {
			console.log(elem);
			if (elem.id === "chatframe") {
				console.log("chatframe", getIFrameContent(elem));
				new VideoPageChatIFrameFilter(getIFrameContent(elem), this);
			}
		}
	} catch (e) {
		console.error(e, e.stack);
	}
};

//If the callbackFilter register a change they invoke this function
VideoPageChatFrameFilter.prototype.reload = function () {
	console.log("reload");
	for (let childElement of this.target.children) {
		this.onFound(childElement);
	}
};
