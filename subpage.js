// url

let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get("id");
console.log("get article " + id)


fetch("http://zuzannadzialowska.com/wordpress/wp-json/wp/v2/events/" + id+"?_embed")
    .then(e => e.json())
    .then(showSinglePost)

function showSinglePost(aPost) {
    console.log(aPost);

    //get title
    document.querySelector("#singleEvent h1").textContent = aPost.title.rendered;

    //get description
    document.querySelector(".event_descript").innerHTML = aPost.content.rendered;

    //get price
    document.querySelector(".event_price span").textContent = aPost.acf.event_price;

 //get images

    if (aPost._embedded["wp:featuredmedia"]) { //img is there
        document.querySelector("img").setAttribute("src", aPost._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url)

    } else { //no img
        document.querySelector(".event-pic").remove();
    }





    //show eventsection

    document.querySelector("#singleEvent").classList.add("slideInEvent")


}
