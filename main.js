let template = document.querySelector("#evttemp").content;
let eventlist = document.querySelector("#eventlist");
let page = 1;
let lookingForData = false;

function fetchEvents() {
    lookingForData = true;
    
    fetch("http://zuzannadzialowska.com/wordpress/wp-json/wp/v2/events?_embed&per_page=5&categories=7,8,9,10&order=asc&page=" + page)
        .then(e => e.json())
        .then(showEvents)
}

function showEvents(data) {
    console.log(data);
    lookingForData = false;
    data.forEach(showSingleEvent); 
}

function showSingleEvent(anEvent) {
    let clone = template.cloneNode(true);

    clone.querySelector("h1").textContent = anEvent.title.rendered;
    clone.querySelector(".descript").innerHTML = anEvent.content.rendered;
    clone.querySelector(".price span").textContent = anEvent.acf.price;
    /*
 clone.querySelector(".location").textContent = anEvent.acf.location;
 clone.querySelector(".time").textContent = anEvent.acf.time; clone.querySelector(".date").textContent = anEvent.acf.date;*/ //not working

    if (anEvent._embedded["wp:featuredmedia"]) { //img is there
        clone.querySelector("img").setAttribute("src", anEvent._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url)

    } else { //no img
        clone.querySelector("img").remove();
    }
    
    clone.querySelector('.readmore').href="subpage.html?id=" + anEvent.id;


    eventlist.appendChild(clone);
}

fetchEvents();

setInterval(function () {

    if (bottomVisible() && lookingForData === false) {
        console.log("We've reached rock bottom, fetching articles")
        page++;
        fetchEvents();
    }
}, 1000)

function bottomVisible() {
    const scrollY = window.scrollY
    const visible = document.documentElement.clientHeight
    const pageHeight = document.documentElement.scrollHeight
    const bottomOfPage = visible + scrollY >= pageHeight
    return bottomOfPage || pageHeight < visible
}
