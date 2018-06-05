function CallbackFilter(target, parent, child, obsAttributs) {
	this.mutationObs = new MutationObserver(this.callbackFunc);
	this.mutationObs.filterInst = this;
	let mutationObsOptions = {
		childList: true,
		attributes: false,
		subtree: false
	};
	if(obsAttributs){
		mutationObsOptions.attributes = true;
		mutationObsOptions.subtree = true;
	}
	this.mutationObs.observe(target, mutationObsOptions);
	
	this.callback = parent;
	this.child = child;
	this.target = target;
	
	if(parent !== undefined){
		parent.childFilters.push(this);
	}
}

CallbackFilter.prototype.callbackFunc = function(mutationRecArr, observerInst){
	observerInst.disconnect();
	for(let mutationRecItem of mutationRecArr){
		for(let addedNode of mutationRecItem.addedNodes){
			this.filterInst.callback.reload(this.filterInst.child);
			return;
		}
	}
};

CallbackFilter.prototype.detach = function(){
	this.mutationObs.disconnect();
};