//DELETE THIS
var debug = false;

function Filter(target, parent) {
	this.mutationObs = new MutationObserver(this.callbackFunc);
	this.mutationObs.filterInst = this;
	this.mutationObs.observe(target, {childList: true});

	this.target = target;

	this.childFilters = new Array();

	for(let childElement of target.children){
		this.onFound(childElement);
	}

	if(parent !== undefined){
		parent.childFilters.push(this);
	}
}

Filter.prototype.onFound = function(child){
};

Filter.prototype.callbackFunc = function(mutationRecArr, observerInst){
	for(let mutationRecItem of mutationRecArr){
		for(let addedNode of mutationRecItem.addedNodes){
			this.filterInst.onFound(addedNode);
		}
	}
};

Filter.prototype.detach = function(){
	this.mutationObs.disconnect();
	for(let filter of this.childFilters){
		filter.detach();
	}
};
