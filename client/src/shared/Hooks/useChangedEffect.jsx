import { useEffect, useRef } from "react";

// useChangedEffect(() => {
//   // This effect will only run if the count value has changed
// }, [count]);

const useChangedEffect = (callback, dependencies) => {
  const hasChanged = useRef(false);

  useEffect(() => {
    if (hasChanged.current) {
      callback();
    } else {
      hasChanged.current = true;
    }
  }, dependencies);
};

export default useChangedEffect;
