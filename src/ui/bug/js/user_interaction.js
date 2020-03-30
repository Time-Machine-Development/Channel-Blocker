//htmlData and url are defined by bug/js/controller.js which is attached by and receives their values by background/bug_report.js after a bug was issued
let htmlData;
let url;

const SENDER = "bug_user_interaction";

//creates a "savefile_export_request"-message for savefile_export
function createSavefileExportRequestMsg() {
    return {
        sender: SENDER,
        receiver: "background_savefile_export",
        content: "savefile_export_request"
    };
}

document.getElementById("downloadReportBtn").addEventListener('click', async function (event) {

    let name = document.getElementById("nameInput").value;
    let email = document.getElementById("emailInput").value;
    let bugDescription = document.getElementById("bugDescriptionInput").value;

    if(bugDescription.length < 5){
        document.getElementById("bugDescriptionErrText").style.display = "block";
        document.getElementById("bugDescriptionInput").setCustomValidity("Please describe the bug in (at least) a few words.");
        return;
    }

    
	let savefileJSON = await browser.runtime.sendMessage(createSavefileExportRequestMsg());

    let useragent = navigator.userAgent;
    let language = navigator.language;
    let languages = navigator.languages;

	let manifest = browser.runtime.getManifest();
    let addOnVersion = manifest.version;

    let d = new Date();
    let date = d.getDate() + "_" + (d.getMonth() + 1) + "_" + d.getFullYear() + "_" + d.getHours() + "_" + d.getMinutes() + "_" + d.getSeconds();

    download(`<!--
date: "${date}",
browser: "${useragent}",
language: "${language}",
languages: "${languages}",
CB version: "${addOnVersion}",
name: "${name}",
email: "${email}",
bugDescribtion: "${bugDescription}",
url: "${url}",
config: "${savefileJSON}"
-->

${htmlData}`, "CB_Bug_" + date + ".html" ,".html");
});
