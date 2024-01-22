import { useState, useEffect } from "react";

export function useLocalStorage(initialState, key) {
  const [value, setValue] = useState(() => {
    const wacthedFromLocalStorage = localStorage.getItem(key);
    if (!wacthedFromLocalStorage) {
      return initialState;
    }
    return JSON.parse(wacthedFromLocalStorage);
  });

  useEffect(
    function() {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [key, value],
  );
  return [value, setValue];
}
