'use strict';

(function () {
  var MAX_COMMENTS_COUNT = 5;
  var pageBody = document.querySelector('body');
  var pictures = document.querySelector('.pictures');
  var commentsList = document.querySelector('.social__comments');
  var commentTemplate = document.querySelector('.social__comment');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCancel = document.querySelector('.big-picture__cancel');
  // var socialCommentCount = document.querySelector('.social__comment-count');
  var commentsLoader = document.querySelector('.comments-loader');

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

    if (comment.length < MAX_COMMENTS_COUNT) {
      commentsLoader.classList.add('hidden');
    } else {
      commentsLoader.classList.remove('hidden');
    }
  };

  var renderBigPicture = function (photo) {
    bigPicture.querySelector('.big-picture__img').querySelector('img').src = photo.url;
    bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
    bigPicture.querySelector('.social__comments').textContent = photo.comments;
    bigPicture.querySelector('.social__caption').textContent = photo.description;
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    getComments(photo.comments);
  };

  pictures.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('picture__img')) {
      var index = parseInt(evt.target.dataset.index, 10);
      bigPicture.classList.remove('hidden');
      document.body.classList.add('modal-open');

      if (window.data.photosArr) {
        renderBigPicture(window.data.photosArr[index]);
      }
      if (window.data.arr) {
        renderBigPicture(window.data.arr[index]);
      }
    }
  });

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

  commentsLoader.addEventListener('click', function (comment) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < MAX_COMMENTS_COUNT; i++) {
      fragment.appendChild(createNewComment(comment[i]));
    }
    commentsList.appendChild(fragment);
  });
})();
