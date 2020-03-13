'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var pageBody = document.querySelector('body');
  var main = document.querySelector('main');
  var uploadForm = document.querySelector('.img-upload__overlay');
  var uploadFile = document.querySelector('#upload-file');
  var imgUploadPhoto = document.querySelector('.img-upload__preview').querySelector('img');
  var errorInner = document.querySelector('.error__inner');

  var fileChooseHandler = function () {
    var file = uploadFile.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        imgUploadPhoto.src = reader.result;
      });

      reader.readAsDataURL(file);
    } else {
      uploadForm.classList.add('hidden');
      getErrorMessage();
    }
  };

  uploadFile.addEventListener('change', fileChooseHandler);

  var removeMessage = function (message) {
    main.removeChild(message);
    pageBody.classList.remove('modal-open');
  };

  var getErrorMessage = function () {
    var error = document.querySelector('#error').content.querySelector('.error');
    var errorButton = error.querySelector('.error__button');

    main.appendChild(error);
    document.querySelector('.img-upload__overlay').classList.add('hidden');

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

  window.photoLoader = {
    fileChooseHandler: fileChooseHandler
  };
})();
