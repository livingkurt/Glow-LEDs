import { GLButton } from "../../../shared/GlowLEDsComponents";
import { useDispatch, useSelector } from "react-redux";
import * as API from "../../../api";
import { saveAs } from "file-saver"; // Import the file-saver library for downloading
import { useEffect } from "react";

const GenerateCSVLabel = ({ order }) => {
  const dispatch = useDispatch();

  const shipping = useSelector(state => state.shipping);
  const { csvLabel } = shipping;

  const generateAndDownloadCSV = async csvLabel => {
    try {
      const csvData = [csvLabel[0], csvLabel[1]]; // Extract the header row and next row from csvLabel
      const csvContent = csvData.map(row => row.join(",")).join("\n"); // Convert the CSV data to string format
      const csvBlob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });

      saveAs(csvBlob, `${order.shipping.first_name}_${order.shipping.last_name}_Label.csv`); // Download the CSV using file-saver
    } catch (error) {
      console.error("Error generating CSV:", error);
    }
  };

  useEffect(() => {
    if (csvLabel.length > 0) {
      generateAndDownloadCSV(csvLabel);
    }
  }, [csvLabel]);

  return (
    <div className="GenerateCSVLabel">
      <GLButton variant="secondary" className="mv-5px w-100per" onClick={() => dispatch(API.generateCSVLabel({ orderId: order._id }))}>
        Download CSV Label
      </GLButton>
    </div>
  );
};

export default GenerateCSVLabel;
