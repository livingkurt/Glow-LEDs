import { useEffect, useRef, useState } from "react";
import { Box, Paper, Slider, Typography } from "@mui/material";

const FRAME_RATE = 60; // 120fps
const MS_PER_FRAME = 1000 / FRAME_RATE;

// Scale durations for visualization
const TIME_SCALE = 1; // Adjust this to scale durations
const TIME_UNIT = TIME_SCALE; // Each duration unit represents TIME_SCALE ms

const CONTROLS = {
  speed: { min: 1, max: 30, default: 3, label: "Speed" },
  trail: { min: 1, max: 300, default: 100, label: "Trail" },
  size: { min: 5, max: 50, default: 25, label: "Size" },
  blur: { min: 1, max: 10, default: 5, label: "Blur" },
  radius: { min: 0, max: 600, default: 400, label: "Radius" },
};

const PatternStates = {
  DISABLED: "DISABLED",
  BLINK_ON: "BLINK_ON",
  BLINK_OFF: "BLINK_OFF",
  BEGIN_GAP: "BEGIN_GAP",
  BEGIN_DASH: "BEGIN_DASH",
  BEGIN_GAP2: "BEGIN_GAP2",
};

const ModePreview = ({ mode }) => {
  const [controls, setControls] = useState({
    speed: CONTROLS.speed.default,
    trail: CONTROLS.trail.default,
    size: CONTROLS.size.default,
    blur: CONTROLS.blur.default,
    radius: CONTROLS.radius.default,
  });

  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const positionRef = useRef({
    angle: 0,
    radius: 0, // Will be set based on canvas size
  });
  const stateRef = useRef({
    state: PatternStates.BLINK_ON,
    currentColorIndex: -1,
    groupCounter: 0,
    stateTimer: 0,
    trailPositions: [],
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = controls.radius; // Use control value instead of fixed calculation
    positionRef.current.radius = radius;
    let lastTime = 0;

    // Clear canvas with fade effect
    const fadeCanvas = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; // Reduced alpha for more subtle fade
      ctx.fillRect(0, 0, width, height);
    };

    const drawLED = (x, y, color, alpha = 1, isNewSegment = false) => {
      if (!color) return;

      const radius = controls.size;
      const blur = controls.blur;

      // Draw a line segment if there's a previous position and we're not starting a new segment
      if (stateRef.current.lastPosition && !isNewSegment) {
        const gradient = ctx.createLinearGradient(
          stateRef.current.lastPosition.x,
          stateRef.current.lastPosition.y,
          x,
          y
        );
        gradient.addColorStop(
          0,
          `${color}${Math.floor(alpha * 255)
            .toString(16)
            .padStart(2, "0")}`
        );
        gradient.addColorStop(
          1,
          `${color}${Math.floor(alpha * 255)
            .toString(16)
            .padStart(2, "0")}`
        );

        ctx.beginPath();
        ctx.moveTo(stateRef.current.lastPosition.x, stateRef.current.lastPosition.y);
        ctx.lineTo(x, y);
        ctx.lineWidth = radius * 1.6;
        ctx.strokeStyle = gradient;
        ctx.lineCap = "round";
        ctx.stroke();
      }

      // Draw the glow effect
      const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, radius * blur);
      glowGradient.addColorStop(
        0,
        `${color}${Math.floor(alpha * 255)
          .toString(16)
          .padStart(2, "0")}`
      );
      glowGradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.beginPath();
      ctx.arc(x, y, radius * 3, 0, Math.PI * 2);
      ctx.fillStyle = glowGradient;
      ctx.fill();

      // Store the current position for the next frame
      stateRef.current.lastPosition = { x, y };
    };

    const updateState = deltaTime => {
      const state = stateRef.current;
      const pattern = mode.flashing_pattern;

      // Update state timer
      state.stateTimer += deltaTime;

      let stateChanged;
      do {
        stateChanged = false;
        let duration = 0;

        switch (state.state) {
          case PatternStates.BLINK_ON:
            // Clear lastPosition when changing colors
            stateRef.current.lastPosition = null;
            state.currentColorIndex = (state.currentColorIndex + 1) % mode.colors.length;

            if (pattern.on_dur > 0) {
              duration = pattern.on_dur * TIME_UNIT;
              if (state.stateTimer >= duration) {
                state.stateTimer -= duration;
                // Decrement groupCounter
                state.groupCounter--;
                // Proceed to next state
                state.state = PatternStates.BLINK_OFF;
                stateChanged = true;
              }
            } else {
              // No on_dur, proceed to BLINK_OFF
              state.state = PatternStates.BLINK_OFF;
              stateChanged = true;
            }
            if (stateChanged) continue;
            break;

          case PatternStates.BLINK_OFF:
            if (state.groupCounter > 0 || (!pattern.gap_dur && !pattern.dash_dur)) {
              if (pattern.off_dur > 0) {
                duration = pattern.off_dur * TIME_UNIT;
                if (state.stateTimer >= duration) {
                  state.stateTimer -= duration;
                  // Proceed to BLINK_ON
                  state.state = PatternStates.BLINK_ON;
                  stateChanged = true;
                }
              } else if (state.groupCounter > 0 && pattern.on_dur > 0) {
                // No off_dur, proceed to BLINK_ON
                state.state = PatternStates.BLINK_ON;
                stateChanged = true;
              } else {
                // Proceed to BEGIN_GAP
                state.state = PatternStates.BEGIN_GAP;
                stateChanged = true;
              }
            } else {
              // Proceed to BEGIN_GAP
              state.state = PatternStates.BEGIN_GAP;
              stateChanged = true;
            }
            if (stateChanged) continue;
            break;

          case PatternStates.BEGIN_GAP:
            // Reset groupCounter
            state.groupCounter = pattern.group_size
              ? pattern.group_size
              : mode.colors.length - (pattern.dash_dur > 0 ? 1 : 0);

            if (pattern.gap_dur > 0) {
              duration = pattern.gap_dur * TIME_UNIT;
              if (state.stateTimer >= duration) {
                state.stateTimer -= duration;
                // Proceed to BEGIN_DASH
                state.state = PatternStates.BEGIN_DASH;
                stateChanged = true;
              }
            } else {
              state.state = PatternStates.BEGIN_DASH;
              stateChanged = true;
            }
            if (stateChanged) continue;
            break;

          case PatternStates.BEGIN_DASH:
            // Advance currentColorIndex
            state.currentColorIndex = (state.currentColorIndex + 1) % mode.colors.length;

            if (pattern.dash_dur > 0) {
              duration = pattern.dash_dur * TIME_UNIT;
              if (state.stateTimer >= duration) {
                state.stateTimer -= duration;
                // Proceed to BEGIN_GAP2
                state.state = PatternStates.BEGIN_GAP2;
                stateChanged = true;
              }
            } else {
              state.state = PatternStates.BLINK_ON;
              stateChanged = true;
            }
            if (stateChanged) continue;
            break;

          case PatternStates.BEGIN_GAP2:
            if (pattern.dash_dur > 0 && pattern.gap_dur > 0) {
              duration = pattern.gap_dur * TIME_UNIT;
              if (state.stateTimer >= duration) {
                state.stateTimer -= duration;
                // Proceed to BLINK_ON
                state.state = PatternStates.BLINK_ON;
                stateChanged = true;
              }
            } else {
              state.state = PatternStates.BLINK_ON;
              stateChanged = true;
            }
            if (stateChanged) continue;
            break;
        }
        // Exit the loop if no state change occurred
      } while (stateChanged);

      // Clear lastPosition during OFF states
      if (
        state.state === PatternStates.BLINK_OFF ||
        state.state === PatternStates.BEGIN_GAP ||
        state.state === PatternStates.BEGIN_GAP2
      ) {
        stateRef.current.lastPosition = null;
      }

      // Only add trail positions during ON states
      if (state.state === PatternStates.BLINK_ON || state.state === PatternStates.BEGIN_DASH) {
        const angle = positionRef.current.angle;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        state.trailPositions.push({
          x,
          y,
          color: mode.colors[state.currentColorIndex]?.colorCode,
          age: 0,
          isNewSegment: !stateRef.current.lastPosition,
        });

        // Use controls.trail for MAX_TRAIL_AGE
        const MAX_TRAIL_AGE = controls.trail * 10;
        state.trailPositions = state.trailPositions
          .map(pos => ({ ...pos, age: pos.age + deltaTime }))
          .filter(pos => pos.age < MAX_TRAIL_AGE);
      }
    };

    const animate = timestamp => {
      if (!lastTime) lastTime = timestamp;
      const deltaTime = timestamp - lastTime;

      if (deltaTime >= MS_PER_FRAME) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
        ctx.fillRect(0, 0, width, height);

        const speedScale = 0.003;
        const speed = controls.speed * speedScale;
        positionRef.current.angle -= speed;

        updateState(deltaTime);

        // Draw trails
        const state = stateRef.current;
        const MAX_TRAIL_AGE = controls.trail * 10;
        state.trailPositions.forEach(pos => {
          const alpha = Math.max(0, 1 - pos.age / MAX_TRAIL_AGE);
          drawLED(pos.x, pos.y, pos.color, alpha, pos.isNewSegment);
        });

        // Draw current LED
        if (
          (state.state === PatternStates.BLINK_ON || state.state === PatternStates.BEGIN_DASH) &&
          mode.colors.length > 0
        ) {
          const currentColor = mode.colors[state.currentColorIndex]?.colorCode;
          const x = centerX + Math.cos(positionRef.current.angle) * positionRef.current.radius;
          const y = centerY + Math.sin(positionRef.current.angle) * positionRef.current.radius;
          drawLED(x, y, currentColor, 1, !stateRef.current.lastPosition);
        }

        lastTime = timestamp;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Initialize state
    const pattern = mode.flashing_pattern;
    stateRef.current = {
      state: pattern.dash_dur > 0 ? PatternStates.BEGIN_DASH : PatternStates.BLINK_ON,
      currentColorIndex: -1,
      groupCounter: pattern.group_size || mode.colors.length - (pattern.dash_dur > 0 ? 1 : 0),
      stateTimer: 0,
      trailPositions: [],
    };

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mode, controls]); // Add controls to the dependency array

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {"Pattern Preview"}
      </Typography>
      {/* Add animation controls */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          {"Animation Controls"}
        </Typography>
        {Object.entries(CONTROLS).map(([key, config]) => (
          <Box key={key} sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
            <Typography sx={{ minWidth: 80 }}>{config.label}</Typography>
            <Slider
              size="small"
              min={config.min}
              max={config.max}
              value={controls[key]}
              onChange={(_, value) => setControls(prev => ({ ...prev, [key]: value }))}
              sx={{ flex: 1 }}
            />
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          bgcolor: "black",
          borderRadius: 1,
          p: 2,
        }}
      >
        <canvas
          ref={canvasRef}
          width={1000}
          height={1000}
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
        />
      </Box>
      <Typography variant="caption" color="text.secondary" sx={{ display: "block", textAlign: "center", mt: 1 }}>
        {"Pattern: "}
        {mode.flashing_pattern.name}
      </Typography>
    </Paper>
  );
};

export default ModePreview;
