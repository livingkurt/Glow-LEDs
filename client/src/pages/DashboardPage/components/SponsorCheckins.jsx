import React from "react";
import { GLDisplayTable } from "../../../shared/GlowLEDsComponents/GLDisplayTable";
import GLBoolean from "../../../shared/GlowLEDsComponents/GLBoolean/GLBoolean";

const SponsorCheckins = ({ month, year, sponsorCheckinStatus, questionConcerns }) => {
  return (
    <>
      <GLDisplayTable
        title={`${year} ${month} Sponsor Checkins`}
        loading={sponsorCheckinStatus.isLoading && sponsorCheckinStatus.data}
        defaultSorting={[2, "asc"]}
        rows={
          !sponsorCheckinStatus.isLoading &&
          sponsorCheckinStatus.data &&
          [...sponsorCheckinStatus.data].sort((a, b) => a.artist_name.localeCompare(b.artist_name))
        }
        columnDefs={[
          { title: "Sponsor", display: "artist_name", sortable: true },
          {
            title: `Has Checked In`,
            display: row => <GLBoolean boolean={row.numberOfContent > 0} />,
            value: row => (row.numberOfContent > 0 ? true : false),
            conditionalColor: row => (row.numberOfContent === 0 ? "red" : row.numberOfContent >= 3 ? "green" : "black"),
            sortable: true,
          },
          {
            title: `This Months Delieveries`,
            display: row => (row.numberOfContent ? row.numberOfContent : 0),
            sortable: true,
          },
          {
            title: `Total Deliveries`,
            display: row => (row.totalNumberOfContent ? row.totalNumberOfContent : 0),
            sortable: true,
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
