// main.js 2022年4月25日14:52

var __gc = {
  host: window.location.hostname,
  langs: ["fr", "jp", "de", "en", "it", "es", "tw", "pl", "nl"],
  currentLang: "en",
  pathname: window.location.pathname,
  currentVat: 0.1,
  accountingSettins: {
    symbol: "$",
    format: "%s%v",
    decimal: ".",
    thousand: ",",
    precision: 2,
  },
  /**
   * https://www.ubackup.com/jp/download.html -> /jp/
   */
  thePrefixer: "/",

  /**
   * Gets the language of the current page
   * @returns {string}
   */
  showCurrentLang: function () {
    var _ = this;
    var _lang = window.location.pathname.substring(1).split("/")[0];
    var lang = _.langs.indexOf(_lang) > -1 ? _lang : "en";

    if (_.host === "www.aomei.de") {
      lang = "de";
    } else if (_.host === "www.aomei.fr") {
      lang = "fr";
    } else if (_.host === "www.aomei.jp") {
      lang = "jp";
    }
    _.currentLang = lang;
    return lang;
  },
  // Get the specific value of a URL parameter
  getQueryString: function (name, str) {
    var r = str.match(new RegExp("(^|&)" + name + "=([^&]*)(&|$)"));
    if (r != null) return unescape(r[2]);
    return null;
  },
  apperVisualArea: function (dom) {
    var windowHeigth = $(window).height();
    var isHidden =
      dom.getBoundingClientRect().top > 0 &&
      dom.getBoundingClientRect().top < windowHeigth;
    return isHidden;
  },
  apperVisualAreaAddAnimation: function ($item, type) {
    $item.removeClass("animated " + type);
    $.each($item, function (index, curr) {
      __gc.apperVisualArea(curr) ? $(curr).addClass("animated " + type) : false;
      $(window).scroll(function () {
        __gc.apperVisualArea(curr)
          ? $(curr).addClass("animated " + type)
          : false;
      });
    });
  },
  debounce: function (func, wait, immediate) {
    var timeout;
    return function () {
      var context = this,
        args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      callNow && func.apply(context, args);
    };
  },
  back2Top: function () {
    var back2topHtml =
        '<svg id="back-top" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z"></path></svg>',
      docHeight = $(window).height(),
      bdHeight = $(document).height();
    function toggleBack2Top() {
      $(window).scrollTop() >= 0.8 * docHeight
        ? $("#back-top").fadeIn()
        : $("#back-top").fadeOut();
    }
    $("body").append(back2topHtml);

    bdHeight > docHeight &&
      (toggleBack2Top(),
      $(document).on("click", "#back-top", function () {
        return $("html,body").animate({ scrollTop: 0 }, 666), !1;
      })),
      $(window).scroll(function () {
        toggleBack2Top();
      });
  },
  getBrowserInfo: function () {
    var agent = navigator.userAgent.toLowerCase(),
      regStr_ie = /msie [\d.]+;/gi,
      regStr_ff = /firefox\/[\d.]+/gi,
      regStr_chrome = /chrome\/[\d.]+/gi,
      regStr_saf = /safari\/[\d.]+/gi;
    return agent.indexOf("msie") > 0
      ? agent.match(regStr_ie)
      : agent.indexOf("firefox") > 0
      ? agent.match(regStr_ff)
      : agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0
      ? agent.match(regStr_saf)
      : agent.indexOf("chrome") > 0
      ? agent.match(regStr_chrome)
      : void 0;
  },
};

