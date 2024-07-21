import { useEffect, RefObject } from 'react';

function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  closeFunction: () => void
) {
  useEffect(() => {
    /**
     * Close Menu if click outside
     */
    function handleClickOutside(event: Event) {
      if (ref.current && !ref.current?.contains(event.target as Node)) {
        closeFunction();
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, closeFunction]);
}

export default useClickOutside;
