import { isSafari } from "react-device-detect";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const DateBox = ({ startDate, endDate, color }) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const getMonthAbbr = date => date.toLocaleString("default", { month: "short" }).toUpperCase();
  const getDayOfWeek = date => ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][date.getDay()];

  const sameDay = start.toDateString() === end.toDateString();
  const sameMonth = start.getMonth() === end.getMonth();
  const sameYear = start.getFullYear() === end.getFullYear();

  return (
    <Box
      sx={{
        width: 80,
        height: 80,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "8px",
        marginRight: "16px",
        color: "white",
        fontWeight: isSafari ? 599 : 600,
        boxShadow: `0 0 15px ${color || "#999999"}`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{
          lineHeight: 1,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          paddingTop: "5px",
          paddingBottom: "2px",
          textAlign: "center",
        }}
      >
        {sameMonth ? getMonthAbbr(start) : `${getMonthAbbr(start)}-${getMonthAbbr(end)}`}
        {!sameYear && ` ${start.getFullYear().toString().substr(-2)}-${end.getFullYear().toString().substr(-2)}`}
      </Typography>
      <Typography variant={sameDay ? "h5" : "h6"} sx={{ lineHeight: 1 }}>
        {sameDay ? start.getDate() : `${start.getDate()}-${end.getDate()}`}
      </Typography>
      <Typography
        variant="subtitle2"
        sx={{
          lineHeight: 1,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          paddingTop: "5px",
          paddingBottom: "2px",
          textAlign: "center",
        }}
      >
        {sameDay ? getDayOfWeek(start) : `${getDayOfWeek(start)}-${getDayOfWeek(end)}`}
      </Typography>
    </Box>
  );
};

export default DateBox;
