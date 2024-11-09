import { Cancel, CheckCircle } from "@mui/icons-material";
import { Box, Tooltip } from "@mui/material";
import PropTypes from "prop-types";

const GLBoolean = ({ boolean, tooltip }) => {
  return (
    <Box>
      {tooltip ? (
        <Tooltip title={boolean ? `Does ${tooltip}` : `Does not ${tooltip}`}>
          {boolean ? <CheckCircle /> : <Cancel />}
        </Tooltip>
      ) : (
        <>{boolean ? <CheckCircle /> : <Cancel />}</>
      )}
    </Box>
  );
};

GLBoolean.propTypes = {
  boolean: PropTypes.bool.isRequired,
  tooltip: PropTypes.string,
};

GLBoolean.defaultProps = {
  tooltip: "",
};

export default GLBoolean;
