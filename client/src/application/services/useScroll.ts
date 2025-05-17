interface useScrollComposableState {
  lock: () => void;
  unlock: () => void;
  scrollTo: (el: HTMLElement, offset?: number) => void;
}

let previousScrollY = 0;

export const useScroll = (): useScrollComposableState => {
  function lock(): void {
    previousScrollY = window.scrollY;

    // Add scroll lock styles to body
    document.body.style.position = 'fixed';
    document.body.style.top = `-${previousScrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.overflow = 'hidden';
    document.body.style.width = '100%';
  }

  function unlock(): void {
    // Revert scroll lock styles
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.overflow = '';
    document.body.style.width = '';

    // Restore scroll position
    window.scrollTo(0, previousScrollY);
  }

  function scrollTo(el: HTMLElement, offset = 0): void {
    const top = el.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top,
      behavior: 'smooth',
    });
  }

  return {
    lock,
    unlock,
    scrollTo,
  };
};
