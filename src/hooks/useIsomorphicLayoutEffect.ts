import { useEffect, useLayoutEffect } from "react";

/**
 * `useLayoutEffect` on the client, `useEffect` on the server. Prevents the
 * SSR "useLayoutEffect does nothing on the server" warning while still
 * running synchronously before paint in the browser — which is what GSAP
 * needs to set initial states without a flash.
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
