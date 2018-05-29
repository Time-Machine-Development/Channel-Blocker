function SearchPageStartFilter(target, parent) {
	this.onFound = function(child){
		if(child.id === "contents"){
			console.log("new SearchPageItemSectionFilter");
			console.log(child);
			let searchFilter = new SearchPageItemSectionFilter(child, this);
		}
	}
	
	Filter.call(this, target, parent);
}

SearchPageStartFilter.prototype = Object.create(Filter.prototype);

SearchPageStartFilter.prototype.constructor = SearchPageStartFilter;

SearchPageStartFilter.prototype.onFoundInit = function(child){
	this.onFound(child);
};

SearchPageStartFilter.prototype.onFoundObs = function(child){
	this.onFound(child);
};