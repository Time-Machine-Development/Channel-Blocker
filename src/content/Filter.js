function Filter(target, parent) {
	//Creates an observer to listen to changes of *target*
	this.mutationObs = new MutationObserver(this.callbackFunc);
	this.mutationObs.filterInst = this;
	this.mutationObs.observe(target, {childList: true});

	this.target = target;
	
	//All filter, created by this filter
	this.childFilters = new Array();

	//Invoke the 'onFound()' for all existing childNodes
	for(let childElement of target.children){
		this.onFound(childElement);
	}

	//If this filter is a child of another filter, push it in its childList
	if(parent !== undefined){
		parent.childFilters.push(this);
	}
}

//Overwritable by other filterObjects
Filter.prototype.onFound = function(child){
};

//Register the changes of childNodes and invoke the 'onFound()'
Filter.prototype.callbackFunc = function(mutationRecArr, observerInst){
	console.log("callbackFunc");
	for(let mutationRecItem of mutationRecArr){
		for(let addedNode of mutationRecItem.addedNodes){
			this.filterInst.onFound(addedNode);
		}
	}
};

//Detach the mutationObserver and invoke detach on all childFilter
Filter.prototype.detach = function(){
	this.mutationObs.disconnect();
	for(let filter of this.childFilters){
		filter.detach();
	}
};
