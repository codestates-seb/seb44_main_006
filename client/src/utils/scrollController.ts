const scrollController = () => {
  function preventDefault(e) {
    e.preventDefault();
  }

  const wheelOpt = supportsPassive ? { passive: false } : false;
  const wheelEvent =
    'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

  function disableScroll() {
    window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  }

  // call this to Enable
  function enableScroll() {
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    window.removeEventListener('touchmove', preventDefault, wheelOpt);
  }

  return {
    disableScroll,
    enableScroll,
  };
};

export default scrollController;
