'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  var pageBody = document.querySelector('body');
  var uploadFile = document.querySelector('#upload-file');
  var uploadForm = document.querySelector('.img-upload__overlay');
  var uploadCancel = document.querySelector('#upload-cancel');
  var effects = document.querySelector('.effects');
  var effectLevel = document.querySelector('.effect-level');
  var effectLevelPin = document.querySelector('.effect-level__pin');

  uploadFile.addEventListener('change', function () {
    window.photoLoader.fileChooseHandler();

    pageBody.classList.add('modal-open');
    uploadForm.classList.remove('hidden');
    effectLevel.classList.add('hidden');
    effects.addEventListener('change', window.effects.filterChangeHandler);
    effectLevelPin.addEventListener('mousedown', window.effects.calculateEffectLevel);
    uploadCancel.addEventListener('keydown', popupEscPressHandler);
    pageBody.addEventListener('keydown', popupEscPressHandler);
    uploadCancel.addEventListener('keydown', popupEscPressHandler);
    uploadCancel.addEventListener('click', closePopup);
  });

  var closePopup = function () {
    uploadForm.classList.add('hidden');
    document.removeEventListener('keydown', popupEscPressHandler);
    window.formSender.resetData();
    effects.removeEventListener('change', window.effects.filterChangeHandler);
    window.effects.effects.removeEventListener('change', window.effects.filterChangeHandler);
    effectLevelPin.removeEventListener('mousedown', window.effects.calculateEffectLevel);
    uploadCancel.removeEventListener('keydown', popupEscPressHandler);
    pageBody.removeEventListener('keydown', popupEscPressHandler);
    uploadCancel.removeEventListener('keydown', popupEscPressHandler);
    uploadCancel.removeEventListener('click', closePopup);
  };

  var popupEscPressHandler = function (evt) {
    if (evt.key === ESC_KEY) {
      closePopup();
    }
  };

  window.form = {
    ESC_KEY: ESC_KEY,
    ENTER_KEY: ENTER_KEY
  };
})();
