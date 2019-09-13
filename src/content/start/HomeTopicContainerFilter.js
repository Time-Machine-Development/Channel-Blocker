//HomeTopicContainerFilter 1.Home
function HomeTopicContainerFilter(target, parent, containerParent) {
	this.parent = parent;
	this.containerParent = containerParent;
	Filter.call(this, target, parent);
}

HomeTopicContainerFilter.prototype = Object.create(Filter.prototype);

HomeTopicContainerFilter.prototype.constructor = HomeTopicContainerFilter;

HomeTopicContainerFilter.prototype.onFound = function(child){
	if(child.id === "scroll-container"){
		new HomeTopicContainerSubFilter(child, this, this.containerParent);
	}
};
