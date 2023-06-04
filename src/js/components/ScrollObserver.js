class ScrollObserver {
  constructor({
    selector,
    rootMargin = 150,
    customClass = '',
    callbackEntry = function () {},
    callbackOut = function () {},
    unobserve = true,
  }) {
    this.elements = [...document.querySelectorAll(selector)];
    this.rootMargin = rootMargin;
    this.customClass = customClass;
    this.callbackEntry = callbackEntry;
    this.callbackOut = callbackOut;
    this.unobserve = unobserve;

    this.handleIntersection = this.handleIntersection.bind(this);

    this.observer = new IntersectionObserver(this.handleIntersection, {
      root: null,
      threshold: 0,
      rootMargin: `-${this.rootMargin}px`
    });

    this.elements.forEach((element) => {
      this.observer.observe(element);
    });
  }

  handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0 && entry.isIntersecting) {
        this.customClass && entry.target.classList.add(this.customClass);
        this.callbackEntry(entry.target);
      } else if (entry.intersectionRatio === 0 && !entry.isIntersecting) {
        if (this.observer && this.isElementScrolled(entry.target)) {
          this.customClass && entry.target.classList.add(this.customClass);
          this.callbackEntry(entry.target);
        } else {
          this.customClass && entry.target.classList.remove(this.customClass);
          !this.isElementScrolled(entry.target) && this.callbackOut(entry.target);
        }
      }

      if (this.unobserve && entry.isIntersecting) {
        this.observer.unobserve(entry.target);
      }
    });
  }

  isElementScrolled(element) {
    return element.offsetTop <= window.pageYOffset;
  }
}

export default ScrollObserver;