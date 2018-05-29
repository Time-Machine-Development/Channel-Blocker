var consoleLog = true;

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

function checkUserChannelName(userName, checkedNode){
	let msg = createMsg(userName);
				
	if(consoleLog)
		console.log("Name: " + userName.trim());
	
	notifyBackgroundPage(msg, checkedNode);
	return false;
}

function checkVideoTitle(userName, videoTitle, checkedNode){
	let msg = createMsg(userName);
	msg.event.input.additional = {
		type:RegExBlockType.TITLE,
		content:videoTitle.trim()
	};
				
	if(consoleLog){
		console.log("Title: " + videoTitle.trim());
		console.log(msg);
	}
	
	
	notifyBackgroundPage(msg, checkedNode);
	return false;
}

function checkCommentContent(userName, commentContent, checkedNode){
	let msg = createMsg(userName);
	msg.event.input.additional = {
		type:RegExBlockType.COMMENT,
		content:commentContent.trim()
	};
		
	if(consoleLog)
		console.log("Comment: " + commentContent);
	
	notifyBackgroundPage(msg, checkedNode);
	return false;
}

async function notifyBackgroundPage(msg, checkedNode) {
	
	let sending = await browser.runtime.sendMessage(msg);
	
	if(consoleLog)console.log(sending);
	
	if(sending){
		if(consoleLog)console.log(msg.event.input.name);
	}else{
		if(consoleLog)console.log(msg.event.input.name);
	}
	
	try{
		if(sending){
			checkedNode.remove();
			if(consoleLog)
				console.log("Blocked " + checkValues.title + " by " + checkValues.name + "  -> " + checkValues.comment);
		}
	}catch(e){
		console.log(e);
	}
}