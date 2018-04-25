function fetchEvents() {
    fetch("http://zuzannadzialowska.com/wordpress/wp-json/wp/v2/events")
        .then(e => e.json())
        .then(showEvents)
}

function showEvents(data) {
    console.log(data);
    data.forEach(showSingleEvent)
}

function showSingleEvent(anEvent) {
    console.log(anEvent)
    let template = document.querySelector("#evttemp").content;
    let clone = template.cloneNode(true);

    clone.querySelector("h1").textContent = anEvent.title.rendered;
    clone.querySelector(".descript").innerHTML = anEvent.content.rendered;
    clone.querySelector(".price").textContent = anEvent.acf.price;
    clone.querySelector(".color").style.background = anEvent.acf.color;


    let eventlist = document.querySelector("#eventlist");
    eventlist.appendChild(clone);
}
fetchEvents();
