import { useState, useCallback, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";
import * as API from "../../../api";

import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

// Lazy load the QR reader
const QrReader = lazy(() => import("react-qr-reader").then(module => ({ default: module.QrReader })));

const LoadingScanner = () => (
  <Box display="flex" justifyContent="center" alignItems="center" p={4}>
    <CircularProgress />
  </Box>
);

const TicketScanner = ({ openScannerModal, setOpenScannerModal, event }) => {
  const [scanResult, setScanResult] = useState(null);
  const [scanStatus, setScanStatus] = useState(null);
  const [scannedCount, setScannedCount] = useState(null);
  const [isScanning, setIsScanning] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const dispatch = useDispatch();

  const handleResult = useCallback(
    async result => {
      if (result && !isProcessing) {
        setIsProcessing(true);
        setScanResult(result.text);
        try {
          const response = await dispatch(API.validateTicket(result.text));
          setScannedCount(response.payload.scanned_tickets_count);
          setScanStatus(response.payload.message === "Ticket validated successfully" ? "success" : "error");
        } catch (error) {
          setScanStatus("error");
        } finally {
          setIsProcessing(false);
          setIsScanning(false);
        }
      }
    },
    [dispatch, isProcessing]
  );

  const handleError = () => {
    setScanStatus("error");
    // Optionally, you could dispatch an error action or show a notification here
  };

  const closeScanner = () => {
    setOpenScannerModal(false);
    setScanStatus(null);
    setScanResult(null);
    setIsScanning(false);
  };

  const getBgColor = () => {
    if (scanStatus === "success") return "#4caf50";
    if (scanStatus === "error") return "#f44336";
    return "#ffffff";
  };

  return (
    <GLActionModal
      isOpen={openScannerModal}
      onCancel={closeScanner}
      title={`Scan Tickets for ${event?.name}`}
      cancelLabel="Close"
      cancelColor="secondary"
      maxWidth="sm"
      disableEscapeKeyDown
      style={{
        backgroundColor: getBgColor(),
        transition: "background-color 0.3s ease",
        color: scanStatus ? "#ffffff" : "#000000",
      }}
    >
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" p={2}>
        {isScanning ? (
          <Box width="100%" maxWidth="300px" position="relative">
            <Suspense fallback={<LoadingScanner />}>
              <QrReader
                constraints={{ facingMode: "environment" }}
                onResult={handleResult}
                onError={handleError}
                style={{ width: "100%" }}
              />
            </Suspense>

            {isProcessing && (
              <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                display="flex"
                justifyContent="center"
                alignItems="center"
                bgcolor="rgba(0,0,0,0.5)"
              >
                <CircularProgress color="primary" />
              </Box>
            )}
          </Box>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setIsScanning(true);
              setScanStatus(null);
              setScanResult(null);
            }}
            style={{ marginBottom: "20px", fontSize: "1.2rem" }}
          >
            {"Start Scanning"}
          </Button>
        )}

        {scanResult && (
          <Typography variant="body1" mt={2}>
            {"Scanned Ticket ID: "}
            {scanResult}
          </Typography>
        )}
        {scanStatus && (
          <Typography variant="h6" mt={2} color="inherit">
            {scanStatus === "success" ? "Ticket validated successfully" : "Ticket validation failed"}
          </Typography>
        )}
        {scannedCount !== null && (
          <Typography variant="body1" mt={2} color="inherit">
            {"Scanned Count: "}
            {scannedCount}
          </Typography>
        )}
      </Box>
    </GLActionModal>
  );
};

export default TicketScanner;
