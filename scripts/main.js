'use strict';

//scroll to top
if ($('#back-to-top').length) {
    var scrollTrigger = 100,
        // px
    backToTop = function backToTop() {
        var scrollTop = $(window).scrollTop();
        if (scrollTop > scrollTrigger) {
            $('#back-to-top').addClass('show');
        } else {
            $('#back-to-top').removeClass('show');
        }
    };
    backToTop();
    $(window).on('scroll', function () {
        backToTop();
    });
    $('#back-to-top').on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: 0
        }, 700);
    });
}
//scroll to top

// ready
$(document).ready(function () {
    //tabs
    $('ul.tabs__caption').on('click', 'li:not(.active)', function () {
        $(this).addClass('active').siblings().removeClass('active').closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
    });
    //tabs

    //greedymenu
    $(function () {
        var $btn = $('.overflow-trigger');
        var $vlinks = $('.greedy-links');
        var $hlinks = $('.overflow-main');
        var $hlink = $('.overflow-main .overflow');
        var numOfItems = 0;
        var totalSpace = 0;
        var breakWidths = [];
        $vlinks.children().outerWidth(function (i, w) {
            totalSpace += w;
            numOfItems += 1;
            breakWidths.push(totalSpace);
        });
        var availableSpace, numOfVisibleItems, requiredSpace;

        function check() {
            availableSpace = $vlinks.width() - 10;
            numOfVisibleItems = $vlinks.children().length;
            requiredSpace = breakWidths[numOfVisibleItems - 1];
            if (requiredSpace > availableSpace) {
                $vlinks.children().last().prependTo($hlink);
                numOfVisibleItems -= 1;
                check();
            } else if (availableSpace > breakWidths[numOfVisibleItems]) {
                $hlink.children().first().appendTo($vlinks);
                numOfVisibleItems += 1;
            }
            $btn.attr("count", numOfItems - numOfVisibleItems);
            if (numOfVisibleItems === numOfItems) {
                $btn.addClass('hidden');
            } else $btn.removeClass('hidden');
        }

        $(window).resize(function () {
            if (window.outerWidth <= 1365) {
                setTimeout(function () {
                    check();
                }, 200);
            }
        });
        $(window).on("orientationchange", function () {
            if (window.outerWidth <= 1365) {
                setTimeout(function () {
                    check();
                }, 500);
            }
        });
        if (window.outerWidth <= 1365) {
            setTimeout(function () {
                check();
            }, 500);
        }
        setTimeout(function () {
            $('.greedy').css('opacity', '1');
        }, 200);
        $btn.on('click', function () {
            $hlinks.toggleClass('hidden');
            if ($(window).width() < 768) {
                $('body').addClass('fixed');
            }
        });
        $('.overflow-close--js').on('click', function () {
            $hlinks.addClass('hidden');
            $('body').removeClass('fixed');
        });
    });
    // //greedymenu

    //.page-header__search--js
    $('.page-header__search--js').click(function () {
        $('.mainsearch').toggleClass('active');
    });
    $('.mainsearch-close--js').click(function () {
        $('.mainsearch').removeClass('active');
    });
    $('.showhide-txt--js').click(function () {
        $(this).toggleClass('active');
        $('.white-popup-inner').toggleClass('hideme');
    });
    //.page-header__search--js

    //accordion
    $('.accordion__link--js').click(function () {
        $(this).parent().toggleClass('active').siblings().removeClass('active').find('.accordion-body').slideUp();
        $(this).next().slideToggle();
    });
    //accordion

    //simplepopup
    $('.addpopup').click(function () {
        $('#letter-id').addClass('active');
        $('.popup-background').addClass('active');
        $('body').addClass('fixed');
        return false;
    });
    $('.popup-background, .popup-close--js').click(function () {
        $('#letter-id').removeClass('active');
        $('.popup-background').removeClass('active');
        $('body').removeClass('fixed');
        return false;
    });
    //simplepopup

    // mask phone {maskedinput}
    $("[name=phone]").mask("+7 (999)999-99-99");
    // mask phone

    //loadmore--js
    var countItem = $(".media-catalog").data('count');
    if (countItem) {
        var item = $(".media-catalog .catalog__item").length;
        $(".media-catalog .catalog__item").hide();
        $('.media-catalog .catalog__item:lt(' + countItem + ')').show();
        $('.loadmore--js').click(function () {
            countItem = countItem + 4 <= item ? countItem + 4 : item;
            $('.media-catalog .catalog__item:lt(' + countItem + ')').show();
            if (countItem === item) {
                $('.loadmore--js').hide();
            }
        });
    }
    //loadmore--js

    //checkbox
    $('.switch input').click(function () {
        if (this.checked) {
            $('.project-map').show();
            $('.project-list').hide();
        } else {
            $('.project-map').hide();
            $('.project-list').show();
        }
    });
    //checkbox

    // slider {http://idangero.us/swiper/}
    var swiper = new Swiper('.swiper', {
        slidesPerView: 'auto',
        spaceBetween: 80,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        breakpoints: {
            767: {
                // slidesPerView: 1,
                spaceBetween: 20
            }
        }
    });
    var swiperSl = new Swiper('.swiper-sl', {
        slidesPerView: 3,
        // spaceBetween: 2,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        breakpoints: {
            1700: {
                slidesPerView: 2
            },
            767: {
                slidesPerView: 1
            }
        }
    });
    var swiperNw = new Swiper('.swiper-nw', {
        slidesPerView: 1,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction'
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        }
    });
    var swiperFl = new Swiper('.swiper-fl', {
        slidesPerView: 1,
        loop: true,
        pagination: {
            el: '.swiper-paginationfl',
            type: 'fraction'
        },
        navigation: {
            nextEl: '.swiper-buttonfl-next',
            prevEl: '.swiper-buttonfl-prev'
        }
    });
    var swiperDir = new Swiper('.swiper-dir', {
        slidesPerView: 1,
        loop: true,
        spaceBetween: 20,
        pagination: {
            el: '.swiper-paginationdir',
            type: 'fraction'
        },
        navigation: {
            nextEl: '.swiper-buttondir-next',
            prevEl: '.swiper-buttondir-prev'
        }
    });
    var galleryTop = new Swiper('.artk', {
        slidesPerView: 1,
        pagination: {
            el: '.swiper-paginationfl',
            type: 'fraction'
        },
        navigation: {
            nextEl: '.swiper-buttonfl-next',
            prevEl: '.swiper-buttonfl-prev'
        }
    });
    var galleryThumbs = new Swiper('.tumb', {
        spaceBetween: 5,
        slidesPerView: 2,
        slidesPerColumn: 2,
        touchRatio: 0.2,
        // slideToClickedSlide: true,
        // allowTouchMove: false,
        pagination: {
            el: '.swiper-paginationf',
            clickable: true
        }
    });
    // galleryTop.controller.control = galleryThumbs;
    // galleryThumbs.controller.control = galleryTop;
    $('.tumb .swiper-slide').click(function () {
        var slideNumber = $(this).data('slide');
        galleryTop.slideTo(parseInt(slideNumber - 1), 1000, true);
    });
    // slider

    // select {select2}
    // select

    // popup {magnific-popup}
    $('.popup-youtube').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,

        fixedContentPos: false
    });
    $('.popup-modal').magnificPopup({
        type: 'inline',
        preloader: false,
        showCloseBtn: false,
        callbacks: {
            open: function open() {
                $('body').css('overflow', 'hidden');
            },
            change: function change() {
                setTimeout(function () {
                    var swiperPop = new Swiper('.swiper-pop', {
                        slidesPerView: 1,
                        loop: true,
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true
                        },
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev'
                        }
                    });
                }, 100);
            }
        }
    });
    $('.popup-gallery').on('click', function () {
        $(this).find('.gallery').magnificPopup('open');
    });
    $('.gallery').each(function () {
        $(this).magnificPopup({
            delegate: 'a',
            type: 'image',
            tLoading: 'Загрузка изображения #%curr%...',
            mainClass: 'mfp-img-mobile',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
            }
        });
    });
    $(document).on('click', '.popup-dismiss', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
    });
    // popup

    //fullpage
    $('#fullpage').fullpage({
        anchors: ['firstPage', 'secondPage', '3rdPage', '4thpage', '5thpage'],
        navigation: true,
        // autoScrolling: false,
        navigationPosition: 'left',
        // responsiveWidth: 1025,
        navigationTooltips: ['Главная', 'История', 'Направления деятельности', 'Новости', 'Партнеры'],
        afterRender: function afterRender() {
            $('#fp-nav').append('<span class="arrow arrowUp"></span><span class="arrow arrowDown"></span>');
            setTimeout(function () {
                swiperNw.update();
                swiperFl.update();
                swiperDir.update();
                galleryTop.update();
                galleryThumbs.update();
            }, 100);
        }
    });
    $('.arrowUp').click(function () {
        $.fn.fullpage.moveSectionUp();
    });
    $('.arrowDown').click(function () {
        $.fn.fullpage.reBuild();
    });
    //fullpage
});

