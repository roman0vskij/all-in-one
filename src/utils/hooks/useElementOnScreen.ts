import { useEffect, useRef, useState } from "react";

export function useElementOnScreen(options: any) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  function callback(entries: any) {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  }

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);
    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, options]);

  return [ref, isVisible];
}
