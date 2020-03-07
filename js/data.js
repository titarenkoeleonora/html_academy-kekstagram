'use strict';

(function () {

  var RANDOM_PHOTOS_COUNT = 10;
  var similarListElement = document.querySelector('.pictures');
  var photosTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var imgFilters = document.querySelector('.img-filters');

  var photosArr = [];


  var renderPicture = function (photo) {
    var pictureElement = photosTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

    return pictureElement;
  };

  var addPictures = function (photos) {
    var fragment = document.createDocumentFragment();
    photos.forEach(function (photo) {
      fragment.appendChild(renderPicture(photo));
    });
    similarListElement.appendChild(fragment);
  };

  var removePictures = function () {
    var shownPictures = similarListElement.querySelectorAll('.picture');
    shownPictures.forEach(function (photo) {
      similarListElement.removeChild(photo);
    });
  };

  var successHandler = function (photos) {
    window.data.photosArr = photos;
    addPictures(window.data.photosArr);
    imgFilters.classList.remove('img-filters--inactive');
  };

  window.download(successHandler, window.downloadErrorHandler);

  // фильтры

  var getRandomElement = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  var filterRandomButton = document.querySelector('#filter-random');
  var filterDiscussedButton = document.querySelector('#filter-discussed');
  var filterDefaultButton = document.querySelector('#filter-default');

  var removeFitlerButton = function () {
    filterRandomButton.classList.remove('img-filters__button--active');
    filterDiscussedButton.classList.remove('img-filters__button--active');
    filterDefaultButton.classList.remove('img-filters__button--active');
    removePictures();
  };

  var getFilterDefault = function () {
    window.debounce(function () {
      removeFitlerButton();
      filterDefaultButton.classList.add('img-filters__button--active');

      addPictures(window.data.photosArr);
    });
  };

  var getFilterRandom = function () {
    window.debounce(function () {
      var randomArr = [];

      removeFitlerButton();
      filterRandomButton.classList.add('img-filters__button--active');

      while (randomArr.length < RANDOM_PHOTOS_COUNT) {
        var randomPicture = getRandomElement(window.data.photosArr);
        if (randomArr.indexOf(randomPicture) === -1) {
          randomArr.push(randomPicture);
        }
      }
      addPictures(randomArr);
    });
  };

  var getFilterDiscussed = function () {
    window.debounce(function () {
      var discussedArr = [];
      removeFitlerButton();
      filterDiscussedButton.classList.add('img-filters__button--active');

      discussedArr = window.data.photosArr.slice().sort(function (second, first) {
        return first.comments.length - second.comments.length;
      });
      addPictures(discussedArr);
    });
  };


  filterRandomButton.addEventListener('click', getFilterRandom);
  filterDiscussedButton.addEventListener('click', getFilterDiscussed);
  filterDefaultButton.addEventListener('click', getFilterDefault);

  window.data = {
    photosArr: photosArr
  };

})();
