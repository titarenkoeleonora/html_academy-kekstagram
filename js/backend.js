'use strict';


(function () {
  var GET = 'GET';
  var POST = 'POST';
  var URL = 'https://javascript.pages.academy/kekstagram/data';
  var URL_POST = 'https://javascript.pages.academy/kekstagram';
  var TIMEOUT = 10000;
  var STATUS_OK = 200;

  var setup = function (load, error) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        load(xhr.response);
      } else {
        error(xhr.response);
      }
    });
    xhr.addEventListener('error', function () {
      error('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      error('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;
    return xhr;
  };

  window.download = function (onLoad, onError) {
    var xhr = setup(onLoad, onError);
    xhr.open(GET, URL);
    xhr.send();
  };

  window.upload = function (data, onLoad, onError) {
    var xhr = setup(onLoad, onError);
    xhr.open(POST, URL_POST);
    xhr.send(data);
  };

  window.downloadErrorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; color: black; background-color: yellow; border: 2px solid yellow;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '24px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };
})();
