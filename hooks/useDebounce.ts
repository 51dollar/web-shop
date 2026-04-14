import { useEffect, useRef, useState } from "react";

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    const timer = setTimeout(() => {
      if (isMounted.current) {
        setDebouncedValue(value);
      }
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  return debouncedValue;
}
