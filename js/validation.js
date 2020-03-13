'use strict';

(function () {

  var HASHTAGS_MIN_SYMBOLS_COUNT = 2;
  var HASHTAGS_MIN_COUNT = 5;
  var HASHTAGS_MAX_COUNT = 20;
  var inputHashtag = document.querySelector('.text__hashtags');

  var setErrorRedLine = function (evt) {
    evt.target.style.border = '2px solid red';
  };

  var findDuplicateElements = function (elements) {
    var duplicatesExist = false;
    var etalon = '';
    if (elements.length > 1) {
      for (var i = 0; i < elements.length; i++) {
        etalon = elements[i];
        for (var j = i + 1; j < elements.length; j++) {
          if (etalon === elements[j]) {
            duplicatesExist = true;
          }
        }
      }
    }

    return duplicatesExist;
  };

  inputHashtag.addEventListener('input', function (evt) {
    var hashtagsArray = evt.target.value.toLowerCase().split(' ');

    for (var i = 0; i < hashtagsArray.length; i++) {
      var hashtag = hashtagsArray[i];

      if (hashtagsArray[i] === '#') {
        evt.target.setCustomValidity('Хэш-тег начинается с символа # (решётка)');
        setErrorRedLine(evt);
        return;
      }

      if (!hashtag.match(/^([#])([0-9a-zA-Zа-яёА-ЯЁ]{1,19})$/g)) {
        evt.target.setCustomValidity('Строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т.п.), символы пунктуации (тире, дефис, запятая и т.п.), эмодзи и т.д.');
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

      if (findDuplicateElements(hashtagsArray)) {
        evt.target.setCustomValidity('Один хештег не может быть использован дважды');
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
})();
