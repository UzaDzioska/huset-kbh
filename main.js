function fetchEvents() {
    fetch("http://zuzannadzialowska.com/wordpress/wp-json/wp/v2/events?_embed&categories=7,8,9,10")
        .then(e => e.json())
        .then(showEvents)
}

function showEvents(data) {
    console.log(data);
    data.forEach(showSingleEvent);
}

function showSingleEvent(anEvent) {
    console.log(anEvent)
    let template = document.querySelector("#evttemp").content;
    let clone = template.cloneNode(true);

    clone.querySelector("h1").textContent = anEvent.title.rendered;
    clone.querySelector(".descript").innerHTML = anEvent.content.rendered;
    clone.querySelector(".price span").textContent = anEvent.acf.price;
    clone.querySelector(".color").style.background = anEvent.acf.color;
    if (anEvent._embedded["wp:featuredmedia"]) { //img is there
        clone.querySelector("img").setAttribute("src", anEvent._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url)

    } else { //no img
        clone.querySelector(".event-pic").remove();
    }



    let eventlist = document.querySelector("#eventlist");
    eventlist.appendChild(clone);
}
fetchEvents();
