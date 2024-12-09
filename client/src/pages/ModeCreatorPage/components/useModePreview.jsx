import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { getAnimationParams, getPosition, hexToRgb, interpolate, PatternState } from "../modeCreatorPageHelpers";
import { isMobile } from "react-device-detect";

export const useModePreview = ({ mode }) => {
  const [speed, setSpeed] = useState(4000);
  const [trailLength, setTrailLength] = useState(100);
  const [size, setSize] = useState(50);
  const [blur, setBlur] = useState(20);
  const [radius, setRadius] = useState(100);
  const [isInView, setIsInView] = useState(false);

  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const stateRef = useRef(PatternState.STATE_BLINK_ON);
  const lastUpdateTimeRef = useRef(0);
  const currentColorIndexRef = useRef(0);
  const groupCounterRef = useRef(0);
  const blendCurrentColorRef = useRef(null);
  const blendNextColorRef = useRef(null);
  const trailRef = useRef([]);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      const parentWidth = canvas.parentElement.clientWidth;
      canvas.style.width = `${parentWidth}px`;
      canvas.style.height = `${parentWidth}px`;
      canvas.width = Math.floor(parentWidth * dpr);
      canvas.height = Math.floor(parentWidth * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
    };

    resizeCanvas();
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resizeCanvas, 100);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d", { alpha: false });
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
  }, []);

  const pattern = {
    ...mode.flashing_pattern,
    on_dur: Number(mode.flashing_pattern.on_dur) || 0,
    off_dur: Number(mode.flashing_pattern.off_dur) || 0,
    gap_dur: Number(mode.flashing_pattern.gap_dur) || 0,
    dash_dur: Number(mode.flashing_pattern.dash_dur) || 0,
    group_size: Number(mode.flashing_pattern.group_size) || 0,
    blend_speed: Number(mode.flashing_pattern.blend_speed) || 0,
  };

  const radiiRef = useRef([radius * 0.6, radius * 0.8, radius]);
  const anglesRef = useRef([0, 0, 0]);

  useEffect(() => {
    radiiRef.current = [radius * 0.6, radius * 0.8, radius];
  }, [radius]);

  // In updateTrail, accept deltaTime and use it when incrementing angles:
  const updateTrail = (color, intensity = 1, deltaTime) => {
    const rgbColor = typeof color === "string" ? hexToRgb(color) : { ...color };
    const params = getAnimationParams(speed, trailLength, size, blur, radius, canvasRef);

    // speed is degrees/second, convert to radians/ms:
    const radiansPerMs = (params.speed * Math.PI) / (180 * 1000);

    radiiRef.current.forEach((radiusMultiplier, index) => {
      const circleRadius = (radiusMultiplier / 100) * params.circleRadius;
      // Angle increment based on actual elapsed time:
      anglesRef.current[index] = (anglesRef.current[index] + radiansPerMs * deltaTime) % (Math.PI * 2);

      const newPos = getPosition(anglesRef.current[index], circleRadius, canvasRef);
      trailRef.current.unshift({ x: newPos.x, y: newPos.y, color: rgbColor, alpha: intensity });
    });

    while (trailRef.current.length > params.trailLength * 3) {
      trailRef.current.pop();
    }

    drawTrail();
  };
  const drawTrail = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const params = getAnimationParams(speed, trailLength, size, blur, radius, canvasRef);
    const drawWidth = canvas.width / dpr;
    const drawHeight = canvas.height / dpr;
    ctx.clearRect(0, 0, drawWidth, drawHeight);
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.fillRect(0, 0, drawWidth, drawHeight);

    for (let i = trailRef.current.length - 1; i >= 0; i--) {
      const point = trailRef.current[i];
      if (!point.color) continue;
      const fadeAlpha = (1 - i / params.trailLength).toFixed(2);
      const innerAlpha = fadeAlpha * point.alpha;
      const outerAlpha = params.blurFac !== 0 ? (innerAlpha / params.blurFac).toFixed(2) : innerAlpha;
      const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, params.dotSize);
      gradient.addColorStop(0, `rgba(${point.color.red}, ${point.color.green}, ${point.color.blue}, ${innerAlpha})`);
      gradient.addColorStop(0.8, `rgba(${point.color.red}, ${point.color.green}, ${point.color.blue}, ${outerAlpha})`);
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(point.x, point.y, params.dotSize, 0, 2 * Math.PI);
      ctx.fill();
    }
  };

  const initPattern = () => {
    currentColorIndexRef.current = 0;
    groupCounterRef.current = pattern.group_size > 0 ? pattern.group_size : mode.colors.length;
    if ((!pattern.on_dur && !pattern.dash_dur) || mode.colors.length === 0) {
      stateRef.current = PatternState.STATE_DISABLED;
    } else {
      stateRef.current = PatternState.STATE_BLINK_ON;
    }

    if (pattern.blend_speed > 0 && mode.colors.length > 1) {
      blendCurrentColorRef.current = hexToRgb(mode.colors[0].colorCode);
      blendNextColorRef.current = hexToRgb(mode.colors[1 % mode.colors.length].colorCode);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const observerOptions = { root: null, rootMargin: "0px", threshold: 0.05 };
    const observerCallback = entries => {
      entries.forEach(entry => {
        setIsInView(entry.isIntersecting);
      });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    observer.observe(canvas);
    return () => {
      observer.unobserve(canvas);
    };
  }, [canvasRef]);

  const patternElapsedRef = useRef(0);

  useEffect(() => {
    if (!isInView) {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      return;
    }

    initPattern();
    trailRef.current = [];
    lastUpdateTimeRef.current = null;
    patternElapsedRef.current = 0;

    const animate = timestamp => {
      if (!lastUpdateTimeRef.current) {
        lastUpdateTimeRef.current = timestamp;
      }
      const deltaTime = timestamp - lastUpdateTimeRef.current;
      lastUpdateTimeRef.current = timestamp;

      // Increment patternElapsed by deltaTime each frame
      patternElapsedRef.current += deltaTime;

      let currentColor = null;
      switch (stateRef.current) {
        case PatternState.STATE_DISABLED:
          currentColor = mode.colors[0]?.colorCode || "#000000";
          updateTrail(currentColor, 0, deltaTime);
          break;
        case PatternState.STATE_BLINK_ON:
          if (pattern.blend_speed > 0 && mode.colors.length > 1) {
            const current = blendCurrentColorRef.current;
            const next = blendNextColorRef.current;
            current.red = interpolate(current.red, next.red, pattern.blend_speed);
            current.green = interpolate(current.green, next.green, pattern.blend_speed);
            current.blue = interpolate(current.blue, next.blue, pattern.blend_speed);
            currentColor = current;
            updateTrail(current, 1, deltaTime);
            if (current.red === next.red && current.green === next.green && current.blue === next.blue) {
              blendCurrentColorRef.current = { ...next };
              const nextColorIndex = (currentColorIndexRef.current + 2) % mode.colors.length;
              blendNextColorRef.current = hexToRgb(mode.colors[nextColorIndex].colorCode);
              currentColorIndexRef.current = (currentColorIndexRef.current + 1) % mode.colors.length;
            }
          } else {
            currentColor = mode.colors[currentColorIndexRef.current]?.colorCode || "#000000";
            updateTrail(currentColor, 1, deltaTime);
          }
          break;
        case PatternState.STATE_BLINK_OFF:
          currentColor = mode.colors[currentColorIndexRef.current]?.colorCode || "#000000";
          updateTrail(currentColor, 0, deltaTime);
          break;
        case PatternState.STATE_IN_GAP:
        case PatternState.STATE_IN_GAP2:
          currentColor = mode.colors[currentColorIndexRef.current]?.colorCode || "#000000";
          updateTrail(currentColor, 0, deltaTime);
          break;
        case PatternState.STATE_IN_DASH:
          currentColor = mode.colors[currentColorIndexRef.current]?.colorCode || "#000000";
          updateTrail(currentColor, 1, deltaTime);
          break;
      }

      // Now check if patternElapsed >= duration for the current state
      let duration;
      switch (stateRef.current) {
        case PatternState.STATE_DISABLED:
          duration = 0;
          break;
        case PatternState.STATE_BLINK_ON:
          duration = pattern.on_dur;
          break;
        case PatternState.STATE_BLINK_OFF:
          duration = pattern.off_dur;
          break;
        case PatternState.STATE_IN_GAP:
        case PatternState.STATE_IN_GAP2:
          duration = pattern.gap_dur;
          break;
        case PatternState.STATE_IN_DASH:
          duration = pattern.dash_dur;
          break;
        default:
          duration = 0;
      }

      if (patternElapsedRef.current >= duration) {
        // Time to transition to the next state
        patternElapsedRef.current = 0; // reset elapsed time for new state
        switch (stateRef.current) {
          case PatternState.STATE_BLINK_ON:
            if (pattern.off_dur > 0) {
              stateRef.current = PatternState.STATE_BLINK_OFF;
            } else {
              currentColorIndexRef.current = (currentColorIndexRef.current + 1) % mode.colors.length;
              groupCounterRef.current--;
              if (groupCounterRef.current > 0) {
                stateRef.current = PatternState.STATE_BLINK_ON;
              } else {
                if (pattern.dash_dur > 0) {
                  stateRef.current = PatternState.STATE_IN_DASH;
                } else if (pattern.gap_dur > 0) {
                  stateRef.current = PatternState.STATE_IN_GAP;
                } else {
                  groupCounterRef.current = pattern.group_size > 0 ? pattern.group_size : mode.colors.length;
                  stateRef.current = PatternState.STATE_BLINK_ON;
                }
              }
            }
            break;
          case PatternState.STATE_BLINK_OFF:
            currentColorIndexRef.current = (currentColorIndexRef.current + 1) % mode.colors.length;
            groupCounterRef.current--;
            if (groupCounterRef.current > 0) {
              stateRef.current = PatternState.STATE_BLINK_ON;
            } else {
              if (pattern.dash_dur > 0) {
                stateRef.current = PatternState.STATE_IN_DASH;
              } else if (pattern.gap_dur > 0) {
                stateRef.current = PatternState.STATE_IN_GAP;
              } else {
                groupCounterRef.current = pattern.group_size > 0 ? pattern.group_size : mode.colors.length;
                stateRef.current = PatternState.STATE_BLINK_ON;
              }
            }
            break;
          case PatternState.STATE_IN_DASH:
            if (pattern.gap_dur > 0) {
              stateRef.current = PatternState.STATE_IN_GAP;
            } else {
              groupCounterRef.current = pattern.group_size > 0 ? pattern.group_size : mode.colors.length;
              currentColorIndexRef.current = 0;
              stateRef.current = PatternState.STATE_BLINK_ON;
            }
            break;
          case PatternState.STATE_IN_GAP:
            groupCounterRef.current = pattern.group_size > 0 ? pattern.group_size : mode.colors.length;
            currentColorIndexRef.current = 0;
            stateRef.current = PatternState.STATE_BLINK_ON;
            break;
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isInView, mode, pattern]);

  return {
    speed,
    setSpeed,
    trailLength,
    setTrailLength,
    size,
    setSize,
    blur,
    setBlur,
    radius,
    setRadius,
    canvasRef,
  };
};
