import { Rating } from "@mui/material";

const StarRating = props => {
  return (
    <div className="jc-c">
      <Rating
        name="rating"
        value={props.rating}
        onChange={(event, newValue) => {
          props.set_rating(newValue);
        }}
        size="large"
        sx={{
          "& .MuiRating-iconFilled": {
            color: "#262e50",
          },
          "& .MuiRating-iconEmpty": {
            color: "#e4e5e9",
          },
        }}
      />
    </div>
  );
};

export default StarRating;
