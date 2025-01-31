import { GLDisplayTable } from "../../../shared/GlowLEDsComponents/GLDisplayTable";
import { IconButton, Menu, MenuItem, Box, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";
import dayjs from "dayjs";

const AffiliateEarnings = ({ year, month, affiliate_earnings_code_usage }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTickets, setSelectedTickets] = useState([]);

  const handleMenuOpen = (event, tickets) => {
    setAnchorEl(event.currentTarget);
    setSelectedTickets(tickets);
  };

  const handleMenuClose = () => {
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
            display: row => `$${row.revenue?.toFixed(2) || "0.00"}`,
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
                  <IconButton size="small" onClick={e => handleMenuOpen(e, row.ticket_orders)} sx={{ padding: 0.5 }}>
                    <InfoIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>
            ),
            sortable: true,
          },
        ]}
      />
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            maxHeight: 400,
            minWidth: 300,
          },
        }}
      >
        {selectedTickets.map((ticket, index) => (
          <MenuItem
            key={index}
            component="a"
            href={`/secure/account/order/${ticket.order_id}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleMenuClose}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              py: 1,
              borderBottom: index < selectedTickets.length - 1 ? "1px solid rgba(0, 0, 0, 0.12)" : "none",
            }}
          >
            <Typography variant="subtitle2">{`${ticket.first_name} ${ticket.last_name}`}</Typography>
            <Typography variant="body2" color="text.secondary">
              {`${ticket.quantity} ${ticket.ticket_type}`}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {dayjs(ticket.date).format("MMM D, YYYY")}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default AffiliateEarnings;
