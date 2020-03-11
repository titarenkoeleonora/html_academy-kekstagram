'use strict';

(function () {
  var COMMENTS_COUNT = 5;
  var START_COUNT = 0;
  var count = 0;
  var commentsArray = [];

  var pageBody = document.querySelector('body');
  var pictures = document.querySelector('.pictures');
  var commentsList = document.querySelector('.social__comments');
  var commentTemplate = document.querySelector('.social__comment');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCancel = document.querySelector('.big-picture__cancel');
  var socialCommentCount = document.querySelector('.social__comment-count');
  var commentsCount = document.querySelector('.comments-count');
  var commentsLoader = document.querySelector('.comments-loader');

  var createNewComment = function (comment) {
    commentsList.innerHTML = '';
    var commentElement = commentTemplate.cloneNode(true);

    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;

    return commentElement;
  };

  var getComments = function (comments) {
    var fragment = document.createDocumentFragment();

    comments.forEach(function (comment) {
      fragment.appendChild(createNewComment(comment));
    });
    commentsList.appendChild(fragment);
  };

  var renderNewComments = function (comment) {
    commentsArray = comment.slice(START_COUNT, COMMENTS_COUNT + count);
    count += COMMENTS_COUNT;
    if (commentsArray.length === comment.length) {
      commentsLoader.classList.add('hidden');
    } else {
      commentsLoader.classList.remove('hidden');
    }

    socialCommentCount.firstChild.textContent = Math.min(count, comment.length) + ' из ';
    commentsCount.textContent = comment.length;

    getComments(commentsArray);
  };

  // console.log(window.data.photosArray);

  var renderBigPicture = function (photo) {
    bigPicture.querySelector('.big-picture__img').querySelector('img').src = photo.url;
    bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
    bigPicture.querySelector('.social__comments').textContent = photo.comments;
    bigPicture.querySelector('.social__caption').textContent = photo.description;
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    renderNewComments(photo.comments);
  };

  pictures.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('picture__img')) {
      var index = parseInt(evt.target.dataset.index, 10);
      count = 0;

      bigPicture.classList.remove('hidden');
      document.body.classList.add('modal-open');
      // renderBigPicture(window.data.photosArray[index]);
      // console.log(window.data.photosArray);
      if (window.data.photosArray) {
        renderBigPicture(window.data.photosArray[index]);
      }
      // if (window.data.arr) {
      //   renderBigPicture(window.data.arr[index]);
      // }
    }

    commentsLoader.addEventListener('click', function () {
      renderNewComments(window.data.photosArray[index].comments);
      // renderNewComments(window.data.photosArr[index].comments);
    });
  });

  bigPictureCancel.addEventListener('click', function () {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
  });

  var popupEscPressHandler = function (evt) {
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

  pageBody.addEventListener('keydown', popupEscPressHandler);
})();
