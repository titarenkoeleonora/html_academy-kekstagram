'use strict';

(function () {

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

  var pageBody = document.querySelector('body');
  var pictures = document.querySelector('.pictures');
  var commentsList = document.querySelector('.social__comments');
  var commentTemplate = document.querySelector('.social__comment');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCancel = document.querySelector('.big-picture__cancel');
  var socialCommentCount = document.querySelector('.social__comment-count');
  var commentsLoader = document.querySelector('.comments-loader');

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
        avatar: 'img/avatar-' + getRandomIntInclusive(1, 6) + '.svg',
        message: getRandomElement(messageText),
        name: getRandomElement(USER_NAMES)
      });
    }

    return comments;
  };

  var createNewComment = function (comment) {
    var commentElement = commentTemplate.cloneNode(true);

    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;

    return commentElement;
  };

  var getComments = function (comment) {
    commentsList.innerHTML = '';
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < comment.length; i++) {
      fragment.appendChild(createNewComment(comment[i]));
    }
    commentsList.appendChild(fragment);
  };

  var renderBigPicture = function (photo) {

    bigPicture.querySelector('.big-picture__img').src = photo.url;
    bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
    bigPicture.querySelector('.social__comments').textContent = photo.comments;
    bigPicture.querySelector('.social__caption').textContent = photo.description;
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    getComments(photo.comments);
  };

  var photos = [];

  var createPicturesArray = function () {
    for (var i = 1; i <= PICTURE_COUNT; i++) {
      photos.push({
        url: 'photos/' + i + '.jpg',
        description: 'Описание фотографии',
        likes: getRandomIntInclusive(15, 200),
        comments: createComment(MESSAGE_TEXT)
      });
    }
  };

  createPicturesArray();

  pictures.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('picture__img')) {
      bigPicture.classList.remove('hidden');
      socialCommentCount.classList.add('hidden');
      commentsLoader.classList.add('hidden');
      document.body.classList.add('modal-open');
    }
  });

  renderBigPicture(photos[0]);

  bigPictureCancel.addEventListener('click', function () {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
  });

  var onPopupEscPress = function (evt) {
    if (evt.key === window.form.ESC_KEY) {
      bigPicture.classList.add('hidden');
      document.body.classList.remove('modal-open');
    }
  };

  bigPicture.addEventListener('keydown', function (evt) {
    if (evt.key === window.form.ESC_KEY) {
      bigPicture.classList.add('hidden');
      document.body.classList.remove('modal-open');
    }
  });

  pageBody.addEventListener('keydown', onPopupEscPress);
})();
