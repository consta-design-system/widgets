import { useCallback, useLayoutEffect, useState } from 'react';

type ComponentSize = {
  width: number;
  height: number;
};

const extractSizeFromRect = (rect: DOMRect | SVGRect) => {
  return {
    width: Math.floor(rect.width),
    height: Math.floor(rect.height),
  };
};

const getElementSize = (
  el: HTMLElement | SVGGraphicsElement | null,
): ComponentSize => {
  if (!el) {
    return { width: 0, height: 0 };
  }

  return extractSizeFromRect(
    'getBBox' in el ? el.getBBox() : el.getBoundingClientRect(),
  );
};

export function useComponentSize<T extends HTMLElement | SVGGraphicsElement>(
  ref: React.RefObject<T>,
): ComponentSize {
  const [componentSize, setComponentSize] = useState<ComponentSize>(
    getElementSize(ref && ref.current),
  );

  const handleResize = useCallback(() => {
    if (ref.current) {
      setComponentSize(getElementSize(ref.current));
    }
  }, [ref]);

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    handleResize();

    const resizeObserver = new ResizeObserver(handleResize);

    resizeObserver.observe(ref.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [ref, handleResize]);

  return componentSize;
}
