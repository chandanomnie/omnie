jQuery(function ($) {
  
  if(jQuery('#modeToggle').length){
    const checkbox = document.getElementById("modeToggle");
  
    $("#modeToggle").prop("checked", false);
  
    checkbox.addEventListener("change", (event) => {
      if (event.currentTarget.checked) {
        $("html").addClass("invertMode");
      } else {
        $("html").removeClass("invertMode");
      }
    });
  }


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

    $("html, body").animate(
      {
        scrollTop: $(".main-header").offset().top,
      },
      300
    );
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

  $(".down-arrow").click(function () {
    var target = $(this).parents(".banner").next();

    $("html, body").animate({ scrollTop: $(target).offset().top }, 1000);
  });

  if ($(".fade-slider").length) {
    $(".fade-slider").on("init", function (event, slick) {
      $(".fade-slider .item:first-child").addClass("animate-active");
    });

    $(".fade-slider").slick({
      dots: true,
      infinite: true,
      speed: 500,
      fade: true,
      cssEase: "linear",
      autoplay: true,
      autoplaySpeed: 6000,
      nextArrow: ".slick-custom-next",
      prevArrow: ".slick-custom-prev",
    });
  }

  if ($(".client-logo-slider").length) {
    new Swiper(".client-logo-slider", {
      spaceBetween: 0,
      speed: 2000,
      loop: false,
      slidesPerView: 1,
      allowTouchMove: true,
      navigation: {
        nextEl: ".swiper-next",
        prevEl: ".swiper-prev",
      },
    });
  }

  if ($(".life-slider-desktop").length) {
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
        $(".life-slider-desktop").each(function () {
          this.swiper.autoplay.pause();
        });
      },
      afterClose: function () {
        setTimeout(function () {
          $(".life-slider-desktop").each(function () {
            this.swiper.autoplay.resume();
          });
        }, 200);
      },
    });
  }

  if ($(".about-life-slider").length) {
    let SwiperAbout = new Swiper(".about-life-slider", {
      spaceBetween: 0,
      centeredSlides: true,
      speed: 1500,
      // direction: "vertical",
      observer: true,
      observeParents: true,
      // autoplay: {
      //   delay: 1,
      //   disableOnInteraction: false,
      //   pauseOnMouseEnter: true,
      // },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      loop: true,
      slidesPerView: "auto",
      allowTouchMove: false,
    });

    // $('.custom-arrow.arrow-left').click(function(){
    //   SwiperAbout.swiper.pause();
    //   SwiperAbout.slideNext();

    // });
    // $('.custom-arrow.arrow-right').click(function(){
    //   SwiperAbout.swiper.pause();
    //   SwiperAbout.slidePrev();

    // });

    $(".about-life-slider a[data-fancybox]").fancybox({
      animationEffect: false,
      beforeShow: function () {
        // $(".life-slider-desktop").each(function () {
        //   this.swiper.autoplay.pause();
        // });
      },
      afterClose: function () {
        setTimeout(function () {
          // $(".life-slider-desktop").each(function () {
          //   this.swiper.autoplay.resume();
          // });
        }, 200);
      },
    });
  }

  if (jQuery("[data-splitting]").length) {
    Splitting({
      /* target: String selector, Element, Array of Elements, or NodeList */
      target: "[data-splitting]",
      /* by: String of the plugin name */
      by: "chars",
      /* key: Optional String to prefix the CSS variables */
      key: null,
    });
  }
  if ($(".tech-custom .right .points ul").length) {
    $(".tech-custom .right ul li").mouseenter(function () {
      $(this).addClass("active").siblings().removeClass("active");
      var getPos = $(this).position().top;
      var getIndex = $(this).index();
      console.log(getPos);
      $(".tech-custom .right .points .dot")
        .stop()
        .animate({ top: getPos + 30 });
      $(".points-content .content").hide();
      $(".points-content .content").eq(getIndex).show();
    });
  }
  if ($(".digital-slider").length) {
    let SwiperDigital = new Swiper(".digital-slider", {
      spaceBetween: 0,
      centeredSlides: false,
      speed: 700,
      // direction: "vertical",
      // observer: true,
      // observeParents: true,
      // autoplay: {
      //   delay: 1,
      //   disableOnInteraction: false,
      //   pauseOnMouseEnter: true,
      // },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      loop: true,
      slidesPerView: 4,
      // slidesPerGroup : 4,
      allowTouchMove: false,
      breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 1,
        },
        // when window width is >= 640px
        768: {
          slidesPerView: 1,
        },
        769: {
          slidesPerView: 4,
        },
      },
    });

    // $('.digital-slider .box').mouseenter(function () {
    //   $(this).parent('.item').addClass('active').siblings().removeClass('active');

    // });
    // SwiperDigital.on('slideChange', function () {
    //   console.log('slide changed');
    //   $('.swiper-slide-active').addClass('active').siblings().removeClass('active');
    // });
  }

  scrollContent();

  if ($(".benifits-swiper").length) {
    new Swiper(".benifits-swiper", {
      spaceBetween: 0,
      centeredSlides: false,
      speed: 700,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      loop: true,
      slidesPerView: 1,
      allowTouchMove: true,
      autoHeight: true,
    });
  }

  if ($(".our-work-slider-one").length) {
    new Swiper(".our-work-slider-one", {
      spaceBetween: 0,
      centeredSlides: true,
      speed: 5000,
      direction: "vertical",

      autoplay: {
        delay: 1,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },

      loop: true,
      slidesPerView: "auto",
    });
  }

  if ($(".our-work-slider-two").length) {
    new Swiper(".our-work-slider-two", {
      spaceBetween: 0,
      centeredSlides: true,
      speed: 4000,
      direction: "vertical",

      autoplay: {
        delay: 1,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },

      loop: true,
      slidesPerView: "auto",
    });
  }

  if ($(".our-work-slider-three").length) {
    new Swiper(".our-work-slider-three", {
      spaceBetween: 0,
      centeredSlides: true,
      speed: 6500,
      direction: "vertical",

      autoplay: {
        delay: 1,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },

      loop: true,
      slidesPerView: "auto",
    });
  }

  if ($(".benifits-swiper-second").length) {
    new Swiper(".benifits-swiper-second", {
      spaceBetween: 0,
      centeredSlides: false,
      speed: 700,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      loop: true,
      slidesPerView: 1,
      allowTouchMove: true,
      autoHeight: true,
    });
  }

  if ($(".life-slider-mobile").length) {
    new Swiper(".life-slider-mobile", {
      centeredSlides: true,
      speed: 1500,
      loop: true,
      allowTouchMove: true,
      slidesPerView: "auto",
      observeParents: true,
      observer: true,
    });
  }
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

