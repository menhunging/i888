$(document).ready(function () {
  if ($(".cardProduct-slider").length > 0) {
    const toggleCardProductSliderEndClass = () => {
      const $smallSlider = $(".cardProduct-slider--small");
      const $lastSlide = $smallSlider.find(".swiper-slide").last();
      const isLastSlideVisible = $lastSlide.hasClass("swiper-slide-visible");

      $smallSlider.toggleClass("is-end", isLastSlideVisible);
    };

    const cardProductSmall = new Swiper(".cardProduct-slider--small", {
      spaceBetween: 10,
      slidesPerView: 4,
      watchSlidesProgress: true,

      breakpoints: {
        320: {
          spaceBetween: 10,
          slidesPerView: 3,
        },
        390: {
          spaceBetween: 10,
          slidesPerView: 4,
        },
      },

      on: {
        init() {
          requestAnimationFrame(toggleCardProductSliderEndClass);
        },
        slideChange() {
          requestAnimationFrame(toggleCardProductSliderEndClass);
        },
        transitionEnd() {
          requestAnimationFrame(toggleCardProductSliderEndClass);
        },
        resize() {
          requestAnimationFrame(toggleCardProductSliderEndClass);
        },
        breakpoint() {
          requestAnimationFrame(toggleCardProductSliderEndClass);
        },
      },
    });

    const cardProduct = new Swiper(".cardProduct-slider", {
      spaceBetween: 10,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      thumbs: {
        swiper: cardProductSmall,
      },
      on: {
        init() {
          requestAnimationFrame(toggleCardProductSliderEndClass);
        },
        slideChange() {
          requestAnimationFrame(toggleCardProductSliderEndClass);
        },
        transitionEnd() {
          requestAnimationFrame(toggleCardProductSliderEndClass);
        },
      },
    });

    $(".cardProduct-slider__desc").on("click", function (e) {
      e.preventDefault();

      const firstVideoLink = $(".cardProduct-slider")
        .find(".playVideoLink")
        .first();

      if (firstVideoLink.length > 0) {
        firstVideoLink.get(0).click();
      }
    });
  }

  if ($(".chosen-clients__slider").length > 0) {
    const chosenClientsSlider = new Swiper(".chosen-clients__slider", {
      spaceBetween: 0,
      slidesPerView: 3,

      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },

      pagination: {
        el: $(".chosen-clients .swiper-pagination").toArray(),
        clickable: true,
      },

      navigation: {
        nextEl: $(".chosen-clients .btnSwiperNext").toArray(),
        prevEl: $(".chosen-clients .btnSwiperPrev").toArray(),
      },

      breakpoints: {
        320: {
          spaceBetween: 10,
          slidesPerView: 1.15,
        },
        767: {
          spaceBetween: 0,
          slidesPerView: 2,
        },
        1280: {
          spaceBetween: 0,
          slidesPerView: 3,
        },
      },
    });
  }

  if ($(".simple-slider").length > 0) {
    $(".simple-slider").each(function () {
      const sliderWrapper = $(this);

      const slider = new Swiper(
        sliderWrapper.find(".simple-slider__slider")[0],
        {
          spaceBetween: 24,
          slidesPerView: 4,
          watchSlidesProgress: true,

          pagination: {
            el: sliderWrapper.find(".swiper-pagination")[0],
            clickable: true,
          },

          navigation: {
            nextEl: sliderWrapper.find(".btnSwiperNext")[0],
            prevEl: sliderWrapper.find(".btnSwiperPrev")[0],
          },

          breakpoints: {
            320: {
              slidesPerView: 1.2,
              spaceBetween: 10,
            },
            768: {
              spaceBetween: 16,
              slidesPerView: 3,
            },
            1024: {
              spaceBetween: 18,
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4,
            },
          },
        },
      );
    });
  }

  if ($(".cardProduct-color").length > 0) {
    $(document).on("click", ".cardProduct-color", function () {
      $(".cardProduct-color__list").slideUp(100);

      $(this)
        .toggleClass("opened")
        .next(".cardProduct-color__list")
        .stop()
        .slideToggle();
    });

    $(document).on("click", ".cardProduct-color__change", function () {
      $(".cardProduct-color").removeClass("opened");
      $(".cardProduct-color__list").stop().slideUp();
    });

    $(document).click(function (event) {
      if (
        !$(event.target).closest(".cardProduct-color, .cardProduct-color__list")
          .length
      ) {
        $(".cardProduct-color").removeClass("opened");
        $(".cardProduct-color__list").stop().slideUp();
      }
    });
  }

  if ($(".all-characteristics-link").length > 0) {
    const toggleBtn = $(".all-characteristics-link");
    const mobileOnly = $(".cardProduct-about-body__li.mobile-only");

    toggleBtn.on("click", function (e) {
      if (!isMobile()) return;

      e.preventDefault();

      const self = $(this);
      const isActive = self.toggleClass("active").hasClass("active");

      mobileOnly.toggleClass("active");
      self.text(isActive ? self.data("active") : self.data("default"));
    });

    $(window).on("resize", function () {
      if (!isMobile()) {
        toggleBtn.removeClass("active");
        toggleBtn.text(toggleBtn.data("default"));
        mobileOnly.removeClass("active");
      }
    });
  }

  if ($(".cardInfo-new__content").length > 0) {
    const height = isTablet() ? 241 : 692; // пока так поставим, потом может подумаем как высоту менять
    const heightBlock = $(".cardInfo-new__content").outerHeight();

    if (heightBlock >= height) {
      $(".cardInfo-new__more").addClass("visible");
    }

    $(".cardInfo-new__more").on("click", function () {
      const content = $(".cardInfo-new__content");
      const button = $(this);
      const parentsBlock = content.closest(".cardInfo-new");
      const isOpened = content.toggleClass("opened").hasClass("opened");

      button.toggleClass("active", isOpened);
      button.text(isOpened ? button.data("less") : button.data("more"));

      if (isOpened) {
        content.attr("style", "height:auto;max-height:initial");
      } else {
        content.removeAttr("style");

        $("html, body").animate(
          {
            scrollTop: parentsBlock.offset().top,
          },
          400,
        );
      }
    });
  }

  if ($(".video-block").length > 0) {
    const videoBlock = $(".video-block");
    const video = videoBlock.find("video");
    const playBtn = videoBlock.find(".video-block__play");

    playBtn.on("click", function () {
      const videoEl = video.get(0);

      video.prop("controls", true);
      videoEl.play();

      playBtn.hide();
    });

    video.on("pause", function () {
      playBtn.show();
    });
  }

  if ($(".product-new").length > 0) {
    $(".product-new .picture-block").each(function () {
      const block = $(this);
      const img = block.find("img");
      const dotsWrap = block.find(".picture-block__dots");

      const images = block.data("images");
      const total = images.length;

      let isHover = false;

      for (let i = 0; i < total; i++) {
        dotsWrap.append('<span class="picture-block__dot"></span>');
      }

      const dots = dotsWrap.find(".picture-block__dot");

      function setActive(index) {
        dots.removeClass("is-active");
        dots.eq(index).addClass("is-active");
      }

      // preload
      images.forEach((src) => {
        const img = new Image();
        img.src = src;
      });

      block.on("mouseenter", function () {
        isHover = true;
      });

      block.on("mouseleave", function () {
        isHover = false;
        img.attr("src", images[0]);
        setActive(0);
      });

      block.on("mousemove", function (e) {
        if (!isHover) return;

        const offset = block.offset();
        const width = block.outerWidth();
        const x = e.pageX - offset.left;

        let progress = x / width;
        progress = Math.max(0, Math.min(1, progress));

        const index = Math.round(progress * (total - 1));

        img.attr("src", images[index]);
        setActive(index);
      });

      // начальное состояние
      setActive(0);
    });
  }
});

function isMobile() {
  return $(window).width() <= 767;
}

function isTablet() {
  return $(window).width() <= 1023;
}
