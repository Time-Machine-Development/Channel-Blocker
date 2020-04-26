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
    await browser.runtime.sendMessage(createContextmenuResetMsg());
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
