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
var HASHTAGS_MIN_SYMBOLS_COUNT = 2;
var HASHTAGS_MIN_COUNT = 5;
var HASHTAGS_MAX_COUNT = 20;


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
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;

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

// Задание 4.2
// Открытие и закрытие формы редактирования фото

var pageBody = document.querySelector('body');
var uploadFile = document.querySelector('#upload-file');
var uploadForm = document.querySelector('.img-upload__overlay');
var uploadCancel = document.querySelector('#upload-cancel');

var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

var closePopup = function () {
  uploadForm.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var onPopupEscPress = function (evt) {
  if (evt.key === ESC_KEY) {
    closePopup();
  }
};

uploadCancel.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closePopup();
  }
});

pageBody.addEventListener('keydown', onPopupEscPress);

uploadFile.addEventListener('change', function () {
  pageBody.classList.add('modal-open');
});

uploadFile.addEventListener('change', function () {
  uploadForm.classList.remove('hidden');
});

uploadCancel.addEventListener('click', function () {
  closePopup();
});

// Смена эффектов и скрытие слайдера на эффекте "Оригинал"

var imgUploadPreview = document.querySelector('.img-upload__preview');
var imgUploadPhoto = document.querySelector('#img-upload__photo');
var effects = document.querySelector('.effects');
var effectLevel = document.querySelector('.effect-level');

uploadFile.addEventListener('change', function () {
  effectLevel.classList.add('hidden');
});

var filterChangeHandler = function (evt) {
  var currentFilter = evt.target.value;
  if (evt.target && evt.target.matches('input[type="radio"]')) {
    imgUploadPhoto.removeAttribute('class');
    imgUploadPhoto.classList.add('effects__preview--' + currentFilter);
    if (evt.target.value !== 'none') {
      effectLevel.classList.remove('hidden');
    } else {
      effectLevel.classList.add('hidden');
    }
  }
};

effects.addEventListener('change', filterChangeHandler);

// Слайдер смены интенсивности эффекта

var effectLevelPin = document.querySelector('.effect-level__pin');
// var effectLevelLine = document.querySelector('.effect-level__line');

effectLevelPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
    };

    startCoords = {
      x: moveEvt.clientX,
    };

    effectLevelPin.style.left = (effectLevelPin.offsetLeft - shift.x) + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});


// Размер изображения (пока без процентов)

var scaleMin = 25;
var scaleMax = 100;
var scaleStep = 25;
var scaleControlSmaller = document.querySelector('.scale__control--smaller');
var scaleControlBigger = document.querySelector('.scale__control--bigger');
var scaleControlValue = document.querySelector('.scale__control--value');

scaleControlValue.value = scaleMax;
var currentValue = scaleControlValue.value;

scaleControlSmaller.addEventListener('click', function () {
  if (currentValue > scaleMin) {
    currentValue = scaleControlValue.value - scaleStep;
    scaleControlValue.value = currentValue;
    imgUploadPreview.style.transform = 'scale(' + currentValue / 100 + ')';
  }
  return currentValue;
});

scaleControlBigger.addEventListener('click', function () {
  if (currentValue < scaleMax) {
    currentValue = currentValue + scaleStep;
    scaleControlValue.value = currentValue;
    imgUploadPreview.style.transform = 'scale(' + currentValue / 100 + ')';
  }
  return currentValue;
});

// Валидация хештегов

var inputHashtag = document.querySelector('.text__hashtags');

var setErrorRedLine = function (evt) {
  evt.target.style.border = '2px solid red';
};

inputHashtag.addEventListener('input', function (evt) {
  var hashtagsArray = evt.target.value.toLowerCase().split(' ');

  for (var i = 0; i < hashtagsArray.length; i++) {
    var hashtag = hashtagsArray[i];

    for (var j = 0; j < hashtag.length; j++) {
      if (hashtag[j] === '@' || hashtag[j] === '$' || hashtag[j] === '/' || hashtag[j] === '.' || hashtag[j] === ' ' || hashtag[j] === '-' || hashtag[j] === '_' || hashtag[j] === '+' || hashtag[j] === '=' || hashtag[j] === '%') {
        evt.target.setCustomValidity('Строка после решётки должна состоять из букв и чисел');
        setErrorRedLine(evt);

        return;
      }
    }

    if (hashtag.indexOf('#', 0) !== 0) {
      evt.target.setCustomValidity('Хэш-тег начинается с символа # (решётка)');
      setErrorRedLine(evt);

      return;
    }

    if (hashtag.length < HASHTAGS_MIN_SYMBOLS_COUNT) {
      evt.target.setCustomValidity('Хэш-тег не может состоять только из одной решётки');
      setErrorRedLine(evt);

      return;
    }

    if (hashtag.length > HASHTAGS_MAX_COUNT) {
      evt.target.setCustomValidity('Хэш-тег не должен быть длинее 20 символов');
      setErrorRedLine(evt);

      return;
    }

    if (hashtagsArray.length > HASHTAGS_MIN_COUNT) {
      evt.target.setCustomValidity('Вы ввели более 5 хэш-тегов!');
      setErrorRedLine(evt);

      return;
    }

    evt.target.setCustomValidity('');
    evt.target.style.border = '';
  }
});
