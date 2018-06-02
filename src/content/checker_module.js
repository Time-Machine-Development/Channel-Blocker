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
				
	notifyBackgroundPage(msg, checkedNode);
	return false;
}

function checkVideoTitle(userName, videoTitle, checkedNode){
	let msg = createMsg(userName);
	msg.event.input.additional = {
		type:RegExBlockType.TITLE,
		content:videoTitle.trim()
	};
		
	
	
	notifyBackgroundPage(msg, checkedNode);
	return false;
}

function checkCommentContent(userName, commentContent, checkedNode){
	let msg = createMsg(userName);
	msg.event.input.additional = {
		type:RegExBlockType.COMMENT,
		content:commentContent.trim()
	};
	
	notifyBackgroundPage(msg, checkedNode);
	return false;
}

async function notifyBackgroundPage(msg, checkedNode) {
	
	let sending = await browser.runtime.sendMessage(msg);
	
	try{
		if(sending){
			checkedNode.remove();
		}
	}catch(e){
		console.log(e);
	}
}