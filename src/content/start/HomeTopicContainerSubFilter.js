//HomeTopicContainerSubFilter 1.Home
function HomeTopicContainerSubFilter(target, parent, containerParent) {
	this.parent = parent;
	this.containerParent = containerParent;
	Filter.call(this, target, parent);
}

HomeTopicContainerSubFilter.prototype = Object.create(Filter.prototype);

HomeTopicContainerSubFilter.prototype.constructor = HomeTopicContainerSubFilter;

HomeTopicContainerSubFilter.prototype.onFound = function(child){
	if(child.id === "items"){
		new StartContainerFilter(child, this, this.containerParent);
	}
};
