//This JS file will only effect everything inside the POPUP 
let coGrammarURL = ""
let loadMainDbxFolder = false
let checkbox = document.querySelector('#dbx-checkbox')


//1. When checked, save value to localStorage.
//2. When on the review page, get checked value from LS,
//if value ?, open dbx main folder automatically.

//Get checked status from LS
let checkedStatus = JSON.parse(localStorage.getItem("loadDbx"))

//on page load, set checkbox base on checkedStatus
function setChecked() {
    if (checkedStatus == true || checkedStatus == false) {
        checkbox.checked = checkedStatus 
        chrome.storage.local.set({ openStudentFolder: checkedStatus});
    }
}setChecked()


//Save checked status to LS
checkbox.addEventListener('click', (e)=>{
JSON.stringify(localStorage.setItem("loadDbx", e.target.checked))
chrome.storage.local.set({ openStudentFolder: checkbox.checked });
})



/******************************************************************

DropBox API:
Generate a download link for the task folder.

1. Get the token to give dropbox-app access. Open the access link.
2. Get the token from the browser URL using the chrome.tabs API
2. Collect student data from review page
3. Use data to generate link to task folder.  

*******************************************************************/

