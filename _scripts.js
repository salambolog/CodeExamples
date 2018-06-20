// $('document').ready(function() {

    var onHomePage = false;

    init();

    function init() {
        var path = window.location.pathname;
        if (path.indexOf('financial-highlights/') > -1) {
            $('.nav-item.financial').addClass('active');
        } else if (path.indexOf('letter-to-shareholders/') > -1) {
            $('.nav-item.letter').addClass('active');
        } else if (path.indexOf('board-of-directors/') > -1) {
            $('.nav-item.board').addClass('active');
        } else {
            $('.nav-item.home').addClass('active');
            onHomePage = true;
        }
    }

    // Start person carousel 
    var opened = false;
    var openedPosition = 0;
    //carousel trigger
    $('.modal-trigger').on('touch click',function(){
        var selected = $(this).data('name');
        selected = selected.toLowerCase();
        
        if($(this).hasClass('director-info')){
            var fileName = 'board';
        } //need to add other page modals
        if($(this).hasClass('profile')) {
            var fileName = 'associates';
        }
        if($(this).hasClass('associate')) {
            var fileName = 'assoc-small';
        }

        openModal($(this),selected,fileName);
        opened = true;
        
        openedPosition = $(window).scrollTop();
        $('body, html').addClass('openModal');

    });
    
    $('#lightbox').on('touch click', '.arrow', '.arrowCar', function(e){
        e.preventDefault();
        handleArrows($(this));
    });

    $('#lightbox').on('touch click', '.close-btn', function(e){
        e.preventDefault();
        closeLightBox();
        $('body, html').removeClass('openModal');
        $(window).scrollTop(openedPosition);
    });
    
    function handleArrows(elem){
        var current = elem.parent().find('.curPage').text();
        var end = elem.parent().find('.lastPage').text();
        if(elem.hasClass('prev')){
            getPrevItem(current);
        }else{
            getNextItem(current, end);
        }
    }

    function getPrevItem(current){
        if(current != 1){
            $('#lightbox .contain.active').removeClass('active').prev('.contain').addClass('active');
        }else { 
            $('#lightbox .contain.active').removeClass('active');
            $('#lightbox .contain:last-of-type').addClass('active');
        }
		$('#lightbox').animate({
			scrollTop: 0
        }, 500);
    }

    function getNextItem(current, end){
        if(current != end){
            $('#lightbox .contain.active').removeClass('active').next('.contain').addClass('active');
        }else {
            $('#lightbox .contain.active').removeClass('active');
            $('#lightbox .contain:first-of-type').addClass('active');
        }
        $('#lightbox').animate({
			scrollTop: 0
		}, 500);
    }

    function closeLightBox(){
        $('nav').removeClass('modal-open');
        $('#lightbox .contain.active').removeClass('active');
        $('#lightbox').removeClass('active');
        $('#lightbox').html('<a class="close-btn"></a>')
    }

    function loadJson(file,callback){
        $.get({
            url:"/js/data/"+file+".json",
            success:function(data){
                callback(data);
            },
            dataType:"json",
            error: function(){ 
                console.log("errrrr");
            },
        });
    }

    function activateMatch(selected){
        $('nav').addClass('modal-open');
        $('#lightbox').addClass('active');
        $('#lightbox .contain').each(function(){
            var current = $(this).data('person');
            current = current.toLowerCase();
            if(current == selected){
                $(this).addClass('active');
            }
        })
    }

    function openModal(elem, selected, fileName){
        loadJson(fileName, function(data){
            for(i=0;i<data.length;i++){
                var person = data[i];
                finalPage = data.length;
                pageNum = i+1;

                if(fileName == 'board'){
                    $('#lightbox .close-btn').removeClass('gallery-btn');
                    var html = '<div class="contain" data-person="'+person['name']+'">';
                    html += '<div class="container"><div class="row">'
                    html += '<div class="img-contain bod-contain col-xs-12 col-md-4 col-md-offset-1" style="background-image:url('+ person["img"] +')"></div>';
                    html += '<div class="content letterPad col-xs-12 col-md-7">';
                    html += '<h2 class="headline">'+person['name']+'</h2>';
                    html += '<p class="sub">'+person['title']+'</p>';
                    html += '<p class="caps">'+person['division']+'</p>';
                    html += '<div class="main">'+person['bio']+'</div>';
                    html += '<div class="skills"><b>Skills and qualifications:</b> <br />'+person['skills']+'</div>';
                    html += '<div class="previous"><b>Other U.S. Public Company Board Memberships in Past Five Years:</b> <br />'+person['previous']+'</div>';
                    html += '</div>';
                    html += '<div class="container noPad">';
                    html += '<div class="row paginate boardGrey">';
                    html += '<a class="col-md-1 arrow prev"></a>';
                    html += '<div class="col-md-10 centering"><span class="curPage">'+pageNum+'</span> of <span class="lastPage">'+finalPage+'</span> </div>';
                    html += '<a class="col-md-1 arrow next"></a>';
                    html += '</div></div></div></div>';

                } if(fileName == 'associates'){
                    $('#lightbox .close-btn').removeClass('gallery-btn');
                    var html = '<div class="contain" data-person="'+person['name']+'">';
                    html += '<div class="container"><div class="row">';
                    html += '<div class="col-sm-12 col-md-4 col-lg-4 img-contain" style="background-image:url('+ person["img"] +')"></div>';
                    html += '<div class="col-sm-offset-1 col-sm-10 col-sm-offset-1 col-md-8 col-lg-8 content contender">';
                    html += '<h2 class="headline">'+person['title']+'</h2>';
                    html += '<p class="sub">'+person['name']+'</p>';
                    html += '<p class="caps">'+person['division']+'</p>';
                    html += '<div class="main">'+person['bio']+'</div>';
                    html += '</div>';
                    html += '<div class="row paginate">';
                    html += '<a class="col-md-1 arrow prev"></a>';
                    html += '<div class="col-md-10 centering"><span class="curPage">'+pageNum+'</span> of <span class="lastPage">'+finalPage+'</span> </div>';
                    html += '<a class="col-md-1 arrow next"></a>';
                    html += '</div></div></div>';

                } if(fileName == 'assoc-small'){
                    $('#lightbox').addClass('noOverflow');
                    $('#lightbox .close-btn').removeClass('gallery-btn');
                    var html = '<div class="contain slideAssociate" data-person="'+person['name']+'">';
                    html += '<div class="container tops"><div class="row">';
                    ////image
                    html += '<div class="col-md-offset-1 col-md-10 col-md-offset-1 col-lg-offset-2 col-lg-8 col-lg-offset-2">';
                    html += '<div class="assistant carousel" style="background-image:url('+ person["img"] +')"></div>';
                    html += '<div class="associate-wrap-mobile rect">';
                    html += '<h2 class="namer">'+person['name']+'</h2>';
                    html += '<h3 class="titler">'+person['title'] + '</h3>';
                    html += '<h3 class="yearsDepot">'+person['time']+'</h3>';
                    html += '</div>';
                    html += '</div>';
                    ////
                    html += '<div class="container">';
                    html += '<div class="row paginate">';
                    html += '<a class="col-md-1 arrow prev"></a>';
                    html += '<div class="col-md-10 centering"><span class="curPage">'+pageNum+'</span> of <span class="lastPage">'+finalPage+'</span> </div>';
                    html += '<a class="col-md-1 arrow next"></a>';
                    html += '</div></div>';
                    html += '</div></div></div>';
                }

                $('#lightbox').append(html);
            }
            activateMatch(selected);
        });
    }
    ///////Video Fullscreen
    var controls =  {
        video: $('.video.video-js').get(0),
        fullscreen: $('.vjs-fullscreen-control').get(0)
    }

    jQuery(function($){
        if ($('#our-associates').length) {
            $('#footer-inner').hide();
            $('nav').hide();                        
        };
      });

      $('a.share').on('click touch', function() {
		if ($(this).hasClass('fb-share')) {
			window.open(
				'https://www.facebook.com/sharer.php?u=http://www.homedepotar.com&t=Home%20Depot%20Annual%20Report%202016', 
				'fbShareWindow', 
				'height=450,width=550'
			);
		} else if ($(this).hasClass('twitter-share')) {
			window.open(
				'https://twitter.com/intent/tweet?text=Home%20Depot%20Annual%20Report%202016&via=HomeDepot&url=http://www.homedepotar.com', 
				'twitShareWindow', 
				'height=270,width=550'
			);
		} else if ($(this).hasClass('linkedin-share')) {
			window.open(
				'https://www.linkedin.com/shareArticle?mini=true&url=http://www.homedepotar.com&title=Home%20Depot%20Annual%20Report%202016&summary=Home%20Depot%20Annual%20Report%202016&source=HomeDepot', 
				'liShareWindow', 
				'height=520,width=600'
			);
		}
	});
// })