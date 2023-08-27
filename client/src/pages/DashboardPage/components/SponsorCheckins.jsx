import * as React from "react";
import { GLDisplayTable } from "../../../shared/GlowLEDsComponents/GLDisplayTable";

const SponsorCheckins = ({ month, year, sponsorCheckinStatus, questionConcerns }) => {
  return (
    <>
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
            display: row =>
              row.numberOfContent > 0 ? <i className="fas fa-check-circle" /> : <i className="fas fa-times-circle" />,
            value: row => (row.numberOfContent > 0 ? true : false),
            conditionalColor: row => (row.numberOfContent === 0 ? "red" : row.numberOfContent >= 3 ? "green" : "black"),
          },
          {
            title: `This Months Delieveries`,
            display: row => (row.numberOfContent ? row.numberOfContent : 0),
          },
          {
            title: `Total Deliveries`,
            display: row => (row.totalNumberOfContent ? row.totalNumberOfContent : 0),
          },
        ]}
      />
      <GLDisplayTable
        title={`${year} ${month} Sponsor Question or Concerns`}
        loading={questionConcerns.isLoading && questionConcerns.data}
        rows={
          !questionConcerns.isLoading &&
          questionConcerns.data &&
          [...questionConcerns.data].sort((a, b) => a.artist_name.localeCompare(b.artist_name))
        }
        columnDefs={[
          { title: "Sponsor", display: "artist_name" },
          {
            title: `Question or Concerns`,
            display: "questionsConcerns",
          },
        ]}
      />
    </>
  );
};

export default SponsorCheckins;
