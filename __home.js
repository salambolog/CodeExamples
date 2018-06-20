var arrowGrey = $('div.arrow');
var arrowGreyPrev =  $('#moveGreyLeft.arrowGrey');
var arrowAssociates = $('#moveMe.arrow');
var associateArrow = $('.arrowIMG');
var logo = $('#logo');

if ($('#my-player').length) {
    var video = videojs('my-player'); 
    video.ready(function(){
        var player = this;
        player.on('ended', function() {
            $(player.el_).find('.vjs-poster').show();
            $(player.el_).find('.vjs-control-bar').css('display', 'none');
        });
    });
    
    $('.vjs-poster').on('click touch', function() {
        $(this).hide();
        $(this).closest('.video-js').find('.vjs-control-bar').css('display', 'flex');
    });

    // if($(window).width() > 900){
    //     video.on('click touch',
    //         function() {
    //             this.requestFullScreen();
    //             console.log('nothing?');
    //     });
    // }
}

$(window).scroll(function(){
    if($(window).scrollTop() <= 40){
        logo.removeClass('activeScroll');
    } else {
        logo.addClass('activeScroll');
    }
});

if($(window).width() > 993){

    var owlGallery = $('.gallery').addClass('owl-carousel').owlCarousel({
        loop: true,
        nav: true,
        navText: ['<div class="arrow disabled">','<div class="arrow">'],
        navClass: ['arrow'],
        dots: true,
        dotsClass: 'owl-dots-associates',
        dotClass: 'owl-mini-dots',
        startPosition: 0,
        items: 1,
        slideBy: 2,
        scrollPerPage : true,
        responsiveClass: true,
        responsiveRefreshRate: 100,
        autoplay:true,
        autoplayTimeout:10000,
        autoplayHoverPause:true,
        touchDrag: true,
        mouseDrag: false
    });
}

var owl = $('.owl-carousel.slideProfile').owlCarousel({
    loop:true,
    nav:true,
    margin:45,
    navText: ['<img class="col-md-1>" src="/assets/img/left-arrow-75.png">','<img class="col-md-1>" src="/assets/img/right-arrow-75.png">'],///the opening tags for the images are missing but its working, fix later
    navClass: ['owl-prev', 'owl-next'],
    slideSpeed : 2000,
    dots: true,
    // dotsEach: 1,
    dotsClass: 'owl-dots',
    dotClass: 'owl-dot',
    startPosition: 0,
    slideBy: 2,
    autoHeight:true,
    responsiveClass:true,
    responsiveRefreshRate: 200,
    autoHeight:true,
    autoplay:true,
    autoplayTimeout:10000,
    autoplayHoverPause:true,
    touchDrag: true,
    mouseDrag: false,
    responsive: {
        0 : {
            items : 1,
            nav : true,
            loop: true
        },
        768 : {
            items : 2,
            nav : true,
            loop: true
        }
    }
});

$(function (){
    if($(window).width() <= 993){
        var associations = $('.associate');//// and then do the associations.length();
        $('.associate').slice(2, associations.length).hide();
        $('.viewMore').on('click touch', function (e) {
            e.preventDefault();
            $('.associate').slice(2, associations.length).fadeIn().slideDown();
            $('.viewMore').addClass('hideMe');
        });
    }
});

$(".andrew").on('click touch' ,function() {
    $(this).unbind("mouseenter mouseleave");
    $('html, body').animate({
        scrollTop: $(".scroller").offset().top-100
    }, 700);
});

