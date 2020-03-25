{
    const SENDER = "bugreport_downloader";

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

    //creates a "start_download"-message for bugreport_downloader
    function createGetBugReportMsg() {
        return {
            sender: SENDER,
            receiver: "background_contextmenu_action",
            content: "get_bugreport"
        };
    }

    document.getElementById("sendReportBtn").addEventListener('click', async function (event) {
        
        let html = await browser.runtime.sendMessage(createGetBugReportMsg());

        let useragent = navigator.userAgent;
        let language = navigator.language;
        let languages = navigator.languages;

        let manifest = browser.runtime.getManifest();
        let addOnVersion = manifest.version;

        let d = new Date();
        let date = d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear()

        let name = document.getElementById("nameInput").value;
        let email = document.getElementById("emailInput").value;
        let bugDescribtion = document.getElementById("bugDescribtionInput").value;

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

${html}`, "CBreport " + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + ".html" ,".html");
    });
}