"use strict";
window.addEventListener("DOMContentLoaded", init);
const temp = document.querySelector("template").content;
const subTemp = document.querySelector(".subtask-temp").content;
const statusBtn = document.querySelector("#profile");
const subTaskPage = document.querySelector(".status-page");
const subtasksContainer = document.querySelector(".subtasks-container");
let subtask = document.querySelector(".subtask");
let imageContainer = document.querySelector(".img-container");
let ordersWrapper = document.querySelector(".orders-wrapper");
let loaderAnimation = document.querySelector(".loader");
let signalid;
let signalStatus;
let signalid2;
let signalid3;

let cropsArr = [];
let x1, x2;
let startDate, deliveryDate, moveToGhDate;
//Extracts the clean date format out of a long Date string
let y = new Date().toDateString();
let today = Date.parse(y);
document.querySelector(".heading h3").textContent = y.substring(3);
document.querySelector("header h3").textContent = y.substring(3);
//initial function
function init() {
  loaderAnimation.classList.toggle("hidden");
  getData();
}
const endpoint = "https://herfra-c61d.restdb.io/rest/crops";
function getData() {
  fetch(endpoint, {
    methods: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5c8d68eacac6621685acbfb2",
      "cache-control": "no-cache"
    }
  })
    .then(e => {
      loaderAnimation.classList.toggle("hidden");
      return e.json();
    })
    .then(e => showCrops(e));
}
//Grabs data for Filtering by Task
function getData2() {
  fetch(endpoint, {
    methods: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5c8d68eacac6621685acbfb2",
      "cache-control": "no-cache"
    }
  })
    .then(e => {
      loaderAnimation.classList.toggle("hidden");

      return e.json();
    })
    .then(e => showCrops2(e));
}
//Grabs data for Filitering by status
function getData1() {
  fetch(endpoint, {
    methods: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5c8d68eacac6621685acbfb2",
      "cache-control": "no-cache"
    }
  })
    .then(e => {
      loaderAnimation.classList.toggle("hidden");

      return e.json();
    })
    .then(e => showCrops1(e));
}
function showCrops1(crops) {
  crops.forEach(crop => cropsArr.push(crop));
  cropsArr = cropsArr.filter(crop => crop.taskStatus === x1);

  cropsArr.forEach(showSingleCrop);

  if (cropsArr.length === 0) {
    document.querySelector(".notask").classList.remove("hidden");
    console.log("works");
  } else {
    document.querySelector(".notask").classList.add("hidden");
  }
}
function showCrops2(crops) {
  crops.forEach(crop => cropsArr.push(crop));
  cropsArr = cropsArr.filter(crop => crop.taskName === x2);

  cropsArr.forEach(showSingleCrop);

  console.log("cropsArray:", cropsArr.length);
  if (cropsArr.length === 0) {
    document.querySelector(".notask").classList.remove("hidden");
    console.log("works");
  } else {
    document.querySelector(".notask").classList.add("hidden");
  }
}
function showCrops(crops) {
  crops.forEach(showSingleCrop);
  console.log(crops);
}

