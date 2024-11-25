import React from "react";
import PropTypes from "prop-types";
import Chip from "@mui/material/Chip";
import { useDispatch } from "react-redux";
import { removeFilter, updateFilterDisplay } from "../reducers/glTableActions";
import { chipLabel, getChips } from "../glTableHelpers";
import Cancel from "@mui/icons-material/Cancel";
import { Button } from "@mui/material";

// eslint-disable-next-line max-lines-per-function
const GLTableFilterChips = ({
  filters,
  menuOpen,
  namespace,
  maxChips,
  onChangeFunction,
  disabled,
  externalFilters,
  booleanFilters,
  startDate,
  endDate,
}) => {
  const dispatch = useDispatch();

  // determine if there's at least one chip to show
  const showChips = Object.values(filters).reduce((acc, cur) => acc || cur.length > 0, false);
  // return early if not
  if (!showChips) return null;

  const chips = getChips(filters, booleanFilters, externalFilters, startDate, endDate);

  const handleClick = chip => {
    dispatch(updateFilterDisplay(namespace, { menuOpen: !menuOpen }));
    setTimeout(() => dispatch(updateFilterDisplay(namespace, { menuOpen: !menuOpen, menuSelection: chip.key })), 200);
  };

  return (
    <div style={{ display: "flex" }} data-test="filter-chips">
      <ul style={{ display: "flex", flexWrap: "wrap", listStyle: "none", padding: "0.5rem", margin: 0 }}>
        {chips.slice(0, maxChips).map(chip => {
          return (
            <li key={chip.key}>
              <Chip
                label={chipLabel(chip)}
                onClick={() => handleClick(chip)}
                onDelete={() => {
                  dispatch(removeFilter(namespace, chip.key));
                  onChangeFunction(chip.key);
                }}
                data-test={`filter-chip-${chip.key}`}
                style={{
                  margin: theme => theme.spacing(0.5),
                  borderRadius: "16.5px",
                  backgroundColor: "#e4ebf3",
                  "& .MuiChip-deleteIcon": {
                    height: 40,
                    width: 40,
                    fontSize: 40,
                  },
                  deleteIconColorPrimary: "red",
                }}
                disabled={disabled}
                deleteIcon={<Cancel data-test={`delete-chip-${chip.key}`} />}
              />
            </li>
          );
        })}
      </ul>
      {chips.length > maxChips && (
        <Button
          color="secondary"
          variant="outlined"
          size="small"
          onClick={() => handleClick(chips[maxChips])}
          customStyles={{
            container: {
              lineHeight: 3,
            },
          }}
        >
          {`+ ${chips.length - maxChips}`}
        </Button>
      )}
    </div>
  );
};

GLTableFilterChips.defaultProps = {
  menuOpen: false,
  maxChips: 3,
  namespace: "",
  onChangeFunction: x => x,
  disabled: false,
  booleanFilters: {},
  externalFilters: [],
  startDate: "",
  endDate: "",
};

GLTableFilterChips.propTypes = {
  filters: PropTypes.objectOf(PropTypes.array).isRequired,
  menuOpen: PropTypes.bool,
  maxChips: PropTypes.number,
  namespace: PropTypes.string,
  onChangeFunction: PropTypes.func,
  disabled: PropTypes.bool,
  booleanFilters: PropTypes.object,
  externalFilters: PropTypes.array,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
};

export default GLTableFilterChips;
