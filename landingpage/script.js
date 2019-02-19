"use strict";
const temp = document.querySelector("template").content;
const subTemp = document.querySelector(".subtask-temp").content;
const statusBtn = document.querySelector("#profile");
const subTaskPage = document.querySelector(".status-page");
let x = new Date().toDateString();
console.log(typeof x);
document.querySelector(".heading h3").textContent = x.substring(3);
document.querySelector("header h3").textContent = x.substring(3);

function getData() {
  fetch("http://artingineer.dk/refarmedwordpress/wp-json/wp/v2/posts")
    .then(res => res.json())
    .then(showCrops);
}
function showCrops(crops) {
  console.log(crops);
  crops.forEach(function(crop) {
    const clone = temp.cloneNode(true);
    const subtaskClone = subTemp.cloneNode(true);
    clone.querySelector("article h1 span").textContent = crop.title.rendered;
    clone.querySelector("article h3 span").textContent = crop.acf.orderid;
    clone.querySelector("article ").dataset.id = crop.acf.orderid;
    clone.querySelector("article p span").textContent = crop.acf.Taskstatus;
    clone.querySelector("article p #task-name").textContent = crop.acf.Taskname;
    // clone.querySelector("article h4 span").textContent = crop.acf.progress;
    clone.querySelector("article #secondpart img").src =
      crop.acf.img.sizes.medium;
    // this piece of code recognise the order which has been clicked
    clone.querySelector("#secondpart").addEventListener("click", e => {
      const id = e.target.parentElement.dataset.id;
      const taskId = crop.acf.Taskid;
      console.log(taskId);
      //check the name of the seed to see if it needs soaking or not
      const seedName = crop.title.rendered;
      if (
        seedName === "Sunflower" ||
        seedName === "Peas" ||
        seedName === "Tallerkensmækker"
      ) {
        //check the task id to show correspondant task and sub task
        switch (taskId) {
          case "1":
            document.querySelector(".prepare").classList.remove("hidden");
            break;
          case "2":
            document.querySelector(".sow").classList.remove("hidden");
            break;
          case "3":
            document.querySelector(".blackout").classList.remove("hidden");
            break;
          case "4":
            document.querySelector(".light").classList.remove("hidden");
            break;
          case "5":
            document.querySelector(".harvest").classList.remove("hidden");
            break;
        }
      } else {
        switch (taskId) {
          case "1":
            document.querySelector(".prepare-sow").classList.remove("hidden");
            break;
          case "2":
            document.querySelector(".blackout").classList.remove("hidden");
            break;
          case "3":
            document.querySelector(".light").classList.remove("hidden");
            break;
          case "4":
            document.querySelector(".harvest").classList.remove("hidden");
            break;
        }
      }
      console.log(seedName);

      subTaskPage.classList.remove("hidden");
      subTaskPage.style.left = 0;
      subtaskClone.querySelector("article h1 span").textContent =
        crop.title.rendered;
      subtaskClone.querySelector("article h3 span").textContent =
        crop.acf.orderid;
      document.querySelector(".subtask").appendChild(subtaskClone);
    });

    document.querySelector(".orders-wrapper").appendChild(clone);
  });
}

getData();
