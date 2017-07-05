/* Copy Email to clipboard on click of rollie button */
$('.rollie.email').on('click', function () {
    var email = 'nipyan.tsui@gmail.com';
    copyTextToClipboard(email);
    var rollie = $('.rollie.email .side-b span');
    rollie.text('Copied to clipboard').delay(1000).fadeOut(250, function () {
        rollie.text(email).fadeIn(250);
    });
})

function copyTextToClipboard(text) {
    var $temp = $('<input>');
    $('body').append($temp);
    $temp.val(text).select();
    document.execCommand('copy');
    $temp.remove();
}



/* Window resize */
var resize = function () {
    var skillsHeight = $(window).height() - $('section#introduction .galaxy').height();
    $('.skills').height(skillsHeight);
    $('.skills .content').css('padding-top', (skillsHeight - $('.skills .content').height() + 70) / 2);
};
$(window).on('resize', function () {
    resize();
});
resize();



/* One page scroll */
$('.main').onepage_scroll();



/* Googly eyes */
var eyeLeft = new DrawEye("#eye-left", "#pupil-left");
var eyeRight = new DrawEye("#eye-right", "#pupil-right");
