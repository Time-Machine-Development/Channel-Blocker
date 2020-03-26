{
    const SENDER = "background_bug_report";

    //creates a "html"-message for bug_controller
    function createHTMLDataMsg(htmlData) {
        return {
            sender: SENDER,
            receiver: "bug_controller",
            content: {
                info: "html_data",
                html_data: htmlData
            }
        }
    }

    //creates a "url"-message for bug_controller
    function createURLMsg(url){
        return {
            sender: SENDER,
            receiver: "bug_controller",
            content: {
                info: "url",
                url: url
            }
        }
    }

    //creates a "get_html"-message for content_controller
    function createGetHTMLDataMsg() {
        return {
            sender: SENDER,
            receiver: "content_controller",
            content: "get_html_data"
        };
    }

    //adds a bug report contextmenu-item on Youtube
    browser.menus.create({
        id: "cb_bug_report",
        title: "report a bug on this page",
        contexts: ["all"],
        documentUrlPatterns: ["*://www.youtube.com/*"]
    });

    //creates a bug report tab and sends the tab id of the Youtube tab that issued a bug report via a click on the contextmenu-item
    browser.menus.onClicked.addListener(async function (info, contentTab){
        if(info.menuItemId === "cb_bug_report") {

            //creates a new bug report tab
            let bugReportTab = await browser.tabs.create({
                url:"/ui/bug/html/bugreport.html"
            });

            /*Waits for the bug report tab DOM to be completely loaded.
            Then passes the HTML data and the URL of of the Youtube tab which issued a bug report to the newly created bug report tab.*/
            browser.tabs.onUpdated.addListener(
                async function(tabId, changeInfo, tab){
                    if(changeInfo.status === "complete"){

                        //gets the HTML data of the Youtube tab
                        let htmlData = await browser.tabs.sendMessage(contentTab.id, createGetHTMLDataMsg());

                        //executes and waits for the ui/bug/js/controller.js script to be completed on the new bug report tab
                        await browser.tabs.executeScript(bugReportTab.id, {file: "ui/bug/js/controller.js"});

                        //sends the URL of the Youtube tab the bug report was issued on to the associated bug report tab
                        await browser.tabs.sendMessage(bugReportTab.id, createURLMsg(contentTab.url));

                        //sends the HTML data of the Youtube tab the bug report was issued on to the associated bug report tab
                        browser.tabs.sendMessage(bugReportTab.id, createHTMLDataMsg(htmlData));
                    }
                },
                {
                    properties: ["status"],
                    tabId: bugReportTab.id
                }
            );
        }
    });
}
