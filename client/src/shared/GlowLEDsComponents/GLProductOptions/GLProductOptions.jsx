import PropTypes from "prop-types";
import { Box, Chip, useTheme } from "@mui/material";

const GLProductOptions = ({ selectedOptions, currentOptions }) => {
  const theme = useTheme();

  const processedOptions = selectedOptions?.map(option => ({
    ...option,
    normalizedColorCode: option.filament?.color_code || option.colorCode,
  }));

  if (!processedOptions || processedOptions.length === 0) return null;

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
      {processedOptions.map((option, optionIndex) => {
        const bgColor = option.normalizedColorCode || theme.palette.background.default;
        if (!option.name) return null;
        return (
          <Chip
            key={optionIndex}
            label={`${currentOptions[optionIndex]?.name}: ${option?.name}`}
            size="small"
            sx={{
              backgroundColor: option.name === "Clear" ? "transparent" : bgColor,
              border: option.name === "Clear" ? "1px solid white !important" : "none !important",
              color: option.name === "Clear" ? "white" : theme.palette.getContrastText(bgColor),
              fontSize: "1rem",
              fontWeight: "500",
            }}
          />
        );
      })}
    </Box>
  );
};

GLProductOptions.propTypes = {
  selectedOptions: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      filament: PropTypes.shape({
        color_code: PropTypes.string,
      }),
      colorCode: PropTypes.string,
    })
  ),
  currentOptions: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      values: PropTypes.array,
    })
  ),
};

export default GLProductOptions;
