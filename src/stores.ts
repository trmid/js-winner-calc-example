import { readable } from "svelte/store";

export const now = readable(0, (set) => {
  setInterval(() => {
    set(Date.now())
  }, 500);
})