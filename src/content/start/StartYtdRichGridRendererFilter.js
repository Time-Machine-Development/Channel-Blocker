//StartYtdRichGridRendererFilter for HomePage after TrendingPage 2
function StartYtdRichGridRendererFilter(target, parent) {
	Filter.call(this, target, parent);
}

StartYtdRichGridRendererFilter.prototype = Object.create(Filter.prototype);

StartYtdRichGridRendererFilter.prototype.constructor = StartYtdRichGridRendererFilter;

StartYtdRichGridRendererFilter.prototype.onFound = function(child){
	console.log("StartYtdRichGridRendererFilter:", child);
	if(child.id === "contents"){
		console.log("contents:",child);
		new StartContentsFilter(child, this);
	}
};
