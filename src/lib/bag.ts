import { useSyncExternalStore } from "react";

let count = 0;
const listeners = new Set<() => void>();

export const bag = {
  add() {
    count += 1;
    listeners.forEach((l) => l());
  },
};

export function useBagCount() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => count,
    () => 0,
  );
}
