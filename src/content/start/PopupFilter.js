//MenuPopup
function PopupFilter(target) {
	Filter.call(this, target);
}

PopupFilter.prototype = Object.create(Filter.prototype);

PopupFilter.prototype.constructor = PopupFilter;

PopupFilter.prototype.onFound = function(child){
	console.log("Popup", child);
	let div = document.createElement("div");
	div.setAttribute("id", "cb_menuButtonDiv");

	let btn = document.createElement("button");
	btn.setAttribute("id", "cb_menuButton");
	btn.setAttribute("type", "button");
	btn.setAttribute("title", "Block this channel with 'Channel Blocker'");

	let txt = document.createTextNode("Block with 'Channel Blocker'");

	btn.appendChild(txt);
	div.appendChild(btn);

	func = function(){
		document.getElementById("contents").click();
		blockUserChannel(curChanelName);
	};
	btn.addEventListener("click", func);

	let items = child.getElementsByClassName("style-scope ytd-menu-popup-renderer")[0];
	if(items.parentNode.firstElementChild.id === "cb_menuButtonDiv"){
		items.parentNode.firstElementChild.remove();
	}
	items.parentNode.insertBefore(div, items);
}
