$('#lightbox').scroll(function() {
    $(".centering").css("opacity", 1 - $('#lightbox').scrollTop() / 50);
  });
