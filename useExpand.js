// Simply call in the component that we want to bind to this
// const contentRef = useRef(null);
// useExpand(contentRef.current, labelledBy, [isOpen]);


import { useEffect } from 'react';

/**
 * Collapses an element taking into account dynamic content inside of it and
 * the resizing of the viewport
 *
 * @param {object} element - Element to be expanded or collapsed, e.g., ref.current
 * @param {string} contentId - The id of the collapsible content for collapsibleDynamicResize events
 * @param {array} deps - Other dependencies for the hook
 */
const useExpand = (element, contentId, deps = []) => {
  useEffect(() => {
    const handleResize = (event) => {
      if (event.type === 'collapsibleDynamicResize' && !(event.detail && event.detail.contentId === contentId)) {
        return;
      }
      const current = element;

      if (current && current.offsetHeight > 0) {
        const maxHeight = current.scrollHeight;
        current.style.maxHeight = `${maxHeight}px`;
      }
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('collapsibleDynamicResize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('collapsibleDynamicResize', handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [element, contentId, ...deps]);
};

export default useExpand;
