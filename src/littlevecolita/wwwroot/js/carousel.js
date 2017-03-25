$('#showcase').owlCarousel({
    loop: true,
    nav: true,
    items: 1
})

$(document).ready(function () {
    $('#showcase').owlCarousel();
    $('#meowCase').meowCarousel();
});

$.fn.meowCarousel = function () {

    var carousel = $(this);
    var count = carousel.find('.owl-dot').length;
    var width = $(window).width();
    var totalWidth = width*count;
    var stage = carousel.find('.owl-stage');
    resize();
    moveStage(0);


    $('.owl-dot').on('tap click', function (event) {
        var index = $('.owl-dot').index($(this));
        console.log(index);
        moveStage(index);
    })

    function moveStage(index) {
        var transformDistance = -index*width;
        var css = {
            transform: 'translate3d(' + transformDistance + 'px, 0px, 0px)',
            transition: '0.25s',
            width: totalWidth + 'px'
        }
        stage.css(css);

        $('.owl-dot').removeClass('active');
        $('.owl-dot' + ':eq(' + index + ')').addClass('active');

        $('.owl-item').removeClass('active');
        $('.owl-item' + ':eq(' + index + ')').addClass('active');
    }

    $(window).on('resize', function () {
        resize();
    });

    function resize() {
        var windowWidth = $(window).width();
        $('.owl-item').width(windowWidth);
        $('.owl-item .item img').width(windowWidth * 0.9 - 5 - $('.owl-item .item .description').outerWidth());
        $('.owl-dots-wrap').width(windowWidth);
    }

}





