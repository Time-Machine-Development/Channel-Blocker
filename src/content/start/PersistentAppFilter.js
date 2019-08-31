//PersistentAppFilter for first time trending
function PersistentAppFilter(target, parent) {
	Filter.call(this, target, parent);
}

PersistentAppFilter.prototype = Object.create(Filter.prototype);

PersistentAppFilter.prototype.constructor = PersistentAppFilter;

PersistentAppFilter.prototype.onFound = function(child){
	if(child.tagName === "YTD-BROWSE"){
		console.log("child-found",child);
		let selectList = child.getElementsByClassName("style-scope ytd-two-column-browse-results-renderer");
		console.log("style-scope ytd-two-column-browse-results-renderer",selectList.length);
		for(elem of selectList){
			console.log("selectListelem",elem);
			if(elem.id === "primary"){
				console.log("element",elem);
				new PrimaryFilter(elem, this);
			}
		}
	}
};
