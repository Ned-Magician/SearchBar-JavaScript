const result = document.querySelector(".result");
const imageList = document.querySelector(".image-list");
const search = document.getElementById("input");

let lastValue = "";
let ready = true;
let query = "";
search.addEventListener("keyup", handle);
async function handle(event) {
  if (!ready) {
    return;
  }

  lastValue = event.target.value;
  // (__________________ Fetch Information _________________)
  let clientId = "z-GCkggybLMS5Sm4QNcUfqNeXmK1ZAggiAboHuwCAGs";
  query = encodeURIComponent(event.target.value);
  let url =
    "https://api.unsplash.com/search/photos/?client_id=" +
    clientId +
    "&query=" +
    query;

  const response = await fetch(url);
  const images = await response.json();
  let photos = images.results;

  // <<<<<<<<<<<<<<<<< LET'S START .>>>>>>>>>>>>>>>
  //<<<<<<<<<<<<<<<<<< FOUNDED IMAGES >>>>>>>>>>>>

  result.innerHTML = `Found: ${photos.length} Images`;

  //  <<<<<<<EachFor>>>>>>
  if (photos.length) {
    photos.forEach((image) => {
      let imageCard = document.createElement("img");
      imageCard.setAttribute("src", image.urls.regular);
      imageCard.setAttribute("id", image.id);
      imageList.append(imageCard);

      imageCard.addEventListener("load", () => {
        let height = imageCard.clientHeight;
        const spans = Math.ceil(height / 10) + 1;
        imageCard.setAttribute("style", `grid-row-end:span ${spans}`);
      });
    });
  } else {
    imageList.innerHTML = "";
    result.innerHTML = "";
  }
  if (this.value != lastValue) {
    handle.call(this);
  } else {
    ready = false;
  }
}
search.addEventListener("change", (event) => {
  if (lastValue != event) {
    imageList.innerHTML = "";
    ready = true;
  } else {
    return;
  }
});
