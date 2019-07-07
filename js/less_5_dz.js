$(function () {

  /*Button Top*/
  var btnTop = $('.btn').hide();

  $(window).on('scroll', function (e) {
    if ($(this).scrollTop() >= 500) {
      btnTop.fadeIn(700);
    } else {
      btnTop.fadeOut(700);
    }
  });

  btnTop.on('click', function () {
    $('body, html').animate({
      scrollTop: 0
    }, 1000);
  });

  /*Anchor link*/
  $('#menu ul li a').on('click', function (e) {
    e.preventDefault();
    var sel = $(this).attr('href');
    var h = $(sel);
   $('body, html').animate({
     scrollTop: h.offset().top - 100,
   }, 1500);


  });

});




