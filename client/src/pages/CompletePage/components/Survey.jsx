import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Loading } from "../../../shared/SharedComponents";
import { GLButton } from "../../../shared/GlowLEDsComponents";
import StarRating from "../../../shared/GlowLEDsComponents/GLRating/StarRating";
import * as API from "../../../api";

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
    <div className="main_container p-20px">
      <form style={{ width: "100%" }}>
        <Loading loading={loading} error={error}>
          <Loading loading={loadingSubmit} />
          {surveys && surveys.length > 0 && surveys[0] && !finished ? (
            <div>
              <ul className="edit-form-container" style={{ maxWidth: "60rem" }}>
                <label htmlFor="description">How was your ordering experience at Glow-LEDs.com?</label>
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
                            <option value="">---{q.question}---</option>
                            <option value="google_search">Google Search</option>
                            <option value="facebook">Facebook</option>
                            <option value="instagram">Instagram</option>
                            <option value="tiktok">TikTok</option>
                            <option value="youtube">YouTube</option>
                            <option value="glovers_lounge">Glovers Lounge</option>
                            <option value="glovers_lounge">Festival</option>
                            <option value="glovers_lounge">Reddit</option>
                            <option value="glovers_lounge">Rave Mob</option>
                            <option value="friend">Friend</option>
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
                    Submit
                  </GLButton>
                </li>
              </ul>
            </div>
          ) : (
            <div className="edit-form-container" style={{ maxWidth: "60rem" }}>
              {finished && (
                <div>
                  <div>Thank you for taking the time to give us feedback!</div> <div>We greatly appreciate it! 💙</div>
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
    </div>
  );
};

export default Survey;

// import React, { useEffect, useState, useCallback } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { Loading } from "../../../shared/SharedComponents";
// import { Helmet } from "react-helmet";
// import { GLButton } from "../../../shared/GlowLEDsComponents";
// import StarRating from "../../../shared/GlowLEDsComponents/GLRating/StarRating";
// import * as API from "../../../api";

// const Survey = ({ pathname }) => {
//   const [question_1, set_question_1] = useState("");
//   const [question_2, set_question_2] = useState("");
//   const [question_3, set_question_3] = useState("");
//   const [question_4, set_question_4] = useState("");
//   const [question_5, set_question_5] = useState("");
//   const [answer_1, set_answer_1] = useState("");
//   const [answer_2, set_answer_2] = useState("");
//   const [answer_3, set_answer_3] = useState("");
//   const [answer_4, set_answer_4] = useState("");
//   const [answer_5, set_answer_5] = useState("");
//   const [user, set_user] = useState("");
//   const [survey_questions, set_survey_questions] = useState("");
//   const [is_survey, set_is_survey] = useState("");
//   const [active, set_active] = useState("");

//   const [rating, set_rating] = useState(null);
//   const [loading_checkboxes, set_loading_checkboxes] = useState();
//   const [loading_submit, set_loading_submit] = useState();
//   const [finished, set_finished] = useState(false);

//   setTimeout(() => {
//     set_loading_checkboxes(false);
//   }, 500);
//   const userPage = useSelector(state => state.users.userPage);
//   const { users, current_user } = userPage;

//   const navigate = useNavigate();

//   const orderPage = useSelector(state => state.orders.orderPage);
//   const { order } = orderPage;

//   const surveyPage = useSelector(state => state.surveys);
//   const { surveys, loading, error, success } = surveyPage;

//   const dispatch = useDispatch();

//   useEffect(() => {
//     let clean = true;
//     if (clean) {
//       if (surveys && surveys.length > 0) {
//         // const active_survey = surveys.find(survey => survey.is_survey === true && survey.active === true);
//         const active_survey = surveys[0];
//         if (active_survey) {
//           // dispatch(API.detailsSurvey(active_survey._id));
//           set_survey_questions(active_survey._id);
//           set_state(active_survey);
//         } else {
//           unset_state();
//         }
//         // dispatch(API.detailsOrder(order_id));
//       }
//     }
//     return () => (clean = false);
//   }, [surveys, dispatch]);

//   useEffect(() => {
//     let clean = true;
//     if (clean) {
//       dispatch(API.listSurveys({ filters: { active: true, is_survey: true }, limit: 1 }));
//       dispatch(API.listUsers({}));

//       set_state();
//     }
//     return () => (clean = false);
//   }, []);

//   const set_state = active_survey => {
//     if (active_survey) {
//       set_question_1(active_survey.question_1);
//       set_question_2(active_survey.question_2);
//       set_question_3(active_survey.question_3);
//       set_question_4(active_survey.question_4);
//       set_question_5(active_survey.question_5);
//       set_answer_1(active_survey.answer_1);
//       set_answer_2(active_survey.answer_2);
//       set_answer_3(active_survey.answer_3);
//       set_answer_4(active_survey.answer_4);
//       set_answer_5(active_survey.answer_5);
//       set_user(active_survey.user);
//       set_is_survey(active_survey.is_survey);
//       set_active(active_survey.active);
//       set_rating(active_survey.rating);
//     }
//   };
//   const unset_state = () => {
//     set_question_1("");
//     set_question_2("");
//     set_question_3("");
//     set_question_4("");
//     set_question_5("");
//     set_answer_1("");
//     set_answer_2("");
//     set_answer_3("");
//     set_answer_4("");
//     set_answer_5("");
//     set_user("");
//     set_is_survey("");
//     set_active("");
//     set_rating("");
//   };

//   const submitHandler = e => {
//     set_loading_submit(true);
//     e.preventDefault();
//     let user = "";
//     if (order && order.user) {
//       user = order.user._id;
//     } else if (current_user) {
//       user = current_user._id;
//     } else {
//       user = null;
//     }
//     dispatch(
//       API.saveSurvey({
//         user: user,
//         question_1,
//         question_2,
//         question_3,
//         question_4,
//         question_5,
//         answer_1,
//         answer_2,
//         answer_3,
//         answer_4,
//         answer_5,
//         order: order && order._id,
//         survey: survey_questions,
//         is_survey: false,
//         active,
//         rating,
//       })
//     );
//     // e.target.reset();
//     unset_state();
//     set_loading_submit(false);
//     // navigate('/collections/surveys/category/' + category.toLowerCase());
//   };

//   useEffect(() => {
//     let clean = true;
//     if (clean) {
//       if (success) {
//         // navigate('/account/survey/receipt/' + survey_saved.data.pathname + '/survey/true');
//         set_finished(true);
//       }
//     }
//     return () => (clean = false);
//   }, [success]);

//   const categories = ["Glovers", "Artists", "Producers", "VFX"];

//   const [hovered, setHovered] = useState(false);
//   const toggleHover = () => setHovered(!hovered);

//   const determine_rating_word = () => {
//     switch (rating) {
//       case 1:
//         return "1 Star Poor";
//       case 2:
//         return "2 Stars Ok";
//       case 3:
//         return "3 Stars Good";
//       case 4:
//         return "4 Stars Great!";
//       case 5:
//         return "5 Stars Excellent!";
//       default:
//         return;
//     }
//   };

//   return (
//     <div className="main_container p-20px">
//       {surveys && surveys.length > 0 && surveys[0] && !finished && (
//         <h1 style={{ textAlign: "center" }}>{pathname ? "Edit Survey" : "Submit Survey"}</h1>
//       )}

//       <div className="form">
//         <form style={{ width: "100%" }}>
//           <Loading loading={loading} error={error}>
//             <Loading loading={loading_submit} />
//             {surveys && surveys.length > 0 && surveys[0] && !finished ? (
//               <div>
//                 <Helmet>
//                   <title>Survey | Glow LEDs</title>
//                 </Helmet>
//                 <ul className="edit-form-container" style={{ maxWidth: "60rem" }}>
//                   <div>
// <label htmlFor="description">{question_1}</label>
// <StarRating set_rating={set_rating} rating={rating} />
//                     <p className="ta-c">{rating && determine_rating_word(rating)}</p>
// <div className="ai-c mv-2rem jc-c">
//   {/* <h3 className="mr-1rem">{question_2}</h3> */}

//   <div className="custom-select">
//     <select
//       defaultValue={answer_2}
//       className="qty_select_dropdown"
//       onChange={e => {
//         set_answer_2(e.target.value);
//       }}
//     >
//       <option value="">---{question_2}---</option>
//       <option value="google_search">Google Search</option>
//       <option value="facebook">Facebook</option>
//       <option value="instagram">Instagram</option>
//       <option value="tiktok">TikTok</option>
//       <option value="youtube">YouTube</option>
//       <option value="glovers_lounge">Glovers Lounge</option>
//       <option value="friend">Friend</option>
//       {/* <option value="other">Other</option> */}
//     </select>
//     <span className="custom-arrow" />
//   </div>
// </div>
//                     {question_3 && (
//                       <li>
//                         <label htmlFor="where">{question_3}</label>
//                         <input
//                           type="text"
//                           name="where"
//                           value={answer_3}
//                           id="where"
//                           onChange={e => set_answer_3(e.target.value)}
//                         />
//                       </li>
//                     )}
//                     {question_4 && (
//                       <li>
//                         <label htmlFor="where">{question_4}</label>
//                         <input
//                           type="text"
//                           name="where"
//                           value={answer_4}
//                           id="where"
//                           onChange={e => set_answer_4(e.target.value)}
//                         />
//                       </li>
//                     )}
//                     {question_5 && (
//                       <li>
//                         <label htmlFor="where">{question_5}</label>
//                         <input
//                           type="text"
//                           name="where"
//                           value={answer_5}
//                           id="where"
//                           onChange={e => set_answer_5(e.target.value)}
//                         />
//                       </li>
//                     )}
//                   </div>

//                   <li>
//                     <GLButton variant="primary" onClick={e => submitHandler(e)}>
//                       Submit
//                     </GLButton>
//                   </li>
//                 </ul>
//               </div>
//             ) : (
//               <div>
//                 <img
//                   src="https://thumbs2.imgbox.com/b1/08/2Dnle6TI_t.jpeg"
//                   alt="Hearts"
//                   title="Diffuser Caps Heart"
//                   style={{
//                     textAlign: "center",
//                     width: "100%",
//                     borderRadius: "20px",
//                   }}
//                 />
//                 <div
//                   className=" ta-c p-10px br-10px mt-5px max-w-600px m-auto fs-20px"
//                   style={{ backgroundColor: "#272727", color: "white" }}
//                 >
//                   {finished && (
//                     <div>
//                       <div>Thank you for Taking the Time to Give us Feedback!</div>{" "}
//                       <div>We Greatly Appreciate it! 💙</div>
//                       <br />
//                       <div>Follow us on Social Media</div>
//                       <div className="mt-2rem wrap jc-c ">
//                         <div className="ml-10px fs-25px jc-b w-100per max-w-500px">
//                           <div className="ml-10px fs-40px">
//                             <a
//                               href="https://www.facebook.com/Glow-LEDscom-100365571740684"
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               aria-label="Facebook"
//                             >
//                               <i className="fab fa-facebook zoom" />
//                             </a>
//                           </div>
//                           <div className="ml-10px fs-40px">
//                             <a
//                               href="https://www.instagram.com/glow_leds/"
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               aria-label="Instagram"
//                             >
//                               <i className="fab fa-instagram zoom" />
//                             </a>
//                           </div>
//                           <div className="ml-10px fs-40px">
//                             <a
//                               href="https://www.tiktok.com/@glow_leds?lang=en"
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               aria-label="Youtube"
//                             >
//                               <i className="fab fa-tiktok zoom" />
//                             </a>
//                           </div>
//                           <div className="mh-10px fs-40px">
//                             <a
//                               href="https://www.youtube.com/channel/UCm_gDyTIy7d0oR9LeowPkYw?sub_confirmation=1?sub_confirmation=1"
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               aria-label="TikTok"
//                             >
//                               <i className="fab fa-youtube zoom" />
//                             </a>
//                           </div>
//                           <div className="mr-10px fs-40px">
//                             <a
//                               href="https://soundcloud.com/ntre/tracks"
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               aria-label="Soundcloud"
//                             >
//                               <i className="fab fa-soundcloud" />
//                             </a>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </Loading>
//         </form>
//       </div>
//     </div>
//   );
// };
// export default Survey;
