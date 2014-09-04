document.addEventListener('DOMContentLoaded', function() {

    var iconsPackages = [];
        iconsPackages.push(onionsPackage)
        iconsPackages.push(memesPackage)
        iconsPackages.push(foxPackage)
        iconsPackages.push(rabbitPackage)
        iconsPackages.push(monkeyPackage)
        iconsPackages.push(pandaPackage)
        iconsPackages.push(robotPackage)
        iconsPackages.push(otrosPackage)
        iconsPackages.push(config)

    emoticons.all_packages = iconsPackages;

    translate();
	restore_options();

    var msie6 = $.browser == 'msie' && $.browser.version < 7;
    if (!msie6) {
        var secClick = false;
        var top = $('#sections').offset().top - parseFloat($('#sections').css('margin-top').replace(/auto/, 0));
        $(window).scroll(function(event) {
            if (secClick) secClick = false;
            else adjustMenu();
        });

        $('#sections a, .package, fieldset a[href^="#"]').click(function(){
            reScroll();
        })

        function reScroll() {
            setTimeout(function() {
                secClick = true;
                adjustMenu();
                if($(window).scrollTop() + $(window).height() != $(document).height()) {
                   // alert("bottom!");
                    $(window).scrollTop($(window).scrollTop()-42)
                }
            }, 1)
        }


        function adjustMenu() {
            var y = $(window).scrollTop();
            if (y >= top) {
                $('#sections').addClass('stick');
                $('#space').show(0)
                $('#float_logo').removeClass('off').addClass('on')
            } else {
                $('#space').hide(0)
                $('#sections').removeClass('stick');
                $('#float_logo').removeClass('on').addClass('off')
            }
        }
        reScroll();
    }

});


