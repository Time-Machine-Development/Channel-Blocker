{
    const SENDER = "bug_controller";

    let htmlData;
    let url;

    document.getElementById("downloadReportBtn").addEventListener('click', async function (event) {
        let useragent = navigator.userAgent;
        let language = navigator.language;
        let languages = navigator.languages;

        let manifest = browser.runtime.getManifest();
        let addOnVersion = manifest.version;

        let d = new Date();
        let date = d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear();

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
bugDescribtion: "${bugDescription}",
url: "${url}"
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

}
