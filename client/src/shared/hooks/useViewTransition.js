import { useCallback } from "react";

const useViewTransition = () => {
  const withTransition = useCallback((callback) => {
    return (...args) => {
      if (!document.startViewTransition) {
        return callback(...args);
      }
      return document.startViewTransition(() => callback(...args));
    };
  }, []);

  return withTransition;
};

export default useViewTransition;
