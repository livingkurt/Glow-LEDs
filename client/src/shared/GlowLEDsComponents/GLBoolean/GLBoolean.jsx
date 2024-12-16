import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Cancel from "@mui/icons-material/Cancel";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Tooltip from "@mui/material/Tooltip";
const GLBoolean = ({ boolean, tooltip, color }) => {
  return (
    <Box>
      {tooltip ? (
        <Tooltip title={boolean ? `Does ${tooltip}` : `Does not ${tooltip}`}>
          {boolean ? <CheckCircle color={color} /> : <Cancel color={color} />}
        </Tooltip>
      ) : (
        <>{boolean ? <CheckCircle color={color} /> : <Cancel color={color} />}</>
      )}
    </Box>
  );
};

GLBoolean.propTypes = {
  boolean: PropTypes.bool.isRequired,
  tooltip: PropTypes.string,
  color: PropTypes.string,
};

GLBoolean.defaultProps = {
  tooltip: "",
  color: "white",
};

export default GLBoolean;
