function SearchPageSectionFilter(target, parent) {
	Filter.call(this, target, parent);
}

SearchPageSectionFilter.prototype = Object.create(Filter.prototype);

SearchPageSectionFilter.prototype.constructor = SearchPageSectionFilter;

SearchPageSectionFilter.prototype.onFound = function(child){
	if(child.id === "contents"){
		new SearchPageContentFilter(child, this);
	}
};
