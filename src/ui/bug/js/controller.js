const SENDER = "bug_controller";

/*
INSTALLING LISTENER FOR MESSAGES FROM background-scripts
*/

browser.runtime.onMessage.addListener(async function(msg, sender) {
    if(msg.receiver !== SENDER)
        return;

    if(msg.sender === "background_bug_report"){
        if(msg.content.info === "url"){
            /* msg.content is of the form:
            {
                info: "url",
                url: <URL>
            }
            */

            url = msg.content.url;

        }else if(msg.content.info === "html_data"){
            /* msg.content is of the form:
            {
                info: "html_data",
                html_data: <HTML Data>
            }
            */

            htmlData = msg.content.html_data;

            document.getElementById("downloadReportBtn").disabled = false;
        }
    }
});
