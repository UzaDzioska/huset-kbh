let urlParams = new URLSearchParams(window.location.search);

let id = urlParams.get("id");
console.log("I want to get article: " + id);

fetch("http://zuzannadzialowska.com/wordpress/wp-json/wp/v2/events/" + id)
    .then(e => e.json())
    .then(showSingleEvent)

function showSingleEvent(aPost) {
    console.log(aPost);
    document.querySelector("#singleEvent h1").textContent=aPost.title.rendered;
}
