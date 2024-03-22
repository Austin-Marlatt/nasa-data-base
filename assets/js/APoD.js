// calls the datepicker -AM
$(function () {
  $("#datepicker").datepicker();
});

// search button event handler, user selected date reformated for APoD api -AM
$("#search-btn").click(function () {
  let searchDate = dayjs($("#datepicker").val()).format("YYYY-MM-DD");
  dateSearch(searchDate);
});

// retreives image title and explanation and writes it to the page -AM
function getImageInfo(data) {
  let title = data.title;
  let titleLocation = document.getElementById("APoD-title");
  titleLocation.textContent = title;
  let explanation = data.explanation;
  let explanationText = document.getElementById("APoD-exp");
  explanationText.textContent = explanation;
}

// checks if local storage has any relevent stored information
// if not, sets a new array
let history = JSON.parse(window.localStorage.getItem("history")) || [];

// assigns the history option fields with previous searches found in localStorage;
// displays APoD title and date -AM
for(let i=0; i < history.length; i++) {
  $("#history").append(`<option value="${history[i].date}">${history[i].title}, ${history[i].date}</option>`);
}

// uses date found in selected history "value" attribute, formats with dayjs so APoD api can read it, runs dateSearch() with formated date -AM
function historySearch() {
  let search = $("#history").val();
  let searchDate = dayjs(search).format("YYYY-MM-DD");
      dateSearch(searchDate);
    }

// event handler for search button attached to the history dropdown, runs historySearch() when clicked -AM
$("#history-search").click(function() {
  historySearch();
});

// methods imported from jQuery to create a dropdown menu for the history search -AM
$( "#history" )
  .selectmenu()
  .selectmenu( "menuWidget" )
    .addClass( "overflow" );

// handles the APoD api get call -AM
function dateSearch(searchDate) {
  // url takes in reformated date from js:8 -AM
  let dateSearchUrl = `https://api.nasa.gov/planetary/apod?api_key=HcKzIbpGDIu4Y2fxsjRTcl6webEZRL4GSVy57yHN&date=${searchDate}`;

  // returns APoD meta data from the date provided -AM
  fetch(dateSearchUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // conditional, checks if an HD version is available, defaults to SD if not -AM
      if (data.hdurl) {
        // variables to store APoD metadata we want to use -AM
        let APoD = data.hdurl;
        let date = data.date;
        let title = data.title;
        //  prints image to page -AM
        $("#image").attr("src",`${APoD}`);
        getImageInfo(data);

        // object containing important data from this APoD search
        let historyInfo = {
          title: title,
          url: dateSearchUrl,
          date: date,
        }

        // adds the previous object to the end of the historey array, 
        // commits to local storage
        history.push(historyInfo);
        window.localStorage.setItem("history", JSON.stringify(history));

      } else {
        let APoD = data.url;
        let date = data.date;
        let title = data.title;
        $("#image").attr("src",`${APoD}`);
        getImageInfo(data);

        let historyInfo = {
          title: title,
          url: dateSearchUrl,
          date: date,
        }

        history.push(historyInfo);
        window.localStorage.setItem("history", JSON.stringify(history));
      }

    });
}
