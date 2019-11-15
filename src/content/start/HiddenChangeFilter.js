function HiddenChangeFilter(target, parent, reloadTarget) {
	//Creates an observer to listen to changes of *target*
	this.mutationObs = new MutationObserver(this.callbackFunc);
	this.mutationObs.filterInst = this;
	this.mutationObs.observe(target, {
	  attributeFilter: [ "hidden" ],
	  attributes: true
	});

	this.target = target;
	this.parent = parent;
	this.reloadTarget = reloadTarget;


	//If this filter is a child of another filter, push it in its childList
	if(parent !== undefined){
		parent.childFilters.push(this);
	}
}

//Register the changes of the attributes and invoke the 'reload()'
HiddenChangeFilter.prototype.callbackFunc = function(mutationRecArr, observerInst){
	this.filterInst.parent.reload(this.filterInst.reloadTarget);
};

//Detach the mutationObserver and invoke detach on all childFilter
HiddenChangeFilter.prototype.detach = function(){
	this.mutationObs.disconnect();
};
