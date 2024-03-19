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

