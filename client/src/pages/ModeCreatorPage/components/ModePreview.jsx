import { useState, useEffect, useRef } from "react";
import { Box, Slider, Select, MenuItem, Typography, Button, Stack } from "@mui/material";

const ModePreview = () => {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef();
  const angleRef = useRef(0);

  // Control state
  const [shape, setShape] = useState("circle");
  const [tickRate, setTickRate] = useState(3);
  const [trailSize, setTrailSize] = useState(100);
  const [dotSize, setDotSize] = useState(25);
  const [blurFac, setBlurFac] = useState(5);
  const [circleRadius, setCircleRadius] = useState(400);
  const [isAnimating, setIsAnimating] = useState(true);

  // Pattern state
  const colors = [
    { red: 255, green: 0, blue: 0 },
    { red: 0, green: 255, blue: 0 },
    { red: 0, green: 0, blue: 255 },
  ];

  const histories = useRef(colors.map(() => []));

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement.clientHeight || window.innerHeight;
      ctx.fillStyle = "rgba(0, 0, 0, 1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  const calculatePosition = (centerX, centerY, radius, currentAngle, colorIndex) => {
    const offsetAngle = currentAngle + colorIndex * ((2 * Math.PI) / colors.length);

    switch (shape) {
      case "figure8":
        return {
          x: centerX + (radius * Math.sin(offsetAngle)) / (1 + Math.cos(offsetAngle) * Math.cos(offsetAngle)),
          y:
            centerY +
            (radius * Math.sin(offsetAngle) * Math.cos(offsetAngle)) /
              (1 + Math.cos(offsetAngle) * Math.cos(offsetAngle)),
        };
      case "heart": {
        const scale = circleRadius / 20 + 1;
        return {
          x: centerX + scale * 16 * Math.pow(Math.sin(offsetAngle), 3),
          y:
            centerY -
            scale *
              (13 * Math.cos(offsetAngle) -
                5 * Math.cos(2 * offsetAngle) -
                2 * Math.cos(3 * offsetAngle) -
                Math.cos(4 * offsetAngle)),
        };
      }
      case "box": {
        const boxSize = radius;
        const halfBoxSize = boxSize / 2;
        const fullPerimeter = 4 * boxSize;
        const perimeterPosition = (offsetAngle * fullPerimeter) % fullPerimeter;

        if (perimeterPosition < boxSize) {
          return {
            x: centerX - halfBoxSize + perimeterPosition,
            y: centerY - halfBoxSize,
          };
        } else if (perimeterPosition < 2 * boxSize) {
          return {
            x: centerX + halfBoxSize,
            y: centerY - halfBoxSize + (perimeterPosition - boxSize),
          };
        } else if (perimeterPosition < 3 * boxSize) {
          return {
            x: centerX + halfBoxSize - (perimeterPosition - 2 * boxSize),
            y: centerY + halfBoxSize,
          };
        } else {
          return {
            x: centerX - halfBoxSize,
            y: centerY + halfBoxSize - (perimeterPosition - 3 * boxSize),
          };
        }
      }
      case "circle":
      default:
        return {
          x: centerX + radius * Math.cos(offsetAngle),
          y: centerY + radius * Math.sin(offsetAngle),
        };
    }
  };

  const animate = () => {
    if (!isAnimating) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - (500 - circleRadius);

    // Update angle
    angleRef.current += 0.02;
    if (angleRef.current >= 2 * Math.PI) {
      angleRef.current = 0;
    }

    // Update histories
    colors.forEach((color, index) => {
      const history = histories.current[index];

      for (let i = 0; i < tickRate; i++) {
        const position = calculatePosition(centerX, centerY, radius, angleRef.current, index);
        history.push({
          ...position,
          color,
        });
      }

      while (history.length > trailSize) {
        history.shift();
      }
    });

    // Draw frame
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    histories.current.forEach(history => {
      history.forEach((point, index) => {
        const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, dotSize);
        const innerAlpha = (1 - (history.length - 1 - index) / history.length).toFixed(2);
        const outerAlpha = blurFac !== 0 ? (innerAlpha / blurFac).toFixed(2) : innerAlpha;

        gradient.addColorStop(0, `rgba(${point.color.red}, ${point.color.green}, ${point.color.blue}, ${innerAlpha})`);
        gradient.addColorStop(
          0.8,
          `rgba(${point.color.red}, ${point.color.green}, ${point.color.blue}, ${outerAlpha})`
        );
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(point.x, point.y, dotSize, 0, 2 * Math.PI);
        ctx.fill();
      });
    });

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (isAnimating) {
      animationFrameRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isAnimating, tickRate, trailSize, dotSize, blurFac, circleRadius, shape]);

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Box sx={{ p: 2, bgcolor: "background.paper", borderRadius: 1 }}>
        <Typography variant="h6" gutterBottom>
          {"Animation Controls"}
        </Typography>
        <Stack spacing={2}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography sx={{ minWidth: 100 }}>{"Shape:"}</Typography>
            <Select value={shape} onChange={e => setShape(e.target.value)} size="small" sx={{ minWidth: 120 }}>
              <MenuItem value="circle">{"Circle"}</MenuItem>
              <MenuItem value="figure8">{"Figure 8"}</MenuItem>
              <MenuItem value="heart">{"Heart"}</MenuItem>
              <MenuItem value="box">{"Box"}</MenuItem>
            </Select>
          </Box>

          <Box>
            <Typography gutterBottom>{"Speed"}</Typography>
            <Slider
              value={tickRate}
              onChange={(e, value) => setTickRate(value)}
              min={1}
              max={30}
              valueLabelDisplay="auto"
            />
          </Box>

          <Box>
            <Typography gutterBottom>{"Trail"}</Typography>
            <Slider
              value={trailSize}
              onChange={(e, value) => setTrailSize(value)}
              min={1}
              max={300}
              valueLabelDisplay="auto"
            />
          </Box>

          <Box>
            <Typography gutterBottom>{"Size"}</Typography>
            <Slider
              value={dotSize}
              onChange={(e, value) => setDotSize(value)}
              min={5}
              max={50}
              valueLabelDisplay="auto"
            />
          </Box>

          <Box>
            <Typography gutterBottom>{"Blur"}</Typography>
            <Slider
              value={blurFac}
              onChange={(e, value) => setBlurFac(value)}
              min={1}
              max={10}
              valueLabelDisplay="auto"
            />
          </Box>

          <Box>
            <Typography gutterBottom>{"Radius"}</Typography>
            <Slider
              value={circleRadius}
              onChange={(e, value) => setCircleRadius(value)}
              min={0}
              max={600}
              valueLabelDisplay="auto"
            />
          </Box>
        </Stack>
      </Box>

      <Box
        sx={{ width: "100%", height: 600, bgcolor: "black", borderRadius: 1, overflow: "hidden", position: "relative" }}
      >
        <canvas ref={canvasRef} className="absolute inset-0" />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button variant="contained" onClick={() => setIsAnimating(!isAnimating)}>
          {isAnimating ? "Pause" : "Play"}
        </Button>
      </Box>
    </Stack>
  );
};

export default ModePreview;
