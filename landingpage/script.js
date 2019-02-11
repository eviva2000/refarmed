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
    clone.querySelector("article h2 span").textContent = crop.title.rendered;
    clone.querySelector("article h3 span").textContent = crop.acf.id;
    clone.querySelector("article p span").textContent = crop.acf.status;
    clone.querySelector("article h4 span").textContent = crop.acf.progress;
    clone.querySelector("article #secondpart img").src =
      crop.acf.img.sizes.medium;
    document.querySelector(".orders-wrapper").appendChild(clone);
  });
}

getData();
