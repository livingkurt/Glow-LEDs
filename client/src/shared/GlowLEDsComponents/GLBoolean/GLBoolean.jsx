import { Cancel, CheckCircle } from "@mui/icons-material";
import { Box, Tooltip } from "@mui/material";
import PropTypes from "prop-types";

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
