// API key for all NASA API: HcKzIbpGDIu4Y2fxsjRTcl6webEZRL4GSVy57yHN -AM
// Basic JS fetch for current APoD API -AM
fetch(
  "https://api.nasa.gov/planetary/apod?api_key=HcKzIbpGDIu4Y2fxsjRTcl6webEZRL4GSVy57yHN"
)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    // checks if HD image is availble, defaults to SD, sets to background-photo -AM
    if (data.hdurl) {
      let APoD = data.hdurl;
      $(".hero").css("background-image", `url(${APoD})`);
    } else {
      let APoD = data.url;
      $(".hero").css("background-image", `url(${APoD})`);
    }
    // retreives image title and explanation and writes it to the page -AM
    let title = data.title;
    let titleLocation = document.getElementById("APoD-title");
    titleLocation.textContent = title;

    let explanation = data.explanation;
    let explanationText = document.getElementById("APoD-exp");
    explanationText.textContent = explanation;
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

$(".apod").click(function () {
  $(".apod").hide();
});

// $(".apod").click(function(){
//   $("P").show();
// });
