import React, { useState, useEffect } from "react";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  console.log({
    width,
    height,
  });
  return {
    width,
    height,
  };
}

export default function useWindowDimensions() {
  const [ windowDimensions, setWindowDimensions ] = useState(
    getWindowDimensions()
  );
  console.log({ windowDimensions });

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
