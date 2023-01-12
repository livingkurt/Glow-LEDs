import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveSurvey, detailsSurvey, listSurveys } from "../../../actions/surveyActions";
import { useHistory } from "react-router-dom";
import { Loading } from "../../../shared/SharedComponents";
import { Helmet } from "react-helmet";
import { listUsers } from "../../../actions/userActions";
import "react-medium-image-zoom/dist/styles.css";
import { detailsOrder } from "../../../actions/orderActions";
import { GLButton } from "../../../shared/GlowLEDsComponents";
import StarRating from "../../../shared/GlowLEDsComponents/GLRating/StarRating";

const Survey = props => {
  const [question_1, set_question_1] = useState("");
  const [question_2, set_question_2] = useState("");
  const [question_3, set_question_3] = useState("");
  const [question_4, set_question_4] = useState("");
  const [question_5, set_question_5] = useState("");
  const [answer_1, set_answer_1] = useState("");
  const [answer_2, set_answer_2] = useState("");
  const [answer_3, set_answer_3] = useState("");
  const [answer_4, set_answer_4] = useState("");
  const [answer_5, set_answer_5] = useState("");
  const [user, set_user] = useState("");
  const [survey_questions, set_survey_questions] = useState("");
  const [order, set_order] = useState("");
  const [is_survey, set_is_survey] = useState("");
  const [active, set_active] = useState("");

  const [rating, set_rating] = useState(null);
  const [loading_checkboxes, set_loading_checkboxes] = useState();
  const [loading_submit, set_loading_submit] = useState();
  const [finished, set_finished] = useState(false);

  setTimeout(() => {
    set_loading_checkboxes(false);
  }, 500);
  const userList = useSelector(state => state.userList);
  const { users } = userList;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const history = useHistory();

  const orderDetails = useSelector(state => state.orderDetails);
  const { order: user_order } = orderDetails;

  const surveyDetails = useSelector(state => state.surveyDetails);
  const { survey, loading, error } = surveyDetails;

  const surveySave = useSelector(state => state.surveySave);
  const { survey: survey_saved, loading: loading_saved, success } = surveySave;

  const surveyList = useSelector(state => state.surveyList);
  const { surveys } = surveyList;

  const dispatch = useDispatch();

  useEffect(() => {
    let clean = true;
    if (clean) {
      const active_survey = surveys.find(survey => survey.is_survey === true && survey.active === true);
      if (active_survey) {
        dispatch(detailsSurvey(active_survey._id));
        set_survey_questions(active_survey._id);
      }
      dispatch(detailsOrder(props.order_id));
    }
    return () => (clean = false);
  }, [surveys, dispatch]);

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(listSurveys({}));
      dispatch(listUsers({}));

      set_state();
    }
    return () => (clean = false);
  }, []);

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (survey) {
        set_state();
      } else {
        unset_state();
      }
    }
    return () => (clean = false);
  }, [survey]);

  const set_state = () => {
    set_question_1(survey.question_1);
    set_question_2(survey.question_2);
    set_question_3(survey.question_3);
    set_question_4(survey.question_4);
    set_question_5(survey.question_5);
    set_answer_1(survey.answer_1);
    set_answer_2(survey.answer_2);
    set_answer_3(survey.answer_3);
    set_answer_4(survey.answer_4);
    set_answer_5(survey.answer_5);
    set_user(survey.user);
    set_order(survey.order);
    set_is_survey(survey.is_survey);
    set_active(survey.active);
    set_rating(survey.rating);
  };
  const unset_state = () => {
    set_question_1("");
    set_question_2("");
    set_question_3("");
    set_question_4("");
    set_question_5("");
    set_answer_1("");
    set_answer_2("");
    set_answer_3("");
    set_answer_4("");
    set_answer_5("");
    set_user("");
    set_order("");
    set_is_survey("");
    set_active("");
    set_rating("");
  };

  const submitHandler = e => {
    set_loading_submit(true);
    e.preventDefault();
    let user = "";
    if (user_order && user_order.user) {
      user = user_order.user._id;
    } else if (userInfo) {
      user = userInfo._id;
    } else {
      user = null;
    }
    dispatch(
      saveSurvey({
        user: user,
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
        order: user_order && user_order._id,
        survey: survey_questions,
        is_survey: false,
        active,
        rating
      })
    );
    // e.target.reset();
    unset_state();
    set_loading_submit(false);
    // history.push('/collections/surveys/category/' + category.toLowerCase());
  };

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (success && survey_saved) {
        // history.push('/account/survey/receipt/' + survey_saved.data.pathname + '/survey/true');
        set_finished(true);
      }
    }
    return () => (clean = false);
  }, [success]);

  const categories = ["Glovers", "Artists", "Producers", "VFX"];

  const [hovered, setHovered] = useState(false);
  const toggleHover = () => setHovered(!hovered);

  const determine_rating_word = () => {
    switch (rating) {
      case 1:
        return "1 Star Poor";
      case 2:
        return "2 Stars Ok";
      case 3:
        return "3 Stars Good";
      case 4:
        return "4 Stars Great!";
      case 5:
        return "5 Stars Excellent!";
      default:
        return;
    }
  };

  return (
    <div className="main_container p-20px">
      {survey && !finished && <h1 style={{ textAlign: "center" }}>{props.pathname ? "Edit Survey" : "Submit Survey"}</h1>}

      <div className="form">
        <form style={{ width: "100%" }}>
          <Loading loading={loading} error={error}>
            <Loading loading={loading_submit} />
            {survey && !finished ? (
              <div>
                <Helmet>
                  <title>Survey | Glow LEDs</title>
                </Helmet>
                <ul className="edit-form-container" style={{ maxWidth: "60rem" }}>
                  <div>
                    <label htmlFor="description">{question_1}</label>
                    <StarRating set_rating={set_rating} rating={rating} />
                    <p className="ta-c">{rating && determine_rating_word(rating)}</p>
                    <div className="ai-c mv-2rem jc-c">
                      {/* <h3 className="mr-1rem">{question_2}</h3> */}

                      <div className="custom-select">
                        <select
                          defaultValue={answer_2}
                          className="qty_select_dropdown"
                          onChange={e => {
                            set_answer_2(e.target.value);
                          }}
                        >
                          <option value="">---{question_2}---</option>
                          <option value="google_search">Google Search</option>
                          <option value="facebook">Facebook</option>
                          <option value="instagram">Instagram</option>
                          <option value="tiktok">TikTok</option>
                          <option value="youtube">YouTube</option>
                          <option value="glovers_lounge">Glovers Lounge</option>
                          <option value="friend">Friend</option>
                          {/* <option value="other">Other</option> */}
                        </select>
                        <span className="custom-arrow" />
                      </div>
                    </div>
                    {question_3 && (
                      <li>
                        <label htmlFor="where">{question_3}</label>
                        <input type="text" name="where" value={answer_3} id="where" onChange={e => set_answer_3(e.target.value)} />
                      </li>
                    )}
                    {question_4 && (
                      <li>
                        <label htmlFor="where">{question_4}</label>
                        <input type="text" name="where" value={answer_4} id="where" onChange={e => set_answer_4(e.target.value)} />
                      </li>
                    )}
                    {question_5 && (
                      <li>
                        <label htmlFor="where">{question_5}</label>
                        <input type="text" name="where" value={answer_5} id="where" onChange={e => set_answer_5(e.target.value)} />
                      </li>
                    )}
                  </div>

                  <li>
                    <GLButton variant="primary" onClick={e => submitHandler(e)}>
                      Submit
                    </GLButton>
                  </li>
                </ul>
              </div>
            ) : (
              <div>
                <img
                  src="https://thumbs2.imgbox.com/b1/08/2Dnle6TI_t.jpeg"
                  alt="Hearts"
                  title="Diffuser Caps Heart"
                  style={{
                    textAlign: "center",
                    width: "100%",
                    borderRadius: "20px"
                  }}
                />
                <div
                  className=" ta-c p-10px br-10px mt-5px max-w-600px m-auto fs-20px"
                  style={{ backgroundColor: "#272727", color: "white" }}
                >
                  {finished && (
                    <div>
                      <div>Thank you for Taking the Time to Give us Feedback!</div> <div>We Greatly Appreciate it! 💙</div>
                      <br />
                      <div>Follow us on Social Media</div>
                      <div className="mt-2rem wrap jc-c ">
                        <div className="ml-10px fs-25px jc-b w-100per max-w-500px">
                          <div className="ml-10px fs-40px">
                            <a
                              href="https://www.facebook.com/Glow-LEDscom-100365571740684"
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="Facebook"
                            >
                              <i className="fab fa-facebook zoom" />
                            </a>
                          </div>
                          <div className="ml-10px fs-40px">
                            <a href="https://www.instagram.com/glow_leds/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                              <i className="fab fa-instagram zoom" />
                            </a>
                          </div>
                          <div className="ml-10px fs-40px">
                            <a
                              href="https://www.tiktok.com/@glow_leds?lang=en"
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="Youtube"
                            >
                              <i className="fab fa-tiktok zoom" />
                            </a>
                          </div>
                          <div className="mh-10px fs-40px">
                            <a
                              href="https://www.youtube.com/channel/UCm_gDyTIy7d0oR9LeowPkYw?sub_confirmation=1?sub_confirmation=1"
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="TikTok"
                            >
                              <i className="fab fa-youtube zoom" />
                            </a>
                          </div>
                          <div className="mr-10px fs-40px">
                            <a href="https://soundcloud.com/ntre/tracks" target="_blank" rel="noopener noreferrer" aria-label="Soundcloud">
                              <i className="fab fa-soundcloud" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </Loading>
        </form>
      </div>
    </div>
  );
};
export default Survey;
