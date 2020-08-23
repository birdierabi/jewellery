'use strict';

(function () {
  var pageHeaderLink = document.querySelector('.page-header__link--login');
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
  var svgFilter = document.querySelectorAll('.filter__icon');
  var openFilter = document.querySelector('.catalog__button-filter');

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

  pageHeaderLink.addEventListener('click', function (evt) {
    evt.preventDefault();
    popupLogin.classList.add('modal-login--show');

    if (storage) {
      login.value = storage;
      password.focus();
    } else {
      login.focus();
    }
  });

  closeLogin.addEventListener('click', function (evt) {
    evt.preventDefault();
    popupLogin.classList.remove('modal-login--show');
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
      }
    }
  });

  window.addEventListener('click', function (evt) {
    if (evt.target === popupLogin) {
      if (popupLogin.classList.contains('modal-login--show')) {
        evt.preventDefault();
        popupLogin.classList.remove('modal-login--show');
      }
    }
  });

  if (openCart) {
    var popupCart = document.querySelector('.modal-cart');
    var closeCart = popupCart.querySelector('.modal-cart__button-close');

    openCart.addEventListener('click', function (evt) {
      evt.preventDefault();
      popupCart.classList.add('modal-cart--show');
    });

    closeCart.addEventListener('click', function (evt) {
      evt.preventDefault();
      popupCart.classList.remove('modal-cart--show');
    });

    window.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
        if (popupCart.classList.contains('modal-cart--show')) {
          evt.preventDefault();
          popupCart.classList.remove('modal-cart--show');
        }
      }
    });

    window.addEventListener('click', function (evt) {
      if (evt.target === popupCart) {
        if (popupCart.classList.contains('modal-cart--show')) {
          evt.preventDefault();
          popupCart.classList.remove('modal-cart--show');
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
    filter[j].addEventListener('click', function (evt) {
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

  (function () {
    var feedbacks = document.querySelectorAll('.slider__item');
    var hideFeedback = function () {
      feedbacks.forEach(function (e) {
        e.style.display = 'none';
      });
    };
    var number = document.querySelector('.toggle__number--left');
    var index = 0;
    var changeFeedback = function () {
      feedbacks[index].style.display = 'flex';
    };
    var changeNumber = function () {
      number.textContent = (index + 1);
    };
    var left = document.querySelector('.slider__button--left');
    var right = document.querySelector('.slider__button--right');
    left.addEventListener('click', function () {
      index -= 2;
      if (index <= 0) {
        index = 0;
      }
      hideFeedback();
      changeFeedback();
      changeNumber();
    });
    right.addEventListener('click', function () {
      index += 2;
      if (index >= feedbacks.length) {
        index = 0;
      }
      hideFeedback();
      changeFeedback();
      changeNumber();
    });
  })();
})();
