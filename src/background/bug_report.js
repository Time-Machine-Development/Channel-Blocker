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

	/*Active bug report tab ids and their corresponding Youtube HTML data and URL
	which are sent to the corresponding report tab once its controller request them.*/
	let bugToYtMap = {};

    //creates a bug report tab and sends the tab id of the Youtube tab that issued a bug report via a click on the contextmenu-item
    browser.contextMenus.onClicked.addListener(async function(info, contentTab){
        if(info.menuItemId === "cb_bug_report") {

            //creates a new bug report tab
            let bugReportTab = await browser.tabs.create({
                url:"/ui/bug/html/bugreport.html"
            });

			//add new created bug tab id and its corresponding Youtube HTML data and URL
			bugToYtMap[bugReportTab.id] = {
				htmlData: await browser.tabs.sendMessage(contentTab.id, createGetHTMLDataMsg()),
				url: contentTab.url
			};
        }
    });

	//removes entries of bug report tab ids in bugToYtMap when the bug report tab is closed
	browser.tabs.onRemoved.addListener((tabId) => {
		delete bugToYtMap[tabId];
	});

	/*
	INSTALLING LISTENER FOR MESSAGES FROM bug-scripts
	*/

	browser.runtime.onMessage.addListener((msg, sender) => {
		if(msg.receiver !== SENDER)
			return;

		if(msg.sender === "bug_user_interaction"){
			if(msg.content === "url_request"){
				/* msg.content is of the form:
     			"url_request"
                */

				//returns the URL of the Youtube tab the bug report was issued on to the associated bug report tab
				return new Promise((resolve) => {
					resolve(bugToYtMap[sender.tab.id].url);
				});
			}

			if(msg.content === "html_data_request"){
				/* msg.content is of the form:
     			"html_data_request"
                */

				//return the HTML data of the Youtube tab the bug report was issued on to the associated bug report tab
				return new Promise((resolve) => {
					resolve(bugToYtMap[sender.tab.id].htmlData);
				});
			}
		}
	});
}
