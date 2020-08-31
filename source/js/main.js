'use strict';

(function () {
  var pageBody = document.body;
  var pageHeaderLink = document.querySelector('.page-header__link--login');
  var pageHeaderMenuLink = document.querySelector('.page-header__login-link');
  var popupLogin = document.querySelector('.modal-login');
  var closeLogin = popupLogin.querySelector('.modal-login__close');
  var login = popupLogin.querySelector('[name=login]');
  var form = popupLogin.querySelector('.modal-login__form');
  var password = popupLogin.querySelector('[name=password]');
  var toggleMenu = document.querySelector('.page-header__toggle');
  var header = document.querySelector('.page-header');
  var openCart = document.querySelector('.product__button');
  var accordion = document.querySelectorAll('.faq__item');
  var svgAccordion = document.querySelectorAll('.faq__icon');
  var filter = document.querySelectorAll('.filter__form fieldset');
  var toggleFilter = document.querySelectorAll('.filter__legend-wrapper');
  var svgFilter = document.querySelectorAll('.filter__icon');
  var openFilter = document.querySelector('.catalog__button-filter');
  var container = document.querySelector('.slider__inner');

  var isStorageSupport = true;
  var storage = '';

  try {
    storage = localStorage.getItem('login');
  } catch (err) {
    isStorageSupport = false;
  }

  toggleMenu.addEventListener('click', function (evt) {
    evt.preventDefault();
    header.classList.toggle('page-header--menu-active');
  });

  var loginOpen = function (evt) {
    evt.preventDefault();
    popupLogin.classList.add('modal-login--show');
    pageBody.classList.add('no-scroll');

    if (storage) {
      login.value = storage;
      password.focus();
    } else {
      login.focus();
    }
  };

  pageHeaderLink.addEventListener('click', loginOpen);
  pageHeaderMenuLink.addEventListener('click', loginOpen);

  closeLogin.addEventListener('click', function (evt) {
    evt.preventDefault();
    popupLogin.classList.remove('modal-login--show');
    pageBody.classList.remove('no-scroll');
  });

  form.addEventListener('submit', function (evt) {
    if (!login.value || !password.value) {
      evt.preventDefault();
    } else {
      if (isStorageSupport) {
        localStorage.setItem('login', login.value);
      }
    }
  });

  window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      if (popupLogin.classList.contains('modal-login--show')) {
        evt.preventDefault();
        popupLogin.classList.remove('modal-login--show');
        pageBody.classList.remove('no-scroll');
      }
    }
  });

  window.addEventListener('click', function (evt) {
    if (evt.target === popupLogin) {
      if (popupLogin.classList.contains('modal-login--show')) {
        evt.preventDefault();
        popupLogin.classList.remove('modal-login--show');
        pageBody.classList.remove('no-scroll');
      }
    }
  });

  if (openCart) {
    var popupCart = document.querySelector('.modal-cart');
    var closeCart = popupCart.querySelector('.modal-cart__button-close');

    openCart.addEventListener('click', function (evt) {
      evt.preventDefault();
      popupCart.classList.add('modal-cart--show');
      pageBody.classList.add('no-scroll');
    });

    closeCart.addEventListener('click', function (evt) {
      evt.preventDefault();
      popupCart.classList.remove('modal-cart--show');
      pageBody.classList.remove('no-scroll');
    });

    window.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
        if (popupCart.classList.contains('modal-cart--show')) {
          evt.preventDefault();
          popupCart.classList.remove('modal-cart--show');
          pageBody.classList.remove('no-scroll');
        }
      }
    });

    window.addEventListener('click', function (evt) {
      if (evt.target === popupCart) {
        if (popupCart.classList.contains('modal-cart--show')) {
          evt.preventDefault();
          popupCart.classList.remove('modal-cart--show');
          pageBody.classList.remove('no-scroll');
        }
      }
    });
  }

  var accordionWork = function (i) {
    accordion[i].addEventListener('click', function (evt) {
      evt.preventDefault();
      accordion[i].classList.toggle('faq__item--open');
      svgAccordion[i].classList.toggle('faq__icon--up-dir');
    });
  };

  for (var i = 0; i < accordion.length; i++) {
    accordionWork(i);
  }

  var filterWork = function (j) {
    toggleFilter[j].addEventListener('click', function (evt) {
      evt.preventDefault();
      filter[j].classList.toggle('filter__fieldset--open');
      svgFilter[j].classList.toggle('filter__icon--up-dir');
    });
  };

  for (var j = 0; j < filter.length; j++) {
    filterWork(j);
  }

  if (openFilter) {
    var filterModal = document.querySelector('.filter');
    var closeFilter = document.querySelector('.filter__button-close');

    openFilter.addEventListener('click', function (evt) {
      evt.preventDefault();
      filterModal.classList.add('filter--modal');
    });

    closeFilter.addEventListener('click', function (evt) {
      evt.preventDefault();
      filterModal.classList.remove('filter--modal');
    });
  }

  if (container) {
    window.addEventListener('resize', function (evt) {
      var position = 0;
      var slidesToMove = 4;
      var slidesToShow = 4;

      var btnNext = document.querySelector('.slider__button--right');
      var btnPrev = document.querySelector('.slider__button--left');
      var itemWidth = container.clientWidth / slidesToShow;
      var track = document.querySelector('.slider__list');
      var itemsCount = document.querySelectorAll('.slider__item').length;
      var movePosition = slidesToMove * itemWidth;

      evt.preventDefault();

      btnNext.addEventListener('click', function () {
        var itemsLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;

        if (itemsCount > slidesToMove) {
          position -= itemsLeft >= slidesToMove ? movePosition : itemsLeft * itemWidth;
          setPosition();
        } else {
          itemsLeft = slidesToMove;
          position -= itemsLeft >= slidesToMove ? movePosition : itemsLeft * itemWidth;
          setPosition();
        }
      });

      btnPrev.addEventListener('click', function () {
        var itemsLeft = Math.abs(position) / itemWidth;

        position += itemsLeft >= slidesToMove ? movePosition : itemsLeft * itemWidth;
        setPosition();
      });

      var setPosition = function () {
        track.style.transform = `translateX(${position}px)`;
        checkBtns();
      };

      var checkBtns = function () {
        btnPrev.disabled = position === 0;
      };

      checkBtns();
    });
  }
})();
