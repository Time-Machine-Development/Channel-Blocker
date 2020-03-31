{
    const SENDER = "background_bug_report";

    //creates a "get_html"-message for content_controller
    function createGetHTMLDataMsg() {
        return {
            sender: SENDER,
            receiver: "content_controller",
            content: "get_html_data"
        };
    }

    //adds a bug report contextmenu-item on Youtube
    browser.contextMenus.create({
        id: "cb_bug_report",
        title: "Report a bug on this page",
        contexts: ["all"],
        documentUrlPatterns: ["*://www.youtube.com/*"]
    });

	/*Active bug report tab ids and their corresponding Youtube tabs
	which are used to answer with HTML data and URL of a Youtube tab to a report tab once its controller request them.*/
	let bugToYtMap = {};

    //creates a bug report tab and sends the tab id of the Youtube tab that issued a bug report via a click on the contextmenu-item
    browser.contextMenus.onClicked.addListener(async function (info, contentTab){
        if(info.menuItemId === "cb_bug_report") {

            //creates a new bug report tab
            let bugReportTab = await browser.tabs.create({
                url:"/ui/bug/html/bugreport.html"
            });

			//add new created bug tab id and its corresponding Youtube tab to the bug-tab-id-to-youtube-tab-id-mapping
			bugToYtMap[bugReportTab.id] = contentTab;
        }
    });

	//removes entries of bug report tab ids in the bug-tab-id-to-youtube-tab-id-mapping when the bug report tab is closed
	browser.tabs.onRemoved.addListener((tabId) => {
		delete bugToYtMap[tabId];
	});

	/*
	INSTALLING LISTENER FOR MESSAGES FROM bug-scripts
	*/

	browser.runtime.onMessage.addListener(async function(msg, sender){
		if(msg.receiver !== SENDER)
			return;

		if(msg.sender === "bug_controller"){
			if(msg.content === "url_request"){
				/* msg.content is of the form:
     			"url_request"
                */

				//returns the URL of the Youtube tab the bug report was issued on to the associated bug report tab
				return new Promise((resolve) => {
					console.log(bugToYtMap[sender.tab.id].url);
					resolve(bugToYtMap[sender.tab.id].url);
				});
			}

			if(msg.content === "html_data_request"){
				/* msg.content is of the form:
     			"html_data_request"
                */

				let htmlData = await browser.tabs.sendMessage(bugToYtMap[sender.tab.id].id, createGetHTMLDataMsg());

				//return the HTML data of the Youtube tab the bug report was issued on to the associated bug report tab
				return new Promise((resolve) => {
					resolve(htmlData);
				});
			}
		}
	});
}
