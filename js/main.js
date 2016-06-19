(function ($) {

  $(window).load(function() {
    $(".tabs--primary-toggle").click(function(){
      $("ul.tabs--primary").toggleClass("open");
      $(this).toggleClass("active");
    });


  });


})(jQuery);
