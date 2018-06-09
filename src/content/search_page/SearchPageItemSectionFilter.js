//SearchPage filter 2/4
function SearchPageItemSectionFilter(target, parent) {
	Filter.call(this, target, parent);
}

SearchPageItemSectionFilter.prototype = Object.create(Filter.prototype);

SearchPageItemSectionFilter.prototype.constructor = SearchPageItemSectionFilter;

SearchPageItemSectionFilter.prototype.onFound = function(child){
	new SearchPageSectionFilter(child, this);
};
