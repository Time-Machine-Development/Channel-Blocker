function SearchPageStartFilter(target, parent) {
	Filter.call(this, target, parent);
}

SearchPageStartFilter.prototype = Object.create(Filter.prototype);

SearchPageStartFilter.prototype.constructor = SearchPageStartFilter;

SearchPageStartFilter.prototype.onFound = function(child){
	if(child.id === "contents"){
		console.log("new SearchPageItemSectionFilter");
		console.log(child);
		let searchFilter = new SearchPageItemSectionFilter(child, this);
	}
};
