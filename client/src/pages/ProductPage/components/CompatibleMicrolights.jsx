import { Box, Chip, Typography } from "@mui/material";

const CompatibleChips = ({ microlights }) => {
  if (!microlights || microlights.length === 0 || microlights[0]?.name === "All Chips") return null;

  return (
    <Box mt={2}>
      <Typography variant="subtitle2" gutterBottom>
        {"Compatible Microlights:"}
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={1}>
        {microlights.map(microlight => (
          <Chip
            key={microlight._id}
            label={microlight.name}
            sx={{
              backgroundColor: "white",
              color: "black",
              fontSize: "1rem",
              fontWeight: "500",
            }}
            size="small"
            variant="outlined"
          />
        ))}
      </Box>
    </Box>
  );
};

export default CompatibleChips;
