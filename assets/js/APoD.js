// calls the datepicker -AM
$(function () {
  $("#datepicker").datepicker();
});

// search button event handler, user selected date reformated for APoD api -AM
$("#search-btn").click(function () {
  let searchDate = dayjs($("#datepicker").val()).format("YYYY-MM-DD");
  dateSearch(searchDate);
});

// handles the api get call -AM
function dateSearch(searchDate) {
  // url takes in reformated date from js:8 -AM
  let dateSearchUrl = `https://api.nasa.gov/planetary/apod?api_key=HcKzIbpGDIu4Y2fxsjRTcl6webEZRL4GSVy57yHN&date=${searchDate}`;

  fetch(dateSearchUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // checks if an HD version is available, defaults to SD if not -AM
      // TODO: display image on page -AM
      if (data.hdurl) {
        let APoD = data.hdurl;
        console.log(APoD);
      } else {
        let APoD = data.url;
        console.log(APoD);
      }
      // retreives image title and explanation and writes it to the page -AM
      // let title = data.title;
      // let titleLocation = document.getElementById("APoD-title");
      // titleLocation.textContent = title;

      // let explanation = data.explanation;
      // let explanationText = document.getElementById("APoD-exp");
      // explanationText.textContent = explanation;
    });
}
