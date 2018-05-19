function CallbackFilter(target, parent) {
	this.mutationObs = new MutationObserver(this.callbackFunc);
	this.mutationObs.filterInst = this;
	let mutationObsOptions = {
		childList: true,
		attributes: true,
		subtree: true
	};
	this.mutationObs.observe(target, mutationObsOptions);
	
	this.callback = parent;
	this.target = target;
	
	if(parent !== undefined){
		parent.childFilters.push(this);
	}
}

CallbackFilter.prototype.callbackFunc = function(mutationRecArr, observerInst){
	this.filterInst.callback.reload();
};

CallbackFilter.prototype.detach = function(){
	this.mutationObs.disconnect();
};