// experimental; lets users see the image on their birth day -AM
// let birthImage =
//   "https://api.nasa.gov/planetary/apod?api_key=HcKzIbpGDIu4Y2fxsjRTcl6webEZRL4GSVy57yHN&date=" +input+"";
// fetch(birthImage)
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     // checks if an HD version is available, defaults to SD if not
//     if (data.hdurl) {
//       let APoD = data.hdurl;
//       let picLocation = document.getElementById("");
//       picLocation.setAttribute("src", APoD);
//     } else {
//       let APoD = data.url;
//       let picLocation = document.getElementById("");
//       picLocation.setAttribute("src", APoD);
//     }
//   });

//   !doctype html>
// <html lang="en">
// <head>
//   <meta charset="utf-8">
//   <title>datepicker demo</title>
//   <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css">
//   <script src="//code.jquery.com/jquery-1.12.4.js"></script>
//   <script src="//code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
// </head>
// <body>
 
// <div id="datepicker"></div>
 
// <script>
// $( "#datepicker" ).datepicker();
// </script>
 
// </body>
// </html>

$("#datepicker").datepicker();
let date = $('#datepicker').datepicker('getDate');
console.log(date);
