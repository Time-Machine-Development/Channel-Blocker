{
    const SENDER = "background_bug_report";

    //creaes a "html"-message for bug_controller
    function createBugTabIdMsg(bugTabId) {
        return {
            sender: SENDER,
            receiver: "bug_controller",
            content: {
                info: "bug_tab_id",
                bug_tab_id: bugTabId
            }
        }
    }

    //adds a bug report contextmenu-item on Youtube
    browser.menus.create({
        id: "cb_bug_report",
        title: "report a bug on this page",
        contexts: ["all"],
        documentUrlPatterns: ["*://www.youtube.com/*"]
    });

    //creates a bug report tab and sends the tab id of the Youtube tab that issued a bug report via a click on the contextmenu-item
    browser.menus.onClicked.addListener(async function (info, tab){
        if(info.menuItemId === "cb_bug_report") {
            //creates a new bug report tab
            let bugReportTab = await browser.tabs.create({
                url:"config/bugreport.html"
            });

            //wait for the bug report tab to be completely loaded and then send the tab id of the Youtube tab the bug report was issued on
            browser.tabs.onUpdated.addListener(
                (tabId, changeInfo, tab) => {
                    if(changeInfo.status === "complete"){
                        browser.tabs.sendMessage(bugReportTab.id, createBugTabIdMsg(tab.id));
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
