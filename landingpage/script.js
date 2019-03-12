"use strict";
window.addEventListener("DOMContentLoaded", init);
const temp = document.querySelector("template").content;
const subTemp = document.querySelector(".subtask-temp").content;
const statusBtn = document.querySelector("#profile");
const subTaskPage = document.querySelector(".status-page");
const startbtn = document.querySelector("#start");
const pausebtn = document.querySelector("pause");
const donebtn = document.querySelector("#done");
const subtasksContainer = document.querySelector(".subtasks-container");
let subtask = document.querySelector(".subtask");
let imageContainer = document.querySelector(".img-container");
let ordersWrapper = document.querySelector(".orders-wrapper");
let signalid;
let x = new Date().toDateString();
document.querySelector(".heading h3").textContent = x.substring(3);
document.querySelector("header h3").textContent = x.substring(3);
function init() {
  getData();
}
function getData() {
  fetch("http://artingineer.dk/refarmedwordpress/wp-json/wp/v2/posts")
    .then(res => res.json())
    .then(showCrops);
}

function showCrops(crops) {
  console.log(crops);
  crops.forEach(showSingleCrop);
}

function showSingleCrop(crop) {
  const clone = temp.cloneNode(true);
  const subtaskClone = subTemp.cloneNode(true);
  clone.querySelector("article h1 span").textContent = crop.title.rendered;
  clone.querySelector("article h3 span").textContent = crop.acf.orderid;
  clone.querySelector("article ").dataset.id = crop.acf.orderid;
  clone.querySelector("#secondpart p span").textContent = crop.acf.Taskstatus;
  clone.querySelector("article p #task-name").textContent = crop.acf.Taskname;
  const taskId = crop.acf.Taskid;
  // conditional rendernig of the task images
  const seedName = crop.title.rendered;
  if (
    seedName === "Sunflower" ||
    seedName === "Peas" ||
    seedName === "Tallerkensmækker"
  ) {
    switch (taskId) {
      case "1":
        clone
          .querySelector(" #secondpart #prepare-img")
          .classList.remove("hidden");
        break;
      case "2":
        clone.querySelector(" #secondpart #sow-img").classList.remove("hidden");
        break;
      case "3":
        clone
          .querySelector(" #secondpart #blackout-img")
          .classList.remove("hidden");
        break;
      case "4":
        clone
          .querySelector(" #secondpart #light-img")
          .classList.remove("hidden");
      case "5":
        clone
          .querySelector(" #secondpart #harvest-img")
          .classList.remove("hidden");
        break;
    }
  } else {
    switch (taskId) {
      case "1":
        clone
          .querySelector(" #secondpart #prepare-img")
          .classList.remove("hidden");
        break;
      case "2":
        clone
          .querySelector(" #secondpart #blackout-img")
          .classList.remove("hidden");
        break;
      case "3":
        clone
          .querySelector(" #secondpart #light-img")
          .classList.remove("hidden");
        break;
      case "4":
        clone
          .querySelector(" #secondpart #harvest-img")
          .classList.remove("hidden");
    }
  }
  //conditinal rendering of task-status image
  let taskStatus = crop.acf.Taskstatus;
  switch (taskStatus) {
    case "In queue":
      clone.querySelector("#in-queue").classList.remove("hidden");
      break;
    case "In process":
      clone.querySelector("#in-process").classList.remove("hidden");
      break;
    case "Paused":
      clone.querySelector("#paused").classList.remove("hidden");
      break;
  }
  // this piece of code recognise the order which has been clicked
  clone.querySelector("#secondpart").addEventListener("click", e => {
    //check the name of the seed to see if it needs soaking or not
    const seedName = crop.title.rendered;
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

    if (
      seedName === "Sunflower" ||
      seedName === "Peas" ||
      seedName === "Tallerkensmækker"
    ) {
      //check the task id to show correspondant task and sub task
      switch (taskId) {
        case "1":
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
        // case "2":
        //   document.querySelector(".sow").classList.remove("hidden");
        //   document.querySelector("#sow").classList.remove("hidden");
        //   break;
        // case "3":
        //   document.querySelector(".blackout").classList.remove("hidden");
        //   document.querySelector("#blackout").classList.remove("hidden");
        //   break;
        // case "4":
        //   document.querySelector(".light").classList.remove("hidden");
        //   document.querySelector("#light").classList.remove("hidden");
        //   break;
        case "5":
          myImge.setAttribute(
            "src",
            "http://artingineer.dk/rf-asset/harvest.png"
          );
          myImge.setAttribute("alt", "harvest-stage");
          mySection.setAttribute("class", "prepare");
          listImage.setAttribute(
            "src",
            "http://artingineer.dk/rf-asset/list1.png"
          );
          let actionImageHarvest = document.createElement("img");
          actionImageHarvest.setAttribute(
            "src",
            "http://artingineer.dk/rf-asset/soak.png"
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
        case "1":
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
        case "2":
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
          document.querySelector(".btn-container").style.top = "44vh";
          break;
        case "3":
          document.querySelector("#light2").classList.remove("hidden");
          break;
        case "4":
          document.querySelector("#harvest2").classList.remove("hidden");
          break;
      }
    }
    console.log(seedName);
    subTaskPage.classList.remove("hidden");
    subTaskPage.style.left = 0;
    subTaskPage.dataset.another = crop.id;
    subtaskClone.querySelector("article h1 span ").textContent =
      crop.title.rendered;
    subtaskClone.querySelector("article h3 span").textContent =
      crop.acf.orderid;
    subtask.appendChild(subtaskClone);
  });

  document.querySelector(".orders-wrapper").appendChild(clone);
}
// buttons for changung the task status
startbtn.addEventListener("click", taskStatusChange);
function taskStatusChange(e) {
  signalid = e.target.parentElement.parentElement.dataset.another;
  console.log(signalid);
  startbtn.style.background = "grey";
  console.log(e.target.parentElement.parentElement);
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

  getData();
  updateStatus(signalid);
}
function updateStatus(id) {
  const payLoad = {
    taskStatus: "In process"
  };
  const postData = JSON.stringify(payLoad);
  fetch(`http://artingineer.dk/refarmedwordpress/wp-json/wp/v2/posts/${id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: postData
  })
    .then(res => res.json())
    .then(d => {
      console.log(d);
    });
}
