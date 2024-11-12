import { useEffect, useRef, useState } from "react";
import { getAnimationParams, getPosition, hexToRgb, interpolate, PatternState } from "../modeCreatorPageHelpers";

export const useModePreview = ({ mode }) => {
  // Animation control states
  const [speed, setSpeed] = useState(100);
  const [trailLength, setTrailLength] = useState(50);
  const [size, setSize] = useState(50);
  const [blur, setBlur] = useState(50);
  const [radius, setRadius] = useState(70);

  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const stateRef = useRef(PatternState.STATE_BLINK_ON);
  const lastUpdateTimeRef = useRef(0);
  const currentColorIndexRef = useRef(0);
  const groupCounterRef = useRef(0);
  const blendCurrentColorRef = useRef(null);
  const blendNextColorRef = useRef(null);
  const trailRef = useRef([]);
  const angleRef = useRef(0);

  useEffect(() => {
    // Enable antialiasing for the canvas
    const ctx = canvasRef.current.getContext("2d", { alpha: false });
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
  }, []);

  // Ensure pattern values are numbers with defaults
  const pattern = {
    ...mode.flashing_pattern,
    on_dur: Number(mode.flashing_pattern.on_dur) || 0,
    off_dur: mode.flashing_pattern.off_dur === null ? 0 : Number(mode.flashing_pattern.off_dur) || 0,
    gap_dur: Number(mode.flashing_pattern.gap_dur) || 0,
    dash_dur: Number(mode.flashing_pattern.dash_dur) || 0,
    group_size: Number(mode.flashing_pattern.group_size) || 0,
    blend_speed: Number(mode.flashing_pattern.blend_speed) || 0,
  };

  const drawTrail = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const params = getAnimationParams(speed, trailLength, size, blur, radius);

    // Fill black background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw motion circle guide
    ctx.beginPath();
    ctx.strokeStyle = "rgba(255,255,255,0)";
    ctx.arc(canvas.width / 2, canvas.height / 2, params.circleRadius, 0, Math.PI * 2);
    ctx.stroke();

    // Draw trail segments with blur effect
    trailRef.current.forEach((point, index) => {
      if (!point.color || !trailRef.current[index - 1]) return;

      const alpha = Math.pow(1 - index / params.trailLength, 1.5) * 0.9; // Smoother falloff

      ctx.beginPath();
      ctx.shadowBlur = params.blurAmount * 8; // Increased blur effect
      ctx.shadowColor = `rgba(${point.color.red}, ${point.color.green}, ${point.color.blue}, ${alpha})`;
      ctx.strokeStyle = `rgba(${point.color.red}, ${point.color.green}, ${point.color.blue}, ${alpha})`;
      ctx.lineWidth = params.dotSize * 1.5; // Slightly thicker lines
      ctx.lineCap = "round";

      // Use quadratic curves for smoother trails
      const prev = trailRef.current[index - 1];
      const midX = (prev.x + point.x) / 2;
      const midY = (prev.y + point.y) / 2;

      ctx.moveTo(prev.x, prev.y);
      ctx.quadraticCurveTo(prev.x, prev.y, midX, midY);
      ctx.stroke();
    });

    ctx.shadowBlur = 0;

    // Draw current LED position
    const currentPos = trailRef.current[0];
    if (currentPos && currentPos.color) {
      // Draw glow
      const gradient = ctx.createRadialGradient(
        currentPos.x,
        currentPos.y,
        0,
        currentPos.x,
        currentPos.y,
        params.dotSize * 3
      );
      gradient.addColorStop(
        0,
        `rgba(${currentPos.color.red}, ${currentPos.color.green}, ${currentPos.color.blue}, 0.8)`
      );
      gradient.addColorStop(1, "rgba(0,0,0,0)");

      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(currentPos.x, currentPos.y, params.dotSize * 3, 0, Math.PI * 2);
      ctx.fill();

      // Draw LED
      ctx.beginPath();
      ctx.fillStyle = `rgb(${currentPos.color.red}, ${currentPos.color.green}, ${currentPos.color.blue})`;
      ctx.arc(currentPos.x, currentPos.y, params.dotSize, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const updateTrail = (color, intensity = 1) => {
    let rgbColor;
    if (typeof color === "string") {
      rgbColor = hexToRgb(color);
    } else {
      rgbColor = { ...color };
    }

    if (intensity !== 1) {
      rgbColor.red = Math.floor(rgbColor.red * intensity);
      rgbColor.green = Math.floor(rgbColor.green * intensity);
      rgbColor.blue = Math.floor(rgbColor.blue * intensity);
    }

    const params = getAnimationParams(speed, trailLength, size, blur, radius);
    const newPos = getPosition(angleRef.current, params.circleRadius, canvasRef);
    angleRef.current = (angleRef.current + params.rotationSpeed) % (Math.PI * 2);

    trailRef.current.unshift({
      x: newPos.x,
      y: newPos.y,
      color: rgbColor,
    });

    if (trailRef.current.length > params.trailLength) {
      trailRef.current.pop();
    }

    drawTrail();
  };

  const initPattern = () => {
    currentColorIndexRef.current = 0;
    groupCounterRef.current = pattern.group_size || mode.colors.length - (pattern.dash_dur ? 1 : 0);

    if ((!pattern.on_dur && !pattern.dash_dur) || mode.colors.length === 0) {
      stateRef.current = PatternState.STATE_DISABLED;
    } else if (pattern.dash_dur > 0) {
      stateRef.current = PatternState.STATE_BEGIN_DASH;
    } else {
      stateRef.current = PatternState.STATE_BLINK_ON;
    }

    if (pattern.blend_speed > 0) {
      blendCurrentColorRef.current = hexToRgb(mode.colors[0].colorCode);
      blendNextColorRef.current = hexToRgb(mode.colors[1 % mode.colors.length].colorCode);
    }
  };

  useEffect(() => {
    initPattern();
    trailRef.current = [];

    const animate = timestamp => {
      if (!lastUpdateTimeRef.current) {
        lastUpdateTimeRef.current = timestamp;
      }

      const deltaTime = timestamp - lastUpdateTimeRef.current;
      let duration = pattern.on_dur;

      if (pattern.blend_speed > 0) {
        const current = blendCurrentColorRef.current;
        const next = blendNextColorRef.current;

        current.red = interpolate(current.red, next.red, pattern.blend_speed);
        current.green = interpolate(current.green, next.green, pattern.blend_speed);
        current.blue = interpolate(current.blue, next.blue, pattern.blend_speed);

        updateTrail(current);

        if (current.red === next.red && current.green === next.green && current.blue === next.blue) {
          blendCurrentColorRef.current = { ...next };
          const nextColorIndex = (currentColorIndexRef.current + 2) % mode.colors.length;
          blendNextColorRef.current = hexToRgb(mode.colors[nextColorIndex].colorCode);
          currentColorIndexRef.current = (currentColorIndexRef.current + 1) % mode.colors.length;
        }
      } else {
        switch (stateRef.current) {
          case PatternState.STATE_DISABLED:
            updateTrail(mode.colors[0].colorCode, 0.1);
            break;

          case PatternState.STATE_BLINK_ON:
            updateTrail(mode.colors[currentColorIndexRef.current].colorCode);
            break;

          case PatternState.STATE_BLINK_OFF:
            updateTrail(mode.colors[currentColorIndexRef.current].colorCode, 0.1);
            duration = pattern.off_dur;
            break;

          case PatternState.STATE_IN_GAP:
          case PatternState.STATE_IN_GAP2:
            updateTrail(mode.colors[currentColorIndexRef.current].colorCode, 0.1);
            duration = pattern.gap_dur;
            break;

          case PatternState.STATE_IN_DASH:
            updateTrail(mode.colors[currentColorIndexRef.current].colorCode);
            duration = pattern.dash_dur;
            break;
        }

        if (deltaTime >= duration) {
          if (stateRef.current === PatternState.STATE_BLINK_ON) {
            groupCounterRef.current--;
            if (groupCounterRef.current > 0) {
              if (pattern.off_dur > 0) {
                stateRef.current = PatternState.STATE_BLINK_OFF;
              } else {
                currentColorIndexRef.current = (currentColorIndexRef.current + 1) % mode.colors.length;
                stateRef.current = PatternState.STATE_BLINK_ON;
              }
            } else {
              stateRef.current =
                pattern.gap_dur > 0
                  ? PatternState.STATE_IN_GAP
                  : pattern.dash_dur > 0
                    ? PatternState.STATE_BEGIN_DASH
                    : PatternState.STATE_BLINK_OFF; // Changed from STATE_BLINK_ON
              if (stateRef.current === PatternState.STATE_BLINK_OFF) {
                // Changed condition
                currentColorIndexRef.current = 0;
                groupCounterRef.current = pattern.group_size || mode.colors.length;
              }
            }
          } else if (stateRef.current === PatternState.STATE_BLINK_OFF) {
            if (currentColorIndexRef.current === mode.colors.length - 1) {
              // If we're at the last color, reset to first color
              currentColorIndexRef.current = 0;
              stateRef.current = PatternState.STATE_BLINK_ON;
              groupCounterRef.current = pattern.group_size || mode.colors.length;
            } else {
              // Otherwise, move to next color
              currentColorIndexRef.current = (currentColorIndexRef.current + 1) % mode.colors.length;
              stateRef.current = PatternState.STATE_BLINK_ON;
            }
          } else if (stateRef.current === PatternState.STATE_IN_DASH) {
            stateRef.current = pattern.gap_dur > 0 ? PatternState.STATE_IN_GAP2 : PatternState.STATE_BLINK_ON;
            if (stateRef.current === PatternState.STATE_BLINK_ON) {
              initPattern();
            }
          } else if (stateRef.current === PatternState.STATE_IN_GAP2) {
            stateRef.current = PatternState.STATE_BLINK_ON;
            initPattern();
          }

          lastUpdateTimeRef.current = timestamp;
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mode, pattern]);

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