var __ck = {
  slick: function () {
    var h = $(".swiper-box");
    h.length > 0 &&
      $.getScript("/assets/js/base/slick.min.js", function () {
        h.each(function (z) {
          var B = $(this);
          B.slick({
            dots: true,
            autoplay: !!B.data("autoplay"),
            autoplaySpeed: 5000,
            arrows: true,
          });
          var A = B.closest('[data-elem="parent"]').find(
            '[data-slick-content="yes"]'
          );
          if (A.length > 0) {
            B.on("afterChange", function (D, C) {
              A.removeClass("show fade in")
                .eq(C.currentSlide)
                .addClass("show fade in");
            });
            A.click(function () {
              var $this = $(this);
              $this
                .addClass("show fade in")
                .siblings("")
                .removeClass("show fade in");
              A.parents('[data-elem="parent"]')
                .find(".swiper-box")
                .slick("slickGoTo", $this.index());
            });
          }
        });
      });
  },

  faq: function () {
    $('[data-txt="questions"]').on("click", function () {
      var $this = $(this);
      if ($this.hasClass("active")) {
        $this.removeClass("active");
        $this.children('[data-txt="answer"]').stop().slideUp("1000");
      } else {
        $this.addClass("active");
        $this.siblings().removeClass("active");
        $this.children('[data-txt="answer"]').stop().slideDown("1000");
        $this.siblings().children('[data-txt="answer"]').stop().slideUp("1000");
      }
    });
  },

  search: function () {
    $(".btn-search").on("click", function () {
      console.log('1');
      var thislang = "";
      if (lang == "en") {
        thislang = "";
      } else {
        thislang = "/" + lang;
      }

      var fromEle = $(this).closest(".navbar-form");
      var params = fromEle.serialize();
      var q1 = __gc.getQueryString("q", params);

      if (q1) {
        window.location.href = thislang + "/search.html?" + params;
      } else {
        fromEle.toggleClass("clicked");
      }
    });
  },

  navclick: function () {
    $(".nav-tg").on("click", function () {
      $(this)
        .toggleClass("active")
        .closest(".ac-header")
        .find(".nav-mn")
        .toggleClass("show");
    });
  },
  ispc: function () {
    var userAgentInfo = navigator.userAgent;
    var Agents = [
      "Android",
      "iPhone",
      "SymbianOS",
      "Windows Phone",
      "iPod",
      "iPad",
    ];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false;
        break;
      }
    }
    return flag;
  },

  shrink: function () {
    $(document).ready(function () {
      var isPC = __ck.ispc();
      if (!isPC) {
        $(".ac-ft .ac-ft-list dt").on("click", function () {
          var $this = $(this);
          if ($this.hasClass("factive")) {
            $this.removeClass("factive");
            $this.siblings("dd").removeClass("factive");
          } else {
            $this.addClass("factive").siblings("dd").addClass("factive");
            $this
              .parents()
              .siblings(".ac-ft-list")
              .children()
              .find("dt")
              .removeClass("factive");
            $this
              .parents()
              .siblings(".ac-ft-list")
              .children()
              .find("dd")
              .removeClass("factive");
          }
        });
      }
    });
  },
  // index.html animate
  homeanimated: function () {
    $("[data-animated]").each(function () {
      var animatedType = $(this).attr("data-animated");
      __gc.apperVisualAreaAddAnimation($(this), animatedType);
    });
  },
  dropdown: function () {
    $(".layui-dropdown-toggle").on("click", function () {
      if (!__ck.ispc()) {
        var $this = $(this);
        if ($this.hasClass("link_active")) {
          $this.removeClass("link_active");
          $this.addClass("no_active");
        } else {
          $this.addClass("link_active");
          $this.removeClass("no_active");
          $this
            .parents()
            .siblings("[data-toggle='dropdown-btn']")
            .find(".layui-dropdown-toggle")
            .removeClass("link_active");
        }
      }
    });
  },
  scroll: function () {
    $(window).scroll(
      __gc.debounce(function () {
        var sT = $(this).scrollTop();
        var width = $(this).width();

        if (sT > 50 && width > 999) {
          $(".ac-header").addClass("small");
        } else {
          $(".ac-header").removeClass("small");
        }
      }, 100)
    );
  },
  stepslick: function () {
    if ($('[data-swiper="true"]').length > 0) {
      $(".swiper-box").on(
        "beforeChange",
        function (event, slick, currentSlide, nextSlide) {
          $('[data-swiper="true"] .work-flex>div li')
            .eq(nextSlide)
            .addClass("active")
            .siblings("")
            .removeClass();
        }
      );
      $('[data-swiper="true"] .work-flex>div li').click(function () {
        var $this = $(this);
        $this.addClass("active").siblings("").removeClass();
        $(".swiper-box").slick("slickGoTo", $this.index());
      });
    }
  },
  // scroll
  scrollCarousel: function () {
    var $scrollCarouselElem = $('[data-roll="scroll-carousel"]'),
      browserInfo = __gc.getBrowserInfo();
    $scrollCarouselElem.length > 0 &&
      "chrome/94.0.4606.61" != browserInfo[0] &&
      $.getScript("/assets/js/base/jquery.simplyscroll.min.js", function () {
        $("head").append(
          "<style>.simply-scroll-clip{position: relative;overflow: hidden;}.simply-scroll-list>div{float:left}</style>"
        ),
          $scrollCarouselElem.simplyScroll({
            autoMode: "loop",
            horizontal: !0,
            speed: 3,
          });
      });
  },
};
var lang = __gc.showCurrentLang();
$(function () {
  console.log('1');
  __gc.back2Top(),
    __ck.slick(),
    __ck.faq(),
    __ck.navclick(),
    __ck.search(),
    __ck.shrink(),
    __ck.homeanimated(),
    __ck.dropdown(),
    __ck.scroll(),
    __ck.ispc(),
    __ck.stepslick(),
    __ck.scrollCarousel();

  $.getScript("https://cdn-node.diskpart.com/file/amtcstatic/0/ngnr.js");
  // function () {
  //     $.getScript("https://cdn-node.diskpart.com/file/amtcstatic/0/ba.js");
  //   }()
});






