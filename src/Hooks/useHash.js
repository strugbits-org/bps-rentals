// useHash.js
"use client";
import { useState, useEffect } from "react";

export const useHash = () => {
  const [hash, setHash] = useState(() => {
    if (typeof window !== "undefined") {
      return window.location.hash;
    }
    return "";
  });

  useEffect(() => {
    const onHashChange = () => {
      setHash(window.location.hash);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("hashchange", onHashChange);
      return () => window.removeEventListener("hashchange", onHashChange);
    }
  }, []);

  const setWindowHash = (newHash) => {
    if (typeof window !== "undefined") {
      window.location.hash = newHash;
    }
  };

  return [hash, setWindowHash];
};
