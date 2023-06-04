import ScrollObserver from '../components/ScrollObserver';

window.addEventListener('DOMContentLoaded', function () {

  new ScrollObserver({
    selector: '[data-animation-body-bg-color]',
    rootMargin: 150,
    callbackEntry: function (target) {
      document.body.classList.add('is-blue-bg-color');
    },
    callbackOut: function (target) {
      document.body.classList.remove('is-blue-bg-color');
    },
    unobserve: false
  });

  new ScrollObserver({
    selector: '[data-animation-on-scroll]',
    rootMargin: 200,
    customClass: 'is-show',
    unobserve: true
  });


})