Dropzone.autoDiscover = false;
jQuery(document).ready(function () {
    $("#my-awesome-dropzone").dropzone({
        url: "upload.php",
        addRemoveLinks: true,
        acceptedFiles: '.pdf,.doc,.docx',
        createImageThumbnails: false,
        chunkSize: false,
        maxFiles: 1,
        dictCancelUpload: 'Отменить загрузку',
        dictRemoveFile: 'Удалить файл',
        dictDefaultMessage: '<img src="images/plus.png" alt=""><div>Нажмите,  чтобы добавить файл</div>',
        previewTemplate: "<div class=\"dz-preview dz-file-preview\">\n  <div class=\"dz-image\"><img data-dz-thumbnail /></div>\n  <div class=\"dz-details\">\n    <div class=\"dz-size\"><span data-dz-size></span></div>\n    <div class=\"dz-filename\"><span data-dz-name></span></div>\n  </div>\n  <div class=\"dz-progress\" data-dz-uploadprogress data-progress=\"0\"><div class=\"circle\">\n<div class=\"mask full\">\n" + "\t\t\t<div class=\"fill\"></div>\n" + "\t\t</div>\n" + "\t\t<div class=\"mask half\">\n" + "\t\t\t<div class=\"fill\"></div>\n" + "\t\t\t<div class=\"fill fix\"></div>\n" + "\t\t</div>\n" + "\t</div>\n" + "\t<div class=\"inset\">\n" + "\t\t<div class=\"percentage\">\n" + "<span>66</span></div>\n" + "\t</div></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage></span></div>\n  <div class=\"dz-success-mark\">\n <img src='images/success.png', alt=''> Ваш файл успешно загружен\n  </div>\n  <div class=\"dz-error-mark\">\n<i class='icon-close'></i> Ваш файл не загружен\n  </div>\n</div>",
        success: function success(file, response) {
            file.previewElement.classList.add("dz-success");
            // setTimeout(function () {
            //     file.previewElement.classList.remove("dz-success");
            // }, 2800)
        },
        uploadprogress: function uploadprogress(file, progress, bytesSent) {
            file.previewElement.classList.add("dz-uploadprogress");
            if (file.previewElement) {
                var progressElement = file.previewElement.querySelector("[data-dz-uploadprogress]");
                var result = Math.round(progress);
                progressElement.setAttribute('data-progress', result + '');
                progressElement.querySelector(".percentage span").innerHTML = result + "% <br><span>загружено</span>";
                if (result == 100) {
                    file.previewElement.classList.remove("dz-uploadprogress");
                }
            }
        },
        error: function error(file, response) {
            file.previewElement.classList.add("dz-error");
        },
        complete: function complete(file, response) {
            setTimeout(function () {
                file.previewElement.classList.add("dz-complete");
            }, 1000);
        }
    });
});

//calendar JS with moment.js
moment.locale('ru');
var field = document.getElementById('datepicker');
var picker = new Pikaday({
    field: field,
    position: 'bottom right',
    trigger: document.getElementById('datepicker-button'),
    i18n: {
        months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        weekdays: moment.localeData()._weekdays,
        weekdaysShort: moment.localeData()._weekdaysShort
    },
    onSelect: function onSelect(date) {
        field.value = moment(date).format('YYYY MMMM DD');
    }
});
//calendar
//# sourceMappingURL=main.js.map
