export const hexToHSV = hex => {
  // Convert hex to RGB
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;

  // Find min and max values
  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    v = max;

  // Calculate hue
  let d = max - min;
  s = max === 0 ? 0 : d / max;

  if (max === min) {
    h = 0; // achromatic
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    v: Math.round(v * 100),
  };
};

export const hsvToHex = (h, s, v) => {
  s = s / 100;
  v = v / 100;

  let c = v * s;
  let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  let m = v - c;
  let r = 0,
    g = 0,
    b = 0;

  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (h >= 300 && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  const toHex = n => {
    const hex = n.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const levelMap = {
  4: 100,
  3: 85,
  2: 75,
  1: 50,
};

export const generateBrightnessLevels = (h, s, levels) => {
  return Array.from({ length: levels }, (_, i) => {
    const levelNumber = levels - i;
    const brightness = levelMap[levelNumber];
    return {
      value: brightness,
      hex: hsvToHex(h, s, brightness),
    };
  });
};

export const generateSaturationLevels = (h, v, levels) => {
  return Array.from({ length: levels }, (_, i) => {
    const levelNumber = levels - i;
    const saturation = levelMap[levelNumber];
    return {
      value: saturation,
      hex: hsvToHex(h, saturation, v),
    };
  });
};

export const getDisplayLevel = (value, totalLevels) => {
  const levelMap = {
    100: 4,
    85: 3,
    75: 2,
    50: 1,
  };
  return levelMap[value] || totalLevels;
};

// Move PatternState outside the hook
export const PatternState = {
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
// Move helper functions outside the hook
export const hexToRgb = hex => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        red: parseInt(result[1], 16),
        green: parseInt(result[2], 16),
        blue: parseInt(result[3], 16),
      }
    : null;
};

export const interpolate = (current, next, blendSpeed) => {
  if (current === next) return current;
  if (current < next) {
    const step = Math.min(blendSpeed, next - current);
    return current + step;
  } else {
    const step = Math.min(blendSpeed, current - next);
    return current - step;
  }
};

export const getAnimationParams = (speed, trailLength, size, blur, baseRadius, canvasRef) => {
  const canvas = canvasRef.current;
  const rect = canvas.getBoundingClientRect();

  // Use logical (CSS) pixels for calculations, not physical pixels
  const logicalWidth = rect.width;
  const logicalHeight = rect.height;
  const maxDimension = Math.min(logicalWidth, logicalHeight);
  const baseSize = maxDimension * 0.4;

  return {
    rotationSpeed: (Math.PI / 180) * (speed / 30),
    trailLength: Math.max(1, trailLength),
    dotSize: (size / 500) * baseSize,
    blurFac: blur / 10,
    circleRadius: (baseRadius / 100) * baseSize,
  };
};

export const getPosition = (angle, radius, canvasRef) => {
  const canvas = canvasRef.current;
  const rect = canvas.getBoundingClientRect();

  // Use logical (CSS) pixels for center calculation
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  return {
    x: centerX + radius * Math.cos(angle),
    y: centerY + radius * Math.sin(angle),
  };
};

export const getSliderProps = () => {
  return {
    speed: {
      min: 20,
      max: 300,
    },
    trail: {
      min: 0,
      max: 100,
    },
    size: {
      min: 20,
      max: 150,
    },
    blur: {
      min: 0,
      max: 100,
    },
    radius: {
      min: 0,
      max: 100, // Now represents percentage of canvas size
    },
    timeMultiplier: {
      min: 1,
      max: 10,
    },
  };
};
