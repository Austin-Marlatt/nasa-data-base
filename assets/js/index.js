// API key for all NASA API: HcKzIbpGDIu4Y2fxsjRTcl6webEZRL4GSVy57yHN -AM
// Basic JS fetch for current APoD API -AM
fetch("https://api.nasa.gov/planetary/apod?api_key=HcKzIbpGDIu4Y2fxsjRTcl6webEZRL4GSVy57yHN")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    if (data.hdurl) {
      let APoD = data.hdurl;
      // let picLocation = document.getElementById(""); (TBU)
      // picLocation.setAttribute("src", APoD); (TBU)
    } else {
      let APoD = data.url;
      // let picLocation = document.getElementById(""); (TBU)
      // picLocation.setAttribute("src", APoD); (TBU)
    }
    let title = data.title;
    // let titleLocation = document.getElementById(""); (TBU)
    // titleLocation.textContent = title; (TBU)

    let explanation = data.explanation;
    let explanationTitle =document.getElementById("")
    explanationTitle.textContent = explanation;
  });

  // no API key needed? -AM
  fetch("https://eonet.gsfc.nasa.gov/api/v3/events?limit=5")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);

    console.log(data.events);
    let event = data.events[0];
    console.log(event);
    console.log(event.title);
    console.log(event.id);
    console.log(event.categories[0].title);
    console.log(event.description);
    console.log(event.geometry);
    console.log(event.sources[0].url);

  });