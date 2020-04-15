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

//creates and returns a block-button and applies (optionally) passed style options style which blocks user/channel-name userChannelName which clicked
function createBlockBtnElement(userChannelName, style){
	let btn = document.createElement("button");
	btn.setAttribute("class", "cb_button");
	btn.setAttribute("type", "button");
	btn.setAttribute("title", "Block '" + userChannelName + "' (Channel Blocker)");
	btn.setAttribute("style", "padding-left:0em; border:none; background-color:Transparent; cursor:pointer; width:" + 1.4 + "em");

	//apply passed style options (if passed)
	if(style !== undefined){
		$.extend(btn.style, style);
	}

	//add new click-event-listener which blocks user/channel-name userChannelName when clicked
	$(btn).on("click", () => {
		console.log("test");
		browser.runtime.sendMessage(createAddBlockedUserMsg(userChannelName));
	});

	btn.appendChild(createBlockBtnSVG());

	return btn;
}

/* inserts or updates block-button with (optionally) passed style options style before Element element which blocks user/channel-name userChannelName which clicked
   NOTE: style is only applied if no block-btn exists previous to element */
function insertBlockBtnBefore(element, userChannelName, style){
	if($(element).prev("button.cb_button").length > 0){
		//a block-btn with (possibly) wrong click-event-handler exists because it would block the user/channel-name related to the last call of this function on Element element
		let blockBtn = $(element).prev("button.cb_button")[0];

		//update title
		blockBtn.setAttribute("title", "Block '" + userChannelName + "' (Channel Blocker)");

		//remove old click-event-handler
		$(blockBtn).off("click");

		//add new click-event-listener which blocks user/channel-name userChannelName when clicked
		$(blockBtn).on("click", () => {
			browser.runtime.sendMessage(createAddBlockedUserMsg(userChannelName));
		});
	}else{
		//no block-btn exists

		//create new block-btn
		$(element).before(createBlockBtnElement(userChannelName, style));
	}
}

/* inserts or updates block-button with (optionally) passed style options style after Element element which blocks user/channel-name userChannelName which clicked
   NOTE: style is only applied if no block-btn exists next to element */
function insertBlockBtnAfter(element, userChannelName, style){
	if($(element).next("button.cb_button").length > 0){
		//a block-btn with (possibly) wrong click-event-handler exists because it would block the user/channel-name related to the last call of this function on Element element
		let blockBtn = $(element).next("button.cb_button")[0];

		//update title
		blockBtn.setAttribute("title", "Block '" + userChannelName + "' (Channel Blocker)");

		//remove old click-event-handler
		$(blockBtn).off("click");

		//add new click-event-listener which blocks user/channel-name userChannelName when clicked
		$(blockBtn).on("click", () => {
			browser.runtime.sendMessage(createAddBlockedUserMsg(userChannelName));
		});
	}else{
		//no block-btn exists

		//create new block-btn
		$(element).after(createBlockBtnElement(userChannelName, style));
	}
}
