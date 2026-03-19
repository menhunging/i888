$(document).ready(function () {
  if ($(".cardProduct-slider").length > 0) {
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
    });
  }

  if ($(".chosen-clients__slider").length > 0) {
    const chosenClientsSlider = new Swiper(".chosen-clients__slider", {
      spaceBetween: 0,
      slidesPerView: 3,

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

  if ($(".cardInfo-new__left").length > 0) {
    const height = isTablet() ? 241 : 692; // пока так поставим, потом может подумаем как высоту менять
    const heightBlock = $(".cardInfo-new__left").outerHeight();

    console.log(height);
    console.log(heightBlock);

    if (heightBlock >= height) {
      $(".cardInfo-new__more").addClass("visible");
    }

    $(".cardInfo-new__more").on("click", function () {
      $(this).hide();
      $(".cardInfo-new__left").attr("style", "height:auto;max-height:initial");
    });
  }
});

function isMobile() {
  return $(window).width() <= 767;
}

function isTablet() {
  return $(window).width() <= 1023;
}
