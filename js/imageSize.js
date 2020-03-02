'use strict';

(function () {

  var imgUploadPreview = document.querySelector('.img-upload__preview');
  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');
  var scaleControlValue = document.querySelector('.scale__control--value');
  var defaultPictureSize = '100%';
  scaleControlValue.value = defaultPictureSize;

  var setControlValueInc = function (evt) {
    evt.preventDefault();
    switch (scaleControlValue.value) {
      case '25%':
        scaleControlValue.value = '50%';
        getTransformImage(imgUploadPreview, 0.5);
        break;
      case '50%':
        scaleControlValue.value = '75%';
        getTransformImage(imgUploadPreview, 0.75);
        break;
      case '75%':
        scaleControlValue.value = '100%';
        getTransformImage(imgUploadPreview, 1);
        break;
    }
  };

  var setControlValueDec = function (evt) {
    evt.preventDefault();
    switch (scaleControlValue.value) {
      case '50%':
        scaleControlValue.value = '25%';
        getTransformImage(imgUploadPreview, 0.25);
        break;
      case '75%':
        scaleControlValue.value = '50%';
        getTransformImage(imgUploadPreview, 0.5);
        break;
      case '100%':
        scaleControlValue.value = '75%';
        getTransformImage(imgUploadPreview, 0.75);
        break;
    }
  };

  var getTransformImage = function (elementOfTransform, valueOfScale) {
    elementOfTransform.style.transform = 'scale(' + (valueOfScale) + ')';
  };

  scaleControlBigger.addEventListener('click', setControlValueInc);
  scaleControlSmaller.addEventListener('click', setControlValueDec);

  window.imageSize = {
    scaleControlValue: scaleControlValue,
    defaultPictureSize: defaultPictureSize,
    getTransformImage: getTransformImage
  };
})();
