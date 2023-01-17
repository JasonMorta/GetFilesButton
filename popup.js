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

DropBox APP_API:
Generate a download link for the task folder.

1. Get the token to give dropbox-app access. Open the access link.
2. Get the token from the browser URL using the chrome.tabs API
2. Collect student data from review page
3. Use data to generate link to task folder.  


When extension loads
Steps:
1 -  Get student details
2 - Make  search request for task folder with "dbx.filesSearchV2()"
  - First time use: Dropbox App will need access first.
3 -  If no token exists(access denied), use dbx.auth.getAuthenticationUrl
tp get a new token. This token will be in browser URL.
4 - Use chrome.tabs API to extract the url from tabs.
5 - Filter put token from url with RegEx
6 - Update token variable with new token, and run the search request again. 

*******************************************************************/

