import { useEffect, useRef } from "react";
import { Box, Paper, Typography } from "@mui/material";

const ModePreview = ({ mode }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    const drawLED = (x, y, color) => {
      const { hue, saturation, brightness } = color;
      const rgbaColor = `rgba(${hue.red}, ${hue.green}, ${hue.blue}, ${brightness / 100})`;

      // Draw main LED circle
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fillStyle = rgbaColor;
      ctx.fill();

      // Add glow effect
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, 40);
      gradient.addColorStop(0, rgbaColor);
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.beginPath();
      ctx.arc(x, y, 40, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    };

    const animate = timestamp => {
      if (!timeRef.current) timeRef.current = timestamp;
      const progress = timestamp - timeRef.current;

      ctx.clearRect(0, 0, width, height);

      const colors = [...mode.colors];
      if (colors.length === 0) return;

      const spacing = width / (colors.length + 1);

      colors.forEach((color, index) => {
        let adjustedColor = { ...color };

        if (mode.flashing_pattern.pattern_type !== "solid") {
          const cycleSpeed = (101 - mode.flashing_pattern.speed) * 20; // Invert speed so higher = faster
          const cycle = (progress % cycleSpeed) / cycleSpeed;

          switch (mode.flashing_pattern.pattern_type) {
            case "strobe":
              adjustedColor.brightness = cycle > 0.5 ? color.brightness : 0;
              break;
            case "fade":
              adjustedColor.brightness = Math.sin(cycle * Math.PI * 2) * 50 + 50;
              break;
            case "rainbow":
              const hueShift = (cycle + index / colors.length) * 360;
              const rgb = hslToRgb(hueShift, color.saturation / 100, color.brightness / 100);
              adjustedColor.hue = {
                red: Math.round(rgb[0] * 255),
                green: Math.round(rgb[1] * 255),
                blue: Math.round(rgb[2] * 255),
              };
              break;
          }

          if (mode.flashing_pattern.direction === "backward") {
            const reverseIndex = colors.length - 1 - index;
            drawLED(spacing * (reverseIndex + 1), height / 2, adjustedColor);
          } else if (mode.flashing_pattern.direction === "alternate") {
            const alternateIndex = cycle > 0.5 ? index : colors.length - 1 - index;
            drawLED(spacing * (alternateIndex + 1), height / 2, adjustedColor);
          } else {
            drawLED(spacing * (index + 1), height / 2, adjustedColor);
          }
        } else {
          drawLED(spacing * (index + 1), height / 2, color);
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mode]);

  // Helper function to convert HSL to RGB
  const hslToRgb = (h, s, l) => {
    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h / 360 + 1 / 3);
      g = hue2rgb(p, q, h / 360);
      b = hue2rgb(p, q, h / 360 - 1 / 3);
    }

    return [r, g, b];
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {"Preview"}
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
    </Paper>
  );
};

export default ModePreview;
