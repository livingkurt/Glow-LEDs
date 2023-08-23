import { GLButton } from "../../../shared/GlowLEDsComponents";
import { useDispatch, useSelector } from "react-redux";
import * as API from "../../../api";
import { saveAs } from "file-saver"; // Import the file-saver library for downloading
import { useEffect } from "react";

const GenerateCSVLabel = ({ order }) => {
  const dispatch = useDispatch();

  const shipping = useSelector(state => state.shipping.shippingPage);
  const { csvLabel } = shipping;

  const generateAndDownloadCSV = async csvLabel => {
    try {
      // Create array of keys for header row
      const headers = Object.keys(csvLabel);

      // Create array of values for data row
      const values = Object.values(csvLabel);

      // Combine headers and values to create 2D array for CSV
      const csvArray = [headers, values];

      const csvContent = csvArray.map(row => row.join(",")).join("\n");
      const csvBlob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });

      saveAs(csvBlob, `${order.shipping.first_name}_${order.shipping.last_name}_Label.csv`); // Download the CSV using file-saver
    } catch (error) {
      console.error("Error generating CSV:", error);
    }
  };

  useEffect(() => {
    if (Object.keys(csvLabel).length > 0) {
      generateAndDownloadCSV(csvLabel);
    }
  }, [csvLabel]);

  return (
    <div className="GenerateCSVLabel">
      <GLButton
        variant="secondary"
        className="mv-5px w-100per"
        onClick={() => dispatch(API.generateCSVLabel({ orderId: order._id }))}
      >
        Download CSV Label
      </GLButton>
    </div>
  );
};

export default GenerateCSVLabel;
