import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { format_date } from "../../../utils/helper_functions";
import { useSelector, useDispatch } from "react-redux";
import { GLButton } from "../../../shared/GlowLEDsComponents";

import Rating from "../../../shared/GlowLEDsComponents/GLRating/Rating";
import * as API from "../../../api";
import { Loading } from "../../../shared/SharedComponents";
import { set_success } from "../../ProductsPage/productsPageSlice";
import { openLoginModal } from "../../../slices/userSlice";

const Review = ({ product, pathname }) => {
  const dispatch = useDispatch();

  const userPage = useSelector(state => state.users.userPage);

  let { current_user } = userPage;
  const productsPage = useSelector(state => state.products.productsPage);
  const { success, loading } = productsPage;

  const [review_modal, setReviewModal] = useState("none");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const show_write_review = () => {
    setReviewModal("block");
  };
  const hide_write_review = e => {
    e.preventDefault();
    setReviewModal("none");
  };

  const submitHandler = e => {
    e.preventDefault();
    dispatch(
      API.saveProductReview({
        product_pathname: pathname,
        review: {
          first_name: current_user.first_name,
          last_name: current_user.last_name,
          rating: rating,
          comment: comment,
        },
      })
    );

    setRating(0);
    setComment("");
  };

  const remove_review = review_id => {
    dispatch(API.deleteProductReview(pathname, review_id));
  };

  useEffect(() => {
    if (success) {
      dispatch(API.detailsProduct(pathname));
      setReviewModal("none");
      dispatch(set_success(false));
    }
  }, [dispatch, pathname, success]);

  return (
    <div className="review" id="reviews">
      <Loading loading={loading}></Loading>
      {product.reviews.map((review, index) => (
        <li
          key={index}
          style={{
            listStyleType: "none",
            background: "#616161",
            padding: "5px",
            borderRadius: "15px",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          }}
        >
          <div className="jc-b">
            <div>
              <div>{review.first_name + " " + review.last_name}</div>
              {/* <div>{review.last_name}</div> */}
              <div>
                <Rating rating={review.rating} />
              </div>
              <div>{format_date(review.createdAt.substring(0, 10))}</div>
              <div>{review.comment}</div>
            </div>
            {current_user?.isAdmin && (
              <div className="ta-r">
                <GLButton variant="icon" onClick={() => remove_review(review._id)} aria-label="Delete">
                  <i className="fas fa-trash-alt" />
                </GLButton>
              </div>
            )}
          </div>
        </li>
      ))}

      <GLButton variant="primary" onClick={show_write_review}>
        Write a Review
      </GLButton>

      <li style={{ listStyleType: "none", display: review_modal }}>
        <h2
          style={{
            textAlign: "center",
            width: "100%",
            justifyContent: "center",
          }}
        >
          Write a Review
        </h2>
        {current_user ? (
          <form>
            <div className="form-container">
              <li style={{ marginBottom: 0 }}>
                <h3
                  style={{
                    textAlign: "center",
                    width: "100%",
                    justifyContent: "center",
                    marginTop: "-35px",
                  }}
                >
                  {success ? "Review Saved Successfully" : ""}
                </h3>
                <div className="ai-c">
                  <h3 htmlFor="rating">Rating</h3>
                  <div className="review_select_dropdown_container">
                    <select
                      first_name="rating"
                      id="rating"
                      className="review_select_dropdown"
                      defaultValue={rating}
                      onChange={e => setRating(e.target.value)}
                    >
                      <option value="5">5 - Excellent </option>
                      <option value="4">4 - Very Good</option>
                      <option value="3">3 - Good</option>
                      <option value="2">2 - Fair</option>
                      <option value="1">1 - Poor</option>
                    </select>
                    <i className="fas fa-sort-up review_icon_styles" />
                  </div>
                </div>
              </li>
              <li>
                <label htmlFor="comment" id="comment" />
                <textarea
                  htmlFor="comment"
                  className="rating_textarea"
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                />
              </li>
              <li>
                <GLButton style={{ marginBottom: "10px" }} onClick={submitHandler} variant="primary">
                  Submit
                </GLButton>

                <GLButton onClick={hide_write_review} variant="secondary">
                  Cancel
                </GLButton>
              </li>
            </div>
          </form>
        ) : (
          <div>
            Please {/* <Link to={`/account/login?redirect=/collections/all/products/${pathname}`}> */}
            <GLButton variant="primary" onClick={() => dispatch(openLoginModal())}>
              Login
            </GLButton>
            {/* </Link> */} to Write a Review
          </div>
        )}
      </li>
    </div>
  );
};

export default Review;
