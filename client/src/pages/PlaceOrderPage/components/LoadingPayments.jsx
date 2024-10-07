import React, { useState, useEffect } from "react";
import config from "../../../config";
import { Typography } from "@mui/material";

const LoadingPayments = ({ loading }) => {
  const glovingTips = [
    "A Lightshow is dance performance that can conducted using gloves with lights in each finger.",
    "Tip: Practice in front of a mirror to see your show from the audience's perspective.",
    "Microlights are small, wearable flashing LEDs that are placed inside of the glove on each finger tip.",
    "Remember: Good finger control is key to mastering complex moves.",
    "Experiment with different diffuser shapes and colors to make your lightshow even more unique!",
    "When two glovers exchange lightshows it is called 'trading'",
    "Pro tip: Use your non-dominant hand more to improve ambidexterity.",
    "Challenge yourself: Practice each move until you are proficient before moving on to the next move.",
    "Fun fact: You can practice gloving anywhere, with the lights on or off, and with your gloves on or off.",
    "Remember: Proper glove care can significantly extend the life of your LEDs.",
  ];
  const [dots, setDots] = useState("");
  const [tip, setTip] = useState(glovingTips[Math.floor(Math.random() * glovingTips.length)]);
  const [hue, setHue] = useState(0);

  useEffect(() => {
    if (loading) {
      const dotsInterval = setInterval(() => {
        setDots(prev => (prev.length < 3 ? prev + "." : ""));
      }, 500);

      const tipInterval = setInterval(() => {
        setTip(glovingTips[Math.floor(Math.random() * glovingTips.length)]);
      }, 5000);

      // Cycle through hues
      const hueInterval = setInterval(() => {
        setHue(prev => (prev + 10) % 360);
      }, 50);

      return () => {
        clearInterval(dotsInterval);
        clearInterval(tipInterval);
        clearInterval(hueInterval);
      };
    }
  }, [loading]);

  if (!loading) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            zIndex: 2,
            background: "#333333",
            padding: "15px",
            borderRadius: "20px",
            width: "332px",
            position: "fixed",
            top: "25%",
            left: "50%",
            marginTop: "-50px",
            marginLeft: "-165px",
          }}
        >
          <h2 style={{ textAlign: "center", color: "#ffffff" }}>Processing your Payment{dots}</h2>
          <p style={{ textAlign: "center", color: "#ffffff" }}>Please do not refresh the page</p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "40px",
              height: "60px", // Increased height to accommodate the wave motion
            }}
          >
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                style={{
                  width: "10px",
                  height: "30px",
                  borderRadius: "5px",
                  backgroundColor: `hsl(${(hue - i * 15 + 360) % 360}, 100%, 50%)`,
                  boxShadow: `0 0 10px hsl(${(hue - i * 15 + 360) % 360}, 100%, 50%)`,
                  animation: `wave 2s infinite ease-in-out`,
                  animationDelay: `${i * 0.1}s, ${i * 0.1}s`,
                }}
              ></div>
            ))}
          </div>
          <Typography variant="h6" textAlign="center">
            The more your know
          </Typography>
          <p style={{ textAlign: "center", color: "#ffffff" }}>{tip}</p>
        </div>
      </div>
      <style>{`
        @keyframes wave {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingPayments;
