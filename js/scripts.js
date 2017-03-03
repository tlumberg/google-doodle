// Store SVG points
var google = $('#doodle').drawsvg({
  duration : 4000,
  reverse: true,
  stagger: 1000
});


// Animate SVG points
google.drawsvg('animate');


//backstretch
$.backstretch("http://www.cristabel-darryl.com/wp-content/uploads/2016/01/Gatsby-ArtDeco-Background.png");

// Random Number Generator
var limit = 3;
var randNum = Math.floor(Math.random() * limit);
console.log(randNum);

//Get Random Body Class
//Change Background Color
$('#stage').addClass('bg' + randNum);

