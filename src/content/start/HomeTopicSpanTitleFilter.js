//HomeTopicSpanTitleFilter 1.Home
function HomeTopicSpanTitleFilter(target, parent, containerParent) {
	this.parent = parent;
	this.containerParent = containerParent;
	Filter.call(this, target, parent, {childList: true});
}

HomeTopicSpanTitleFilter.prototype = Object.create(Filter.prototype);

HomeTopicSpanTitleFilter.prototype.constructor = HomeTopicSpanTitleFilter;

HomeTopicSpanTitleFilter.prototype.onFound = function(child){
	if(child.id === "image-container"){
		console.log("container", child);
		console.log("parent", this.parent);
		console.log("child.textContent", child.textContent);

		console.log("--	elem.parentNode", child.parentNode);
		for(let ch of child.parentNode.children){
			if(ch.id === "title"){
				console.log("REMOVE", ch);
				//ch.remove();
			}
		}

		child.style.display = "flex";
		this.parent.reloadFromChild(this.containerParent);
	}
};
