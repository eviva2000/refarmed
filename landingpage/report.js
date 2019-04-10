window.addEventListener("DOMContentLoaded", init);

const endpoint = "https://herfra-c61d.restdb.io/rest/crops";
let template = document.querySelector("template").content;
let loaderAnimation = document.querySelector(".loader");
let anotherArr = [];
let Sunflower = document.querySelector("#Sunflower ");
let Peas = document.querySelector("#Peas");
let Mustard = document.querySelector("#Mustard");
let Wasabi = document.querySelector("#Wasabi");
let PurpleRadish = document.querySelector("#Purple-radish");
let i = 0;
let j = 0;
let k = 0;
let l = 0;
let z = 0;

function init() {
  loaderAnimation.classList.toggle("hidden");
  getData();
}

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
function showCrops(crops) {
  crops.forEach(showSingleCrop);
  console.log(crops);
}
let sortArr = [];
function showSingleCrop(crop) {
  const clone = template.cloneNode(true);
  clone.querySelector("h2 span").textContent = crop.orderId;
  clone.querySelector("p span").textContent = crop.taskName;
  let deliveryDate = crop.deliveryDate;
  let n = new Date(deliveryDate);
  let m = n.toDateString().slice(4, 10);
  clone.querySelector("h3 span").textContent = m;
  let x = crop.title;

  switch (x) {
    case "Sunflower":
      i++;
      document.querySelector("#Sunflower section").appendChild(clone);
      Sunflower.classList.remove("hidden");
      document.querySelector("#Sunflower h4 span").textContent = i;

      console.log(i);

      break;
    case "Mustard":
      j++;
      document.querySelector("#Mustard section").appendChild(clone);

      Mustard.classList.remove("hidden");
      document.querySelector("#Mustard h4 span").textContent = j;

      break;
    case "Wasabi":
      z++;
      document.querySelector("#Wasabi section").appendChild(clone);

      Wasabi.classList.remove("hidden");
      document.querySelector("#Wasabi h4 span").textContent = z;

      break;
    case "Peas":
      k++;
      document.querySelector("#Peas section").appendChild(clone);

      Peas.classList.remove("hidden");
      document.querySelector("#Peas h4 span").textContent = k;

      break;
    case "Purple radish":
      l++;
      document.querySelector("#Purple-radish section").appendChild(clone);
      PurpleRadish.classList.remove("hidden");
      document.querySelector("#Purple-radish h4 span").textContent = l;

      break;
  }
  document.getElementById("back2").classList.remove("hidden");
}
