
console.log("chrome.tabs API");
chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
  console.log(tabs);
 
})