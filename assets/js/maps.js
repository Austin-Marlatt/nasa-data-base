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
      $("#map").attr(
        "src",
        `https://www.google.com/maps/embed/v1/place?key=AIzaSyALVHUah6fxUBeyPbNT4egSXn6uqKqjoR8&q=${location}`
      );
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
          `<button id="search-result-btn${i}" class="button is-responsive" value="${data.events[i].link}">${data.events[i].title}</button>`
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
  $("#map").attr(
  "src",
  `https://www.google.com/maps/embed/v1/place?key=AIzaSyALVHUah6fxUBeyPbNT4egSXn6uqKqjoR8&q=${location}`
  );
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