// Forked from cdpn.io/rkcjt
// Removed eyeposx and eyeposy as parameters

/**
 * @param {string} eye - selector for the eye container
 * @param {string} pupil - selector for the pupil
 */
var DrawEye = function (eye, pupil) {

    // Initialise core variables
    var eyeX = $(eye).position().left + $(eye).offsetParent().position().left;
    var eyeY = $(eye).position().top + $(eye).offsetParent().position().top;
    console.log($(eye).offset());
    var r = $(pupil).width() / 2;
    var center = {
        x: $(eye).width() / 2 - r,
        y: $(eye).height() / 2 - r
    };
    var distanceThreshold = $(eye).width() / 2 - r;
    var mouseX = 0, mouseY = 0;

    // Update mouseX and mouseY on mousemove
    $(window).mousemove(function (e) {
        var d = {
            x: e.pageX - r - eyeX - center.x,
            y: e.pageY - r - eyeY - center.y
        };
        var distance = Math.sqrt(d.x * d.x + d.y * d.y);
        if (distance < distanceThreshold) {
            mouseX = e.pageX - eyeX - r;
            mouseY = e.pageY - eyeY - r;
        } else {
            mouseX = d.x / distance * distanceThreshold + center.x;
            mouseY = d.y / distance * distanceThreshold + center.y;
        }
    });

    // Update pupil location
    var pupil = $(pupil);
    var xp = 0, yp = 0;
    var loop = setInterval(function () {
        // Change 1 to alter damping/momentum - higher is slower
        xp += (mouseX - xp) / 1;
        yp += (mouseY - yp) / 1;
        pupil.css({ left: xp, top: yp });
    }, 1);
};