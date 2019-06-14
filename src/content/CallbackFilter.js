//Listens for changes of 'target'-node and invokes the reload-function in 'parent'
function CallbackFilter(target, parent, child) {
	//Create a new mutationObserver, witch listens to the childs of 'Target'
	this.mutationObs = new MutationObserver(this.callbackFunc);
	this.mutationObs.filterInst = this;
	let mutationObsOptions = {
		childList: true
	};
	this.mutationObs.observe(target, mutationObsOptions);
	
	this.parent = parent;
	this.child = child;
	this.target = target;
	
	//If this filter is a child of another filter, push it to its childList
	if(parent !== undefined){
		parent.childFilters.push(this);
	}
}

//Register the changes of childNodes and invoke the 'reload()'
CallbackFilter.prototype.callbackFunc = function(mutationRecArr, observerInst){
	observerInst.disconnect();
	for(let mutationRecItem of mutationRecArr){
		for(let addedNode of mutationRecItem.addedNodes){
			this.filterInst.parent.reload(this.filterInst.child);
			return;
		}
	}
};

//Detach the mutationObserver
CallbackFilter.prototype.detach = function(){
	this.mutationObs.disconnect();
};