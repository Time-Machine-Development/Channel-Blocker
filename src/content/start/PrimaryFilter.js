//PrimaryFilter for first time trending 2
function PrimaryFilter(target, parent) {
	Filter.call(this, target, parent);
}

PrimaryFilter.prototype = Object.create(Filter.prototype);

PrimaryFilter.prototype.constructor = PrimaryFilter;

PrimaryFilter.prototype.onFound = function(child){
	for(elem of child.children){
		if(elem.id === "contents"){
			new StartContentFilter(elem, this);
		}
	}
};
