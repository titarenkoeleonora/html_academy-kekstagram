'use strict';

(function () {

  var DEFAULT_EFFECT_PIN = 100;
  var MIN_EFFECT_VALUE = 1;
  var MAX_EFFACT_VALUE = 3;

  var currentFilter = null;
  var currentFilterClass = null;
  var imgUploadPhoto = document.querySelector('#img-upload__photo');
  var effectLevel = document.querySelector('.effect-level');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevelValue = document.querySelector('.effect-level__value');

  var removeFilter = function () {
    if (currentFilterClass) {
      imgUploadPhoto.classList.remove(currentFilterClass);
      imgUploadPhoto.style.filter = '';
    }
  };

  var filterChangeHandler = function (evt) {
    if (evt.target && evt.target.matches('input[type="radio"]')) {
      removeFilter();
      currentFilter = evt.target.value;
      effectLevelPin.style.left = DEFAULT_EFFECT_PIN + '%';
      effectLevelDepth.style.width = DEFAULT_EFFECT_PIN + '%';
      switch (currentFilter) {
        case 'none':
          removeFilter();
          currentFilterClass = 'effects__preview--none';
          imgUploadPhoto.classList.add(currentFilterClass);
          effectLevel.classList.add('hidden');
          break;
        case 'chrome':
          removeFilter();
          currentFilterClass = 'effects__preview--chrome';
          imgUploadPhoto.classList.add(currentFilterClass);
          effectLevel.classList.remove('hidden');
          break;
        case 'sepia':
          removeFilter();
          currentFilterClass = 'effects__preview--sepia';
          imgUploadPhoto.classList.add(currentFilterClass);
          effectLevel.classList.remove('hidden');
          break;
        case 'marvin':
          removeFilter();
          currentFilterClass = 'effects__preview--marvin';
          imgUploadPhoto.classList.add(currentFilterClass);
          effectLevel.classList.remove('hidden');
          break;
        case 'phobos':
          removeFilter();
          currentFilterClass = 'effects__preview--phobos';
          imgUploadPhoto.classList.add(currentFilterClass);
          effectLevel.classList.remove('hidden');
          break;
        case 'heat':
          removeFilter();
          currentFilterClass = 'effects__preview--heat';
          imgUploadPhoto.classList.add(currentFilterClass);
          effectLevel.classList.remove('hidden');
          break;
      }
    }
  };

  var calculateEffectLevel = function (evt) {
    evt.preventDefault();
    var startCoords = evt.clientX;

    var mouseMoveHandler = function (moveEvt) {
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

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  var getEffectLevel = function () {
    imgUploadPhoto.style.filter = null;
    switch (currentFilter) {
      case 'chrome':
        imgUploadPhoto.style.filter = getEffectChrome(effectLevelValue);
        break;
      case 'sepia':
        imgUploadPhoto.style.filter = getEffectSepia(effectLevelValue);
        break;
      case 'marvin':
        imgUploadPhoto.style.filter = getEffectMarvin(effectLevelValue);
        break;
      case 'phobos':
        imgUploadPhoto.style.filter = getEffectPhobos(effectLevelValue);
        break;
      case 'heat':
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

  window.effects = {
    getEffectLevel: getEffectLevel,
    filterChangeHandler: filterChangeHandler,
    calculateEffectLevel: calculateEffectLevel
  };
})();
