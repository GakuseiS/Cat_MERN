/**
 * Хук для обработки события клика вне области
 */
import { useState, useLayoutEffect, RefObject, useCallback } from "react";

interface DetectClickHookProps {
  ref: RefObject<any | null>;
  initialState?: boolean;
  clear?: () => void;
}

export const useDetectClick = ({ ref, initialState = false, clear }: DetectClickHookProps) => {
  const [isActive, setIsActive] = useState(initialState);

  const pageClickEvent = useCallback((e: MouseEvent) => {
    // Обработка клика если вне области курсор
    const isMissClick = ref.current && !ref.current.contains(e.target);
    if (isMissClick) {
      setIsActive(false);
      clear?.();
    }
  }, []);

  useLayoutEffect(() => {
    document.addEventListener("mousedown", pageClickEvent);

    return () => {
      document.removeEventListener("mousedown", pageClickEvent);
    };
  }, []);

  const setActive = (showing: boolean) => {
    setIsActive(showing);
    clear?.();
  };

  return { isActive, setActive };
};
