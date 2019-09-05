//PersistentAppFilter for first time trending
function PersistentAppFilter(target, parent) {
	Filter.call(this, target, parent);
}

PersistentAppFilter.prototype = Object.create(Filter.prototype);

PersistentAppFilter.prototype.constructor = PersistentAppFilter;

PersistentAppFilter.prototype.onFound = function(child){
	if(child.tagName === "YTD-BROWSE"){
		let selectList = child.getElementsByClassName("style-scope ytd-two-column-browse-results-renderer");
		for(elem of selectList){
			if(elem.id === "primary"){
				new PrimaryFilter(elem, this);
			}
		}
	}
};
