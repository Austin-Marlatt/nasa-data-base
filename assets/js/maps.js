fetch("https://eonet.gsfc.nasa.gov/api/v3/events?limit=5")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    console.log(data.events);

    let event = data.events[0];
    let recentData = event.geometry;
    let currentData = recentData[recentData.length - 1];
    let xAxis = currentData.coordinates[1];
    let yAxis = currentData.coordinates[0];
    let location = xAxis + " " + yAxis;

    $("#title").text(event.title);
    $("#event-id").text(event.id);
    $("#category").text(event.categories[0].title);
    $("#time-date").text(currentData.date);
    $("#description").text(event.description);
    $("#geometry-units").text(currentData.magnitudeUnit);
    $("#geometry-value").text(currentData.magnitudeValue);
    $("#sources").text(event.sources[0].url);
    $("#map").attr(
      "src",
      `https://www.google.com/maps/embed/v1/place?key=AIzaSyALVHUah6fxUBeyPbNT4egSXn6uqKqjoR8&q=${location}`
    );
  });
