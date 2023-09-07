import * as React from "react";

const FilterByChip = () => {
  const chips = [
    "spectra EVOs",
    "chroma EVOs",
    "Uber Nanos",
    "Aurora Nanos",
    "QtLite 6 Mode",
    "Atoms",
    "Ions",
    "Apollos",
    "Aethers",
    "OSM 2s",
    "Micromax",
  ];

  return (
    <div className="mh-10px">
      <ul className="cart-list-container" style={{ marginRight: "10px" }}>
        {chips.map((chip, index) => {
          return <li key={index}>{chip}</li>;
        })}
      </ul>
    </div>
  );
};

export default FilterByChip;
