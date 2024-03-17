// calls the datepicker 
$(function () {
  $("#datepicker").datepicker();
});

$("#search-btn").click(function () {
  let searchDate = dayjs($("#datepicker").val()).format("YYYY-MM-DD");
  dateSearch(searchDate);
});

function dateSearch(searchDate) {
  let dateSearchUrl = `https://api.nasa.gov/planetary/apod?api_key=HcKzIbpGDIu4Y2fxsjRTcl6webEZRL4GSVy57yHN&date=${searchDate}`;

  fetch(dateSearchUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // checks if an HD version is available, defaults to SD if not
      if (data.hdurl) {
        let APoD = data.hdurl;
        console.log(APoD);
      } else {
        let APoD = data.url;
        console.log(APoD);
      }
    });
}
