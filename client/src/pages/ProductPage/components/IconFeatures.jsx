import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import BatteryFullIcon from "@mui/icons-material/BatteryFull";
import BluetoothIcon from "@mui/icons-material/Bluetooth";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import MicIcon from "@mui/icons-material/Mic";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import SettingsIcon from "@mui/icons-material/Settings";
import PaletteIcon from "@mui/icons-material/Palette";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import SyncIcon from "@mui/icons-material/Sync";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";

const IconFeatures = ({ icon_specs }) => {
  const getIcon = iconName => {
    switch (iconName) {
      case "battery":
        return <BatteryFullIcon style={{ fontSize: "3rem" }} />;
      case "bluetooth":
        return <BluetoothIcon style={{ fontSize: "3rem" }} />;
      case "headphones":
        return <HeadphonesIcon style={{ fontSize: "3rem" }} />;
      case "mic":
        return <MicIcon style={{ fontSize: "3rem" }} />;
      case "noise":
        return <VolumeOffIcon style={{ fontSize: "3rem" }} />;
      case "drivers":
        return <SettingsIcon style={{ fontSize: "3rem" }} />;
      case "palette":
        return <PaletteIcon style={{ fontSize: "3rem" }} />;
      case "flash":
        return <FlashOnIcon style={{ fontSize: "3rem" }} />;
      case "game":
        return <VideogameAssetIcon style={{ fontSize: "3rem" }} />;
      case "fingerprint":
        return <FingerprintIcon style={{ fontSize: "3rem" }} />;
      case "sync":
        return <SyncIcon style={{ fontSize: "3rem" }} />;
      default:
        return null;
    }
  };

  if (icon_specs.length === 0) {
    return null;
  }

  return (
    <Box sx={{ p: 2, borderRadius: 2, mt: 2 }}>
      <Grid container spacing={4}>
        {icon_specs.map((spec, index) => (
          <Grid item xs={6} key={index}>
            <Box display="flex" alignItems="center">
              {getIcon(spec.icon)}
              <Typography variant="body2" sx={{ ml: 1 }}>
                {spec.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default IconFeatures;
