function SearchPageSectionFilter(target, parent) {
	Filter.call(this, target, parent);
}

SearchPageSectionFilter.prototype = Object.create(Filter.prototype);

SearchPageSectionFilter.prototype.constructor = SearchPageSectionFilter;

SearchPageSectionFilter.prototype.onFound = function(child){
	if(child.id === "contents"){
		console.log("new SearchPageContentFilter");
		console.log(child);
		let searchFilter = new SearchPageContentFilter(child, this);
	}
};
