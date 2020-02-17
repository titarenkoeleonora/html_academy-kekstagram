'use strict';

(function () {

  var uploadFile = document.querySelector('#upload-file');
  var imgUploadPhoto = document.querySelector('#img-upload__photo');
  var effects = document.querySelector('.effects');
  var effectLevel = document.querySelector('.effect-level');
  var currentFilter = null;

  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var DEFAULT_EFFECT_PIN = 100;
  var MIN_EFFECT_VALUE = 1;
  var MAX_EFFACT_VALUE = 3;

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
      var effectLevelValue = document.querySelector('.effect-level__value');

      var shift = startCoords - moveEvt.clientX;

      startCoords = moveEvt.clientX;

      var pin = effectLevelPin.offsetLeft - shift;

      if (!(pin < 0 || pin > effectLevelLine.offsetWidth)) {
        effectLevelValue = pin / effectLevelLine.offsetWidth;

        window.effects = {
          effectLevelValue: effectLevelValue
        };

        effectLevelPin.style.left = pin + 'px';
        effectLevelDepth.style.width = pin + 'px';
        if (currentFilter === 'chrome') {
          imgUploadPhoto.style.filter = null;
          imgUploadPhoto.style.filter = getEffectChrome(effectLevelValue);
        }
        if (currentFilter === 'sepia') {
          imgUploadPhoto.style.filter = null;
          imgUploadPhoto.style.filter = getEffectSepia(effectLevelValue);
        }
        if (currentFilter === 'marvin') {
          imgUploadPhoto.style.filter = null;
          imgUploadPhoto.style.filter = getEffectMarvin(effectLevelValue);
        }
        if (currentFilter === 'phobos') {
          imgUploadPhoto.style.filter = getEffectPhobos(effectLevelValue);
        }
        if (currentFilter === 'heat') {
          imgUploadPhoto.style.filter = getEffectHeat(effectLevelValue);
        }
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
})();
