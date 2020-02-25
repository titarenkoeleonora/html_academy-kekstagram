'use strict';

(function () {

  var similarListElement = document.querySelector('.pictures');
  var photosTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var renderPicture = function (photo) {
    var pictureElement = photosTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

    return pictureElement;
  };

  var successHandler = function (photos) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(renderPicture(photos[i]));
    }
    similarListElement.appendChild(fragment);
  };

  window.load(successHandler, window.errorHandler);
})();
