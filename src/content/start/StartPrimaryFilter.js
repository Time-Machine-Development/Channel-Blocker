//StartPrimaryFilter for HomePage after TrendingPage 1
function StartPrimaryFilter(target, parent) {
	Filter.call(this, target, parent);
}

StartPrimaryFilter.prototype = Object.create(Filter.prototype);

StartPrimaryFilter.prototype.constructor = StartPrimaryFilter;

StartPrimaryFilter.prototype.onFound = function(child){
	if(child.tagName === "YTD-RICH-GRID-RENDERER"){
		new StartYtdRichGridRendererFilter(child, this);
	}
};
