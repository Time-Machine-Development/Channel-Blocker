function VideoPageAppFilter(target, parent) {
	Filter.call(this, target, parent);
}

VideoPageAppFilter.prototype = Object.create(Filter.prototype);

VideoPageAppFilter.prototype.constructor = VideoPageAppFilter;

VideoPageAppFilter.prototype.onFound = function(child){
	if(child.id === "content"){
		for(let elem of child.getElementsByClassName("style-scope ytd-app")){
			if(elem.id === "page-manager"){
				let videoPageManagerFilter = new VideoPageManagerFilter(elem, this);
			}
		}
	}
};
