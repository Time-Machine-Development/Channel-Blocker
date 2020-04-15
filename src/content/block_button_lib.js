function createAddBlockedUserMsg(userChannelName){
	return {
		sender: "content_block_button_lib",
		receiver: "background_filter_storage",
		info: "add_blocked_user",
		content: {
			user_channel_name: userChannelName
		}
	};
}

//generates the SVG of a block-btn
function createBlockBtnSVG(){
	let svgURI = "http://www.w3.org/2000/svg";
	let svg = document.createElementNS(svgURI, "svg");

	svg.setAttribute("viewBox", "0 0 100 100");

	let path = document.createElementNS(svgURI, "path");
	path.setAttribute("d", "M 15,15 L 85,85 M 85,15 L 15,85");
	path.setAttribute("style", "stroke: #717171;fill: transparent;stroke-linecap: round;stroke-width: 25;");

	svg.appendChild(path);

	return svg;
}

//creates and returns a block-button which blocks user/channel-name userChannelName when pressed
function createBlockBtnElement(userChannelName){
	let btn = document.createElement("button");
	btn.setAttribute("class", "cb_button");
	btn.setAttribute("type", "button");
	btn.setAttribute("title", "Block '" + userChannelName + "' (Channel Blocker)");
	btn.setAttribute("style", "padding-left:0em; border:none; background-color:Transparent; cursor:pointer; width:" + 1.4 + "em");
	btn.addEventListener("click", () => {
		browser.runtime.sendMessage(createAddBlockedUserMsg(userChannelName));
	});

	btn.appendChild(createBlockBtnSVG());

	return btn;
}
