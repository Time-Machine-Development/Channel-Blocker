
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
		msg.additional = {
			type:RegExBlockType.TITLE,
			content:videoTitle.trim()
		};
					
		if(consoleLog)
			console.log("Title: " + videoTitle.trim());
		
		
		notifyBackgroundPage(msg, checkedNode);
		return false;
	}
	
	function checkCommentContent(name, commentContent, checkedNode){
		let msg = createMsg(userName);
		msg.additional = {
			type:RegExBlockType.COMMENT,
			content:commentContent.trim()
		};
			
		if(consoleLog)
			console.log("Comment: " + commentContent);
		
		notifyBackgroundPage(msg);
		return false;
	}
	
	async function notifyBackgroundPage(msg, checkedNode) {
		let sending = await browser.runtime.sendMessage(msg);
		
		if(sending){
			checkedNode.remove();
			if(consoleLog)
				console.log("Blocked " + checkValues.title + " by " + checkValues.name + "  -> " + checkValues.comment);
		}
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	