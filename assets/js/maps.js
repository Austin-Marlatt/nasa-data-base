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
      if (event.description == null){
        $("#description").text("N/A");
      } else {
        $("#description").text(event.description);
        }
      $("#geometry-units").text(currentData.magnitudeUnit);
      $("#geometry-value").text(currentData.magnitudeValue);
      $("#sources").text(event.sources[0].url);
      // inserts coordinates from event to google maps <ifame>
      // to dynamically display the current events location -AM
      $("#google-map").attr(
        "src",
        `https://www.google.com/maps/embed/v1/place?key=AIzaSyALVHUah6fxUBeyPbNT4egSXn6uqKqjoR8&q=${location}`
      );
      showLayers(event.id);
    });
}

getEvent();

function categorySearch() {
  let search = $("#categories").val();
  let categorySearchUrl = `https://eonet.gsfc.nasa.gov/api/v3/categories/${search}?limit=10`;

  fetch(categorySearchUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      for (i=0; i < data.events.length; i++) {
        $("#content-search-result").append(
          `<button id="search-result-btn${i}" class="button is-responsive has-background-dark has-text-link" value="${data.events[i].link}">${data.events[i].title}</button>`
        )};

      $("#search-result-btn0").click(function(){
        let search = $("#search-result-btn0").val()
        categorySearchBtn(search)
      });
      
      $("#search-result-btn1").click(function(){
        let search = $("#search-result-btn1").val()
        categorySearchBtn(search)
      });
      
      $("#search-result-btn2").click(function(){
        let search = $("#search-result-btn2").val()
        categorySearchBtn(search)
      });

      $("#search-result-btn3").click(function(){
        let search = $("#search-result-btn3").val()
        categorySearchBtn(search)
      });

      $("#search-result-btn4").click(function(){
        let search = $("#search-result-btn4").val()
        categorySearchBtn(search)
      });

      $("#search-result-btn5").click(function(){
        let search = $("#search-result-btn5").val()
        categorySearchBtn(search)
      });

      $("#search-result-btn6").click(function(){
        let search = $("#search-result-btn6").val()
        categorySearchBtn(search)
      });
        
      $("#search-result-btn7").click(function(){
        let search = $("#search-result-btn7").val()
        categorySearchBtn(search)
      });
  
      $("#search-result-btn8").click(function(){
        let search = $("#search-result-btn8").val()
        categorySearchBtn(search)
      });
  
      $("#search-result-btn9").click(function(){
        let search = $("#search-result-btn9").val()
        categorySearchBtn(search)
      });
  });
};

$("#categories-search").click(function(){
  categorySearch();
  console.log("test");
});

function categorySearchBtn(search){
  fetch(search)
  .then(function(response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);

  // stores desired metadata in variables -AM
  let event = data;
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
  if (event.description == null){
  $("#description").text("N/A");
  } else {
  $("#description").text(event.description);
  }
  $("#geometry-units").text(currentData.magnitudeUnit);
  $("#geometry-value").text(currentData.magnitudeValue);
  $("#sources").text(event.sources[0].url);
  // inserts coordinates from event to google maps <ifame>
  // to dynamically display the current event location -AM
  $("#google-map").attr(
  "src",
  `https://www.google.com/maps/embed/v1/place?key=AIzaSyALVHUah6fxUBeyPbNT4egSXn6uqKqjoR8&q=${location}`
  );
  showLayers(event.id)
})
};

document.addEventListener('DOMContentLoaded', () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    if(event.key === "Escape") {
      closeAllModals();
    }
  });
});


