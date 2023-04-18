import { useCallback, useState } from "react";

export function useToggle(initialValue: boolean) {
  const [value, setValue] = useState(initialValue);

  const open = useCallback(() => setValue(true), []);
  const close = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((val) => !val), []);

  return [value, { open, close, toggle }] as const;
}
