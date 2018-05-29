function SearchPageItemSectionFilter(target, parent) {
	this.onFound = function(child){
		console.log("new SearchPageSectionFilter");
		console.log(child);
		let searchFilter = new SearchPageSectionFilter(child, this);
	}
	
	Filter.call(this, target, parent);
}

SearchPageItemSectionFilter.prototype = Object.create(Filter.prototype);

SearchPageItemSectionFilter.prototype.constructor = SearchPageItemSectionFilter;

SearchPageItemSectionFilter.prototype.onFoundInit = function(child){
	this.onFound(child);
};

SearchPageItemSectionFilter.prototype.onFoundObs = function(child){
	this.onFound(child);
};