'use strict';

var PICTURE_COUNT = 25;
var USER_NAMES = ['Полина', 'Маша', 'Даша', 'Олег', 'Дима', 'Кристина', 'Катя', 'Саша'];
var MESSAGE_TEXT = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];


var getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var shuffle = function (arr) {
  var j = 0;
  var x = 0;

  for (var i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = arr[i];
    arr[i] = arr[j];
    arr[j] = x;
  }
  return arr;
};

var createComment = function (messageText) {
  var commentsArr = shuffle(messageText).slice(getRandomIntInclusive(0, messageText.length));
  var comments = [];
  for (var i = 0; i <= commentsArr.length; i++) {
    comments.push({
      avatar: 'img/avatar' + getRandomIntInclusive(1, 6) + '.svg',
      message: getRandomElement(messageText),
      name: getRandomElement(USER_NAMES)
    });
  }

  return comments;
};

var createPicturesArray = function () {
  var photos = [];
  for (var i = 1; i <= PICTURE_COUNT; i++) {
    photos.push({
      url: 'photos/' + i + '.jpg',
      description: 'Описание фотографии',
      likes: getRandomIntInclusive(15, 200),
      comments: createComment(MESSAGE_TEXT)
    });
  }
  return photos;
};

var photos = createPicturesArray(PICTURE_COUNT);

var renderPicture = function (photo) {
  var photosTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var pictureElement = photosTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__comments').textContent = photos.comments;
  pictureElement.querySelector('.picture__likes').textContent = photos.likes;

  return pictureElement;
};

var similarListElement = document.querySelector('.pictures');

var createPicture = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < PICTURE_COUNT; i++) {
    fragment.appendChild(renderPicture(photos[i]));
  }
  similarListElement.appendChild(fragment);
};

createPicture();
