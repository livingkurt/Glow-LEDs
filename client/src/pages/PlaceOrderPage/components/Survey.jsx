import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Loading } from "../../../shared/SharedComponents";
import { GLButton } from "../../../shared/GlowLEDsComponents";
import StarRating from "../../../shared/GlowLEDsComponents/GLRating/StarRating";
import * as API from "../../../api";
import { Container } from "@mui/material";

const Survey = () => {
  const [questionAnswers, setQuestionAnswers] = useState({});
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [finished, setFinished] = useState(false);
  const [rating, set_rating] = useState(null);

  const dispatch = useDispatch();

  const surveyPage = useSelector(state => state.surveys.surveyPage);
  const { surveys, loading, error, success } = surveyPage;

  const orderPage = useSelector(state => state.orders.orderPage);
  const { order } = orderPage;
  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  useEffect(() => {
    dispatch(API.listSurveys({ filters: { active: true, is_survey: true }, limit: 1 }));
  }, [dispatch]);

  const submitHandler = e => {
    setLoadingSubmit(true);
    e.preventDefault();

    const payloadQuestionAnswer = surveys[0].question_answer.map(q => {
      return {
        question: q.question,
        answer: questionAnswers[q._id] || "",
      };
    });

    const payload = {
      question_answer: payloadQuestionAnswer,
      is_survey: false,
      order: order && order._id,
      rating,
      user: current_user && current_user._id,
      survey: surveys && surveys[0] && surveys[0]._id,
    };

    dispatch(API.saveSurvey(payload));
    setQuestionAnswers({});
    setLoadingSubmit(false);
    setFinished(true);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <form style={{ width: "100%" }}>
        <Loading loading={loading} error={error}>
          <Loading loading={loadingSubmit} />
          {surveys && surveys.length > 0 && surveys[0] && !finished ? (
            <div>
              <ul className="edit-form-container" style={{ maxWidth: "60rem" }}>
                <label htmlFor="description">{"How was your ordering experience at Glow-LEDs.com?"}</label>
                <StarRating set_rating={set_rating} rating={rating} />
                {surveys[0].question_answer.map((q, index) => (
                  <li key={index}>
                    {q.question === "How did you hear about us?" ? (
                      <div className="ai-c jc-c w-100per">
                        <div className="custom-select w-100per">
                          <select
                            defaultValue={questionAnswers[q._id] || ""}
                            className="qty_select_dropdown  w-100per"
                            onChange={e =>
                              setQuestionAnswers({
                                ...questionAnswers,
                                [q._id]: e.target.value,
                              })
                            }
                          >
                            <option value="">
                              {"---"}
                              {q.question}
                              {"---"}
                            </option>
                            <option value="google_search">{"Google Search"}</option>
                            <option value="facebook">{"Facebook"}</option>
                            <option value="instagram">{"Instagram"}</option>
                            <option value="tiktok">{"TikTok"}</option>
                            <option value="youtube">{"YouTube"}</option>
                            <option value="glovers_lounge">{"Glovers Lounge"}</option>
                            <option value="glovers_lounge">{"Festival"}</option>
                            <option value="glovers_lounge">{"Reddit"}</option>
                            <option value="glovers_lounge">{"Rave Mob"}</option>
                            <option value="friend">{"Friend"}</option>
                          </select>
                          <span className="custom-arrow" />
                        </div>
                      </div>
                    ) : (
                      <>
                        <label htmlFor={`question${index}`}>{q.question}</label>
                        <input
                          type="text"
                          id={`question${index}`}
                          value={questionAnswers[q._id] || ""}
                          onChange={e =>
                            setQuestionAnswers({
                              ...questionAnswers,
                              [q._id]: e.target.value,
                            })
                          }
                        />
                      </>
                    )}
                  </li>
                ))}
                <li>
                  <GLButton variant="primary" onClick={e => submitHandler(e)}>
                    {"Submit"}
                  </GLButton>
                </li>
              </ul>
            </div>
          ) : (
            <div className="edit-form-container" style={{ maxWidth: "60rem" }}>
              {finished && (
                <div>
                  <div>{"Thank you for taking the time to give us feedback!"}</div>{" "}
                  <div>{"We greatly appreciate it! 💙"}</div>
                  <br />
                  <div>{"Follow us on Social Media"}</div>
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
                        <a
                          href="https://www.instagram.com/glow_leds/"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Instagram"
                        >
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
                        <a
                          href="https://soundcloud.com/ntre/tracks"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Soundcloud"
                        >
                          <i className="fab fa-soundcloud" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </Loading>
      </form>
    </Container>
  );
};

export default Survey;
