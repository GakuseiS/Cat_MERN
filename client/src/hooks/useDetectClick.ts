/**
 * Хук для обработки события клика вне области
 */
import { useState, useLayoutEffect, RefObject, useCallback } from "react";

export const useDetectClick = (
  ref: RefObject<any | null>,
  initialState = false,
  clear?: () => void,
  typeClick: "mousedown" | "click" | "mouseup" = "mousedown"
) => {
  const [isActive, setIsActive] = useState<boolean>(initialState);

  const pageClickEvent = useCallback((e: MouseEvent) => {
    // Обработка клика если вне области курсор
    const isMissClick = ref.current !== null && !ref.current.contains(e.target);
    if (isMissClick) {
      setIsActive(false);
      clear?.();
    }
  }, []);

  useLayoutEffect(() => {
    document.addEventListener(typeClick, pageClickEvent);

    return () => {
      document.removeEventListener(typeClick, pageClickEvent);
    };
  }, []);

  const setActive = (showing: boolean) => {
    setIsActive(showing);
    clear?.();
  };

  return { isActive, setActive };
};
