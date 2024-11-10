import { useEffect, useRef } from "react";
import { Box, Paper, Typography } from "@mui/material";

const FRAME_RATE = 60; // 60fps
const MS_PER_FRAME = 1000 / FRAME_RATE;

const ModePreview = ({ mode }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const positionRef = useRef({ x: 0, direction: 1 });
  const stateRef = useRef({
    currentColorIndex: 0,
    trailPositions: [],
    colorTimer: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    const centerY = height / 2;
    let lastTime = 0;

    // Clear canvas with fade effect
    const fadeCanvas = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
      ctx.fillRect(0, 0, width, height);
    };

    const drawLED = (x, y, color, alpha = 1) => {
      const radius = 10;

      // Draw glow effect
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

      // Draw core
      ctx.beginPath();
      ctx.arc(x, y, radius * 0.8, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    };

    const updateState = deltaTime => {
      const pattern = mode.flashing_pattern;
      const state = stateRef.current;

      // Update color timer
      state.colorTimer += deltaTime;
      const colorDuration = (pattern.on_dur || 5) * 50; // Longer duration for smoother trails

      // Change color when timer expires
      if (state.colorTimer >= colorDuration) {
        state.colorTimer = 0;
        state.currentColorIndex = (state.currentColorIndex + 1) % mode.colors.length;
      }

      // Add new trail position
      if (mode.colors.length > 0) {
        state.trailPositions.push({
          x: positionRef.current.x,
          y: centerY,
          color: mode.colors[state.currentColorIndex].colorCode,
          age: 0,
        });
      }

      // Age and remove old trail positions
      state.trailPositions = state.trailPositions
        .map(pos => ({ ...pos, age: pos.age + deltaTime }))
        .filter(pos => pos.age < 500); // Keep trails longer
    };

    const animate = timestamp => {
      if (!lastTime) lastTime = timestamp;
      const deltaTime = timestamp - lastTime;

      if (deltaTime >= MS_PER_FRAME) {
        // Fade previous frame
        fadeCanvas();

        // Update position with smoother movement
        const speed = 4;
        positionRef.current.x += positionRef.current.direction * speed;

        // Reverse direction at edges with some padding
        if (positionRef.current.x >= width - 50 || positionRef.current.x <= 50) {
          positionRef.current.direction *= -1;
        }

        // Update pattern state
        updateState(deltaTime);

        // Draw all trails
        const state = stateRef.current;
        state.trailPositions.forEach(pos => {
          const alpha = Math.max(0, 1 - pos.age / 500);
          drawLED(pos.x, pos.y, pos.color, alpha * 0.8); // Slightly reduce trail opacity
        });

        // Draw current LED
        if (mode.colors.length > 0) {
          const currentColor = mode.colors[state.currentColorIndex];
          drawLED(positionRef.current.x, centerY, currentColor.colorCode, 1);
        }

        lastTime = timestamp;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Initialize position and state
    positionRef.current = { x: width / 2, direction: 1 };
    stateRef.current = {
      currentColorIndex: 0,
      trailPositions: [],
      colorTimer: 0,
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
          width={600}
          height={100}
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
