// experimental; lets users see the image on their birth day -AM
let birthImage =
  "https://api.nasa.gov/planetary/apod?api_key=HcKzIbpGDIu4Y2fxsjRTcl6webEZRL4GSVy57yHN&date=" +input+"";
fetch(birthImage)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // checks if an HD version is available, defaults to SD if not
    if (data.hdurl) {
      let APoD = data.hdurl;
      let picLocation = document.getElementById("");
      picLocation.setAttribute("src", APoD);
    } else {
      let APoD = data.url;
      let picLocation = document.getElementById("");
      picLocation.setAttribute("src", APoD);
    }
  });
