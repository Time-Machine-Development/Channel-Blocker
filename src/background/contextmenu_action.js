console.log("Start Context");

const SENDER = "background_contextmenu_action";

//creates a "get_html"-message for content_controller
function createStartDownloadMsg(bugReportFile) {
    return {
        sender: SENDER,
        receiver: "content_controller",
        content: "get_html"
    };
}

let contextmenueItem = {
    id: "CB-Bugreport",
    title: "CB-Bugreport",
    contexts: ["all"]
}

function onCreated(tab) {
    console.log(`Created new tab: ${tab.id}`);
  }
  
  function onError(error) {
    console.log(`Error: ${error}`);
  }

browser.contextMenus.create(contextmenueItem);

async function handleContextClick(info) {
    console.log("info ", info)
    switch (info.menuItemId) {
      case "CB-Bugreport":
          if(info.pageUrl.startsWith("https://www.youtube.com")){
            console.log("Bug on " + info.pageUrl);
            this.bugReportFile = info;
            console.log("bugReportFile ", bugReportFile);

            console.log("document");

            browser.tabs.query({currentWindow: true}).then(async function(tabs){
                for (let tab of tabs) {
                    if (tab.active) {
                        this.tabId = tab.id;
                        console.log("tabId", tabId);
                        this.bugReportFile = await browser.tabs.sendMessage(tabId, createStartDownloadMsg(bugReportFile,"CB-Bugreport.bug" ,".bug"));
                        console.log("html", this.bugReportFile.substr(0,15));

                        //create a new tab
                        let creating = browser.tabs.create({
                            url:"config/bugreport.html"
                        });
                        creating.then(onCreated, onError);
                    }
                }
            });
          }
        break;
    }
}

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
            console.log("SEND THE HTML");
            console.log(this.bugReportFile.substr(0,15));
            //send response (containing the html)
            return new Promise((resolve) => {
                resolve(this.bugReportFile);
            });
        }
    }
});

console.log("End Context");
