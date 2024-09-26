import React from "react";
import PropTypes from "prop-types";
import pickBy from "lodash/pickBy";
import Chip from "@mui/material/Chip";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import { removeFilter, updateFilterDisplay } from "../actions/actions";
import { Button } from "@mui/material";
import { humanize } from "../../../../utils/helper_functions";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
  },
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing * 0.5,
    margin: 0,
  },

  chip: {
    margin: theme.spacing * 0.5,
    borderRadius: "16.5px",
    backgroundColor: "#e4ebf3",
    deleteIcon: {
      height: 40,
      width: 40,
      fontSize: 40,
    },
    deleteIconColorPrimary: "red",
  },
}));

const customStyles = {
  container: {
    lineHeight: 3,
  },
};

const GLTableFilterChips = ({ filters, menuOpen, namespace, maxChips, onChangeFunction, disabled, booleanFilters }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // determine if there's at least one chip to show
  const showChips = Object.values(filters).reduce((acc, cur) => acc || cur.length > 0, false);
  // return early if not
  if (!showChips) return null;

  const chips = Object.entries(pickBy(filters, filterCategory => filterCategory.length > 0)).map(
    ([filterCategory, filterArray]) => {
      if (Object.keys(booleanFilters).includes(filterCategory)) {
        return { key: filterCategory, name: booleanFilters[filterCategory].label || filterCategory };
      } else if (filterArray.length > 1) {
        return {
          key: filterCategory,
          name: `${filterArray[0]} & ${filterArray.length - 1} more`,
        };
      } else {
        return { key: filterCategory, name: filterArray[0] };
      }
    }
  );

  const handleClick = chip => {
    dispatch(updateFilterDisplay(namespace, { menuOpen: !menuOpen }));
    setTimeout(() => dispatch(updateFilterDisplay(namespace, { menuOpen: !menuOpen, menuSelection: chip.key })), 200);
  };

  return (
    <div className={classes.container}>
      <ul className={classes.root}>
        {chips.slice(0, maxChips).map(chip => {
          return (
            <li key={chip.key}>
              <Chip
                // color="primary"
                sx={{
                  fontSize: "12px",
                  // "&:hover": {
                  //   backgroundColor: "#4c6ebf",
                  //   color: "white"
                  // }
                }}
                label={chip.name}
                onClick={() => handleClick(chip)}
                onDelete={() => {
                  dispatch(removeFilter(namespace, chip.key));
                  onChangeFunction(chip.key);
                }}
                className={classes.chip}
                disabled={disabled}
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
          customStyles={customStyles}
        >
          + {chips.length - maxChips}
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
};

GLTableFilterChips.propTypes = {
  filters: PropTypes.objectOf(PropTypes.array).isRequired,
  menuOpen: PropTypes.bool,
  maxChips: PropTypes.number,
  namespace: PropTypes.string,
  onChangeFunction: PropTypes.func,
  disabled: PropTypes.bool,
  booleanFilters: PropTypes.object,
};

export default GLTableFilterChips;
