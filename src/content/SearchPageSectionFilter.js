function SearchPageSectionFilter(target, parent) {
	this.onFound = function(child){
		if(child.id === "contents"){
			console.log("new SearchPageContentFilter");
			console.log(child);
			let searchFilter = new SearchPageContentFilter(child, this);
		}
	}
	
	Filter.call(this, target, parent);
}

SearchPageSectionFilter.prototype = Object.create(Filter.prototype);

SearchPageSectionFilter.prototype.constructor = SearchPageSectionFilter;

SearchPageSectionFilter.prototype.onFoundInit = function(child){
	this.onFound(child);
};

SearchPageSectionFilter.prototype.onFoundObs = function(child){
	this.onFound(child);
};