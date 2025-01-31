import { GLDisplayTable } from "../../../shared/GlowLEDsComponents/GLDisplayTable";
import { IconButton, Popover, Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { Link } from "react-router-dom";
import { useState } from "react";
import dayjs from "dayjs";

const AffiliateEarnings = ({ year, month, affiliate_earnings_code_usage }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTickets, setSelectedTickets] = useState([]);

  console.log({ affiliate_earnings_code_usage });

  const handlePopoverOpen = (event, tickets) => {
    setAnchorEl(event.currentTarget);
    setSelectedTickets(tickets);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setSelectedTickets([]);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <GLDisplayTable
        title={`${
          year && month ? `${year} ${month}` : year ? year : month ? month : "All Time"
        } Affiliate Earnings Code Usage`}
        loading={affiliate_earnings_code_usage.isLoading && affiliate_earnings_code_usage.data}
        defaultSorting={[2, "desc"]}
        rows={
          !affiliate_earnings_code_usage.isLoading &&
          [...affiliate_earnings_code_usage.data].sort((a, b) => b.number_of_uses - a.number_of_uses)
        }
        columnDefs={[
          { title: "Ranking", display: (row, index) => `${index + 1}.`, sortable: true },
          { title: "Affiliate", display: row => row?.artist_name, sortable: true },
          { title: "Code Usage", display: row => (row.number_of_uses ? row?.number_of_uses : "0"), sortable: true },
          {
            title: "Sales",
            display: row => `$${row.revenue?.toFixed(2) || "0.00"} (${row.number_of_uses || 0} uses)`,
            sortable: true,
          },
          {
            title: "Tickets Sold",
            display: row => `${row.ticket_uses || 0} tickets`,
            sortable: true,
          },
          {
            title: "Total Earnings",
            display: row => `$${row.earnings ? row?.earnings?.toFixed(2) : "0.00"}`,
            sortable: true,
          },
          {
            title: "Total Revenue",
            display: row => `$${row?.revenue ? row?.revenue?.toFixed(2) : "0.00"}`,
            sortable: true,
          },
          {
            title: "Ticket Orders",
            display: row => (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {row.ticket_orders?.length > 0 && (
                  <IconButton size="small" onClick={e => handlePopoverOpen(e, row.ticket_orders)} sx={{ padding: 0.5 }}>
                    <InfoIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>
            ),
            sortable: true,
          },
        ]}
      />
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box sx={{ p: 2, maxWidth: 400, maxHeight: 400, overflow: "auto" }}>
          <Typography variant="h6" gutterBottom>
            {"Ticket Orders"}
          </Typography>
          <List>
            {selectedTickets.map((ticket, index) => (
              <ListItem
                key={index}
                component={Link}
                to={`/secure/account/order/${ticket.order_id}`}
                sx={{
                  textDecoration: "none",
                  color: "inherit",
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                }}
              >
                <ListItemText
                  primary={`${ticket.first_name} ${ticket.last_name}`}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="text.primary">
                        {`${ticket.quantity} ticket${ticket.quantity > 1 ? "s" : ""}`}
                      </Typography>
                      <br />
                      {`Ordered on ${dayjs(ticket.date).format("MMM D, YYYY")}`}
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Popover>
    </>
  );
};

export default AffiliateEarnings;
