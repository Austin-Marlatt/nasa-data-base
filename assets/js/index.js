// API key for all NASA API: HcKzIbpGDIu4Y2fxsjRTcl6webEZRL4GSVy57yHN -AM
// Basic JS fetch for current APoD API -AM
fetch("https://api.nasa.gov/planetary/apod?api_key=HcKzIbpGDIu4Y2fxsjRTcl6webEZRL4GSVy57yHN")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);

    let APoD = data.url;
    console.log(APoD);
    let picLocation = document.getElementById("");
    picLocation.setAttribute("src", APoD);
  });
