function createContextmenuUpdateMsg(userChannelName){
    return {
        sender: "content_contextmenu_blocking",
        receiver: "background_contextmenu_blocking",
        info: "contextmenu_update",
        content: {
            user_channel_name: userChannelName
        }
    };
}

function createContextmenuResetMsg(){
    return {
        sender: "content_contextmenu_blocking",
        receiver: "background_contextmenu_blocking",
        info: "contextmenu_reset"
    };
}

//send a ContextmenuResetMsg when right clicking on no channel element
$(document).mousedown(async function(e){
    if(e.which === 3){
        await browser.runtime.sendMessage(createContextmenuResetMsg());
    }
});

function addContextmenuListener(element, userChannelName){
    //reset all listener
    $(element).off("contextmenu");
    $(element).off("mousedown");
    //stop the mousedown-event from bubbling up the dom when right clicked
    $(element).mousedown(function(e){
        //right click
        if(e.which === 3){
            e.stopPropagation();
        }
    });
    //send a ContextmenuUpdateMsg when opening the contextmenu
    $(element).contextmenu(async function(e){
        await browser.runtime.sendMessage(createContextmenuUpdateMsg(userChannelName));
    });
}




///////////
// WAY 2 //
///////////

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

function createOwnContextMenu(userChannelName, x, y){
    let btn = document.createElement("button");
    btn.setAttribute("class", "cb_block_button");
    btn.setAttribute("type", "button");
    btn.setAttribute("title", "Block '" + userChannelName + "' (Channel Blocker)");
    btn.setAttribute("style", "position: absolute;min-width: 15em;height: 2em;z-index: 42;background: #ffffff;color: #000000;left: " + x + "px;top: " + y + "px;");
    btn.textContent = "Block '" + userChannelName + "'";

    $(btn).on("click", () => {
		browser.runtime.sendMessage(createAddBlockedUserMsg(userChannelName));
    });
    
    return btn;
}

function addContextmenuListener2(element, userChannelName){
    //reset all listener
    $(element).off("contextmenu");
    $(element).off("mousedown");

    //send a ContextmenuUpdateMsg when opening the contextmenu
    $(element).contextmenu(async function(e){
        e.preventDefault();
        e.stopPropagation();
        element.appendChild(createOwnContextMenu(userChannelName, e.clientX, e.clientY));
        console.log("element", element);
        return false;
    });
}