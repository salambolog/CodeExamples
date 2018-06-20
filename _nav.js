var isTrayAnimating = false;

$('#hamburger').on('click touch', function() {
    if (!$('#tray').hasClass('active')) {
        openTray();
    } else {
        closeTray();
    }
});

$('#links-item').on('click touch', function() {
    openTray();
});

$('#close-tray').on('click touch', function() {
    closeTray();
});

$('#tray-overlay').on('click touch', function() {
    closeTray();
});

var touchScroll = function(e) {
    e.preventDefault();
};

function openTray() {
    if (!isTrayAnimating) {
        $('html, body').bind('touchmove', touchScroll);
        $('#tray').addClass('active');
        $('#tray-overlay').addClass('active').fadeIn(500);
        animateHamburger();
    }
}

function closeTray() {
    if (!isTrayAnimating) {
        $('html, body').unbind('touchmove', touchScroll);
        $('#tray').removeClass('active');
        $('#tray-overlay').removeClass('active').fadeOut(500);
        animateHamburger();
    }
}

function animateHamburger() {
    isTrayAnimating = true;
    var firstLine = $('#hamburger .line:first-of-type');
    var secondLine = $('#hamburger .line:nth-of-type(2)');
    var thirdLine = $('#hamburger .line:nth-of-type(3)');
    
    if ($('#tray').hasClass('active')) {
        firstLine.animate({
            top: '11px'
        }, 250);
        thirdLine.animate({
            top: '-11px'
        }, 250, function() {
            secondLine.css('opacity', '0');
            firstLine.addClass('rotate-diagonal-right');
            thirdLine.addClass('rotate-diagonal-left');
            setTimeout(function() {
                isTrayAnimating = false;
            }, 250);
        });
    } else {
        firstLine.removeClass('rotate-diagonal-right');
        thirdLine.removeClass('rotate-diagonal-left');
        setTimeout(function() {
            secondLine.css('opacity', '1');
        }, 250);
        firstLine.delay(250).animate({
            top: '0px'
        }, 250);
        thirdLine.delay(250).animate({
            top: '-0px'
        }, 250, function() {
            isTrayAnimating = false;
        });
    }
}