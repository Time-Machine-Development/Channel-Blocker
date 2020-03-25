{
    const SENDER = "background_contextmenu_action";

    //creates a "get_html"-message for content_controller
    function createStartDownloadMsg() {
        return {
            sender: SENDER,
            receiver: "content_controller",
            content: "get_html"
        };
    }

    //create a new contextmenusitem
    let contextmenueItem = {
        id: "CB-Bugreport",
        title: "CB-Bugreport",
        contexts: ["all"]
    }

    //callback when tab is created
    function onCreated(tab) {
        console.log(`Created new tab: ${tab.id}`);
    }
    
    //callback when tab creation throws an error
    function onError(error) {
        console.log(`Error: ${error}`);
    }

    //callback for click on  contextmenu item
    async function handleContextClick(info) {
        //clicked on the CB bugreport item
        if(info.menuItemId === "CB-Bugreport") {
            //check if user is on a YouTube page
            if(info.pageUrl.startsWith("https://www.youtube.com")){

            browser.tabs.query({currentWindow: true}).then(async function(tabs){
                for (let tab of tabs) {
                    if (tab.active) {
                        this.tabId = tab.id;
                        this.bugReportFile = await browser.tabs.sendMessage(tabId, createStartDownloadMsg());

                        //create a new tab
                        let creating = browser.tabs.create({
                            url:"config/bugreport.html"
                        });
                        creating.then(onCreated, onError);
                    }
                }
            });
            }
        }
    }

    //create a contextmenuitem and add it to the contextmenu
    browser.contextMenus.create(contextmenueItem);

    //add eventlistener to the new contextmenu item
    browser.contextMenus.onClicked.addListener(handleContextClick);

    /*
    INSTALLING LISTENER FOR MESSAGES FROM content-scripts
    */

    browser.runtime.onMessage.addListener((msg, sender) => {
        if(msg.receiver !== SENDER)
            return;

        if(msg.sender === "bugreport_downloader"){
            /* msg.content is of the form:
            "context_request"
            */
            if(msg.content === "get_bugreport"){
                //send response (containing the html)
                return new Promise((resolve) => {
                    resolve(this.bugReportFile);
                });
            }
        }
    });
}