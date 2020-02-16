'use strict';

(function () {

  var uploadFile = document.querySelector('#upload-file');
  var imgUploadPhoto = document.querySelector('#img-upload__photo');
  var effects = document.querySelector('.effects');
  var effectLevel = document.querySelector('.effect-level');

  var filterChangeHandler = function (evt) {
    var currentFilter = evt.target.value;
    if (evt.target && evt.target.matches('input[type="radio"]')) {
      effectLevel.classList.remove('hidden');
      imgUploadPhoto.removeAttribute('class');
      imgUploadPhoto.classList.add('effects__preview--' + currentFilter);
      // if (currentFilter === 'chrome') {
      //   imgUploadPhoto.style.filter = '';
      //   imgUploadPhoto.style.filter = getEffectChrome(window.effects.effectLevelValue);
      // }
      // if (currentFilter === 'sepia') {
      //   imgUploadPhoto.style.filter = '';
      //   imgUploadPhoto.style.filter = getEffectSepia(window.effects.effectLevelValue);
      // }
      if (currentFilter === 'none') {
        effectLevel.classList.add('hidden');
        imgUploadPhoto.style.filter = '';
      }
    }
    window.effects = {
      currentFilter: currentFilter
    };
  };

  // Слайдер смены интенсивности эффекта

  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  effectLevelPin.style.left = 100 + '%';
  effectLevelDepth.style.width = 100 + '%';

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
        if (window.effects.currentFilter === 'chrome') {
          imgUploadPhoto.style.filter = '';
          imgUploadPhoto.style.filter = getEffectChrome(effectLevelValue);
        }
        if (window.effects.currentFilter === 'sepia') {
          imgUploadPhoto.style.filter = '';
          imgUploadPhoto.style.filter = getEffectSepia(effectLevelValue);
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

  effects.addEventListener('change', filterChangeHandler);

  var getEffectChrome = function (df) {
    return 'grayscale(' + df + ')';
  };

  var getEffectSepia = function (df) {
    return 'sepia(' + df + ')';
  };

  // var getEffectMarvin = function () {
  //   return 'invert(' + effectLevel + '%)';
  // };

  // var getEffectPhobos = function () {
  //   return 'blur(' + effectLevel * 3 + 'px)';
  // };

  // var getEffectHeat = function () {
  //   return 'brightness(' + (effectLevel * (3 - 1) + 3) + ')';
  // };
})();
