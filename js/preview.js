'use strict';

(function () {
  var COMMENTS_COUNT = 5;
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
    var commentElement = commentTemplate.cloneNode(true);

    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;

    return commentElement;
  };

  var getComments = function (comments) {

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < comments.length; i++) {
      fragment.appendChild(createNewComment(comments[i]));
    }
    commentsList.appendChild(fragment);
  };

  var renderNewComments = function (comment) {
    commentsList.innerHTML = '';
    commentsArray = comment.slice(count, COMMENTS_COUNT + count);
    count += COMMENTS_COUNT;
    if (commentsArray.length < COMMENTS_COUNT) {
      commentsLoader.classList.add('hidden');
    } else {
      commentsLoader.classList.remove('hidden');
    }

    socialCommentCount.firstChild.textContent = Math.min(count, comment.length) + ' из ';
    commentsCount.textContent = comment.length;

    getComments(commentsArray);
    console.log(count);
    console.log(commentsArray);
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
      bigPicture.classList.remove('hidden');
      document.body.classList.add('modal-open');
      count = 0;
      debugger;
      renderBigPicture(window.data.photosCopy[index]);

      // if (window.data.photosArr) {
      //   renderBigPicture(window.data.photosArr[index]);
      // }
      // if (window.data.arr) {
      //   renderBigPicture(window.data.arr[index]);
      // }
    }

    commentsLoader.addEventListener('click', function () {
      renderNewComments(window.data.photosCopy[index].comments);
      // renderNewComments(window.data.photosArr[index].comments);
    });
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
})();
