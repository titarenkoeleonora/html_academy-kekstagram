'use strict';

(function () {
  var RANDOM_PHOTOS_COUNT = 10;
  var picturesContainer = document.querySelector('.pictures');
  var photosTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var imgFilters = document.querySelector('.img-filters');
  var filterRandomButton = document.querySelector('#filter-random');
  var filterDiscussedButton = document.querySelector('#filter-discussed');
  var filterDefaultButton = document.querySelector('#filter-default');

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
    picturesContainer.appendChild(fragment);
  };

  var removePictures = function () {
    var shownPictures = picturesContainer.querySelectorAll('.picture');
    shownPictures.forEach(function (photo) {
      picturesContainer.removeChild(photo);
    });
  };

  var successHandler = function (photos) {
    window.data.photosArray = photos;
    window.data.photosFilteredArray = window.data.photosArray;
    getFilterDefault(photos);
    addPictures(window.data.photosArray);
    imgFilters.classList.remove('img-filters--inactive');
  };

  window.download(successHandler, window.downloadErrorHandler);

  var removeFitlerButton = function () {
    filterRandomButton.classList.remove('img-filters__button--active');
    filterDiscussedButton.classList.remove('img-filters__button--active');
    filterDefaultButton.classList.remove('img-filters__button--active');
    removePictures();
  };

  var getFilterDefault = function (array) {
    removeFitlerButton();
    filterDefaultButton.classList.add('img-filters__button--active');
    addPictures(array);
    return array;
  };

  var compareRandom = function (a, b) {
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    return Math.random() - 0.5;
  };

  var getFilterRandom = function (array) {
    removeFitlerButton();
    filterRandomButton.classList.add('img-filters__button--active');
    var sortArr = array.sort(compareRandom).slice(0, RANDOM_PHOTOS_COUNT);
    addPictures(sortArr);
    return sortArr;
  };

  var getFilterDiscussed = function (array) {
    removeFitlerButton();
    filterDiscussedButton.classList.add('img-filters__button--active');

    var sortArr = array;
    sortArr.sort(function (second, first) {
      return first.comments.length - second.comments.length;
    });
    addPictures(sortArr);
    return sortArr;
  };
  var filterSort;
  var filtersHandler = function (evt) {
    var currentFilterButton = evt.target.id;
    var copyFilterSort = window.data.photosArray.slice();
    switch (currentFilterButton) {
      case 'filter-default':
        filterSort = getFilterDefault(copyFilterSort);
        break;
      case 'filter-random':
        filterSort = getFilterRandom(copyFilterSort);
        break;
      case 'filter-discussed':
        filterSort = getFilterDiscussed(copyFilterSort);
        break;
    }

    window.data.photosFilteredArray = filterSort;
    return filterSort;
  };

  imgFilters.addEventListener('click', filtersHandler);

  window.data = {
  };
})();
