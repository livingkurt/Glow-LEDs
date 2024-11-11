import React, { useEffect, useRef, useState } from "react";
import { Slider, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

// Custom styled components
const AnimationSlider = styled(Slider)({
  color: "#1976d2",
  "& .MuiSlider-thumb": {
    backgroundColor: "#fff",
  },
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-rail": {
    opacity: 0.5,
    backgroundColor: "#bfbfbf",
  },
});

const ControlsContainer = styled(Box)({
  backgroundColor: "rgba(30, 30, 30, 0.9)",
  borderRadius: "8px",
  padding: "16px",
  marginTop: "16px",
});

const SliderContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "16px",
  marginBottom: "16px",
});

const PatternState = {
  STATE_DISABLED: 0,
  STATE_BLINK_ON: 1,
  STATE_BLINK_OFF: 2,
  STATE_BEGIN_GAP: 3,
  STATE_IN_GAP: 4,
  STATE_BEGIN_DASH: 5,
  STATE_IN_DASH: 6,
  STATE_BEGIN_GAP2: 7,
  STATE_IN_GAP2: 8,
};

const ModePreview = ({ mode }) => {
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

  // Convert slider values to actual parameters
  const getAnimationParams = () => ({
    rotationSpeed: 0.01 + (speed / 100) * 0.09,
    trailLength: Math.floor(16 + (trailLength / 100) * 48),
    dotSize: 2 + (size / 100) * 6,
    blurAmount: 1 + (blur / 100) * 4,
    circleRadius: 20 + (radius / 100) * 40,
  });

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

  const hexToRgb = hex => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          red: parseInt(result[1], 16),
          green: parseInt(result[2], 16),
          blue: parseInt(result[3], 16),
        }
      : null;
  };

  const interpolate = (current, next, blendSpeed) => {
    if (current === next) return current;
    if (current < next) {
      const step = Math.min(blendSpeed, next - current);
      return current + step;
    } else {
      const step = Math.min(blendSpeed, current - next);
      return current - step;
    }
  };

  const getPosition = (angle, radius) => {
    const centerX = canvasRef.current.width / 2;
    const centerY = canvasRef.current.height / 2;
    return {
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius,
    };
  };

  const drawTrail = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const params = getAnimationParams();

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
      if (!point.color) return;

      const alpha = (index / params.trailLength) * 0.8;
      if (index > 0 && trailRef.current[index - 1]) {
        ctx.beginPath();
        ctx.shadowBlur = params.blurAmount * 5;
        ctx.shadowColor = `rgba(${point.color.red}, ${point.color.green}, ${point.color.blue}, ${alpha})`;
        ctx.strokeStyle = `rgba(${point.color.red}, ${point.color.green}, ${point.color.blue}, ${alpha})`;
        ctx.lineWidth = params.dotSize;
        ctx.lineCap = "round";
        ctx.moveTo(trailRef.current[index - 1].x, trailRef.current[index - 1].y);
        ctx.lineTo(point.x, point.y);
        ctx.stroke();
      }
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

    const params = getAnimationParams();
    const newPos = getPosition(angleRef.current, params.circleRadius);
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
                    : PatternState.STATE_BLINK_ON;
              if (stateRef.current === PatternState.STATE_BLINK_ON) {
                initPattern();
              }
            }
          } else if (stateRef.current === PatternState.STATE_BLINK_OFF) {
            stateRef.current = PatternState.STATE_BLINK_ON;
            currentColorIndexRef.current = (currentColorIndexRef.current + 1) % mode.colors.length;
          } else if (stateRef.current === PatternState.STATE_IN_GAP) {
            stateRef.current = pattern.dash_dur > 0 ? PatternState.STATE_IN_DASH : PatternState.STATE_BLINK_ON;
            if (stateRef.current === PatternState.STATE_BLINK_ON) {
              initPattern();
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

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <canvas
        ref={canvasRef}
        width={120}
        height={120}
        style={{ width: "100%", backgroundColor: "black", borderRadius: "8px" }}
      />

      <ControlsContainer>
        <Typography variant="h6" sx={{ color: "white", mb: 2 }}>
          {"Animation"}
        </Typography>

        <SliderContainer>
          <AnimationSlider value={speed} onChange={(_, value) => setSpeed(value)} aria-label="Speed" />
          <Typography sx={{ color: "white", width: 80 }}>{"Speed"}</Typography>
        </SliderContainer>
        <SliderContainer>
          <AnimationSlider value={trailLength} onChange={(_, value) => setTrailLength(value)} aria-label="Trail" />
          <Typography sx={{ color: "white", width: 80 }}>{"Trail"}</Typography>
        </SliderContainer>

        <SliderContainer>
          <AnimationSlider value={size} onChange={(_, value) => setSize(value)} aria-label="Size" />
          <Typography sx={{ color: "white", width: 80 }}>{"Size"}</Typography>
        </SliderContainer>

        <SliderContainer>
          <AnimationSlider value={blur} onChange={(_, value) => setBlur(value)} aria-label="Blur" />
          <Typography sx={{ color: "white", width: 80 }}>{"Blur"}</Typography>
        </SliderContainer>

        <SliderContainer>
          <AnimationSlider value={radius} onChange={(_, value) => setRadius(value)} aria-label="Radius" />
          <Typography sx={{ color: "white", width: 80 }}>{"Radius"}</Typography>
        </SliderContainer>
      </ControlsContainer>

      <Box
        sx={{
          textAlign: "center",
          color: "text.secondary",
          typography: "body2",
          mt: 2,
        }}
      >
        {"Pattern: "}
        {pattern.name}
        <br />
        {mode.colors.length}
        {" colors • "}
        {pattern.on_dur}
        {"ms on"}
        {pattern.off_dur > 0 && ` • ${pattern.off_dur}ms off`}
        {pattern.gap_dur > 0 && ` • ${pattern.gap_dur}ms gap`}
        {pattern.dash_dur > 0 && ` • ${pattern.dash_dur}ms dash`}
        {pattern.group_size > 0 && ` • group of ${pattern.group_size}`}
        {pattern.blend_speed > 0 && ` • blend speed ${pattern.blend_speed}`}
      </Box>
    </Box>
  );
};

export default ModePreview;
