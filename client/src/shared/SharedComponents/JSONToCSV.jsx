import * as React from "react";
import csvDownload from "json-to-csv-export";
import { GLButton } from "../GlowLEDsComponents";

const JSONToCSV = props => {
  const { data, filename, ...others } = props;

  return (
    <GLButton onClick={() => csvDownload(data, filename)} {...others}>
      {props.children || "Download Data"}
    </GLButton>
  );
};
export default JSONToCSV;
