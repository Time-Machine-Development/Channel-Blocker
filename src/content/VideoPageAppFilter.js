function VideoPageAppFilter(target, parent) {
	this.onFound = function(child){
		if(child.id === "content"){
			for(let elem of child.getElementsByClassName("style-scope ytd-app")){
				if(elem.id === "page-manager"){
					let videoPageManagerFilter = new VideoPageManagerFilter(elem, this);
				}
			}
		}
		
	}
	
	Filter.call(this, target, parent);
}

VideoPageAppFilter.prototype = Object.create(Filter.prototype);

VideoPageAppFilter.prototype.constructor = VideoPageAppFilter;

VideoPageAppFilter.prototype.onFoundInit = function(child){
	this.onFound(child);
};

VideoPageAppFilter.prototype.onFoundObs = function(child){
	this.onFound(child);
};