var browserMobile = false;
if (jQuery("body").hasClass("layout-mobile")) browserMobile = true;
jQuery(window).scroll(function () {
  scrollContent();
  // slideCountStatus();
});

function scrollContent() {
  if (jQuery(".count-container .animCounter").length) {
    // var aboutCounterUp;
    jQuery(".count-container .animCounter").each(function () {
      var getTargetVal = jQuery(this).data("counter");
      var aboutCounterUp = jQuery(this);

      // console.log(jQuery(getTargetVal));
      jQuery(this).counter({
        autoStart: false,
        duration: 2000,
        countTo: getTargetVal,
        placeholder: 0,
        easing: "swing",
        onStart: function () {},
        onComplete: function () {
          jQuery(".count-container .animCounter").addClass("completed");
        },
      });
    });
  }

  var jQuerytoLoad = jQuery(".to-load");
  var jQuerytoLoadElement = jQuery(".to-load-element");
  var jQuerytoLoadElement2 = jQuery(".to-load-element2");
  var jQuerytoLoadElement3 = jQuery(".to-load-element3");
  var jQuerytoLoadElement4 = jQuery(".to-load-element4");
  if (browserMobile) jQuery(".to-load").addClass("loaded");
  jQuery(".to-load-element").addClass("loaded");

  if (browserMobile) {
    newScroll = jQuery(window).scrollTop();
  } else {
    if (window.scrollY > 0) {
      newScroll = window.scrollY;
    } else {
      newScroll = jQuery("html,body").scrollTop();
    }
  }
  if (!browserMobile) {
    jQuerytoLoad.each(function () {
      var object = jQuery(this);
      if (
        newScroll + jQuery(window).height() * 1.05 >
        jQuery(this).offset().top
      ) {
        object.removeClass("no-anim");
        object.addClass("loaded");
      } else if (
        newScroll + jQuery(window).height() <
        jQuery(this).offset().top
      ) {
        object.addClass("no-anim");
        object.removeClass("loaded");
      }
    });
    jQuerytoLoadElement.each(function () {
      var object = jQuery(this);
      if (
        newScroll + jQuery(window).height() * 1.05 >
        jQuery(this).offset().top
      ) {
        object.removeClass("no-anim");
        object.addClass("loaded");
      } else if (
        newScroll + jQuery(window).height() <
        jQuery(this).offset().top
      ) {
        object.addClass("no-anim");
        object.removeClass("loaded");
      }
    });
    jQuerytoLoadElement2.each(function () {
      var object = jQuery(this);
      if (
        newScroll + jQuery(window).height() * 0.8 >
        jQuery(this).offset().top
      ) {
        object.removeClass("no-anim");
        object.addClass("loaded");
        object.siblings().removeClass("loaded");
        object.prevAll().addClass("prevLoaded");
      } else if (
        newScroll + jQuery(window).height() <
        jQuery(this).offset().top
      ) {
        object.addClass("no-anim");
        object.removeClass("loaded");
        object.removeClass("prevLoaded");
      }
    });
    jQuerytoLoadElement3.each(function () {
      var object = jQuery(this);

      if (window.innerWidth < 768) {
        if (newScroll + jQuery(window).height() > jQuery(this).offset().top) {
          object.removeClass("no-anim");
          object.addClass("loaded");
        } else if (
          newScroll + jQuery(window).height() <
          jQuery(this).offset().top * 1.6
        ) {
          object.addClass("no-anim");
          object.removeClass("loaded");
        }
      } else {
        if (
          newScroll + jQuery(window).height() >
          jQuery(this).offset().top * 1.6
        ) {
          object.removeClass("no-anim");
          object.addClass("loaded");
        } else if (
          newScroll + jQuery(window).height() <
          jQuery(this).offset().top * 1.6
        ) {
          object.addClass("no-anim");
          object.removeClass("loaded");
        }
      }
    });

    jQuerytoLoadElement4.each(function () {
      var object = jQuery(this);
      if (
        newScroll + jQuery(window).height() * 1.05 >
        jQuery(this).offset().top
      ) {
        object.removeClass("no-anim");
        object.addClass("loaded");

        jQuery(".count-container .animCounter").each(function () {
          if (
            jQuery(".count-container .animCounter").hasClass("completed") !==
            true
          ) {
            jQuery(this).counter("start");
          }
        });

        if (
          object.find(".animCounter").hasClass("aboutCounter") &&
          object.find(".animCounter").hasClass("completed") !== true
        ) {
          console.log("entered 2 ");
          aboutCounterUp.counter("start");
        }
      } else if (
        newScroll + jQuery(window).height() <
        jQuery(this).offset().top * 1.6
      ) {
        object.addClass("no-anim");
        object.removeClass("loaded");
        object.find(".animCounter").removeClass("completed");
        jQuery(".count-container .animCounter").removeClass("completed");
      }
    });
  } else {
    jQuery(".to-load").addClass("loaded");
    jQuery(".to-load-element").addClass("loaded");
    jQuery(".to-load-element2").addClass("loaded");
    jQuery(".to-load-element3").addClass("loaded");
  }
  currentScroll = newScroll;

  var scrollPercentage =
    100 * (jQuery(this).scrollTop() / jQuery("body").height());
  if (scrollPercentage >= 50 && scrollPercentage <= 75) {
    jQuery("body").addClass("socialShare");
  } else {
    jQuery("body").removeClass("socialShare");
  }
}

