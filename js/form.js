'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  var pageBody = document.querySelector('body');
  var uploadFile = document.querySelector('#upload-file');
  var uploadForm = document.querySelector('.img-upload__overlay');
  var uploadCancel = document.querySelector('#upload-cancel');

  var closePopup = function () {
    uploadForm.classList.add('hidden');
    document.removeEventListener('keydown', popupEscPressHandler);
    window.formSender.resetData();
  };

  var popupEscPressHandler = function (evt) {
    if (evt.key === ESC_KEY) {
      closePopup();
    }
  };

  uploadCancel.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      closePopup();
    }
  });

  pageBody.addEventListener('keydown', popupEscPressHandler);

  uploadFile.addEventListener('change', function () {
    pageBody.classList.add('modal-open');
  });

  uploadFile.addEventListener('change', function () {
    uploadForm.classList.remove('hidden');
  });

  uploadCancel.addEventListener('click', function () {
    closePopup();
  });

  window.form = {
    ESC_KEY: ESC_KEY,
    ENTER_KEY: ENTER_KEY
  };
})();
