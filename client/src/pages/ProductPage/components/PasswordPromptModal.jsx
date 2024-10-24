import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box, Typography, TextField, Button, Modal, darken } from "@mui/material";
import * as API from "../../../api";
import { Link, useLocation } from "react-router-dom";
import { Key } from "@mui/icons-material";

const PasswordPromptModal = ({ productId, onUnlock, product }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState("Ωds Ωhs Ωms Ωs");
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [unlockingPhase, setUnlockingPhase] = useState(0);
  const [unlockFailed, setUnlockFailed] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const passwordParam = searchParams.get("password");
    if (passwordParam) {
      setPassword(passwordParam.toLowerCase());
      handleSubmit(null, passwordParam.toLowerCase());
    }
  }, [location]);

  useEffect(() => {
    const releaseDate = new Date(product.preOrderReleaseDate);
    const countdownInterval = setInterval(() => {
      const now = new Date();
      const distance = releaseDate - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      const countdownText = `${days}ds, ${hours}hs, ${minutes}ms, ${seconds}s`;
      setCountdown(countdownText);
    }, 1000);
    return () => clearInterval(countdownInterval);
  }, [product.preOrderReleaseDate]);

  const unlockingPhrases = [
    "You try the key...",
    "The lock begins to turn...",
    "The door opens slowly...",
    "Welcome to Helios",
  ];

  const stillLockedPhrases = [
    "You try the key...",
    "The lock won't budge...",
    "The door remains closed...",
    "Try again...",
  ];

  const handleSubmit = async (e, passwordOverride = null) => {
    if (e) e.preventDefault();
    setIsUnlocking(true);
    setUnlockingPhase(0);
    setUnlockFailed(false);

    const passwordToSubmit = (passwordOverride || password).toLowerCase();

    try {
      const response = await dispatch(API.checkProductPassword({ productId, password: passwordToSubmit }));
      console.log({ response });
      if (response.payload.success) {
        // Animate through the unlocking phrases
        for (let i = 1; i <= unlockingPhrases.length; i++) {
          setTimeout(() => {
            setUnlockingPhase(i);
            if (i === unlockingPhrases.length) {
              setTimeout(() => {
                setIsUnlocking(false);
                onUnlock();
              }, 1000);
            }
          }, i * 1000);
        }
      } else {
        // Animate through the stillLockedPhrases
        setUnlockFailed(true);
        for (let i = 1; i <= stillLockedPhrases.length; i++) {
          setTimeout(() => {
            setUnlockingPhase(i);
            if (i === stillLockedPhrases.length) {
              setTimeout(() => {
                setIsUnlocking(false);
                setError("Incorrect password. Please try again.");
              }, 1000);
            }
          }, i * 1000);
        }
      }
    } catch (err) {
      setIsUnlocking(false);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <Modal
      open={true}
      onClose={() => {}}
      sx={{
        backdropFilter: "blur(20px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: { xs: "90%", sm: 700 },
          maxWidth: "100%",
          maxHeight: "90vh",
          overflow: "auto",
          bgcolor: product.background_color,
          color: product.header_text_color,
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <img
          src={product?.title_image?.link}
          alt={product?.name || "Header image"}
          style={{
            marginBottom: `${product?.line_break ? 20 : 0}px`,
            width: "100%",
            height: "auto",
            maxWidth: "100%",
            display: "block",
          }}
        />

        {countdown && (
          <Typography variant="h4" textAlign="center">
            {countdown}
          </Typography>
        )}
        <Typography variant="h6" component="h2" gutterBottom textAlign="center">
          Enter the password below to see what we see
        </Typography>
        {isUnlocking ? (
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 4 }}>
            <Key
              sx={{
                width: 50,
                height: 50,
                animation: "unlockAnimation 2s infinite",
                "@keyframes unlockAnimation": {
                  "0%": { transform: "rotate(-45deg)" },
                  "50%": { transform: "rotate(45deg)" },
                  "100%": { transform: "rotate(-45deg)" },
                },
              }}
            />
            <Typography variant="h6" sx={{ mt: 2, minHeight: "3em", textAlign: "center" }}>
              {unlockFailed ? stillLockedPhrases[unlockingPhase] : unlockingPhrases[unlockingPhase]}
            </Typography>
          </Box>
        ) : (
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              type="password"
              value={password}
              sx={{
                "& .MuiInputBase-input": {
                  bgcolor: product.primary_color,
                  color: product.background_color,
                  borderRadius: 3,
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "black",
                },
              }}
              placeholder="Enter Password"
              onChange={e => setPassword(e.target.value.toLowerCase())}
              margin="normal"
              error={!!error}
              helperText={error}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                background: product.primary_color,
                color: product.background_color,
                "&:hover": {
                  color: darken(product.background_color, 0.2),
                  background: darken(product.primary_color, 0.2),
                },
              }}
            >
              Submit
            </Button>
            <Button
              component={Link}
              to={`/`}
              variant=""
              fullWidth
              sx={{
                mt: 2,
                background: product.background_color,
                color: product.primary_color,
              }}
            >
              I'm not ready yet
            </Button>
          </form>
        )}
      </Box>
    </Modal>
  );
};

export default PasswordPromptModal;