function whichBrs() {
  var agt = navigator.userAgent.toLowerCase();
  if (agt.indexOf("opera") != -1) return "Opera";
  if (agt.indexOf("staroffice") != -1) return "Star Office";
  if (agt.indexOf("webtv") != -1) return "WebTV";
  if (agt.indexOf("beonex") != -1) return "Beonex";
  if (agt.indexOf("chimera") != -1) return "Chimera";
  if (agt.indexOf("netpositive") != -1) return "NetPositive";
  if (agt.indexOf("phoenix") != -1) return "Phoenix";
  if (agt.indexOf("firefox") != -1) return "Firefox";
  if (agt.indexOf("chrome") != -1) return "Chrome";
  if (agt.indexOf("safari") != -1) return "Safari";
  if (agt.indexOf("skipstone") != -1) return "SkipStone";
  if (agt.indexOf("msie") != -1) return "Internet Explorer";
  if (agt.indexOf("netscape") != -1) return "Netscape";
  if (agt.indexOf("mozilla/5.0") != -1) return "Mozilla";
  if (agt.indexOf("/") != -1) {
    if (agt.substr(0, agt.indexOf("/")) != "mozilla") {
      return navigator.userAgent.substr(0, agt.indexOf("/"));
    } else return "Netscape";
  } else if (agt.indexOf(" ") != -1)
    return navigator.userAgent.substr(0, agt.indexOf(" "));
  else return navigator.userAgent;
}

if (jQuery(".word").length) {
  var words = document.getElementsByClassName("word");
  var wordArray = [];
  var currentWord = 0;

  words[currentWord].style.opacity = 1;
  for (var i = 0; i < words.length; i++) {
    splitLetters(words[i]);
  }

  function changeWord() {
    var cw = wordArray[currentWord];
    var nw =
      currentWord == words.length - 1
        ? wordArray[0]
        : wordArray[currentWord + 1];
    for (var i = 0; i < cw.length; i++) {
      animateLetterOut(cw, i);
    }

    for (var i = 0; i < nw.length; i++) {
      nw[i].className = "letter behind";
      nw[0].parentElement.style.opacity = 1;
      animateLetterIn(nw, i);
    }

    currentWord = currentWord == wordArray.length - 1 ? 0 : currentWord + 1;
  }

  function animateLetterOut(cw, i) {
    setTimeout(function () {
      cw[i].className = "letter out";
    }, i * 80);
  }

  function animateLetterIn(nw, i) {
    setTimeout(function () {
      nw[i].className = "letter in";
    }, 340 + i * 80);
  }

  function splitLetters(word) {
    var content = word.innerHTML;
    word.innerHTML = "";
    var letters = [];
    for (var i = 0; i < content.length; i++) {
      var letter = document.createElement("span");
      letter.className = "letter";
      letter.innerHTML = content.charAt(i);
      word.appendChild(letter);
      letters.push(letter);
    }

    wordArray.push(letters);
  }

  changeWord();
  setInterval(changeWord, 4000);
}
