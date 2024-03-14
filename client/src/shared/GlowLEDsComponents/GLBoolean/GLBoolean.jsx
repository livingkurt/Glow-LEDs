import { Cancel, CheckCircle } from "@mui/icons-material";
import React from "react";

const GLBoolean = ({ boolean }) => {
  return <div>{boolean ? <CheckCircle color="white" /> : <Cancel color="white" />}</div>;
};

export default GLBoolean;
