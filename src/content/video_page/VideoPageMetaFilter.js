//VideoPage filter 3c/8
function VideoPageMetaFilter(target, parent) {
	Filter.call(this, target, parent);
}

VideoPageMetaFilter.prototype = Object.create(Filter.prototype);

VideoPageMetaFilter.prototype.constructor = VideoPageMetaFilter;

VideoPageMetaFilter.prototype.onFound = function(child){
	
	console.log("VideoPageMetaFilter");
	
	
	for(var elem of child.children){
		if(elem.id === "meta-contents"){
			console.log("meta");
			new VideoPageMetaContentsFilter(elem, this);
		}
	}
	
	
	
	let elements = child.getElementsByClassName("yt-simple-endpoint style-scope yt-formatted-string");
	
		
	if(elements.length > 0){
		console.log("elem");
	
		console.log(elements[0]);
		
		createBtnAtStart(elements[0], createBtnNode(elements[0].textContent), elements[0]);
	}
};
