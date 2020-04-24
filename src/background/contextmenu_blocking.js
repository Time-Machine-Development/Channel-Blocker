try 
{
    const SENDER = "background_contextmenu_blocking";

    function createChannelNameRequestMsg(){
        return {
            sender: SENDER,
            receiver: "content_observer_components_shared",
            info: "channelname_request"
        };
    }
    
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
            let channelname = await browser.tabs.sendMessage(tab.id, createChannelNameRequestMsg());
            console.log("channelname", channelname);
        }
    });
}
catch (error) {
    console.error(error);
}