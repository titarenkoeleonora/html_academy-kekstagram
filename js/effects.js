'use strict';

(function () {

  var DEFAULT_EFFECT_PIN = 100;
  var MIN_EFFECT_VALUE = 1;
  var MAX_EFFACT_VALUE = 3;

  var uploadFile = document.querySelector('#upload-file');
  var imgUploadPhoto = document.querySelector('#img-upload__photo');
  var effects = document.querySelector('.effects');
  var effectLevel = document.querySelector('.effect-level');
  var currentFilter = null;

  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevelValue = document.querySelector('.effect-level__value');

  var filterChangeHandler = function (evt) {
    currentFilter = evt.target.value;
    if (evt.target && evt.target.matches('input[type="radio"]')) {
      effectLevel.classList.remove('hidden');
      imgUploadPhoto.removeAttribute('class');
      imgUploadPhoto.style.filter = '';
      effectLevelPin.style.left = DEFAULT_EFFECT_PIN + '%';
      effectLevelDepth.style.width = DEFAULT_EFFECT_PIN + '%';
      imgUploadPhoto.classList.add('effects__preview--' + currentFilter);
      if (currentFilter === 'none') {
        effectLevel.classList.add('hidden');
        imgUploadPhoto.style.filter = '';
      }
    }
  };

  effects.addEventListener('change', filterChangeHandler);

  // Слайдер смены интенсивности эффекта

  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();


      var shift = startCoords - moveEvt.clientX;

      startCoords = moveEvt.clientX;

      var pin = effectLevelPin.offsetLeft - shift;

      if (!(pin < 0 || pin > effectLevelLine.offsetWidth)) {
        effectLevelValue = pin / effectLevelLine.offsetWidth;

        effectLevelPin.style.left = pin + 'px';
        effectLevelDepth.style.width = pin + 'px';
        getEffectLevel();
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  uploadFile.addEventListener('change', function () {
    effectLevel.classList.add('hidden');
  });

  // глубина эффекта

  var getEffectLevel = function () {
    switch (currentFilter) {
      case 'chrome':
        imgUploadPhoto.style.filter = null;
        imgUploadPhoto.style.filter = getEffectChrome(effectLevelValue);
        break;
      case 'sepia':
        imgUploadPhoto.style.filter = null;
        imgUploadPhoto.style.filter = getEffectSepia(effectLevelValue);
        break;
      case 'marvin':
        imgUploadPhoto.style.filter = null;
        imgUploadPhoto.style.filter = getEffectMarvin(effectLevelValue);
        break;
      case 'phobos':
        imgUploadPhoto.style.filter = null;
        imgUploadPhoto.style.filter = getEffectPhobos(effectLevelValue);
        break;
      case 'heat':
        imgUploadPhoto.style.filter = null;
        imgUploadPhoto.style.filter = getEffectHeat(effectLevelValue);
        break;
    }
  };

  var getEffectChrome = function (value) {
    return 'grayscale(' + value + ')';
  };

  var getEffectSepia = function (value) {
    return 'sepia(' + value + ')';
  };

  var getEffectMarvin = function (value) {
    return 'invert(' + value * DEFAULT_EFFECT_PIN + '%)';
  };

  var getEffectPhobos = function (value) {
    return 'blur(' + value * MAX_EFFACT_VALUE + 'px)';
  };

  var getEffectHeat = function (value) {
    return 'brightness(' + (value * (MAX_EFFACT_VALUE - MIN_EFFECT_VALUE) + MIN_EFFECT_VALUE) + ')';
  };

  // отправка формы

  // var pageBody = document.querySelector('body');
  // var form = document.querySelector('.img-upload__form');
  // var uploadForm = document.querySelector('.img-upload__overlay');
  // var main = document.querySelector('main');
  // var imgUploadPreview = document.querySelector('.img-upload__preview');
  // var successInner = document.querySelector('.success__inner');
  // var errorInner = document.querySelector('.error__inner');

  // var successHandler = function () {
  //   var success = document.querySelector('#success').content.querySelector('.success');
  //   var successButton = success.querySelector('.success__button');

  //   main.appendChild(success);
  //   successButton.addEventListener('click', function () {
  //     main.removeChild(success);
  //     pageBody.classList.remove('modal-open');
  //   });

  //   pageBody.addEventListener('keydown', function (evt) {
  //     if (evt.key === window.form.ESC_KEY) {
  //       main.removeChild(success);
  //       window.effects.resetData();
  //     }
  //   });

  //   document.addEventListener('click', function (evt) {
  //     if (evt.target !== successInner) {
  //       main.removeChild(success);
  //       window.effects.resetData();
  //     }
  //   });
  // };

  // var errorHandler = function () {
  //   var error = document.querySelector('#error').content.querySelector('.error');
  //   var errorButton = error.querySelector('.error__button');

  //   main.appendChild(error);
  //   errorButton.addEventListener('click', function () {
  //     main.removeChild(error);
  //   });

  //   pageBody.addEventListener('keydown', function (evt) {
  //     if (evt.key === window.form.ESC_KEY) {
  //       main.removeChild(error);
  //       window.effects.resetData();
  //     }
  //   });

  //   document.addEventListener('click', function (evt) {
  //     if (evt.target !== errorInner) {
  //       main.removeChild(error);
  //       window.effects.resetData();
  //     }
  //   });
  // };

  // var resetData = function () {
  //   form.reset();
  //   imgUploadPhoto.style.filter = 'none';
  //   window.imageSize.getTransformImage(imgUploadPreview, 1);
  //   window.imageSize.scaleControlValue.value = window.imageSize.defaultPictureSize;
  // };

  // form.addEventListener('submit', function (evt) {
  //   evt.preventDefault();
  //   uploadForm.classList.add('hidden');
  //   resetData();

  //   window.upload(new FormData(form), successHandler, errorHandler);
  // });

  window.effects = {
    getEffectLevel: getEffectLevel
  };
})();
