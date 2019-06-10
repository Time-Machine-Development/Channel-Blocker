//VideoPage filter 3c/8
function VideoPageMetaContentsFilter(target, parent) {
	Filter.call(this, target, parent);
}

VideoPageMetaContentsFilter.prototype = Object.create(Filter.prototype);

VideoPageMetaContentsFilter.prototype.constructor = VideoPageMetaContentsFilter;

VideoPageMetaContentsFilter.prototype.onFound = function(child){
	
	console.log("VideoPageMetaContentsFilter");
	
	
	
	let elements = child.getElementsByClassName("yt-simple-endpoint style-scope yt-formatted-string");
	
		
	if(elements.length > 0){
		console.log("elem");
	
		console.log(elements[0]);
		
		createBtnAtStart(elements[0].parentNode, createBtnNode(elements[0].textContent), child);
	}
};
