import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { contact } from "../../actions/userActions";
import { validate_contact } from "../../utils/validations";
import { Loading, Notification } from "../../shared/SharedComponents";
import { Helmet } from "react-helmet";
import { humanize } from "../../utils/helper_functions";
import { GLButton } from "../../shared/GlowLEDsComponents";
import * as API from "../../api";
require("dotenv").config();

const ContactPage = props => {
  const dispatch = useDispatch();
  const userSlice = useSelector(state => state.userSlice);
  const { current_user, loading, completed, message: completed_message, error, success } = userSlice;

  const [first_name, set_first_name] = useState(current_user ? current_user.first_name : "");
  const [last_name, set_last_name] = useState(current_user ? current_user.last_name : "");
  const [email, set_email] = useState(current_user ? current_user.email : "");
  const [order_number, set_order_number] = useState(current_user ? current_user.order_number : "");
  const [reason_for_contact, set_reason_for_contact] = useState(props.match.params.reason ? props.match.params.reason : "");
  const [message, set_message] = useState("");
  const [song_id, set_song_id] = useState("");
  const [instagram_handle, set_instagram_handle] = useState("");
  const [facebook_name, set_facebook_name] = useState("");
  const [artist_name, set_artist_name] = useState("");
  const [inspirational_pictures, set_inspirational_pictures] = useState([]);

  const [first_name_validations, set_first_name_Validations] = useState("");
  const [last_name_validations, set_last_name_Validations] = useState("");
  const [email_validations, set_email_validations] = useState("");
  const [order_number_validations, set_order_number_validations] = useState("");
  const [reason_for_contact_validations, set_reason_for_contact_validations] = useState("");
  const [message_validations, set_message_validations] = useState("");

  useEffect(() => {
    let clean = true;
    if (clean) {
      set_reason_for_contact(props.match.params.reason);
    }
    return () => (clean = false);
  }, [props.match.params.reason]);

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (completed) {
        props.history.push("/pages/complete/email");
      }
    }
    return () => (clean = false);
  }, [completed]);

  let request;
  const sendEmail = e => {
    e.preventDefault();

    if (["order_issues", "returns", "technical_support"].includes(reason_for_contact)) {
      set_order_number_validations("55555555");
    }
    const data = {
      first_name,
      last_name,
      email,
      reason_for_contact,
      message
    };
    request = validate_contact(data);

    set_first_name_Validations(request.errors.first_name);
    set_last_name_Validations(request.errors.last_name);
    set_email_validations(request.errors.email);
    set_order_number_validations(request.errors.order_number);
    set_reason_for_contact_validations(request.errors.reason_for_contact);
    set_message_validations(request.errors.message);

    if (request.isValid) {
      const reason = humanize(reason_for_contact);
      dispatch(
        API.sendContactEmail({
          first_name,
          last_name,
          email,
          order_number,
          reason,
          message,
          inspirational_pictures,
          artist_name,
          instagram_handle,
          facebook_name,
          song_id
        })
      );
      // if (reason_for_contact === "submit_content_to_be_featured") {
      //   dispatch(
      //     saveFeature({
      //       user: current_user,
      //       artist_name,
      //       instagram_handle,
      //       facebook_name,
      //       product: "",
      //       song_id,
      //       release_date: "2020-12-29"
      //     })
      //   );
      // }
    }
  };

  return (
    <div className="main_container p-20px">
      <Helmet>
        <title>Contact | Glow LEDs</title>
        <meta property="og:title" content="Contact" />
        <meta name="twitter:title" content="Contact" />
        <link rel="canonical" href="https://www.glow-leds.com/pages/contact" />
        <meta property="og:url" content="https://www.glow-leds.com/pages/contact" />
        <meta name="description" content="If you have any questions, do not hesitate to use our contact page for support." />
        <meta property="og:description" content="If you have any questions, do not hesitate to use our contact page for support." />
        <meta name="twitter:description" content="If you have any questions, do not hesitate to use our contact page for support." />
      </Helmet>
      <div className="jc-c">
        <h1>Contact</h1>
      </div>
      <Notification message={completed_message} />
      <div className="column jc-c">
        {/* <div className="ta-c">
          We are avaiable from 11 AM to 7 PM on Weekdays
        </div> */}
        {/* <div className="ta-c mt-1rem">
          Need a quicker reply? 💬 Use the Facebook Chat{" "}
          <i className="fab fa-facebook zoom" /> at the Bottom right of your
          screen to chat with us instantly! 💨
        </div> */}
      </div>
      <div className="jc-c">
        <Loading loading={loading} error={error}>
          {/* {completed && (
						<h3 style={{ textAlign: 'center' }}>
							{completed ? completed : request.isValid ? 'Error Sending Email' : ''}
						</h3>
					)} */}
        </Loading>
      </div>
      <form style={{ display: "flex", flexDirection: "column" }} className="contact-form">
        <label>First Name</label>
        <input
          onChange={e => set_first_name(e.target.value)}
          defaultValue={first_name}
          value={first_name}
          className="zoom_f form_input"
          type="text"
          name="first_name"
          placeholder="First Name"
        />
        <label className="validation_text">{first_name_validations}</label>
        <label>Last Name</label>
        <input
          onChange={e => set_last_name(e.target.value)}
          defaultValue={last_name}
          value={last_name}
          className="zoom_f form_input"
          type="text"
          name="last_name"
          placeholder="Last Name"
        />
        <label className="validation_text">{last_name_validations}</label>
        <label>Email</label>
        <input
          onChange={e => set_email(e.target.value)}
          defaultValue={email}
          value={email}
          className="zoom_f form_input"
          type="text"
          name="email"
          placeholder="Email"
        />
        <label className="validation_text">{email_validations}</label>

        <label className="validation_text">{reason_for_contact_validations}</label>
        <label>Order Number</label>
        <input
          onChange={e => set_order_number(e.target.value)}
          defaultValue={order_number}
          className="zoom_f form_input w-100per"
          type="text"
          name="order_number"
          placeholder="Order Number"
        />

        <label className="validation_text">{order_number_validations}</label>
        <label>Reason for Contact</label>

        <div className="custom-select mt-8px mb-15px">
          <select
            onChange={e => set_reason_for_contact(e.target.value)}
            defaultValue={reason_for_contact}
            value={reason_for_contact}
            className=" contact_dropdown w-100per"
            name="reason_for_contact"
            placeholder="----Click Here to Choose Reason----"
          >
            <option className="contact_grey_option" disabled="disabled" selected="selected" value="">
              ----Click Here to Choose Reason----
            </option>

            <option className="contact_options" value="order_issues">
              Order Issues
            </option>
            <option className="contact_options" value="infinite_loading">
              Infinite loading during order process
            </option>
            <option className="contact_options" value="returns">
              Returns
            </option>
            <option className="contact_options" value="technical_support">
              Technical Support
            </option>
            <option className="contact_options" value="website_bugs">
              Website Bugs
            </option>
            <option className="contact_options" value="custom_orders">
              Custom Orders
            </option>
            <option className="contact_options" value="product_suggestions">
              Product Suggestions
            </option>
            {/* <option className="contact_options" value="submit_content_to_be_featured">
              Submit Content to be Featured
            </option> */}
            <option className="contact_options" value="other">
              Other
            </option>
          </select>
          <span className="custom-arrow" />
        </div>
        <label>Message</label>
        <textarea
          onChange={e => set_message(e.target.value)}
          defaultValue={message}
          className="zoom_f form_input"
          name="message"
          style={{ fontFamily: "Helvetica" }}
          placeholder="Enter Message Here"
        />
        <GLButton variant="primary" className="zoom_b mt-10px w-100per" id="button" onClick={e => sendEmail(e)}>
          Send
        </GLButton>
        {/* {
        {["order_issues", "returns", "technical_support"].includes(reason_for_contact) && (
          <div className="100per">
            <label>Order Number</label>
            <input
              onChange={e => set_order_number(e.target.value)}
              defaultValue={order_number}
              className="zoom_f form_input w-100per"
              type="text"
              name="order_number"
              placeholder="Order Number"
            />
            <label className="validation_text">{order_number_validations}</label>
          </div>
        )}

        {/* {[ "submit_content_to_be_featured" ].includes(reason_for_contact) && (
          <div>
            <div>
              <h2>Content includes: </h2>
              <ul className="paragraph_font" style={{ paddingLeft: "20px" }}>
                <li>
                  Pictures or Video of your Lightshow with Glow LEDs Diffusers
                  or Diffuser Caps.{" "}
                </li>
                <li>Pictures or Video of art or music.</li>
                <li>Pictures or Video of your Glow LEDs Glowstringz.</li>
              </ul>
            </div>
            <Link to="/collections/all/features/category/submit_feature">
              <GLButton
                className="zoom_b btn primary mt-10px w-100per"
                id="button"
              >
                Submit Feature
              </GLButton>
            </Link>
          </div>
        )} */}
        {/* {!["submit_content_to_be_featured"].includes(reason_for_contact) && (
          <div>
            <label>Message</label>
            <textarea
              onChange={e => set_message(e.target.value)}
              defaultValue={message}
              className="zoom_f form_input"
              name="message"
              style={{ fontFamily: "Helvetica" }}
              placeholder="Enter Message Here"
            />
            <label className="validation_text">{message_validations}</label>

            {["order_issues", "returns", "technical_support"].includes(reason_for_contact) && (
              <p className="paragraph_font">
                Your Order Number is located on your Order confirmation email, You can also find your order number by logging in and
                navigating to your orders.
              </p>
            )}
            <GLButton variant="primary" className="zoom_b mt-10px w-100per" id="button" onClick={e => sendEmail(e)}>
              Send
            </GLButton>
          </div>
        )} */}
      </form>
    </div>
  );
};

export default ContactPage;
