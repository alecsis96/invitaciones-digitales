"use client";

import { useCallback, useEffect, useState } from "react";

type OpeningSessionOptions = {
  enabled: boolean;
  storageKey: string;
  completionValue: string;
  initiallyVisible?: boolean;
};

export function useOpeningSession({ enabled, storageKey, completionValue, initiallyVisible = false }: OpeningSessionOptions) {
  const [visible, setVisible] = useState(() => enabled && initiallyVisible);

  useEffect(() => {
    if (!enabled || window.sessionStorage.getItem(storageKey)) {
      setVisible(false);
      return;
    }

    setVisible(true);
  }, [enabled, storageKey]);

  useEffect(() => {
    if (!visible) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [visible]);

  const markComplete = useCallback(() => {
    window.sessionStorage.setItem(storageKey, completionValue);
  }, [completionValue, storageKey]);

  const dismiss = useCallback(() => {
    setVisible(false);
  }, []);

  return { visible, markComplete, dismiss };
}