function showSingleCrop(crop) {
  const clone = temp.cloneNode(true);
  const subtaskClone = subTemp.cloneNode(true);
  clone.querySelector("article h1 span").textContent = crop.title;
  clone.querySelector("article h3 span").textContent = crop.orderId;
  clone.querySelector("article ").dataset.id = crop.orderId;
  clone.querySelector("#status-img-wrapper p ").textContent = crop.taskStatus;
  clone.querySelector("#secondpart").dataset.taskSt = crop.taskStatus;
  clone.querySelector("#secondpart").dataset.id = crop._id;
  clone.querySelector("#secondpart").dataset.newtaskId = crop.taskId;
  clone.querySelector("#secondpart").dataset.newtaskName = crop.taskName;
  clone.querySelector("#secondpart").dataset.newcropName = crop.title;
  clone.querySelector("article p #task-name").textContent = crop.taskName;
  const taskId = crop.taskId;
  const cropId = crop._id;
  //Date progress bar
  startDate = crop.startDate;
  deliveryDate = crop.deliveryDate;
  moveToGhDate = crop.movedate;
  var n = new Date(deliveryDate);
  let m = n.toDateString().slice(4, 10);
  let mindate = Date.parse(startDate);
  let maxdate = Date.parse(deliveryDate);
  let movedate = Date.parse(moveToGhDate);
  let nbTotalDays = Math.floor((maxdate - mindate) / 86400000);
  // console.log(nbTotalDays);

  let barArr = [];
  let nbPastDays = Math.floor((today - mindate) / 86400000);
  // console.log(nbPastDays);
  if (nbPastDays + 1 === nbTotalDays) {
    clone.querySelector("article div").style.backgroundColor = "red";
    clone.querySelector("article #secondpart").style.backgroundColor = "red";
  }

  let nbMoveDay = Math.floor((movedate - mindate) / 86400000);
  if (nbPastDays < 0) {
    nbPastDays = 0;
    clone.querySelector("#firstpart .notStartYet").innerHTML =
      "The start date has not come yet";
  }

  for (let i = 0; i < nbTotalDays; i++) {
    let verBar = document.createElement("div");
    barArr.push(verBar);

    verBar.setAttribute("class", "verticalBar");
    clone.querySelector("#firstpart .bar-container").appendChild(verBar);
  }
  if (nbPastDays === nbTotalDays) {
    deletOrder(cropId);
  } else {
    barArr[nbPastDays].style.backgroundColor = "#c58b76";
    barArr[nbMoveDay].style.backgroundColor = "#94c03f";
  }

  let child = document.createElement("div");
  child.innerHTML = nbPastDays + 1;
  barArr[nbPastDays].appendChild(child);
  let dDate = document.createElement("section");
  dDate.innerHTML = m;
  clone.querySelector("#firstpart .bar-container").appendChild(dDate);
  dDate.setAttribute("class", "date");
  // conditional rendernig of the task images
  const seedName = crop.title;

  if (
    seedName == "Sunflower" ||
    seedName == "Peas" ||
    seedName == "Tallerkensmækker"
  ) {
    switch (taskId) {
      case 1:
        clone
          .querySelector(" #secondpart #prepare-img")
          .classList.remove("hidden");
        break;
      case 2:
        clone.querySelector(" #secondpart #sow-img").classList.remove("hidden");
        break;
      case 3:
        clone
          .querySelector(" #secondpart #blackout-img")
          .classList.remove("hidden");
        break;
      case 4:
        clone
          .querySelector(" #secondpart #light-img")
          .classList.remove("hidden");
        break;
      case 5:
        clone
          .querySelector(" #secondpart #harvest-img")
          .classList.remove("hidden");
        break;
    }
  } else {
    switch (taskId) {
      case 1:
        clone
          .querySelector(" #secondpart #prepare-img")
          .classList.remove("hidden");
        break;
      case 2:
        clone
          .querySelector(" #secondpart #blackout-img")
          .classList.remove("hidden");
        break;
      case 3:
        clone
          .querySelector(" #secondpart #light-img")
          .classList.remove("hidden");
        break;
      case 4:
        clone
          .querySelector(" #secondpart #harvest-img")
          .classList.remove("hidden");
    }
  }
  //conditinal rendering of task-status image
  let taskStatus = crop.taskStatus;

  switch (taskStatus) {
    case "In queue":
      clone.querySelector("#in-queue").classList.remove("hidden");
      let playbtn = clone.querySelector(".btn-wrapper>div:nth-child(1)");
      playbtn.classList.remove("hidden");
      playbtn.addEventListener("click", playFunc);

      break;
    case "In process":
      clone.querySelector("#in-process").classList.remove("hidden");
      let pausebtn = clone.querySelector(".btn-wrapper>div:nth-child(2)");
      pausebtn.classList.remove("hidden");
      pausebtn.addEventListener("click", pauseFunc);
      let finishbtn = clone.querySelector(".btn-wrapper>div:nth-child(3)");
      finishbtn.classList.remove("hidden");
      finishbtn.addEventListener("click", finishFunc);

      break;
    case "Paused":
      clone.querySelector("#paused").classList.remove("hidden");
      clone
        .querySelector(".btn-wrapper>div:nth-child(1)")
        .classList.remove("hidden");
      clone
        .querySelector(".btn-wrapper>div:nth-child(1)")
        .addEventListener("click", playFunc);

      break;
  }
  clone.getElementById("delete-btn").addEventListener("click", termination);
  function termination(e) {
    let terminatedId =
      e.target.parentElement.parentElement.parentElement.dataset.id;
    console.log(terminatedId);
    deletOrder(terminatedId);
    clearPage();
    getData();
    loaderAnimation.classList.toggle("hidden");
  }
  // this piece of code recognise the order which has been clicked
  clone
    .querySelector("#secondpart #img-wrapper .clickarea")
    .addEventListener("click", e => {
      subTaskPage.style.left = 0;
      const seedName = crop.title;
      let myImge = document.createElement("IMG");
      document.querySelector(".subtask").appendChild(myImge);
      let mySection = document.createElement("section");
      document.querySelector(".subtasks-container").appendChild(mySection);
      mySection.setAttribute("style", "display:flex");
      let mytitle = document.createElement("h1");
      mytitle.textContent = "List:";
      let mySecondTitle = document.createElement("h1");
      mySecondTitle.textContent = "Actions";
      let myList = document.createElement("section");
      myList.setAttribute("class", "list");
      let myAction = document.createElement("section");
      myAction.setAttribute("class", "action");
      myList.appendChild(mytitle);
      myAction.appendChild(mySecondTitle);
      mySection.appendChild(myList);
      mySection.appendChild(myAction);
      let listImage = document.createElement("img");
      myList.appendChild(listImage);
      let introImage = document.createElement("img");
      subtask.appendChild(imageContainer);
      imageContainer.appendChild(introImage);
      //check the name of the seed to see if it needs soaking or not

      if (
        seedName === "Sunflower" ||
        seedName === "Peas" ||
        seedName === "Tallerkensmækker"
      ) {
        //check the task id to show correspondant task and sub task
        switch (taskId) {
          case 1:
            myImge.setAttribute("src", "http://artingineer.dk/rf-asset/t1.png");
            myImge.setAttribute("alt", "prepare-stage");
            mySection.setAttribute("class", "prepare");
            listImage.setAttribute(
              "src",
              "http://artingineer.dk/rf-asset/list1.png"
            );
            let actionImage = document.createElement("img");
            actionImage.setAttribute(
              "src",
              "http://artingineer.dk/rf-asset/soak.png"
            );
            myAction.appendChild(actionImage);
            introImage.setAttribute(
              "src",
              "http://artingineer.dk/rf-asset/sunflower.png"
            );

            break;
          case 2:
            myImge.setAttribute(
              "src",
              "http://artingineer.dk/rf-asset/sow.png"
            );
            myImge.setAttribute("alt", "sow-stage");
            mySection.setAttribute("class", "prepare-sow");
            listImage.setAttribute(
              "src",
              "http://artingineer.dk/rf-asset/list2.png"
            );
            let sowactionImage = document.createElement("img");
            sowactionImage.setAttribute(
              "src",
              "http://artingineer.dk/rf-asset/allocate.png"
            );
            let sowactionImage2 = document.createElement("img");
            sowactionImage2.setAttribute(
              "src",
              "http://artingineer.dk/rf-asset/putmedia.png"
            );
            let sowactionImage3 = document.createElement("img");
            sowactionImage3.setAttribute(
              "src",
              "http://artingineer.dk/rf-asset/measureandsow.png"
            );
            let imgArr = [sowactionImage, sowactionImage2, sowactionImage3];
            for (let i = 0; i <= 2; i++) {
              myAction.appendChild(imgArr[i]);
            }
            introImage.setAttribute(
              "src",
              "http://artingineer.dk/rf-asset/sunflower.png"
            );
            break;
          case 3:
            myImge.setAttribute(
              "src",
              "http://artingineer.dk/rf-asset/blackout.png"
            );
            myImge.setAttribute("alt", "sow-stage");
            mySection.setAttribute("class", "blackout");
            let blackactionImage = document.createElement("img");
            blackactionImage.setAttribute(
              "src",
              "http://artingineer.dk/rf-asset/movetoblack2.png"
            );
            myAction.appendChild(blackactionImage);

            introImage.setAttribute(
              "src",
              "http://artingineer.dk/rf-asset/sunflower.png"
            );
            mySection.removeChild(mySection.firstChild);

            break;
          case 4:
            myImge.setAttribute(
              "src",
              "http://artingineer.dk/rf-asset/light.png"
            );
            myImge.setAttribute("alt", "light-stage");
            mySection.setAttribute("class", "light");
            let lightactionImage = document.createElement("img");
            lightactionImage.setAttribute(
              "src",
              "http://artingineer.dk/rf-asset/movetolight.png"
            );
            myAction.appendChild(lightactionImage);

            introImage.setAttribute(
              "src",
              "http://artingineer.dk/rf-asset/sunflower.png"
            );
            mySection.removeChild(mySection.firstChild);

            break;
          case 5:
            myImge.setAttribute(
              "src",
              "http://artingineer.dk/rf-asset/harvest.png"
            );
            myImge.setAttribute("alt", "harvest-stage");
            mySection.setAttribute("class", "harvest");
            listImage.setAttribute(
              "src",
              "http://artingineer.dk/rf-asset/list1.png"
            );
            let actionImageHarvest = document.createElement("img");
            actionImageHarvest.setAttribute(
              "src",
              "http://artingineer.dk/rf-asset/harvestandpack-pic.png"
            );
            myAction.appendChild(actionImageHarvest);
            introImage.setAttribute(
              "src",
              "http://artingineer.dk/rf-asset/sunflower.png"
            );
            mySection.removeChild(mySection.firstChild);

            break;
        }
      } else {
        switch (taskId) {
          case 1:
            myImge.setAttribute(
              "src",
              "http://artingineer.dk/rf-asset/prepareandsow.png"
            );
            myImge.setAttribute("alt", "prepare-stage");
            mySection.setAttribute("class", "prepare-sow");
            listImage.setAttribute(
              "src",
              "http://artingineer.dk/rf-asset/list2.png"
            );
            let actionImage = document.createElement("img");
            actionImage.setAttribute(
              "src",
              "http://artingineer.dk/rf-asset/allocate.png"
            );
            let actionImage2 = document.createElement("img");
            actionImage2.setAttribute(
              "src",
              "http://artingineer.dk/rf-asset/putmedia.png"
            );
            let actionImage3 = document.createElement("img");
            actionImage3.setAttribute(
              "src",
              "http://artingineer.dk/rf-asset/measureandsow.png"
            );
            let imgArr = [actionImage, actionImage2, actionImage3];
            for (let i = 0; i <= 2; i++) {
              myAction.appendChild(imgArr[i]);
            }
            introImage.setAttribute(
              "src",
              "http://artingineer.dk/rf-asset/sunflower.png"
            );
            myImge.setAttribute("style", "width:30vw");
            break;
          case 2:
            myImge.setAttribute(
              "src",
              "http://artingineer.dk/rf-asset/blackout2.png"
            );
            myImge.setAttribute("alt", "blackout-stage");
            mySection.setAttribute("class", "blackout");

            let actionImage11 = document.createElement("img");
            actionImage11.setAttribute(
              "src",
              "http://artingineer.dk/rf-asset/movetoblack2.png"
            );
            let actionImage21 = document.createElement("img");
            actionImage21.setAttribute(
              "src",
              "http://artingineer.dk/rf-asset/watering.png"
            );
            myAction.appendChild(actionImage11);
            myAction.appendChild(actionImage21);
            mySection.removeChild(mySection.firstChild);
            break;
          case 3:
            myImge.setAttribute(
              "src",
              "http://artingineer.dk/rf-asset/light.png"
            );
            myImge.setAttribute("alt", "light-stage");
            mySection.setAttribute("class", "light");
            let lightactionImage = document.createElement("img");
            lightactionImage.setAttribute(
              "src",
              "http://artingineer.dk/rf-asset/movetolight.png"
            );
            myAction.appendChild(lightactionImage);

            introImage.setAttribute(
              "src",
              "http://artingineer.dk/rf-asset/sunflower.png"
            );
            mySection.removeChild(mySection.firstChild);

            break;
          case 4:
            myImge.setAttribute(
              "src",
              "http://artingineer.dk/rf-asset/harvest.png"
            );
            myImge.setAttribute("alt", "harvest-stage");
            mySection.setAttribute("class", "harvest");
            listImage.setAttribute(
              "src",
              "http://artingineer.dk/rf-asset/list1.png"
            );
            let actionImageHarvest = document.createElement("img");
            actionImageHarvest.setAttribute(
              "src",
              "http://artingineer.dk/rf-asset/harvestandpack-pic.png"
            );
            myAction.appendChild(actionImageHarvest);
            introImage.setAttribute(
              "src",
              "http://artingineer.dk/rf-asset/sunflower.png"
            );
            mySection.removeChild(mySection.firstChild);

            break;
        }
      }
      subTaskPage.classList.remove("hidden");
      subTaskPage.style.left = 0;
      subTaskPage.dataset.newId = crop._id;
      subTaskPage.dataset.newSt = crop.taskStatus;
      subTaskPage.dataset.newtaskId = crop.taskId;
      subTaskPage.dataset.newtaskName = crop.taskName;
      subTaskPage.dataset.newcropName = crop.title;
      subtaskClone.querySelector("article h1 span ").textContent = crop.title;
      subtaskClone.querySelector("article h3 span").textContent = crop.orderId;
      subtask.appendChild(subtaskClone);
      loaderAnimation.classList.toggle("hidden");
    });
  document.querySelector(".orders-wrapper").appendChild(clone);
}

