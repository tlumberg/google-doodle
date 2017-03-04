// Store SVG points
var google = $('#doodle').drawsvg({
  duration : 3000,
  reverse: true,
  stagger: 50
});


// Animate SVG points
google.drawsvg('animate');


//backstretch

  $.backstretch([
      "http://www.cristabel-darryl.com/wp-content/uploads/2016/01/Gatsby-ArtDeco-Background.png"
    , "https://s-media-cache-ak0.pinimg.com/originals/7f/8a/6c/7f8a6c89c4242f10fdcd176cae973a33.jpg"
    , "https://i.ytimg.com/vi/FdMX-537FBg/maxresdefault.jpg"
  ], {duration: 2000, fade: 750});
