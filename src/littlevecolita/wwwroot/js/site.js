
var resize = function () {

    var skillsHeight = $(window).height() - $('#galaxy').height();
    $('.skills').height(skillsHeight);
    $('.skills .content').css("padding-top", (skillsHeight - $('.skills .content').height() + 70)/2);
};

$(window).on('resize', function () {
    resize();
});

$(".main").onepage_scroll();
resize();

