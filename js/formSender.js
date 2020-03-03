'use strict';

(function () {
  var imgUploadPhoto = document.querySelector('#img-upload__photo');
  var pageBody = document.querySelector('body');
  var form = document.querySelector('.img-upload__form');
  var uploadForm = document.querySelector('.img-upload__overlay');
  var main = document.querySelector('main');
  var imgUploadPreview = document.querySelector('.img-upload__preview');
  var successInner = document.querySelector('.success__inner');
  var errorInner = document.querySelector('.error__inner');
  var success = document.querySelector('#success').content.querySelector('.success');
  var successButton = success.querySelector('.success__button');

  var removeMessage = function (message) {
    main.removeChild(message);

    pageBody.classList.remove('modal-open');
    successButton.removeEventListener('click', successHandler);
    pageBody.removeEventListener('keydown', successHandler);
    document.removeEventListener('click', successHandler);
  };

  var successHandler = function () {
    main.appendChild(success);

    document.addEventListener('click', function (evt) {
      if (evt.target !== successInner || evt.target === successButton) {
        removeMessage(success);
      }
    });

    pageBody.addEventListener('keydown', function (evt) {
      if (evt.key === window.form.ESC_KEY) {
        removeMessage(success);
      }
    });
  };

  var errorHandler = function () {
    var error = document.querySelector('#error').content.querySelector('.error');
    var errorButton = error.querySelector('.error__button');

    main.appendChild(error);

    document.addEventListener('click', function (evt) {
      if (evt.target !== errorInner || evt.target === errorButton) {
        removeMessage(error);
      }
    });

    pageBody.addEventListener('keydown', function (evt) {
      if (evt.key === window.form.ESC_KEY) {
        removeMessage(error);
      }
    });
  };

  var resetData = function () {
    form.reset();
    imgUploadPhoto.style.filter = 'none';
    window.imageSize.getTransformImage(imgUploadPreview, 1);
    window.imageSize.scaleControlValue.value = window.imageSize.defaultPictureSize;
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    uploadForm.classList.add('hidden');

    window.upload(new FormData(form), successHandler, errorHandler);
    resetData();
  });

  window.formSender = {
    resetData: resetData
  };
})();
