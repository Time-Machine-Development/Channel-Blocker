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
			console.log("chatframe", child);
			child.addEventListener("load", function() {
				console.log("load");
				new VideoPageChatIFrameFilter(getIFrameContent(child), this);
			});
		}

		if(child.hasChildNodes()){
			for (let elem of child.children) {
				if (elem.id === "chatframe") {
					console.log("chatframe", elem);
					elem.addEventListener("load", function() {
						console.log("load");
						new VideoPageChatIFrameFilter(getIFrameContent(elem), this);
					});
				}
			}
		}
	} catch (e) {
		console.error(e, e.stack);
	}
};

//If the callbackFilter register a change they invoke this function
VideoPageChatFrameFilter.prototype.reload = function () {
	for (let childElement of this.target.children) {
		this.onFound(childElement);
	}
};
