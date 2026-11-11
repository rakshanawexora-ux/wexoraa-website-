"use client";
import { useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";
function subscribe(callback: () => void) {
  window.addEventListener("wexoraa:motion", callback);
  return () => window.removeEventListener("wexoraa:motion", callback);
}
function getPaused() {
  return document.documentElement.dataset.motionPaused === "true";
}
export function useAmbientPaused() {
  return useSyncExternalStore(subscribe, getPaused, () => false);
}
export function useExperienceMotion() {
  const paused = useAmbientPaused();
  const reduced = useReducedMotion();
  return !!reduced || paused;
}
export function setAmbientPaused(paused: boolean) {
  document.documentElement.dataset.motionPaused = String(paused);
  window.dispatchEvent(new Event("wexoraa:motion"));
}
