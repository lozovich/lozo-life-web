/* eslint-disable no-undef */
type IsInViewportType = {
  element: HTMLDivElement;
};

const isInViewport = ({ element }: IsInViewportType) => {
  const rect = element.getBoundingClientRect();
  return {
    checkViewPort:
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth),

    rect
  };
};

export default isInViewport;
