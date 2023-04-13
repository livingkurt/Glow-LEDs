import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Loading } from "../../shared/SharedComponents";
import { Helmet } from "react-helmet";
import { GLButton } from "../../shared/GlowLEDsComponents";
import * as API from "../../api";
import { set_survey } from "../../slices/surveySlice";

const EditSurveyPage = props => {
  const [loading_checkboxes, set_loading_checkboxes] = useState(true);

  const history = useHistory();

  const surveyPage = useSelector(state => state.surveys);
  const { survey, loading, error } = surveyPage;

  const {
    id,
    question_1,
    question_2,
    question_3,
    question_4,
    question_5,
    answer_1,
    answer_2,
    answer_3,
    answer_4,
    answer_5,
    user,
    order,
    is_survey,
    active,
    rating
  } = survey;

  const dispatch = useDispatch();

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.detailsSurvey(props.match.params.id));
      dispatch(API.listUsers({}));
      dispatch(API.listOrders({}));
    }
    return () => (clean = false);
  }, [dispatch, props.match.params.id]);

  setTimeout(() => {
    set_loading_checkboxes(false);
  }, 500);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(
      API.saveSurvey({
        _id: id,
        question_1,
        question_2,
        question_3,
        question_4,
        question_5,
        answer_1,
        answer_2,
        answer_3,
        answer_4,
        answer_5,
        user,
        order,
        rating,
        is_survey,
        active
      })
    );
    e.target.reset();
    history.push("/secure/glow/surveys");
  };

  return (
    <div className="main_container p-20px">
      <h1 style={{ textAlign: "center" }}>{props.match.params.id ? "Edit Survey" : "Create Survey"}</h1>

      <div className="form">
        <form onSubmit={submitHandler} style={{ width: "100%" }}>
          {/* {loading_data ? (
						<div>Loading...</div>
					) : ( */}
          <Loading loading={loading} error={error}>
            {/* {survey && ( */}
            <div>
              <Helmet>
                <title>Edit Survey | Glow LEDs</title>
              </Helmet>

              <ul className="edit-form-container" style={{ maxWidth: "30rem", marginBottom: "20px" }}>
                <div className="row wrap">
                  <div className="w-228px m-10px">
                    <li>
                      <label htmlFor="question_1">Question 1</label>
                      <input
                        type="text"
                        name="question_1"
                        value={question_1}
                        id="question_1"
                        onChange={e => dispatch(set_survey({ [e.target.name]: e.target.value }))}
                      />
                    </li>
                    <li>
                      <label htmlFor="answer_1">Answer 1</label>
                      <input
                        type="text"
                        name="answer_1"
                        value={answer_1}
                        id="answer_1"
                        onChange={e => dispatch(set_survey({ [e.target.name]: e.target.value }))}
                      />
                    </li>
                    <li>
                      <label htmlFor="question_2">Question 2</label>
                      <input
                        type="text"
                        name="question_2"
                        value={question_2}
                        id="question_2"
                        onChange={e => dispatch(set_survey({ [e.target.name]: e.target.value }))}
                      />
                    </li>
                    <li>
                      <label htmlFor="answer_2">Answer 2</label>
                      <input
                        type="text"
                        name="answer_2"
                        value={answer_2}
                        id="answer_2"
                        onChange={e => dispatch(set_survey({ [e.target.name]: e.target.value }))}
                      />
                    </li>
                    <li>
                      <label htmlFor="question_3">Question 3</label>
                      <input
                        type="text"
                        name="question_3"
                        value={question_3}
                        id="question_3"
                        onChange={e => dispatch(set_survey({ [e.target.name]: e.target.value }))}
                      />
                    </li>
                    <li>
                      <label htmlFor="answer_3">Answer 3</label>
                      <input
                        type="text"
                        name="answer_3"
                        value={answer_3}
                        id="answer_3"
                        onChange={e => dispatch(set_survey({ [e.target.name]: e.target.value }))}
                      />
                    </li>
                    <li>
                      <label htmlFor="question_4">Question 4</label>
                      <input
                        type="text"
                        name="question_4"
                        value={question_4}
                        id="question_4"
                        onChange={e => dispatch(set_survey({ [e.target.name]: e.target.value }))}
                      />
                    </li>
                    <li>
                      <label htmlFor="answer_4">Answer 4</label>
                      <input
                        type="text"
                        name="answer_4"
                        value={answer_4}
                        id="answer_4"
                        onChange={e => dispatch(set_survey({ [e.target.name]: e.target.value }))}
                      />
                    </li>
                    <li>
                      <label htmlFor="question_5">Question 5</label>
                      <input
                        type="text"
                        name="question_5"
                        value={question_5}
                        id="question_5"
                        onChange={e => dispatch(set_survey({ [e.target.name]: e.target.value }))}
                      />
                    </li>
                    <li>
                      <label htmlFor="answer_5">Answer 5</label>
                      <input
                        type="text"
                        name="answer_5"
                        value={answer_5}
                        id="answer_5"
                        onChange={e => dispatch(set_survey({ [e.target.name]: e.target.value }))}
                      />
                    </li>
                    <li>
                      <label htmlFor="rating">Rating</label>
                      <input
                        type="text"
                        name="rating"
                        defaultValue={rating}
                        id="rating"
                        onChange={e => dispatch(set_survey({ [e.target.name]: e.target.value }))}
                      />
                    </li>

                    {loading_checkboxes ? (
                      <div>Loading...</div>
                    ) : (
                      <li>
                        <label htmlFor="is_survey">Is Survey</label>
                        <input
                          type="checkbox"
                          name="is_survey"
                          defaultChecked={is_survey}
                          id="is_survey"
                          onChange={e => dispatch(set_survey({ [e.target.name]: e.target.checked }))}
                        />
                      </li>
                    )}
                    {loading_checkboxes ? (
                      <div>Loading...</div>
                    ) : (
                      <li>
                        <label htmlFor="active">Active</label>
                        <input
                          type="checkbox"
                          name="active"
                          defaultChecked={active}
                          id="active"
                          onChange={e => dispatch(set_survey({ [e.target.name]: e.target.checked }))}
                        />
                      </li>
                    )}
                  </div>
                </div>
                <li>
                  <GLButton type="submit" variant="primary">
                    {id ? "Update" : "Create"}
                  </GLButton>
                </li>
                <li>
                  <GLButton variant="secondary" onClick={e => e.preventDefault()}>
                    <Link to="/secure/glow/surveys">Back to Surveys</Link>
                  </GLButton>
                </li>
              </ul>
            </div>
            {/* )} */}
          </Loading>
          {/* )} */}
        </form>
      </div>
    </div>
  );
};
export default EditSurveyPage;
