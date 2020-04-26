function createAddBlockedUserMsg(userChannelName){
	return {
		sender: "content_block_button_lib",
		receiver: "background_storage_filter",
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
	path.setAttribute("style", "fill: transparent;stroke-linecap: round;stroke-width: 25;");

	svg.appendChild(path);

	return svg;
}

//creates and returns a block-button and applies (optionally) passed style options style which blocks user/channel-name userChannelName which clicked
function createBlockBtnElement(userChannelName, style){
	let btn = document.createElement("button");
	btn.setAttribute("class", "cb_block_button");
	btn.setAttribute("type", "button");
	btn.setAttribute("title", "Block '" + userChannelName + "' (Channel Blocker)");

	//apply passed style options (if passed)
	if(style !== undefined){
		$.extend(btn.style, style);
	}

	//add new click-event-listener which blocks user/channel-name userChannelName when clicked
	$(btn).on("click", () => {
		browser.runtime.sendMessage(createAddBlockedUserMsg(userChannelName));
		return false;
	});

	btn.appendChild(createBlockBtnSVG());

	return btn;
}

/* inserts or updates block-button with (optionally) passed style options style before Element element which blocks user/channel-name userChannelName which clicked
   NOTE: style is only applied if no block-btn exists previous to element */
function insertBlockBtnBefore(element, userChannelName, style){
	if($(element).prev("button.cb_block_button").length > 0){
		//a block-btn with (possibly) wrong click-event-handler exists because it would block the user/channel-name related to the last call of this function on Element element
		let blockBtn = $(element).prev("button.cb_block_button")[0];

		//update title
		blockBtn.setAttribute("title", "Block '" + userChannelName + "' (Channel Blocker)");

		//remove old click-event-handler
		$(blockBtn).off("click");

		//add new click-event-listener which blocks user/channel-name userChannelName when clicked
		$(blockBtn).on("click", () => {
			browser.runtime.sendMessage(createAddBlockedUserMsg(userChannelName));
			return false;
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
	if($(element).next("button.cb_block_button").length > 0){
		//a block-btn with (possibly) wrong click-event-handler exists because it would block the user/channel-name related to the last call of this function on Element element
		let blockBtn = $(element).next("button.cb_block_button")[0];

		//update title
		blockBtn.setAttribute("title", "Block '" + userChannelName + "' (Channel Blocker)");

		//remove old click-event-handler
		$(blockBtn).off("click");

		//add new click-event-listener which blocks user/channel-name userChannelName when clicked
		$(blockBtn).on("click", () => {
			browser.runtime.sendMessage(createAddBlockedUserMsg(userChannelName));
			return false;
		});
	}else{
		//no block-btn exists

		//create new block-btn
		$(element).after(createBlockBtnElement(userChannelName, style));
	}
}

//adds a new Element with id "cb_style" and updates CSS depending on contentUIConfig (defined in config.js)
function initBlockBtnCSS(){
	//if cb_style Element does not already exist add it to the head
	if(document.getElementById("cb_style") === null){
		let style = document.createElement('style');
		style.id = "cb_style";
		document.head.appendChild(style);
	}

	//set new css rules
	updateBlockBtnCSS();
}

//updates CSS depending on contentUIConfig (defined in config.js)
function updateBlockBtnCSS(){
	//get the cb_style element
	let style = document.getElementById("cb_style");

	//remove all old rules
	while(style.sheet.rules.length > 0){
		style.sheet.deleteRule(0);
	}

	//define width, strokeColor and display depending on contentUIConfig (defined in config.js)
	width = contentUIConfig[ContentUI.BLOCK_BTN_SIZE] * 0.01 + "em";
	strokeColor = contentUIConfig[ContentUI.BLOCK_BTN_COLOR];
	if(contentUIConfig[ContentUI.BLOCK_BTN_VISIBILITY]){
		display = "inline";
	}else{
		display = "none";
	}

	//add the new rules
	style.sheet.insertRule(`
		.cb_block_button {
			padding-left: 0em;
			border: none;
			background-color: Transparent;
			cursor: pointer;
			width: ${width};
			stroke: ${strokeColor};
			display: ${display};
		}
	`);
}
