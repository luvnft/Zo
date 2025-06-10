interface UseScrollComposableState {
  lock: () => void;
  unlock: () => void;
  scrollTo: (el: HTMLElement, offset?: number) => void;
}

// Stores the scroll position before the screen is locked.
let previousScrollY = 0;

/**
 * A composable function to control page scrolling behavior.
 * Provides methods to lock, unlock, and scroll to specific elements.
 */
export const useScroll = (): UseScrollComposableState => {
  /**
   * Locks the screen to prevent scrolling.
   * This version is improved for mobile-friendliness by preventing layout shifts.
   */
  function lock(): void {
    previousScrollY = window.scrollY;

    // Calculate the width of the scrollbar to prevent a horizontal jump when it's hidden.
    // On many mobile browsers, this will be 0, but it's crucial for desktop.
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    
    // Apply padding to the body to compensate for the scrollbar's removal.
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    // The 'position: fixed' trick is used to maintain the scroll position.
    document.body.style.position = 'fixed';
    
    // By setting top, we keep the page visually in the same place.
    document.body.style.top = `-${previousScrollY}px`;
    
    // Setting left and right ensures the body still spans the full viewport width
    // without explicitly setting a width, which can be unreliable.
    document.body.style.left = '0';
    document.body.style.right = '0';
    
    // Finally, hide the overflow on the body.
    document.body.style.overflow = 'hidden';
  }

  /**
   * Unlocks the screen and restores its previous scroll position.
   */
  function unlock(): void {
    // Revert all the styles applied during the lock.
    // It's important to clear them to avoid lingering layout issues.
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';

    // Restore the original scroll position.
    // This should be done after the styles are reverted to ensure a smooth transition.
    window.scrollTo(0, previousScrollY);
  }

  /**
   * Smoothly scrolls the window to a specific element.
   * @param {HTMLElement} el - The element to scroll to.
   * @param {number} offset - An optional pixel offset from the top.
   */
  function scrollTo(el: HTMLElement, offset = 0): void {
    if (!el) return;
    
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
