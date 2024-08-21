jQuery(function ($) {
  var isAudioMuted = true;
  $(document).on("click", ".mute-video", function () {
    if ($(".html-video").length) {
      if ($("#myVideo").prop("muted")) {
        $("#myVideo").prop("muted", false);
        $(".mute-video").html('<i class="mdi mdi-volume-up"></i>');
        $("html").addClass("video-sound-play");
      } else {
        $("#myVideo").prop("muted", true);
        $(".mute-video").html('<i class="mdi mdi-volume-off"></i>');
        $("html").removeClass("video-sound-play");
      }
    } else if ($(".vimeo-video").length) {
      if (isAudioMuted === true) {
        var iframe = $("#myVideo")[0];
        var player = new Vimeo.Player(iframe);
        player.setVolume(1);
        $(".mute-video").html('<i class="mdi mdi-volume-up"></i>');
        $("html").addClass("video-sound-play");
        isAudioMuted = false;
      } else {
        var iframe = $("#myVideo")[0];
        var player = new Vimeo.Player(iframe);
        player.setVolume(0);
        isAudioMuted = true;
        $(".mute-video").html('<i class="mdi mdi-volume-off"></i>');
        $("html").removeClass("video-sound-play");
      }
    }
  });

  setTimeout(function () {
    $(".full-page-loader").addClass("start anim");
  }, 30);

  setTimeout(function () {
    $(".full-page-loader svg path").addClass("anim");
  }, 300);

  setTimeout(function () {
    $(".full-page-loader").addClass("end");
  }, 400);

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

  function scrollWaypointInit(items, trigger) {
    items.each(function () {
      var element = $(this),
        osAnimationClass = element.data("animation"),
        osAnimationDelay = element.attr("data-animation-delay");
      element.css({
        "-webkit-animation-delay": osAnimationDelay,
        "-moz-animation-delay": osAnimationDelay,
        "animation-delay": osAnimationDelay,
      });

      var trigger = trigger ? trigger : element;
      trigger.waypoint(
        function () {
          element.addClass("animated").addClass(osAnimationClass);
        },
        {
          triggerOnce: true,
          offset: "70%",
        }
      );
    });
  }

  if ($(window).width() > 768) {
    scrollWaypointInit($(".animateMe"));
  }

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

  $(".listing-nav ul li a").on("click", function () {
    $(".listing-nav ul li a").removeClass("active");
    $(this).addClass("active");
  });

  lc_lightbox(".elem", {
    wrap_class: "lcl_fade_oc",
    gallery: true,
    thumb_attr: "data-lcl-thumb",
    skin: "minimal",
    radius: 0,
    padding: 0,
    border_w: 0,
  });

  $(".journal-slider").slick({
    slidesToShow: 0,
    slidesToScroll: 0,
    autoplay: false,
    dots: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
        },
      },
    ],
  });

  $(".hero-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    dots: false,
    arrows: true,
    speed: 1500,
  });

  $("[data-fancybox]").fancybox({
    arrows: false,
    infobar: false,
  });

  var path = window.location.href;
  $(".main-header--action nav ul li a").each(function () {
    if (this.href === path) {
      $(this).addClass("active");
    }
  });

  $(".newletterTrigger").trigger("click");

  $(".header-search").on("click", function () {
    $(".search-wrapper").addClass("open");
    $("html, body").animate({
      scrollTop: $('.main-header').offset().top
    }, 300);
  });

  $("#searchInput").on("keydown", function (event) {
    const key = event.key;
    if (key !== "Backspace" && $("#searchInput").val().length >= 0) {
      $(".close-search").addClass("active");
      $(".search-reasult").show();
    } else if (key === "Backspace" && $("#searchInput").val().length == 1) {
      console.log("Backspace", $("#searchInput").val().length);
      $(".close-search").removeClass("active");
      $(".search-reasult").hide();
    }
  });

  $(".close-search").on("click", function () {
    $(".search-wrapper").removeClass("open");
    $(".search-reasult").hide();
  });

  $('.goToDownSection').on('click', function(){
    $("html, body").animate({
      scrollTop: $('.main-header').offset().top
    }, 300);
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

  $(".newletterTrigger").click();
});

function sticky_relocate() {
  if ($(".about-content").length > 0) {
    var window_top = $(window).scrollTop();
    var div_top = $(".about-content").offset().top - 100;
    var release_div_top = $(".about-thought").offset().top - 100;
    if (window_top > div_top && window_top < release_div_top) {
      $(".about-content .listing-nav").addClass("stick");
    } else {
      $(".about-content .listing-nav").removeClass("stick");
    }
  }
}

$(function () {
  $(window).on("scroll", sticky_relocate);
  $(".about-content").length > 0 && sticky_relocate();
});
