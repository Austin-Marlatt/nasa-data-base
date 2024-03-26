// API key for all NASA API: HcKzIbpGDIu4Y2fxsjRTcl6webEZRL4GSVy57yHN -AM
// Basic JS fetch for current APoD API -AM
fetch(
  "https://api.nasa.gov/planetary/apod?api_key=HcKzIbpGDIu4Y2fxsjRTcl6webEZRL4GSVy57yHN"
)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    // checks if HD image is availble, defaults to SD, sets to background-photo -AM
    if (data.hdurl) {
      let APoD = data.hdurl;
      $(".hero").css("background-image", `url(${APoD})`);
    } else {
      let APoD = data.url;
      $(".hero").css("background-image", `url(${APoD})`);
    }
    // retreives image title and explanation and writes it to the page -AM
    let title = data.title;
    let titleLocation = document.getElementById("APoD-title");
    titleLocation.textContent = title;

    let explanation = data.explanation;
    let explanationText = document.getElementById("APoD-exp");
    explanationText.textContent = explanation;
  });

  // hides the photo description and title if the card is clicked -AM
$(".apod").click(function () {
  $(".apod").hide();
});

// This code will be used in a future feature that will allow videos to play in place of a photo

  // var tag = document.createElement('script');

  //     tag.src = "https://www.youtube.com/iframe_api";
  //     var firstScriptTag = document.getElementsByTagName('script')[0];
  //     firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  //     var player;
  //     function onYouTubeIframeAPIReady() {
  //       player = new YT.Player('player', {
  //         height: '590',
  //         width: '840',
  //         videoId: videoId,
  //         playerVars: {
  //           'playsinline': 1
  //         },
  //         events: {
  //           'onReady': onPlayerReady,
  //           'onStateChange': onPlayerStateChange
  //         }
  //       });
  //     }

  //     function onPlayerReady(event) {
  //       event.target.playVideo();
  //     }

  //     var done = false;
  //     function onPlayerStateChange(event) {
  //       if (event.data == YT.PlayerState.PLAYING && !done) {
  //         setTimeout(stopVideo, 60000);
  //         done = true;
  //       }
  //     }
  //     function stopVideo() {
  //       player.stopVideo();
  //     }