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

  var removeMessage = function (message) {
    main.removeChild(message);
    pageBody.classList.remove('modal-open');
  };

  var successHandler = function () {
    var success = document.querySelector('#success').content.querySelector('.success');
    var successButton = success.querySelector('.success__button');

    main.appendChild(success);
    successButton.addEventListener('click', function () {
      removeMessage(success);
    });

    pageBody.addEventListener('keydown', function (evt) {
      if (evt.key === window.form.ESC_KEY) {
        removeMessage(success);
      }
    });

    document.addEventListener('click', function (evt) {
      if (evt.target !== successInner) {
        removeMessage(success);
      }
    });
  };

  var errorHandler = function () {
    var error = document.querySelector('#error').content.querySelector('.error');
    var errorButton = error.querySelector('.error__button');

    main.appendChild(error);

    errorButton.addEventListener('click', function () {
      removeMessage(error);
    });

    pageBody.addEventListener('keydown', function (evt) {
      if (evt.key === window.form.ESC_KEY) {
        removeMessage(error);
      }
    });

    document.addEventListener('click', function (evt) {
      if (evt.target !== errorInner) {
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
