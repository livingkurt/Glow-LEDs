import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { useHistory } from "react-router-dom";
import { detailsEmail, listEmails } from "../../actions/emailActions";
import { API_Emails } from "../../utils";
import {
  accurate_date,
  format_date,
  format_time,
  unformat_date_and_time,
} from "../../utils/helper_functions";
import { Notification } from "../../components/UtilityComponents";
import { Helmet } from "react-helmet";
const HtmlToReactParser = require("html-to-react").Parser;

const AnnouncementEmail = props => {
  const history = useHistory();
  const [ loading_checkboxes, set_loading_checkboxes ] = useState(true);
  const [ test, set_test ] = useState(true);
  const [ subject, set_subject ] = useState("");
  const [ schedule, set_schedule ] = useState(false);
  const [ email_sent_message, set_email_sent_message ] = useState("");
  const today = new Date();

  const [ template, set_template ] = useState("");

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const emailList = useSelector(state => state.emailList);
  const { emails } = emailList;

  const emailDetails = useSelector(state => state.emailDetails);
  const { email } = emailDetails;

  const [ date, set_date ] = useState(format_date(accurate_date(today)));
  const [ time, set_time ] = useState(format_time(accurate_date(today)));

  const dispatch = useDispatch();

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(detailsEmail(props.match.params.id));
    }
    return () => (clean = false);
  }, []);

  useEffect(
    () => {
      let clean = true;
      if (clean) {
        if (email) {
          view_announcement_email(email);
          const scheduled = new Date(email.scheduled_at);
          if (email.scheduled_at) {
            set_schedule(true);
            set_date(format_date(accurate_date(scheduled)));
            set_time(format_time(accurate_date(scheduled)));
          }
        }
      }
      return () => (clean = false);
    },
    [ email ]
  );

  setTimeout(() => {
    set_loading_checkboxes(false);
  }, 500);

  const view_announcement_email = async email => {
    const { data } = await API_Emails.view_announcement_email(email);
    const htmlToReactParser = new HtmlToReactParser();
    const reactElement = htmlToReactParser.parse(data);
    set_template(reactElement);
  };

  const send_announcement_email = async () => {
    const confirm = window.confirm("Are you sure you want to send this email?");
    if (confirm) {
      set_email_sent_message(
        `${schedule ? "Scheduled" : ""} ${test
          ? "Test"
          : ""} Email Successfully`
      );
      setTimeout(() => {
        set_email_sent_message("");
      }, 5000);
      console.log({ send_announcement_email: "test" });
      const data = await API_Emails.send_announcement_email(
        email,
        `${test ? "[Test]" : ""} ${subject ? subject : email.h1}`,
        test,
        schedule ? unformat_date_and_time(date, time) : ""
      );
      console.log(data);
    }
  };
  return (
    <div className="">
      <Helmet>
        <title>View Email | Glow LEDs</title>
      </Helmet>
      <Notification message={email_sent_message} />
      <div className="jc-b mb-1rem ai-c">
        <button className="btn primary" onClick={() => history.goBack()}>
          Back to Emails
        </button>
        {email && (
          <Link to={"/secure/glow/editemail/" + email._id}>
            <button className="btn primary">Edit Email</button>
          </Link>
        )}
      </div>
      <div className="column jc-c max-w-400px m-auto g-20px">
        <div className="jc-c">
          <h1 style={{ textAlign: "center" }}>Email Sender</h1>
        </div>

        {loading_checkboxes ? (
          <div>Loading...</div>
        ) : (
          <div>
            <label htmlFor="schedule">Schedule</label>
            <input
              type="checkbox"
              name="schedule"
              defaultChecked={schedule}
              id="schedule"
              onChange={e => {
                set_schedule(e.target.checked);
              }}
            />
          </div>
        )}
        {schedule && (
          <div className="jc-b g-10px">
            <input
              type="text"
              value={date}
              className="w-50per"
              onChange={e => set_date(e.target.value)}
            />
            <input
              type="text"
              value={time}
              className="w-50per"
              onChange={e => set_time(e.target.value)}
            />
          </div>
        )}
        <input
          type="text"
          placeholder="Subject"
          defaultValue={email && email.h1}
          onChange={e => set_subject(e.target.value)}
        />
        {loading_checkboxes ? (
          <div>Loading...</div>
        ) : (
          <div>
            <label htmlFor="test">Test</label>
            <input
              type="checkbox"
              name="test"
              defaultChecked={test}
              id="test"
              onChange={e => {
                set_test(e.target.checked);
              }}
            />
          </div>
        )}
        <button
          className="btn primary mb-1rem"
          onClick={() => send_announcement_email()}
        >
          Send {schedule && "Scheduled"} {test && "Test"} Email
        </button>
      </div>
      <div className="jc-c">
        <h2 style={{ textAlign: "center" }}>Email Template</h2>
      </div>
      {template}
    </div>
  );
};

export default AnnouncementEmail;
