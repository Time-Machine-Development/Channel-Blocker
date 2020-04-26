try 
{
    const SENDER = "background_contextmenu_blocking";
    let userChannelName = "";
    
    //adds a block contextmenu-item on Youtube
    browser.contextMenus.create({
        id: "cb_block",
        title: "Block this channel/user",
        contexts: ["all"],
        documentUrlPatterns: ["*://www.youtube.com/*"]
    });

    //handle a click on the contextmenu-item
    browser.contextMenus.onClicked.addListener(async function(info, tab){
        if(info.menuItemId === "cb_block") {
            console.log("info", info);
            console.log("tab", tab);
            console.log("userChannelName", userChannelName);
        }
    });

    browser.runtime.onMessage.addListener((msg, sender) => {
        if(msg.receiver !== SENDER)
            return;
    
        if(msg.info === "contextmenu_update"){
            /* msg.content is of the form:
            {
                user_channel_name: <User Channel Name>:string,
            }
             */
    
            if(msg.sender === "content_contextmenu_blocking"){
                chrome.contextMenus.update("cb_block", {
                    title: "Block '" + msg.content.user_channel_name + "'"
                });
                userChannelName = msg.content.user_channel_name;
                console.log("update contextmenu to: " + msg.content.user_channel_name);
            }
        }

        if(msg.info === "contextmenu_reset"){
            /* msg.content is of the form:
                undefined
             */
    
            if(msg.sender === "content_contextmenu_blocking"){
                chrome.contextMenus.update("cb_block", {
                    title: "Found no channel/user to block"
                });
                userChannelName = "";
                console.log("reset contextmenu");
            }
        }
    });
}
catch (error) {
    console.error(error);
}

