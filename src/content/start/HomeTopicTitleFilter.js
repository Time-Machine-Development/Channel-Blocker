//HomeTopicTitleFilter 1.Home
function HomeTopicTitleFilter(target, parent, containerParent) {
	this.parent = parent;
	this.containerParent = containerParent;
	Filter.call(this, target, parent, {childList: true});
}

HomeTopicTitleFilter.prototype = Object.create(Filter.prototype);

HomeTopicTitleFilter.prototype.constructor = HomeTopicTitleFilter;

HomeTopicTitleFilter.prototype.onFound = function(child){
	if(child.id === "title"){
		console.log("recomanded-container", child);
		console.log("parent", this.parent);
		console.log("child.textContent", child.textContent);

		console.log("--	elem.parentNode", child.parentNode);
		for(let ch of child.parentNode.children){
			if(ch.id === "image-container"){
				console.log("REMOVE", ch);
				//ch.remove();
			}
		}

		child.style.display = "flex";
		this.parent.reloadFromChild(this.containerParent);
	}
};
