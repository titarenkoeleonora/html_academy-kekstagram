'use strict';

(function () {
  var RANDOM_PHOTOS_COUNT = 10;
  var similarListElement = document.querySelector('.pictures');
  var photosTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var imgFilters = document.querySelector('.img-filters');

  var filterRandomButton = document.querySelector('#filter-random');
  var filterDiscussedButton = document.querySelector('#filter-discussed');
  var filterDefaultButton = document.querySelector('#filter-default');

  var photosCopy = [];

  var createPictureObject = function (photo, index) {
    var pictureObject = {
      url: photo.url,
      description: photo.description,
      likes: photo.likes,
      comments: photo.comments,
      id: index
    };

    return pictureObject;
  };

  var renderPicture = function (photo) {
    var pictureElement = photosTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    pictureElement.querySelector('.picture__img').dataset.index = photo.id;

    return pictureElement;
  };

  var addPictures = function (photos) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(renderPicture(createPictureObject(photos[i], i)));
    }
    similarListElement.appendChild(fragment);
  };

  var removePictures = function () {
    var shownPictures = similarListElement.querySelectorAll('.picture');
    shownPictures.forEach(function (photo) {
      similarListElement.removeChild(photo);
    });
  };

  var successHandler = function (photos) {
    window.data.photosArray = photos;
    getFilterDefault(photos);
    addPictures(window.data.photosArray);
    imgFilters.classList.remove('img-filters--inactive');
  };

  window.download(successHandler, window.downloadErrorHandler);

  // фильтры

  var getRandomElement = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  var removeFitlerButton = function () {
    filterRandomButton.classList.remove('img-filters__button--active');
    filterDiscussedButton.classList.remove('img-filters__button--active');
    filterDefaultButton.classList.remove('img-filters__button--active');
    removePictures();
  };

  var getFilterDefault = function (array) {
    window.debounce(function () {
      removeFitlerButton();
      filterDefaultButton.classList.add('img-filters__button--active');
      array = window.data.photosArray;
      addPictures(array);
    });
  };

  var getFilterRandom = function (array) {
    window.debounce(function () {
      var randomPhotosArray = [];
      removeFitlerButton();
      filterRandomButton.classList.add('img-filters__button--active');
      while (randomPhotosArray.length < RANDOM_PHOTOS_COUNT) {
        var randomPicture = getRandomElement(window.data.photosArray);
        if (randomPhotosArray.indexOf(randomPicture) === -1) {
          randomPhotosArray.push(randomPicture);
        }
      }
      array = randomPhotosArray;
      addPictures(array);
      return array;
    });
  };

  var getFilterDiscussed = function (array) {
    window.debounce(function () {
      removeFitlerButton();
      filterDiscussedButton.classList.add('img-filters__button--active');

      var discussedPhotosArray = window.data.photosArray.slice().sort(function (second, first) {
        return first.comments.length - second.comments.length;
      });
      array = discussedPhotosArray;
      addPictures(array);
      return array;
    });
  };


  var filtersHandler = function (evt) {
    var currentFilterButton = evt.target;
    switch (currentFilterButton) {
      case filterDefaultButton:
        getFilterDefault(photosCopy);
        break;
      case filterRandomButton:
        getFilterRandom(photosCopy);
        break;
      case filterDiscussedButton:
        getFilterDiscussed(photosCopy);
        break;
    }
  };

  imgFilters.addEventListener('click', filtersHandler);

  window.data = {
    photosCopy: photosCopy
  };
})();
