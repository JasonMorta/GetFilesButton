//Grab all the h2 element inner text

 
//student data object
// Content-script will scan the current tab about student and create a student object
let student = {
    name: "",
    number: "",
    course: "",
    task: ""
}


let studentNumber = "HM22100004151"

//https://www.dropbox.com/search/work?path=%2F&query=HM22100004151&search_token=%2BsmQ2ZuDJX3PDBpWgfFRzx84oCyqx%2BqCmK540oRKRXM%3D&typeahead_session_id=16058840389534903632260521497123

//patterns
//To get the correct bootcamp name and store into object
let DS = /Data Science/i
let SE = /Software Engineering/i
let WD = /Web Development/i
// let WDL1 = /1 - Web Development Essentials/i
// let WDL2 = /Web Development Essentials/i
// let WDL3 = /Web Development Essentials/i
let PDS = /Python for Data Science/i
let IP = /Intro to Programming/i

//All student info is in all the h2 elements
const data = document.getElementsByTagName("h6");
//console.log(data);
//console.log('data', data)

//loop over all the h6 elements and extract the needed info to build student variable
for (let i = 0; i < data.length; i++) {

  //Get student name
  if (data[i].textContent.search("Student:") != -1) {
    student.name = data[i].textContent.replace("Student:", "");
  }
  

  //Get student number
  if (data[i].textContent.search("Student number:") != -1) {
    student.number = data[i].textContent.replace("Student number:", "").trim();
  }
  //console.log(data[i].textContent);
  //Get student course names
  if (DS.test(data[i].textContent)) {
    student.course = "Data Science Bootcamp";
  } else if (SE.test(data[i].textContent)) {
    student.course = "Software Engineer Bootcamp";
  } else if (WD.test(data[i].textContent)) {
    student.course = "Web Development Bootcamp";
  } else if (PDS.test(data[i].textContent)) {
    student.course = "Python for Data Science Bootcamp";
  } else if (IP.test(data[i].textContent)) {
    student.course = "1%20-%20Introduction%20to%20programming";
  }



  //Get student task number
  if (data[i].textContent.search("Task:") != -1) {
    //extracts the task number from element/string
    student.task = data[i].textContent.match(/[0-9]/g).join().replaceAll(",", "") <= 9 ?
    "T0"+data[i].textContent.match(/[0-9]/g).join().replaceAll(",", ""):
    "T"+data[i].textContent.match(/[0-9]/g).join().replaceAll(",", "");

      //console.log('task: '+ student.task +' ',student.task.length);

    if ( student.task.length > 3) {
      student.task = student.task.slice(0,3)
      
    }
  }
  //console.log('sliced student.task', student.task)
}



//finished student object
//this object need to be sent to the extension          
//console.log(student);
//https://www.dropbox.com/work/HyperionDev%20Reviewers/NA22110004668/Software%20Engineer%20Bootcamp
//https://www.dropbox.com/work/HyperionDev%20Reviewers/AB22110005432/Intro%20to%20Programming%20Bootcamp

let dropboxBtn = `
  <div class="dbx-btn-container bounce-top">
                    <a class="btn dbx-btn">Dropbox
                    </a>
                    <div class="dropdown-content">
                      <div class="ddx-inner-container">
                        <a class="dbx-btn-link"   href=${`https://www.dropbox.com/search/work?path=%2F&query=${student.number}&search_token=wSE2j02tt%2BEzn4Mn5LKCeJ6lTfohi%2BvZxO8aR6zgwL4%3D&typeahead_session_id=13067744558951506456428331496841`}  target="_blank"  >Find Student <span>(All)</span></a>
                        <a class="dbx-btn-link"  href=${`https://www.dropbox.com/work/HyperionDev%20Reviewers/${student.number}/${student.course.replaceAll(" ", "%20")}`}   target="_blank">Course Folder <span>(DFE only)</span></a>
                        <a class="dbx-btn-link"  href=${`https://www.dropbox.com/work/HyperionDev%20Reviewers/${student.number}/${student.course.replaceAll(" ", "%20")}/${student.task}`}   target="_blank">Task Folder <span>(DFE only)</span></a>
                      </div>
                  </div>
  </div>`;

data[3].insertAdjacentHTML("afterend", dropboxBtn);
//https://www.dropbox.com/search/work?path=%2F&query=AD22110004876&search_token=wSE2j02tt%2BEzn4Mn5LKCeJ6lTfohi%2BvZxO8aR6zgwL4%3D&typeahead_session_id=13067744558951506456428331496841
//https://www.dropbox.com/search/work?path=%2F&query=CC22110005202&search_token=wSE2j02tt%2BEzn4Mn5LKCeJ6lTfohi%2BvZxO8aR6zgwL4%3D&typeahead_session_id=28751319532716572321479819181797

  
//========BTN hover effect

let MainBtn = document.querySelector('.dbx-btn');
let btnContainer = document.querySelector('.dropdown-content');
let allLinks = document.querySelectorAll('.dbx-btn-link');
let myTimeout = 0
let leaveReverse = 0
let leaveRemove = 0

//adds the CSS to e  ach elements
function loadBtns(){     
  for (let i = 0; i < allLinks.length; i++) {
    allLinks[i].style.animationDuration = `0.3${i-1}s`
  }
  } loadBtns()

//On MainBtn hover, show other buttons
MainBtn.addEventListener('mouseenter', (e)=> {
  clearTimeout(myTimeout)
  clearTimeout(leaveReverse)
  clearTimeout(leaveRemove)
  btnContainer.classList.add("show-dropdown")
  for (let i = 0; i < allLinks.length; i++) {
    allLinks[i].classList.remove("slide-in-left-reverse")
    allLinks[i].classList.add("slide-in-left")
  }
})


//Leave timeout
//Only remove the container + buttons if mouse leaves everything
btnContainer.addEventListener("mouseleave", () => {
  leaveAll()
});

//Leaving main button 

MainBtn.addEventListener('mouseleave', (e)=> {
  leaveAll()
})

//leaving the buttons
function leaveAll(){
  leaveReverse = setTimeout(() => {
    for (let i = 0; i < allLinks.length; i++) {
      allLinks[i].classList.add("slide-in-left-reverse");
    }
  }, 1000);

  leaveRemove = setTimeout(() => {
    for (let i = 0; i < allLinks.length; i++) {
      allLinks[i].classList.remove("slide-in-left-reverse");
      allLinks[i].classList.remove("slide-in-left");
      btnContainer.classList.remove("show-dropdown");
      btnContainer.classList.remove("show-dropdown");
    }
  }, 1500);
}

//reEnter container
btnContainer.addEventListener('mouseenter', ()=>{
  console.log("reEnter");
  clearTimeout(leaveReverse)
  clearTimeout(leaveRemove)
})

//remove buttons when leaving button1 or other buttons
function removeEl(){
  for (let i = 0; i < allLinks.length; i++) {
    btnContainer.classList.remove("show-dropdown")
    allLinks[i].classList.remove("slide-in-left")
      
  }
      setTimeout(() => {
        btnContainer.style.display = "none"
      }, 500);
}