// Play buttonb for changung the task status to 'In process'
function playFunc(e) {
  let signalid = e.target.parentElement.parentElement.parentElement.dataset.id;
  clearPage();
  updateStatus(signalid);
  loaderAnimation.classList.toggle("hidden");
}
//Pause buttonb for changung the task status to 'Paused'

function pauseFunc(e) {
  let signalid2 = e.target.parentElement.parentElement.parentElement.dataset.id;
  clearPage();
  updatePausedStatus(signalid2);
  loaderAnimation.classList.toggle("hidden");
}

//Done buttonb for changung the task id'
// donebtn.addEventListener("click", taskIdChange);
let mytaskId, mytaskName, mycropName;

function finishFunc(e) {
  signalid3 = e.target.parentElement.parentElement.parentElement.dataset.id;
  mytaskId =
    e.target.parentElement.parentElement.parentElement.dataset.newtaskId;
  mytaskName =
    e.target.parentElement.parentElement.parentElement.dataset.newtaskName;
  mycropName =
    e.target.parentElement.parentElement.parentElement.dataset.newcropName;
  console.log("first", mytaskName, mycropName);
  if (
    mycropName == "Sunflower" ||
    mycropName == "Peas" ||
    mycropName == "Tallerkensmækker"
  ) {
    switch (mytaskName) {
      case "Prepare":
        mytaskName = "Sow";
        break;
      case "Sow":
        mytaskName = "Blackout";
        break;
      case "Blackout":
        mytaskName = "Light";
        break;
      case "Light":
        mytaskName = "Harvest";
        break;
      case "Harvest":
        // //Deleting data from the database
        deletOrder(signalid3);
        break;
    }
  } else {
    switch (mytaskName) {
      case "Prepare":
        mytaskName = "Blackout";
        break;
      case "Blackout":
        mytaskName = "Light";
        break;
      case "Light":
        mytaskName = "Harvest";
        break;
      case "Harvest":
        deletOrder(signalid3);
        break;
    }
  }

  console.log(mytaskName);
  updateTaskId(signalid3, mytaskId, mytaskName);
  clearPage();
  loaderAnimation.classList.toggle("hidden");
}
function updateTaskId(id, taskid, taskname) {
  console.log(id);
  let data = {
    taskId: ++taskid,
    taskName: taskname,
    taskStatus: "In queue"
  };
  let postData = JSON.stringify(data);

  fetch(`https://herfra-c61d.restdb.io/rest/crops/${id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5c8d68eacac6621685acbfb2",
      "cache-control": "no-cache"
    },
    body: postData
  })
    .then(d => d.json())
    .then(t => {
      console.log(t);
      getData();
    });
}

function updateStatus(id) {
  let data = {
    taskStatus: "In process"
  };
  let postData = JSON.stringify(data);

  fetch(`https://herfra-c61d.restdb.io/rest/crops/${id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5c8d68eacac6621685acbfb2",
      "cache-control": "no-cache"
    },
    body: postData
  })
    .then(d => d.json())
    .then(t => {
      console.log(t);
      getData();
    });
}
function updatePausedStatus(id) {
  let data = {
    taskStatus: "Paused"
  };
  let postData = JSON.stringify(data);

  fetch(`https://herfra-c61d.restdb.io/rest/crops/${id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5c8d68eacac6621685acbfb2",
      "cache-control": "no-cache"
    },
    body: postData
  })
    .then(d => d.json())
    .then(t => {
      console.log(t);
      getData();
    });
}
///Deleting from database
function deletOrder(id) {
  fetch(`https://herfra-c61d.restdb.io/rest/crops/${id}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5c8d68eacac6621685acbfb2",
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(data => console.log(data));
}
function clearPage() {
  while (subtask.hasChildNodes()) {
    subtask.removeChild(subtask.firstChild);
  }
  while (ordersWrapper.hasChildNodes()) {
    ordersWrapper.removeChild(ordersWrapper.firstChild);
  }
  while (subtasksContainer.hasChildNodes()) {
    subtasksContainer.removeChild(subtasksContainer.firstChild);
  }
  while (imageContainer.hasChildNodes()) {
    imageContainer.removeChild(imageContainer.firstChild);
  }
  subTaskPage.classList.add("hidden");
}

function filterOrders() {
  x2 = document.getElementById("filter1").value;
  console.log("value", x2);
  while (ordersWrapper.hasChildNodes()) {
    ordersWrapper.removeChild(ordersWrapper.firstChild);
  }
  loaderAnimation.classList.toggle("hidden");
  getData2();
}
function filterOrdersByStatus() {
  x1 = document.getElementById("filter0").value;
  console.log("value", x1);
  while (ordersWrapper.hasChildNodes()) {
    ordersWrapper.removeChild(ordersWrapper.firstChild);
  }
  loaderAnimation.classList.toggle("hidden");
  getData1();
}
document.querySelector("#back").addEventListener("click", refreshPage);
function refreshPage() {
  subTaskPage.style.left = "100vw";
  loaderAnimation.classList.toggle("hidden");
  document.location.reload();
}

//Filter the orders
let i, j, selElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
let d1 = document.getElementsByClassName("custom-select");
let d2 = document.getElementsByClassName("custom-selecto");
function customeFilter(x) {
  for (i = 0; i < x.length; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];

    /*for each element, create a new DIV that will act as the selected item:*/
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /*for each element, create a new DIV that will contain the option list:*/
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < selElmnt.length; j++) {
      /*for each option in the original select element,
create a new DIV that will act as an option item:*/
      c = document.createElement("DIV");
      c.innerHTML = selElmnt.options[j].innerHTML;

      c.addEventListener("click", function(e) {
        /*when an item is clicked, update the original select box,
and the selected item:*/
        let y, i, k, s, h;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        h = this.parentNode.previousSibling;

        for (i = 0; i < s.length; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            for (k = 0; k < y.length; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");

            break;
          }
        }
        h.click();
        let parent = e.target.parentElement.parentElement;
        if (parent.classList.contains("custom-select")) {
          filterOrdersByStatus();
        } else {
          if (parent.classList.contains("custom-selecto")) {
            filterOrders();
          }
        }

        document.querySelector(".custom-select").classList.toggle("hidden");
        document.querySelector(".custom-selecto").classList.toggle("hidden");
        document.querySelector(".all").classList.toggle("hidden");
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);

    a.addEventListener("click", function(e) {
      /*when the select box is clicked, close any other select boxes,
 and open/close the current select box:*/
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
  }
  function closeAllSelect(elmnt) {
    /*a function that will close all select boxes in the document,
except the current select box:*/
    var x,
      y,
      i,
      arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    for (i = 0; i < y.length; i++) {
      if (elmnt == y[i]) {
        arrNo.push(i);
      } else {
        y[i].classList.remove("select-arrow-active");
      }
    }
    for (i = 0; i < x.length; i++) {
      if (arrNo.indexOf(i)) {
        x[i].classList.add("select-hide");
      }
    }
  }
  /*if the user clicks anywhere outside the select box,
then close all select boxes:*/
  document.addEventListener("click", closeAllSelect);
}
document.querySelector(".filter-btn").addEventListener("click", showOptions);
function showOptions(e) {
  e.stopPropagation();
  document.querySelector(".custom-select").classList.toggle("hidden");
  document.querySelector(".custom-selecto").classList.toggle("hidden");
  document.querySelector(".all").classList.toggle("hidden");
  document.querySelector(".all").classList.add("slide-down");
}
customeFilter(d1);
customeFilter(d2);
document.querySelector(".all").addEventListener("click", showAll);
function showAll() {
  document.location.reload();
}

document.addEventListener("click", function(e) {
  document.querySelector(".custom-select").classList.add("hidden");
  document.querySelector(".custom-selecto").classList.add("hidden");
  document.querySelector(".all").classList.add("hidden");
});
