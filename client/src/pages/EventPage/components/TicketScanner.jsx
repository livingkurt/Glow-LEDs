import React, { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";
import { useDispatch } from "react-redux";
import * as API from "../../../api";
import { Typography } from "@mui/material";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";

const TicketScanner = ({ openScannerModal, setOpenScannerModal, event }) => {
  const [scanResult, setScanResult] = useState(null);
  const [scanStatus, setScanStatus] = useState(null);
  const [scannedCount, setScannedCount] = useState(null);
  const [canScan, setCanScan] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!canScan) {
      const timer = setTimeout(() => setCanScan(true), 3000); // 3-second delay
      return () => clearTimeout(timer);
    }
  }, [canScan]);

  const handleResult = async (result, error) => {
    if (!!result && canScan) {
      setCanScan(false);
      setScanResult(result?.text);
      try {
        const response = await dispatch(API.validateTicket(result?.text));
        console.log({ response });
        setScannedCount(response.payload.scanned_events_count);
        if (response.payload.message === "Ticket validated successfully") {
          setScanStatus("success");
        } else {
          setScanStatus("error");
        }
      } catch (error) {
        setScanStatus("error");
      }
    }
  };

  const getBgColor = () => {
    if (scanStatus === "success") return { backgroundColor: "#3e6e3f", color: "white" };
    if (scanStatus === "error") return { backgroundColor: "#ba4949", color: "white" };
    return "white";
  };

  return (
    <GLActionModal
      isOpen={openScannerModal}
      onConfirm={() => {
        setScanStatus(null);
        setScanResult(null);
      }}
      onCancel={() => {
        setOpenScannerModal(false);
        setScanStatus(null);
        setScanResult(null);
      }}
      title={`Scan Tickets for ${event?.name}`}
      cancelLabel="Close"
      confirmLabel="Scan Again"
      cancelColor="secondary"
      disableEscapeKeyDown
      style={{
        backgroundColor: getBgColor().backgroundColor,
        transition: "background-color 0.3s ease",
        color: getBgColor().color,
      }}
    >
      <QrReader
        constraints={{ facingMode: "environment" }}
        onResult={handleResult}
        videoStyle={{ width: "100%", margin: "0 auto" }}
        containerStyle={{ width: "100%", margin: "0 auto" }}
        videoContainerStyle={{ paddingTop: "100%" }}
      />
      {scanResult && (
        <Typography variant="body1" mt={2}>
          Scanned Ticket ID: {scanResult}
        </Typography>
      )}
      {scanStatus && (
        <Typography variant="body1" mt={2} color={"white"}>
          {scanStatus === "success" ? "Ticket validated successfully" : "Ticket validation failed"}
        </Typography>
      )}
      {scannedCount && (
        <Typography variant="body1" mt={2} color={"white"}>
          Scanned Count: {scannedCount}
        </Typography>
      )}
    </GLActionModal>
  );
};

export default TicketScanner;
