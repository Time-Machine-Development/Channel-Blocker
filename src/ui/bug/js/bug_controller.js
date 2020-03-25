{
    const SENDER = "bug_controller";

    let htmlData;

    //creates a "get_html"-message for content_controller
    function createGetHTMLMsg() {
        return {
            sender: SENDER,
            receiver: "content_controller",
            content: "get_html_data"
        };
    }

    function download(data, filename, type) {
        let file = new Blob([data], {type: type});
        if (window.navigator.msSaveOrOpenBlob){
            window.navigator.msSaveOrOpenBlob(file, filename);
        }else{
            let a = document.createElement("a"),
                    url = URL.createObjectURL(file);
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(function() {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        }
    }

    //creates a "get_html"-message for background_bug_report
    function createGetHTMLDataMsg() {
        return {
            sender: SENDER,
            receiver: "background_bug_report",
            content: "get_html_data"
        };
    }

    document.getElementById("downloadReportBtn").addEventListener('click', async function (event) {
        let useragent = navigator.userAgent;
        let language = navigator.language;
        let languages = navigator.languages;

        let manifest = browser.runtime.getManifest();
        let addOnVersion = manifest.version;

        let d = new Date();
        let date = d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear()

        let name = document.getElementById("nameInput").value;
        let email = document.getElementById("emailInput").value;
        let bugDescription = document.getElementById("bugDescriptionInput").value;

        download(`<!--
date: "${date}",
browser: "${useragent}",
language: "${language}",
languages: "${languages}",
CB version: "${addOnVersion}",
name: "${name}",
email: "${email}",
bugDescribtion: "${bugDescribtion}",
-->

${htmlData}`, "CBreport " + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + ".html" ,".html");
    });

    /*
    INSTALLING LISTENER FOR MESSAGES FROM background-scripts
    */

    browser.runtime.onMessage.addListener(async function(msg, sender) {
        if(msg.receiver !== SENDER)
            return;

        if(msg.sender === "background_bug_report"){
            /* msg.content is of the form:
            {
                info: "bug_tab_id",
                bug_tab_id: <tab id>
            }
            */
            if(msg.content.info === "bug_tab_id"){
                //gets the HTML data from the given Youtube tab which issued a bug which created this bug tab
                htmlData = await browser.tabs.sendMessage(msg.content.bug_tab_id, createGetHTMLDataMsg());

                document.getElementById("downloadReportBtn").disabled = false;
            }
        }
    });

}
