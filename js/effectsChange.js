// 'use strict';

// (function () {
//   var effectLevelPin = document.querySelector('.effect-level__pin');
//   var effectLevelLine = document.querySelector('.effect-level__line');
//   var effectLevelDepth = document.querySelector('.effect-level__depth');
//   var effectLevelValue = document.querySelector('.effect-level__value');

//   effectLevelPin.addEventListener('mousedown', function (evt) {
//     evt.preventDefault();

//     var startCoords = evt.clientX;

//     var onMouseMove = function (moveEvt) {
//       moveEvt.preventDefault();

//       var shift = startCoords - moveEvt.clientX;

//       startCoords = moveEvt.clientX;

//       var pin = effectLevelPin.offsetLeft - shift;

//       if (!(pin < 0 || pin > effectLevelLine.offsetWidth)) {
//         effectLevelValue = pin / effectLevelLine.offsetWidth;

//         effectLevelPin.style.left = pin + 'px';
//         effectLevelDepth.style.width = pin + 'px';
//         window.effects.getEffectLevel();
//       }
//     };
//     var onMouseUp = function (upEvt) {
//       upEvt.preventDefault();

//       document.removeEventListener('mousemove', onMouseMove);
//       document.removeEventListener('mouseup', onMouseUp);
//     };

//     document.addEventListener('mousemove', onMouseMove);
//     document.addEventListener('mouseup', onMouseUp);
//   });

//   window.effectsChange = {
//     effectLevelValue: effectLevelValue
//   };
// })();
