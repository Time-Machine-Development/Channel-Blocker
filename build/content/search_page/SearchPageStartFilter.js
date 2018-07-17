//SearchPage filter 1/4
function SearchPageStartFilter(target, parent) {
	Filter.call(this, target, parent);
}

SearchPageStartFilter.prototype = Object.create(Filter.prototype);

SearchPageStartFilter.prototype.constructor = SearchPageStartFilter;

SearchPageStartFilter.prototype.onFound = function(child){
	if(child.id === "contents"){
		new SearchPageItemSectionFilter(child, this);
	}
};
