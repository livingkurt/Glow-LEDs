import { useEffect, useRef } from "react";
import { Box, Paper, Typography } from "@mui/material";

const FRAME_RATE = 60; // 60fps
const MS_PER_FRAME = 1000 / FRAME_RATE;
const TIME_UNIT = 1; // Each duration unit represents 10ms

const PatternStates = {
  DISABLED: "DISABLED",
  BLINK_ON: "BLINK_ON",
  BLINK_OFF: "BLINK_OFF",
  BEGIN_GAP: "BEGIN_GAP",
  BEGIN_DASH: "BEGIN_DASH",
  BEGIN_GAP2: "BEGIN_GAP2",
};

const ModePreview = ({ mode }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const positionRef = useRef({
    angle: 0,
    radius: 0, // Will be set based on canvas size
  });
  const stateRef = useRef({
    state: PatternStates.BLINK_ON,
    currentColorIndex: 0,
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
    const radius = Math.min(width, height) / 3; // Circle radius
    positionRef.current.radius = radius;
    let lastTime = 0;

    // Clear canvas with fade effect
    const fadeCanvas = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
      ctx.fillRect(0, 0, width, height);
    };

    const drawLED = (x, y, color, alpha = 1) => {
      if (!color) return;

      const radius = 10;
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 3);
      gradient.addColorStop(
        0,
        `${color}${Math.floor(alpha * 255)
          .toString(16)
          .padStart(2, "0")}`
      );
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.beginPath();
      ctx.arc(x, y, radius * 3, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x, y, radius * 0.8, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    };

    const updateState = deltaTime => {
      const state = stateRef.current;
      const pattern = mode.flashing_pattern;

      // Update state timer
      state.stateTimer += deltaTime;

      // Get current duration based on state
      let duration = 0;
      switch (state.state) {
        case PatternStates.BLINK_ON:
          duration = pattern.on_dur * TIME_UNIT;
          break;
        case PatternStates.BLINK_OFF:
          duration = pattern.off_dur * TIME_UNIT;
          break;
        case PatternStates.BEGIN_GAP:
        case PatternStates.BEGIN_GAP2:
          duration = pattern.gap_dur * TIME_UNIT;
          break;
        case PatternStates.BEGIN_DASH:
          duration = pattern.dash_dur * TIME_UNIT;
          break;
      }

      // Check if it's time to change state
      if (duration > 0 && state.stateTimer >= duration) {
        state.stateTimer = 0;

        // Handle state transitions
        switch (state.state) {
          case PatternStates.BLINK_ON:
            state.groupCounter--;
            state.state = PatternStates.BLINK_OFF;
            break;

          case PatternStates.BLINK_OFF:
            if (state.groupCounter > 0 || (!pattern.gap_dur && !pattern.dash_dur)) {
              state.currentColorIndex = (state.currentColorIndex + 1) % mode.colors.length;
              state.state = PatternStates.BLINK_ON;
            } else {
              state.state = PatternStates.BEGIN_GAP;
            }
            break;

          case PatternStates.BEGIN_GAP:
            state.groupCounter = pattern.group_size || mode.colors.length;
            state.currentColorIndex = 0;
            state.state = PatternStates.BEGIN_DASH;
            break;

          case PatternStates.BEGIN_DASH:
            if (pattern.dash_dur > 0) {
              state.state = PatternStates.BEGIN_GAP2;
            } else {
              state.state = PatternStates.BLINK_ON;
            }
            break;

          case PatternStates.BEGIN_GAP2:
            state.state = PatternStates.BLINK_ON;
            break;
        }
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
        });

        // Age and remove old trail positions
        state.trailPositions = state.trailPositions
          .map(pos => ({ ...pos, age: pos.age + deltaTime }))
          .filter(pos => pos.age < 150);
      }
    };

    const animate = timestamp => {
      if (!lastTime) lastTime = timestamp;
      const deltaTime = timestamp - lastTime;

      if (deltaTime >= MS_PER_FRAME) {
        // Fade previous frame
        fadeCanvas();

        // Update position with circular motion
        const pattern = mode.flashing_pattern;
        const baseSpeed = 0.03;
        const speedMultiplier = pattern.on_dur ? 100 / pattern.on_dur : 1;
        const speed = baseSpeed * (speedMultiplier * 0.2);

        positionRef.current.angle -= speed; // Negative for clockwise rotation

        // Update pattern state
        updateState(deltaTime);

        // Draw trails
        const state = stateRef.current;
        state.trailPositions.forEach(pos => {
          const alpha = Math.max(0, 1 - pos.age / 150);
          drawLED(pos.x, pos.y, pos.color, alpha);
        });

        // Draw current LED
        if (
          (state.state === PatternStates.BLINK_ON || state.state === PatternStates.BEGIN_DASH) &&
          mode.colors.length > 0
        ) {
          const currentColor = mode.colors[state.currentColorIndex]?.colorCode;
          const x = centerX + Math.cos(positionRef.current.angle) * radius;
          const y = centerY + Math.sin(positionRef.current.angle) * radius;
          drawLED(x, y, currentColor, 1);
        }

        lastTime = timestamp;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Initialize state
    const pattern = mode.flashing_pattern;
    stateRef.current = {
      state: pattern.dash_dur > 0 ? PatternStates.BEGIN_DASH : PatternStates.BLINK_ON,
      currentColorIndex: 0,
      groupCounter: pattern.group_size || mode.colors.length,
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
  }, [mode]);

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {"Pattern Preview"}
      </Typography>
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
          width={800}
          height={800}
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
