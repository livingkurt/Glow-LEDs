import React from "react";
import { GLDisplayTable } from "../../../shared/GlowLEDsComponents/GLDisplayTable";

const SponsorCheckins = ({ month, year, sponsorCheckinStatus }) => {
  return (
    <GLDisplayTable
      title={`${year} ${month} Sponsor Checkins`}
      loading={sponsorCheckinStatus.isLoading && sponsorCheckinStatus.data}
      rows={
        !sponsorCheckinStatus.isLoading &&
        sponsorCheckinStatus.data &&
        [...sponsorCheckinStatus.data].sort((a, b) => a.artist_name.localeCompare(b.artist_name))
      }
      columnDefs={[
        { title: "Sponsor", display: "artist_name" },
        {
          title: `Has Checked In`,
          display: row => (row.hasCheckedIn ? <i className="fas fa-check-circle" /> : <i className="fas fa-times-circle" />)
        },
        {
          title: `This Months Delieveries`,
          display: row => (row.numberOfContent ? row.numberOfContent : 0)
        },
        {
          title: `Total Deliveries`,
          display: row => (row.totalNumberOfContent ? row.totalNumberOfContent : 0)
        }
      ]}
    />
  );
};

export default SponsorCheckins;
