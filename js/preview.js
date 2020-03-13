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

  var renderBigPicture = function (photo) {
    bigPicture.querySelector('.big-picture__img').querySelector('img').src = photo.url;
    bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
    bigPicture.querySelector('.social__comments').textContent = photo.comments;
    bigPicture.querySelector('.social__caption').textContent = photo.description;
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    renderNewComments(photo.comments);
  };

  var showBigPicture = function (target) {
    count = 0;
    var index = parseInt(target.dataset.index, 10);

    bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');
    pictures.removeEventListener('keydown', pictureKeydownHandler);

    renderBigPicture(window.data.photosFilteredArray[index]);

    window.showMoreClickHandler = function () {
      renderNewComments(window.data.photosFilteredArray[index].comments);
    };

    commentsLoader.addEventListener('click', window.showMoreClickHandler);
    bigPictureCancel.addEventListener('click', closeBigPicture);
    pageBody.addEventListener('keydown', popupEscPressHandler);
    bigPicture.addEventListener('keydown', popupEscPressHandler);
  };

  var pictureClickHandler = function (evt) {
    var evtTarget = evt.target;
    if (evtTarget.classList.contains('picture__img')) {
      showBigPicture(evtTarget);
      pictures.removeEventListener('click', pictureClickHandler);
      pictures.removeEventListener('keydown', pictureKeydownHandler);
    }
  };

  var pictureKeydownHandler = function (evt) {
    if (evt.key === window.form.ENTER_KEY && evt.target.classList.contains('picture')) {
      evt.preventDefault();
      var currentImage = evt.target.querySelector('.picture__img');
      showBigPicture(currentImage);
      pictures.removeEventListener('click', pictureClickHandler);
      pictures.removeEventListener('keydown', pictureKeydownHandler);
    }
  };

  pictures.addEventListener('click', pictureClickHandler);
  pictures.addEventListener('keydown', pictureKeydownHandler);

  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    commentsLoader.removeEventListener('click', window.showMoreClickHandler);
    bigPictureCancel.removeEventListener('click', closeBigPicture);
    bigPicture.removeEventListener('keydown', popupEscPressHandler);
    pictures.addEventListener('click', pictureClickHandler);
    pictures.addEventListener('keydown', pictureKeydownHandler);
  };

  var popupEscPressHandler = function (evt) {
    if (evt.key === window.form.ESC_KEY) {
      closeBigPicture();
    }
  };
})();
