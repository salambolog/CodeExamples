if($(window).width() < 768){
    $('select.mobile-dropdown').on('change', function(e) {
        if ($(this).val() == 'net-sales') {
            $('div.video-still').css('background-image', 'url("/assets/img/02_OpMargins.jpg")')
        } 
        else if ($(this).val() == 'margins') {
            $('div.video-still').css('background-image', 'url("/assets/img/03_DilutedEarnings.jpg")')
        } 
        else if ($(this).val() == 'share') {
            $('div.video-still').css('background-image', 'url("/assets/img/04_ROI.jpg")')
        } 
        else if ($(this).val() == 'capital') {
            $('div.video-still').css('background-image', 'url("/assets/img/05_Transactions.jpg")')
        } 
        else if ($(this).val() == 'transactions') {
            $('div.video-still').css('background-image', 'url("/assets/img/06_ComparableSales.jpg")')
        } 
        // else if ($(this).val() == 'increases') {
        //     $('div.video-still').css('background-image', 'url("/assets/img/06_ComparableSales.jpg")')
        // }
        else if ($(this).val() == 'sqft') {
            $('div.video-still').css('background-image', 'url("/assets/img/07_SalesSqFt.jpg")')
        }
        else if ($(this).val() == 'ticket') {
            $('div.video-still').css('background-image', 'url("/assets/img/08_AvgTicket.jpg")')
        }
    });
}

if($(window).width() > 768){
    if ($('#screws').length) {
        var video = videojs('screws');

        // var isPlaying = video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2;
        // if (!isPlaying) {
        //     video.play();
        // }
        // var loadStill = $('.videa-menu li.active')[0].currentTime = 2.5;
        $('.videa-menu li').on('click touch', function(e) {
            $('.videa-menu li.active').removeClass('active');
            $(this).addClass('active');

            var startTime, endTime;
            if ($(this).hasClass('Net')) {
                startTime = 1;
                endTime = 2.5;
                $('.invested-capital').text('Net Sales ($MM)');
                $('video')[0].pause();
            } else if ($(this).hasClass('Operating')) {
                startTime = 4.9;
                endTime = 6.8;
                $('video')[0].pause();
                $('.invested-capital').text('Operating Margins (%)');
            } else if ($(this).hasClass('Diluted')) {
                startTime = 8;
                endTime = 10.3;
                $('video')[0].pause();
                $('.invested-capital').text('Diluted Earnings Per Share ($)');
            } else if ($(this).hasClass('Return')) {
                startTime = 11.6;
                endTime = 14;
                $('video')[0].pause();
                $('.invested-capital').text('Return on Invested Capital (%)');
            } else if ($(this).hasClass('Total')) {
                startTime = 16;
                endTime = 18;
                $('video')[0].pause();
                $('.invested-capital').text('Total Transactions (MM)');
            } else if ($(this).hasClass('Comparable')) {
                startTime = 19.8;
                endTime = 21.7;
                $('video')[0].pause();
                $('.invested-capital').text('Comparable Sales Increase (%)');
            } else if ($(this).hasClass('Sales')) {
                startTime = 22.6;
                endTime = 25.3;
                $('video')[0].pause();
                $('.invested-capital').text('Sales Per Square Foot ($)');
            } else if ($(this).hasClass('Average')) {
                startTime = 27;
                endTime = 29;
                $('video')[0].pause();
                $('.invested-capital').text('Average Ticket ($)');
            }

            $('video').off('timeupdate');
            $('video')[0].currentTime = startTime;
            $('video')[0].play();
            $('video').on('timeupdate', function() {
                if (this.currentTime >= endTime) {
                    // this.currentTime = 0;
                    this.pause();
                    $(this).off('timeupdate');
                };
            });
        });

        $('.vjs-poster').on('click touch', function() {
            $(this).hide();
        });
    }
}