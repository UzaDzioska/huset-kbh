let template = document.querySelector("#evttemp").content;
let eventlist = document.querySelector("#eventlist");
let page = 1;
let lookingForData = false;

//window.addEventListener("scroll", bottomVisible);

function fetchEvents() {
    lookingForData = true;

    fetch("http://zuzannadzialowska.com/wordpress/wp-json/wp/v2/events?_embed&per_page=2&categories=7,8,9,10,22&order=asc&page=" + page)
        .then(e => e.json())
        .then(showEvents)
}

function showEvents(data) {
    console.log(data);
    lookingForData = false;
    if (Array.isArray(data)){
        data.forEach(showSingleEvent);
    } else {
        lookingForData = true;
    }
    
}

function showSingleEvent(anEvent) {
    let clone = template.cloneNode(true);

    clone.querySelector("h1").textContent = anEvent.title.rendered;
    //clone.querySelector(".descript").innerHTML = anEvent.content.rendered;
    clone.querySelector(".event_price span").textContent = anEvent.acf.event_price;
    clone.querySelector(".event_location").textContent = anEvent.acf.event_location;
    clone.querySelector(".event_time").textContent = anEvent.acf.event_time;
    //clone.querySelector(".event_date").textContent = anEvent.acf.event_date;

    if (anEvent._embedded["wp:featuredmedia"]) { //img is there
        clone.querySelector("img").setAttribute("src", anEvent._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url)

    } else { //no img
        clone.querySelector("img").remove();
    }
    
    var year = anEvent.acf.event_date.substring(2, 4);
    var month = anEvent.acf.event_date.substring(4, 6);
    var day = anEvent.acf.event_date.substring(6, 8);

    clone.querySelector(".event_date").textContent = day + "/" + month + "/" + year;

    clone.querySelector('.readmore').href = "subpage.html?id=" + anEvent.id;

    eventlist.appendChild(clone);
}

fetchEvents();


//found this stuff online
setInterval(function(){

  if(bottomVisible() && lookingForData===false){
    console.log("We've reached rock bottom, fetching articles")
    page++;
    fetchEvents();
  }
}, 1000);

function bottomVisible() {
    console.log("in");
  const scrollY = window.scrollY
  const visible = document.documentElement.clientHeight
  const pageHeight = document.documentElement.scrollHeight-20
  const bottomOfPage = visible + scrollY >= pageHeight
  console.log(scrollY+visible, pageHeight, bottomOfPage)
  return bottomOfPage || pageHeight < visible
}
