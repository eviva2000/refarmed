const temp = document.querySelector("template").content;
function getData() {
  fetch("http://artingineer.dk/refarmedwordpress/wp-json/wp/v2/posts")
    .then(res => res.json())
    .then(showCrops);
}
function showCrops(crops) {
  console.log(crops);
  crops.forEach(function(crop) {
    const clone = temp.cloneNode(true);
    clone.querySelector("h2 span").textContent = crop.slug;
    clone.querySelector("h3 span").textContent = crop.acf.id;
    clone.querySelector("p span").textContent = crop.acf.status;
    clone.querySelector("h4 span").textContent = crop.acf.progress;
    document.querySelector(".orders-wrapper").appendChild(clone);
  });
}

getData();
