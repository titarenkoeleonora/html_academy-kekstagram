'use strict';

(function () {

  var uploadFile = document.querySelector('#upload-file');
  var imgUploadPhoto = document.querySelector('#img-upload__photo');
  var effects = document.querySelector('.effects');
  var effectLevel = document.querySelector('.effect-level');

  uploadFile.addEventListener('change', function () {
    effectLevel.classList.add('hidden');
  });

  var filterChangeHandler = function (evt) {
    var currentFilter = evt.target.value;
    if (evt.target && evt.target.matches('input[type="radio"]')) {
      imgUploadPhoto.removeAttribute('class');
      imgUploadPhoto.classList.add('effects__preview--' + currentFilter);
      if (evt.target.value !== 'none') {
        effectLevel.classList.remove('hidden');
      } else {
        effectLevel.classList.add('hidden');
      }
    }
  };

  effects.addEventListener('change', filterChangeHandler);

  // Слайдер смены интенсивности эффекта

  var effectLevelPin = document.querySelector('.effect-level__pin');
  // var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelDepth = document.querySelector('.effect-level__depth');

  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = startCoords - moveEvt.clientX;

      startCoords = moveEvt.clientX;

      effectLevelPin.style.left = (effectLevelPin.offsetLeft - shift) + 'px';
      effectLevelDepth.style.width = (effectLevelPin.offsetLeft - shift) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
