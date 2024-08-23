jQuery(function ($) {

  const checkbox = document.getElementById('modeToggle')

  checkbox.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
      $('html').addClass('invertMode');
    } else {
      $('html').removeClass('invertMode');
    }
  })

  $(".nav-toggle").on("click", function () {
    if (!$(".nav-toggle").hasClass("active")) {
      $(".nav-toggle").addClass("active");
      $("html").addClass("before-menu-open");
      setTimeout(function () {
        $("html").addClass("menu-open");
      }, 30);
      if (window.innerWidth > 1199) {
        if ($("#home-banner").length > 0) {
          $.fn.fullpage.setMouseWheelScrolling(false);
          $.fn.fullpage.setAllowScrolling(false);
        }
      }
    } else {
      $(".nav-toggle").removeClass("active");
      $("html").removeClass("menu-open sub-menu-mobile");
      if ($(".menu-item-has-children").hasClass("show-menu-child")) {
        $(".menu-item-has-children").removeClass(
          "show-menu-child sub-menu-mobile-current"
        );
      }
      $("nav li").removeClass("sub-menu-mobile-current");
      $(".menu-item-has-children>a").removeClass("first-click");
      setTimeout(function () {
        $("html").removeClass("before-menu-open sub-menu-opened");
      }, 650);
      if (window.innerWidth > 1199) {
        if ($("#home-banner").length > 0) {
          $.fn.fullpage.setMouseWheelScrolling(true);
          $.fn.fullpage.setAllowScrolling(true);
        }
      }
    }

    $("html, body").animate({
      scrollTop: $('.main-header').offset().top
    }, 300);
  });



  $("a[href*=\\#]:not([href=\\#])").on("click", function () {
    var target = $(this.hash);
    target = target.length ? target : $("[name=" + this.hash.substr(1) + "]");
    if (target.length) {
      $("html,body").animate(
        {
          scrollTop: target.offset().top - 100,
        },
        1000
      );
      return false;
    }
  });


  $('.down-arrow').click(function () {
    var target = $(this).parents('.banner').next();

    $("html, body").animate({ scrollTop: $(target).offset().top }, 1000);
  });

  let SwiperDesktop = new Swiper(".life-slider-desktop", {
    spaceBetween: 0,
    centeredSlides: true,
    speed: 3000,
    // direction: "vertical",

    autoplay: {
      delay: 1,
      disableOnInteraction: false,
      pauseOnMouseEnter: false,
    },

    loop: true,
    slidesPerView: "auto",
    allowTouchMove: false,
  });

  $(".life-slider a[data-fancybox]").fancybox({
    animationEffect: false,
    beforeShow: function () {

      $('.life-slider-desktop').each(function () {
        this.swiper.autoplay.pause();

      });

    },
    afterClose: function () {
      setTimeout(function () {
        $('.life-slider-desktop').each(function () {
          this.swiper.autoplay.resume();

        });

      }, 200)

    }
  });


});

$(window).on("load", function () {
  $(window).trigger("resize");
  $("html").addClass("dom-loaded");
  if ($(".full-page-loader").length) {
    $(".full-page-loader")
      .delay(1000)
      .fadeOut(300, function () {
        $("html").addClass("loader-loaded");
        $(".site-wrapper").animate({ opacity: "1" }, 350, function () {
          $(window).trigger("scroll");
          $("html").addClass("site-loaded");
        });
      });
  }


});

