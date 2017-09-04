(function($) {
    $(document).ready(function() {
        // JQUERY //
        // wrap each youtube iframe in a "video-container" div
        $.each($('iframe'), function(Index, Element) {
            var src = $(Element).attr('src');

            if(src.indexOf('youtube') >= 0) {
                $(Element).wrap('<div class="video-container" />');
            }
        });

        // This is Javascript and requires JQuery to be loaded//
        $('.scroll-trigger').on('click', function(event) {
            event.preventDefault();

            var padding = parseInt($('main').css('paddingTop'));
            var location = $(this).attr('href');
            var top = $('#'+location).offset().top - padding + 1;
            $('html, body').animate({
                scrollTop: top
            }, 500);
        });

        $('h6.accordion').on('click', function(event) {
            event.preventDefault();
            var content = $(this).next('div.accordion');

            if(content.length === 1) {
                if($(this).hasClass('open')) {
                    $(this).removeClass('open');
                    $(content).slideUp(250);
                } else {
                    $(this).addClass('open');
                    $(content).slideDown(250);
                }
            }
        });

        $('#front-page .logo a').on('click', function(event) {
            event.preventDefault();

            $('html, body').animate({
                scrollTop: 0
            }, 250, function() {
                if($('#main-container').hasClass('closed')) {
                    $('#main-container').slideDown(500).removeClass('closed');
                    $('#questions-container').slideUp(500).addClass('closed');
                }
            });
        });

        $('#front-page a.questions').on('click', function(event) {
            event.preventDefault();

            $('html, body').animate({
                scrollTop: 0
            }, 250, function() {
                if(!$('#main-container').hasClass('closed')) {
                    $('#main-container').slideUp(500).addClass('closed');
                    $('#questions-container').slideDown(500).removeClass('closed');
                }
            });
        });

        var questionsContainer = $('#questions-container');
        if(questionsContainer.length === 1) {
            $(questionsContainer).load('questions/ajax.html', function() {

                $('h6.accordion').on('click', function(event) {
                    event.preventDefault();
                    var content = $(this).next('div.accordion');

                    if(content.length === 1) {
                        if($(this).hasClass('open')) {
                            $(this).removeClass('open');
                            $(content).slideUp(250);
                        } else {
                            $(this).addClass('open');
                            $(content).slideDown(250);
                        }
                    }
                });

            });
        }

        $(window).on('resize orientationchange load scroll', function() {
            var top = $(this).scrollTop();
            if(top < 100) {
                $('#header').removeClass('scroll');
                $('main').removeClass('scroll');
            } else {
                $('#header').addClass('scroll');
                $('main').addClass('scroll');
            }
        });
    });
})(jQuery);
