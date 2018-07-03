//HelperFunction to create the raw message for the background_controller_storage, to check a userName, title or comment
function createMsg(userName){
	return{
		sender: "content_checker_module",
		receiver: "background_controller_storage",
		"event": {
			type: "check_content",
			input: {
				name:userName,
			}
		}
	}
}

//Edit the message and send it to the background_controller_storage
function checkUserChannelName(userName, checkedNode){
	let msg = createMsg(userName);
				
	notifyBackgroundPage(msg, checkedNode);
	return false;
}

//Edit the message and send it to the background_controller_storage
function checkVideoTitle(userName, videoTitle, checkedNode){
	let msg = createMsg(userName);
	msg.event.input.additional = {
		type:RegExBlockType.TITLE,
		content:videoTitle.trim()
	};
	
	notifyBackgroundPage(msg, checkedNode);
	return false;
}

//Edit the message and send it to the background_controller_storage
function checkCommentContent(userName, commentContent, checkedNode){
	let msg = createMsg(userName);
	msg.event.input.additional = {
		type:RegExBlockType.COMMENT,
		content:commentContent.trim()
	};
	
	notifyBackgroundPage(msg, checkedNode);
	return false;
}

//send a message to background_controller_storage, to check a userName, title or comment
//returns true when userName, title or comment is blocked
async function notifyBackgroundPage(msg, checkedNode) {
	
	let sending = await browser.runtime.sendMessage(msg);
	
	try{
		if(sending){
			//Remove the node form webPage
			//checkedNode.remove();
			checkedNode.id = "blocked";
			checkedNode.style["display"] = "none";
		}else{
			if(checkedNode.id === "blocked")
			checkedNode.style["display"] = "";
			checkedNode.id = "unblocked";
		}
	}catch(e){
		console.log(e);
	}
}