jQuery(function ($) {
  if (jQuery("#modeToggle").length) {
    const checkbox = document.getElementById("modeToggle");
    $("html").addClass("aiModeOn");
    $("#modeToggle").prop("checked", false);

    checkbox.addEventListener("change", (event) => {
      if (event.currentTarget.checked) {
        $("html").removeClass("aiModeOn");
        $("html").addClass("aiModeOff");
      } else {
        $("html").removeClass("aiModeOff");
        $("html").addClass("aiModeOn");
      }
    });
  }

  $(".nav-btn").on("click", function () {
    if (!$(".nav-toggle").hasClass("active")) {
      $(".nav-toggle").addClass("active");
      $("html").addClass("before-menu-open");
      setTimeout(function () {
        $("html").addClass("menu-open");
        $(".nav-bg figure:first-child").addClass("active");
      }, 30);
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
      $(".nav-bg figure").removeClass("active");
    }
  });

  var timeout;
  $(".main-links > li > a").mouseenter(function () {
    var thisElement = $(this);
    var curIndex = thisElement.parent().index();
    console.log(curIndex);
    $(".nav-bg figure")
      .eq(curIndex)
      .addClass("active")
      .siblings()
      .removeClass("active");

    if (timeout != null) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(function () {
      if (thisElement.parent().hasClass("parent")) {
        thisElement.parent().addClass("hover");
      } else {
      }
      thisElement.parent().siblings().removeClass("hover");
      thisElement
        .parent()
        .parent()
        .siblings()
        .find(".hover")
        .removeClass("hover");
    }, 30);
  });

  $(".main-nav .main-links > li.parent>a").click(function (e) {
    if (window.innerWidth < 1001) {
      e.preventDefault();
      $(this)
        .parent("li")
        .addClass("showSub")
        .siblings()
        .removeClass("showSub");
      $(".main-nav").addClass("subNavVisible");
    }
  });

  $(".main-nav .sub-nav .back-btn").click(function (e) {
    e.preventDefault();
    $(".main-nav .main-links > li").removeClass("showSub");
    $(".main-nav").removeClass("subNavVisible");
  });

  $(".main-links > li > a").mouseleave(function () {
    if (timeout != null) {
      clearTimeout(timeout);
      timeout = null;
    }
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

  $(".down-arrow").click(function (e) {
    e.preventDefault();
    if ($(".home-banner").length) {
      $(".content-slider .item").removeClass("animatedSlide");
      setTimeout(function () {
        // if ($('.home-banner').length) {

        $(".content-slider")
          .find(".is-selected")
          .addClass("animatedSlide")
          .siblings()
          .removeClass("animatedSlide");

        // }
      }, 300);
    }
    var target = $(this).parents(".banner").next();
    console.log($(target).offset().top);
    var headerHeight = $(".main-header").outerHeight(true);
    $("html, body").animate(
      {
        scrollTop: $(target).offset().top - headerHeight,
      },
      1000
    );
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

  if ($(".home-banner").length) {
    var $carousel = $(".banner-slider").flickity({
      fade: true,
      prevNextButtons: false,
      pageDots: false,
      wrapAround: true,
      autoPlay: 7000,
      on: {
        ready: function () {
          console.log("Flickity is ready");
        },
        change: function (index) {
          var getCur = index;
          console.log(getCur);
          // $(".text-roll-slider .swiper-wrapper").slick("slickGoTo", getCur);
          // $(".text-flip-slider .swiper-wrapper").slick("slickGoTo", getCur);
          $(".banner-slider .item")
            .eq(index)
            .addClass("is-animated")
            .siblings()
            .removeClass("is-animated");
        },
      },
    });
    $carousel.flickity("pausePlayer");
    $(".slick-custom-prev").on("click", function () {
      $carousel.flickity("previous");
    });
    // next
    $(".slick-custom-next").on("click", function () {
      $carousel.flickity("next");
    });

    // 2nd carousel, navigation
    $(".content-slider").flickity({
      asNavFor: ".banner-slider",
      contain: true,
      prevNextButtons: false,
      pageDots: false,
      fade: true,
      wrapAround: true,
      autoPlay: false,
      on: {
        ready: function () {
          console.log("Flickity is ready");
        },
        change: function (index) {
          $(".content-slider .item")
            .eq(index)
            .addClass("animatedSlide")
            .siblings()
            .removeClass("animatedSlide");
        },
      },
    });

    // var swiperRoll = new Swiper(".text-roll-slider", {
    //   spaceBetween: 0,
    //   centeredSlides: true,
    //   speed: 1000,
    //   direction: "vertical",
    //   allowTouchMove: false,
    //   autoplay: false,
    //   loop: false,
    //   slidesPerView: 1,
    // });

    // var swiperFlip = new Swiper(".text-flip-slider", {
    //   spaceBetween: 0,
    //   centeredSlides: true,
    //   speed: 1000,
    //   direction: "vertical",
    //   allowTouchMove: false,
    //   autoplay: false,
    //   cubeEffect: {
    //     shadow: true,
    //     slideShadows: true,
    //     shadowOffset: 20,
    //     shadowScale: 0.94,
    //   },
    //   loop: false,
    //   slidesPerView: 1,
    // });

    // var swiperRoll = $(".text-roll-slider .swiper-wrapper ").slick({
    //   vertical: true,
    //   verticalSwiping: true,
    //   slidesToShow: 1,
    //   slidesToScroll: 1,
    //   arrows: false,
    //   infinite: true,
    //   centerPadding: "20px",
    // });

    // var swiperFlip = $(".text-flip-slider  .swiper-wrapper").slick({
    //   vertical: true,
    //   verticalSwiping: true,
    //   slidesToShow: 1,
    //   slidesToScroll: 1,
    //   arrows: false,
    //   infinite: true,
    // });

    setTimeout(function () {
      $("html").addClass("scene1");
      $("html").addClass("scene2");
      setTimeout(function () {
        $("html").addClass("scene3");
        $carousel.flickity("unpausePlayer");
        $(".banner-slider .item:first-child")
          .addClass("is-animated")
          .siblings()
          .removeClass("is-animated");
        setTimeout(function () { }, 3000);
        setTimeout(function () { }, 3200);
      }, 100);
    }, 100);

    // $('.home-banner .tiles').addClass('animateTiles');
    // setInterval(function () {

    //   $('.home-banner .tiles').addClass('animateTiles');
    //   setTimeout(function () {
    //     $('.home-banner .tiles').removeClass('animateTiles');
    //   },6000);
    // },3000);

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

  if ($(".life-slider").length) {
    // let SwiperDesktop = new Swiper(".life-slider-desktop", {
    //   spaceBetween: 0,
    //   centeredSlides: true,
    //   speed: 3000,
    //   // direction: "vertical",

    //   autoplay: {
    //     delay: 1,
    //     disableOnInteraction: false,
    //     pauseOnMouseEnter: false,
    //   },

    //   loop: true,
    //   slidesPerView: "auto",
    //   allowTouchMove: false,
    // });
    // alert();
    // $(".carouselTickerInsights").carouselTicker({
    //   speed: 1,
    //   delay: 7,
    //   reverse: false,
    // });

    var carouselTicker2 = $(".carouselTicker2").carouselTicker({
      speed: 1,
      delay: 7,
      reverse: false,
    });

    var carouselTicker1 = $(".carouselTicker").carouselTicker({
      speed: 1,
      delay: 7,
      reverse: false,
    });

    $(".life-slider a[data-fancybox]").fancybox({
      animationEffect: false,
      afterShow: function () {
        // $(".life-slider-desktop").each(function () {
        //   this.swiper.autoplay.pause();
        // });
        // alert(1);
        // carouselTicker1.carouselTicker().stop();
        // carouselTicker2.carouselTicker().stop();
      },
      afterClose: function () {
        // setTimeout(function () {
        //   $(".life-slider-desktop").each(function () {
        //     this.swiper.autoplay.resume();
        //   });
        // }, 200);
        // alert(2);
        // carouselTicker1.carouselTicker().run();
        // carouselTicker2.carouselTicker().run();
        setTimeout(function () {
          carouselTicker1.carouselTicker().resizeTicker();
          carouselTicker2.carouselTicker().resizeTicker();
        }, 1000);
      },
      baseClass: "galleryPop",
      smallBtn: false,
      closeBtn: "true",
      toolbar: "auto",
      buttons: ["close"],
      loop: true,
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
      baseClass: "galleryPop",
      smallBtn: false,
      closeBtn: "true",
      toolbar: "auto",
      buttons: ["close"],
      loop: true,
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
    // new Swiper(".our-work-slider-one", {
    //   spaceBetween: 0,
    //   centeredSlides: true,
    //   speed: 5000,
    //   direction: "vertical",

    //   autoplay: {
    //     delay: 1,
    //     disableOnInteraction: false,
    //     pauseOnMouseEnter: true,
    //   },

    //   loop: true,
    //   slidesPerView: "auto",
    // });
    $(".our-work-slider-one .swiper-wrapper").slick({
      vertical: true,
      verticalSwiping: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 0,
      speed: 5000,
      cssEase: "linear",
      infinite: true,
      arrows: false,
      touchMove: true,
      swipeToSlide: true,
      swipe: true,
    });
  }

  if ($(".our-work-slider-twos").length) {
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

  if ($(".our-work-slider-threes").length) {
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

  if ($(".our-work-slider-mobile").length) {
    new Swiper(".our-work-slider-mobile", {
      centeredSlides: false,
      speed: 1500,
      loop: true,
      spaceBetween: 25,
      allowTouchMove: true,
      slidesPerView: "auto",
      observeParents: true,
      observer: true,
      autoplay: {
        delay: 1,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
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
  var scroll = $(window).scrollTop();
  if (scroll >= 60) {
    $("body").addClass("compressed");
  } else {
    $("body").removeClass("compressed");
  }

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
        onStart: function () { },
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

const scrollers = document.querySelectorAll(".scroller");

function addAnimation() {
  scrollers.forEach((scroller) => {
    scroller.setAttribute("data-animated", true);
    const scrollerInner = scroller.querySelector(".scroller__inner");
    const scrollerContent = Array.from(scrollerInner.children);
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });
  });
}

addAnimation();

/** Timeline script */
function Timeline(selector, config) {
  this.el = $(selector);

  // options do not effect CSS, has to be set seperately
  const defaults = {
    track: {
      endAtLast: false,
    },
    viewPointBottom: false,
    viewPoint: 400,
  };
  this.options = $.extend({}, defaults, config || {});

  $(document).ready(() => {
    this.init();
  });

  this.init = function () {
    // this.el.addClass("is-loading");
    // this.el.addClass("is-init");
    this.el.each(function () {
      this.offsetHeight;
    });
    // this.el.removeClass("is-loading");
    this.animation();
    this.trackHeight();

    let self = this;
    $(document).scroll(function () {
      self.animation();
    });
    $(document).resize(function () {
      self.trackHeight();
    });
  };

  this.animation = function () {
    let self = this;

    let scrollTop = $(document).scrollTop();
    let viewPoint = scrollTop + this.options.viewPoint;
    if (this.options.viewPointBottom) {
      viewPoint = scrollTop + window.innerHeight - this.options.viewPoint;
    }

    this.updateTrack(viewPoint);

    $(".timeline__item", this.el).each(function (i, v) {
      let top = $(this).offset().top;
      let bottom = $(this).offset().top + $(this).outerHeight(true);

      if (viewPoint < top) {
        self.updateClasses(this, "is-below");
      } else if (viewPoint > bottom) {
        self.updateClasses(this, "is-above is-visible");
      } else {
        self.updateClasses(this, "is-current is-visible");
      }
    });

    if ($(".timeline__footer").length) {
      let footer = ".timeline__footer";
      let top = $(footer).offset().top;

      if (viewPoint < top) {
        self.updateClasses(footer, "");
      } else {
        self.updateClasses(footer, "is-visible");
      }
    }
  };

  this.updateClasses = function (el, newClass) {
    $(el).removeClass("is-above is-current is-below is-visible");
    $(el).addClass(newClass);
  };

  this.updateTrack = function (viewPoint) {
    $el = $(".timeline__track", ".timeline");
    let top = $el.offset().top;
    let height = viewPoint - top;
    $el.height(height);
  };

  this.trackHeight = function () {
    let trackMax = this.el.outerHeight();
    if (this.options.track.endAtLast) {
      trackMax = trackMax - $(".timeline__item").last().outerHeight() + 9;
    }
    $(".timeline__track", this.el).css("max-height", trackMax);
  };
}

if ($(".timeline").length) {
  new Timeline(".timeline");
}

var carouselTickerInsights = $(".carouselTickerInsights").carouselTicker({
  speed: 1,
  delay: 10,
  reverse: false,
});

const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["AI-Driven Insights"];
const typingDelay = 200;
const erasingDelay = 100;
const newTextDelay = 100; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if (!cursorSpan.classList.contains("typing"))
      cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    if (!cursorSpan.classList.contains("typing"))
      cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(
      0,
      charIndex - 1
    );
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  if (textArray.length) setTimeout(type, newTextDelay + 250);
});

setTimeout(function () {
  $(".IntroPanel").removeClass("active").addClass("hidden");
  $(".searchPanel").removeClass("hidden").addClass("active");
}, 10000);