var server = "https://eonet.gsfc.nasa.gov/api/v3";

    // Show the available layers for the event category
    function showLayers(eventId) {

        // fetch the single event feed
        $.getJSON( server + "/events/" + eventId )
            .done(function( event ) {
                // Get the date and first location of the event.
                // Events can have multiple locations but we are simplifying here.
                var location = event.geometry[0];

                $( "#eventTitle" ).append(": "+event.title+", "+location.date.substring(0,10));

                // Show list of categories and children layers
                $.each( event.categories, function( key, category ) {
                    $( "#layerList" ).append(
                        "<dt>"+category.title+"</dt> "
                    );

                    // Get the applicable layers for the specific event category.
                    // Only include WMTS_1_0_0 layers for now, will add WMS example later.
                    $.getJSON( server + "/layers/" + category.id )
                        .done(function( data ) {
                            var layers = data['categories'][0]['layers'];
                            $.each( layers, function( key, layer ) {
                                if (layer.serviceTypeId == "WMTS_1_0_0") {
                                    $( "#layerList" ).append(
                                        "<dd>" +
                                        "<a href='#' onclick='showMap(\"" + encodeURIComponent(JSON.stringify(layer)) + "\", \"" + encodeURIComponent(JSON.stringify(location)) + "\");'>" +
                                        layer.name+"</a></dd> "
                                    );
                                }
                            });
                        });
                });
            });
    }

    function showMap(encodedLayer, encodedLocation) {
        var layer = JSON.parse(decodeURIComponent(encodedLayer));
        var location = JSON.parse(decodeURIComponent(encodedLocation));

        var center = getCenter(location);

        // quick and dirty way to extract day string from full ISO datetime
        var mapTime = new Date(location.date).toJSON().substring(0,10);

        displayMap(layer.serviceUrl, layer.name,
            center, mapTime,
            layer.parameters[0].FORMAT, layer.parameters[0].TILEMATRIXSET);
    }

    function getCenter(geojson) {
        if (geojson.type == "Point") {
            return geojson.coordinates;
        } else if (geojson.type == "Polygon") {
            /*
            For this test we are going to compute the center point of the bounding box
            that encloses the geoJson Polygon.

            Since the Polygon specification consists of an outer ring and then inner holes,
            we will only compute the center of the first (outer) LinearRing in the Polygon.

            Convert these coordinates to 0-360 to make it easier
            */

            // use the first point of the first LinearRing as the default for calculations
            var ullat = geojson.coordinates[0][0][1] + 90;
            var ullon = geojson.coordinates[0][0][0] + 180;
            var lrlat = geojson.coordinates[0][0][1] + 90;
            var lrlon = geojson.coordinates[0][0][0] + 180;

            for (i = 0; i < geojson.coordinates[0].length; i++) {

                // longitudes
                if (geojson.coordinates[0][i][0] + 180 > ullon) {
                    ullon = geojson.coordinates[0][i][0] + 180;
                }
                if (geojson.coordinates[0][i][0] + 180 < lrlon) {
                    lrlon = geojson.coordinates[0][i][0] + 180;
                }

                // latitudes
                if (geojson.coordinates[0][i][1] + 90 > ullat) {
                    ullat = geojson.coordinates[0][i][1] + 90;
                }
                if (geojson.coordinates[0][i][1] + 90 < lrlat) {
                    lrlat = geojson.coordinates[0][i][1] + 90;
                }
            }

            centerX = (ullon + ((lrlon - ullon) / 2)) - 180;
            centerY = (lrlat + ((ullat - lrlat) / 2)) - 90;

            return [centerX, centerY];
        }
    }

    function displayMap(serviceUrl, layerName, center, dateStr, format, matrixSet) {
        // call empty() to make sure another map doesn't already exist there
        $( "#map" ).empty();

        var map = new ol.Map({
            view: new ol.View({
                maxResolution: 0.5625,
                projection: ol.proj.get("EPSG:4326"),
                extent: [-180, -90, 180, 90],
                center: center,
                zoom: 3,
                maxZoom: 8
            }),
            target: "map",
            renderer: ["canvas", "dom"]
        });

        /*
          This determination of resolutions is based solely on the capabilities
          of the NASA GIBS WMTS as it is currently the only WMTS server represented
          in EONET. More information about GIBS: https://go.nasa.gov/1GTDj3V
         */
        var source = new ol.source.WMTS({
            url: serviceUrl + "?time=" + dateStr,
            layer: layerName,
            format: format,
            matrixSet: matrixSet,
            tileGrid: new ol.tilegrid.WMTS({
                origin: [-180, 90],
                resolutions: [
                    0.5625,
                    0.28125,
                    0.140625,
                    0.0703125,
                    0.03515625,
                    0.017578125,
                    0.0087890625,
                    0.00439453125,
                    0.002197265625
                ],
                matrixIds: [0, 1, 2, 3, 4, 5, 6, 7, 8],
                tileSize: 512
            })
        });

        var layer = new ol.layer.Tile({
            source: source
        });

        map.addLayer(layer);
    }