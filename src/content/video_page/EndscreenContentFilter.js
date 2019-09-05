//VideoPage filter 4c/8
function EndscreenContentFilter(target, parent) {
	Filter.call(this, target, parent);
}

EndscreenContentFilter.prototype = Object.create(Filter.prototype);

EndscreenContentFilter.prototype.constructor = EndscreenContentFilter;

EndscreenContentFilter.prototype.onFound = function (child) {
	let videoTitle = child.getElementsByClassName("ytp-videowall-still-info-title")[0].textContent;
	let userName = child.getElementsByClassName("ytp-videowall-still-info-author")[0].textContent.split(" •")[0];

	checkVideoTitle(userName, videoTitle, child);
};

//If the callbackFilter register a change they invoke this function
EndscreenContentFilter.prototype.reload = function(){
	for(let childElement of this.target.children){
		this.onFound(childElement);
	}
};
