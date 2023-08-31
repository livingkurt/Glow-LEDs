import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

const UpdateNotifier = () => {
  const [version, setVersion] = useState(null);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);

  useEffect(() => {
    try {
      // Get the current version when the page loads
      axios.get("/api/versions").then(response => {
        setVersion(response.data.version);
      });

      // Check for updates every 5 minutes
      const interval = setInterval(() => {
        axios.get("/api/versions").then(response => {
          if (response.data.version > version) {
            setShowUpdatePopup(true);
          }
        });
      }, 30000); // 300000 ms = 5 minutes

      // Clean up the interval on unmount
      return () => clearInterval(interval);
    } catch (error) {
      // Covy().showSnackbar({
      //   message: errorMessage(error),
      //   severity: "error",
      // });
    }
  }, [version]);

  const handleUpdate = () => {
    window.location.reload();
  };

  return (
    <Dialog open={showUpdatePopup} onClose={() => setShowUpdatePopup(false)}>
      <DialogTitle>{"New Update Available"}</DialogTitle>
      <DialogContent>
        <DialogContentText>A new update is available. Please refresh to update.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setShowUpdatePopup(false)}>Later</Button>
        <Button onClick={handleUpdate} autoFocus>
          Refresh
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateNotifier;
