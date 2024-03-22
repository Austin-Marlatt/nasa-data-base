// fetches first 5 eonet events -AM
let categorySearchUrl = "https://eonet.gsfc.nasa.gov/api/v3/events?limit=5";

function getEvent() {
  let categorySearch = categorySearchUrl
  fetch(categorySearch)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.events);

      // stores desired metadata in variables -AM
      let event = data.events[0];
      let recentData = event.geometry;
      let currentData = recentData[recentData.length - 1];
      let xAxis = currentData.coordinates[1];
      let yAxis = currentData.coordinates[0];
      let location = xAxis + " " + yAxis;

      // writes metadata to specific html elements on the page -AM
      $("#title").text(event.title);
      $("#event-id").text(event.id);
      $("#category").text(event.categories[0].title);
      $("#time-date").text(currentData.date);
      $("#description").text(event.description);
      $("#geometry-units").text(currentData.magnitudeUnit);
      $("#geometry-value").text(currentData.magnitudeValue);
      $("#sources").text(event.sources[0].url);
      // inserts coordinates from event to google maps <ifame>
      // to dynamically display the current events location -AM
      $("#map").attr(
        "src",
        `https://www.google.com/maps/embed/v1/place?key=AIzaSyALVHUah6fxUBeyPbNT4egSXn6uqKqjoR8&q=${location}`
      );
    });
}

getEvent();

function categorySearch() {
  let search = $("#categories").val();
  let categorySearchUrl = `https://eonet.gsfc.nasa.gov/api/v3/categories/${search}?limit=5`;
  getEvent(categorySearchUrl);
  console.log(categorySearchUrl);
  console.log(search);
};

$("#categories-search").click(function () {
  categorySearch();
  $("trees").modal();
});

