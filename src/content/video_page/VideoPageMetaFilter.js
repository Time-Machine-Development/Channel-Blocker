//VideoPage filter 3c/8
function VideoPageMetaFilter(target, parent) {
	Filter.call(this, target, parent);
}

VideoPageMetaFilter.prototype = Object.create(Filter.prototype);

VideoPageMetaFilter.prototype.constructor = VideoPageMetaFilter;

VideoPageMetaFilter.prototype.onFound = function(child){
	
	for(var elem of child.children){
		if(elem.id === "meta-contents"){
			new VideoPageMetaContentsFilter(elem, this);
		}
	}
};

//If the callbackFilter register a change they invoke this function
VideoPageMetaFilter.prototype.reload = function(){
	for(let childElement of this.target.children){
		this.onFound(childElement);
	}
};
