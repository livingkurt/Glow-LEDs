import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { ImageDisplay, Loading, Notification } from "../../../shared/SharedComponents";
import { Helmet } from "react-helmet";
import { API_Emails } from "../../../utils";
import { SketchPicker } from "react-color";
import reactCSS from "reactcss";
import { accurate_date, format_date, format_time, unformat_date_and_time } from "../../../utils/helper_functions";
import { GLButton } from "../../../shared/GlowLEDsComponents";
import { createEmail, detailsEmail, listContents, listEmails, updateEmail } from "../../../api";
const ReactDOMServer = require("react-dom/server");
const HtmlToReactParser = require("html-to-react").Parser;

const EditEmailPage = props => {
  const [id, set_id] = useState("");
  const [email_type, set_email_type] = useState("");
  const [email_h1, set_email_h1] = useState("");
  const [email_image, set_email_image] = useState("");
  const [email_images, set_email_images] = useState([]);
  const [background_color, set_background_color] = useState("#7d7c7c");
  const [module_color, set_module_color] = useState("#585858");
  const [button_color, set_button_color] = useState("#4c4f60");
  const [text_color, set_text_color] = useState("#FFFFFF");
  const [title_color, set_title_color] = useState("#333333");
  const [header_footer_color, set_header_footer_color] = useState("#333333");
  const [template, set_template] = useState("");
  const [status, set_status] = useState("");

  const [email_h2, set_email_h2] = useState("");
  const [email_p, set_email_p] = useState("");
  const [email_button, set_email_button] = useState("");
  const [email_link, set_email_link] = useState("");
  const [email_active, set_email_active] = useState(true);
  const [images, set_images] = useState([]);
  const [image, set_image] = useState("");
  const [scheduled_at, set_scheduled_at] = useState("");
  const [loading_checkboxes, set_loading_checkboxes] = useState(true);
  const [content, set_content] = useState({});
  const [date, set_date] = useState();
  const [time, set_time] = useState();
  const [subject, set_subject] = useState("");

  const history = useHistory();

  const emailDetails = useSelector(state => state.emailDetails);
  const { email, loading, error } = emailDetails;

  const emailSave = useSelector(state => state.emailSave);
  const { message } = emailSave;

  const emailSlice = useSelector(state => state.emailSlice);
  const { emails } = emailSlice;

  // const contentDetails = useSelector((state) => state.contentDetails);
  // const { content, loading: loading_content, error: error_content } = contentDetails;

  const contentSlice = useSelector(state => state.contentSlice);
  const { contents } = contentSlice;

  const dispatch = useDispatch();

  const set_content_state = content => {
    props.match.params.id && set_id(email._id);
    set_email_type(content.email_type);
    set_email_h1(content.h1);
    set_email_image(content.image);
    set_email_images(content.images);
    set_images(content.images);
    set_email_h2(content.h2);
    set_email_p(content.p);
    set_email_button(content.button);
    set_email_link(content.link);
    set_email_active(content.active);
  };
  const set_email_state = () => {
    props.match.params.id && set_id(email._id);
    set_email_type(email.email_type);
    set_email_h1(email.h1);
    set_email_image(email.image);
    set_email_images(email.images);
    set_images(email.images);
    set_email_h2(email.h2);
    set_email_p(email.p);
    set_email_button(email.button);
    set_email_link(email.link);
    set_email_active(email.active);
    set_background_color(email.background_color || "#7d7c7c");
    set_module_color(email.module_color || "#585858");
    set_button_color(email.button_color || "#4c4f60");
    set_text_color(email.text_color || "#FFFFFF");
    set_title_color(email.title_color || "#333333");
    set_header_footer_color(email.header_footer_color || "#333333");
    view_announcement_email(email);
    set_scheduled_at(email.scheduled_at);
    if (email.scheduled_at) {
      const scheduled = new Date(email.scheduled_at);
      set_date(format_date(accurate_date(scheduled)));
      set_time(format_time(accurate_date(scheduled)));
    }
    set_status(email.status);
    set_subject(email.subject);
  };
  const unset_state = () => {
    set_id("");
    set_email_type("");
    set_email_h1("");
    set_images("");
    set_email_images([]);
    set_email_h2("");
    set_email_p("");
    set_email_button("");
    set_email_link("");
    set_email_active("");
    set_images([]);
    set_image("");
    set_background_color("#7d7c7c");
    set_module_color("#585858");
    set_button_color("#4c4f60");
    set_text_color("#FFFFFF");
    set_title_color("#333333");
    set_header_footer_color("#333333");
    set_status("");
    set_scheduled_at("");
    set_subject("");
    // dispatch(detailsEmail(''));
    // dispatch(detailsContent(''));
  };

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (props.match.params.id) {
        dispatch(detailsEmail(props.match.params.id));
        dispatch(detailsEmail(props.match.params.id));
      } else {
        dispatch(detailsEmail(""));
      }
      dispatch(listEmails({}));
      dispatch(listContents({}));

      set_email_state();
    }
    return () => (clean = false);
  }, [dispatch, props.match.params.id]);

  const use_template = e => {
    dispatch(detailsEmail(e.target.value));
  };
  const use_content_template = async e => {
    // dispatch(detailsContent(e.target.value));
    const { data } = await API_Emails.get_content(e.target.value);
    // set_content(data);

    const new_link = `https://www.glow-leds.com${data.home_page.link}`;

    set_content_state({
      ...data.home_page,
      link: new_link
    });
  };
  const view_announcement_email = async () => {
    // dispatch(detailsContent(e.target.value));

    const { data } = await API_Emails.view_announcement_email({
      _id: id ? id : null,
      email_type: "Announcements",
      subject,
      h1: email_h1,
      image: email_image,
      images,
      h2: email_h2,
      p: email_p,
      button: email_button,
      link: email_link,
      header_footer_color,
      background_color,
      module_color,
      button_color,
      text_color,
      title_color,
      active: email_active
    });

    const htmlToReactParser = new HtmlToReactParser();
    const reactElement = htmlToReactParser.parse(data);
    set_template(reactElement);
  };

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (email) {
        //
        set_email_state();
      } else {
        //
        unset_state();
      }
    }
    return () => (clean = false);
  }, [email]);
  useEffect(() => {
    let clean = true;
    if (clean) {
      if (content && content.home_page) {
        set_content_state(content.home_page);
      } else {
        unset_state();
      }
    }
    return () => (clean = false);
  }, [content]);

  setTimeout(() => {
    set_loading_checkboxes(false);
  }, 500);

  const submitHandler = e => {
    e.preventDefault();
    const data = {
      _id: id ? id : null,
      email_type: "Announcements",
      h1: email_h1,
      image: email_image,
      images,
      h2: email_h2,
      p: email_p,
      button: email_button,
      link: email_link,
      status,
      header_footer_color,
      background_color,
      module_color,
      button_color,
      text_color,
      title_color,
      scheduled_at: date && time ? unformat_date_and_time(date, time) : null,
      active: email_active
    };
    if (id) {
      dispatch(updateEmail(data));
    } else {
      dispatch(createEmail(data));
    }
    e.target.reset();
    // unset_state();
    // history.push('/secure/glow/emails');
  };

  const [title_color_picker, set_title_color_picker] = useState(false);
  const [text_color_picker, set_text_color_picker] = useState(false);
  const [background_color_picker, set_background_color_picker] = useState(false);
  const [module_color_picker, set_module_color_picker] = useState(false);
  const [button_color_picker, set_button_color_picker] = useState(false);
  const [header_footer_color_picker, set_header_footer_color_picker] = useState(false);

  const styles = reactCSS({
    default: {
      swatch: {
        padding: "5px",
        background: "#fff",
        borderRadius: "1px",
        boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
        display: "inline-block",
        cursor: "pointer"
      },
      popover: {
        position: "absolute",
        zIndex: "2"
      },
      cover: {
        position: "fixed",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px"
      }
    }
  });

  const preset_colors = ["#333333", "#333333", "#FFFFFF", "#7d7c7c", "#585858", "#4c4f60"];

  return (
    <div className="main_container p-20px">
      <h1 style={{ textAlign: "center" }}>{props.match.params.id ? "Edit Email" : "Create Email"}</h1>

      <div className="form">
        <form onSubmit={submitHandler} style={{ width: "100%" }}>
          {/* {loading_data ? (
						<div>Loading...</div>
					) : ( */}
          <Notification message={message} />
          <Loading loading={loading} error={error}>
            {email && (
              <div>
                <Helmet>
                  <title>Edit Email | Glow LEDs</title>
                </Helmet>

                <ul
                  className="edit-form-container"
                  style={{
                    maxWidth: "100rem",
                    width: "100%",
                    marginBottom: "20px"
                  }}
                >
                  <li>
                    <div className="ai-c h-25px mb-15px jc-c">
                      <div className="custom-select w-100per">
                        <select className="qty_select_dropdown w-100per" onChange={e => use_template(e)}>
                          <option key={1} defaultValue="">
                            ---Template---
                          </option>
                          {emails &&
                            emails.map((email, index) => (
                              <option key={index} value={email._id}>
                                {email.h1}
                              </option>
                            ))}
                        </select>
                        <span className="custom-arrow" />
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="ai-c h-25px mb-15px jc-c">
                      <div className="custom-select w-100per">
                        <select className="qty_select_dropdown w-100per" onChange={e => use_content_template(e)} vd>
                          <option key={1} defaultValue="">
                            ---Content Template---
                          </option>
                          {contents &&
                            contents.map((content, index) => (
                              <option key={index} value={content._id}>
                                {content.home_page.h1}
                              </option>
                            ))}
                        </select>
                        <span className="custom-arrow" />
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="ai-c h-25px mb-15px jc-c">
                      <div className="custom-select w-100per">
                        <select className="qty_select_dropdown w-100per" onChange={e => set_status(e.target.value)} value={status}>
                          <option defaultValue="">---Status---</option>

                          <option value={"draft"}>Draft</option>
                          <option value={"scheduled"}>Scheduled</option>
                          <option value={"sent"}>Sent</option>
                        </select>
                        <span className="custom-arrow" />
                      </div>
                    </div>
                  </li>
                  <div className="row wrap jc-c">
                    <div className="w-100per m-10px">
                      <ul className="jc-b ai-c">
                        <li className="w-100per max-w-150px mr-10px">
                          <label htmlFor="header_footer_color">Header Footer</label>
                          <input
                            type="text"
                            name="header_footer_color"
                            value={header_footer_color}
                            id="header_footer_color"
                            onChange={e => set_header_footer_color(e.target.value)}
                          />
                          <div>
                            <div style={styles.swatch} onClick={() => set_header_footer_color_picker(!header_footer_color_picker)}>
                              <div
                                style={{
                                  width: "36px",
                                  height: "14px",
                                  borderRadius: "2px",
                                  background: header_footer_color
                                }}
                              />
                            </div>
                            {header_footer_color_picker ? (
                              <div style={styles.popover} className="jc-c w-100per">
                                <div style={styles.cover} onClick={() => set_header_footer_color_picker(false)} />
                                <SketchPicker
                                  color={header_footer_color}
                                  presetColors={preset_colors}
                                  onChange={color => set_header_footer_color(color.hex)}
                                />
                              </div>
                            ) : null}
                          </div>
                        </li>
                        <li className="w-100per max-w-150px ">
                          <label htmlFor="title_color">Title</label>
                          <input
                            type="text"
                            name="title_color"
                            value={title_color}
                            id="title_color"
                            onChange={e => set_title_color(e.target.value)}
                          />
                          <div>
                            <div style={styles.swatch} onClick={() => set_title_color_picker(!title_color_picker)}>
                              <div
                                style={{
                                  width: "36px",
                                  height: "14px",
                                  borderRadius: "2px",
                                  background: title_color
                                }}
                              />
                            </div>
                            {title_color_picker ? (
                              <div style={styles.popover} className="jc-c w-100per">
                                <div style={styles.cover} onClick={() => set_title_color_picker(false)} />
                                <SketchPicker
                                  color={title_color}
                                  presetColors={preset_colors}
                                  onChange={color => set_title_color(color.hex)}
                                />
                              </div>
                            ) : null}
                          </div>
                        </li>
                        <li className="w-100per max-w-150px mh-10px">
                          <label htmlFor="text_color">Text</label>
                          <input
                            type="text"
                            name="text_color"
                            value={text_color}
                            id="text_color"
                            onChange={e => set_text_color(e.target.value)}
                          />
                          <div>
                            <div style={styles.swatch} onClick={() => set_text_color_picker(!text_color_picker)}>
                              <div
                                style={{
                                  width: "36px",
                                  height: "14px",
                                  borderRadius: "2px",
                                  background: text_color
                                }}
                              />
                            </div>
                            {text_color_picker ? (
                              <div style={styles.popover}>
                                <div style={styles.cover} onClick={() => set_text_color_picker(false)} />
                                <SketchPicker
                                  color={text_color}
                                  presetColors={preset_colors}
                                  onChange={color => set_text_color(color.hex)}
                                />
                              </div>
                            ) : null}
                          </div>
                        </li>
                        <li className="w-100per max-w-150px ">
                          <label htmlFor="background_color">Background</label>
                          <input
                            type="text"
                            name="background_color"
                            value={background_color}
                            id="background_color"
                            onChange={e => {
                              set_background_color(e.target.value);
                              view_announcement_email();
                            }}
                          />
                          <div>
                            <div style={styles.swatch} onClick={() => set_background_color_picker(!background_color_picker)}>
                              <div
                                style={{
                                  width: "36px",
                                  height: "14px",
                                  borderRadius: "2px",
                                  background: background_color
                                }}
                              />
                            </div>
                            {background_color_picker ? (
                              <div style={styles.popover}>
                                <div style={styles.cover} onClick={() => set_background_color_picker(false)} />
                                <SketchPicker
                                  color={background_color}
                                  presetColors={preset_colors}
                                  onChange={color => set_background_color(color.hex)}
                                />
                              </div>
                            ) : null}
                          </div>
                        </li>
                        <li className="w-100per max-w-150px mh-10px">
                          <label htmlFor="module_color">Module</label>
                          <input
                            type="text"
                            name="module_color"
                            value={module_color}
                            id="module_color"
                            onChange={e => set_module_color(e.target.value)}
                          />
                          <div>
                            <div style={styles.swatch} onClick={() => set_module_color_picker(!module_color_picker)}>
                              <div
                                style={{
                                  width: "36px",
                                  height: "14px",
                                  borderRadius: "2px",
                                  background: module_color
                                }}
                              />
                            </div>
                            {module_color_picker ? (
                              <div style={styles.popover}>
                                <div style={styles.cover} onClick={() => set_module_color_picker(false)} />
                                <SketchPicker
                                  color={module_color}
                                  presetColors={preset_colors}
                                  onChange={color => set_module_color(color.hex)}
                                />
                              </div>
                            ) : null}
                          </div>
                        </li>
                        <li className="w-100per max-w-150px ">
                          <label htmlFor="button_color">Button</label>
                          <input
                            type="text"
                            name="button_color"
                            value={button_color}
                            id="button_color"
                            onChange={e => set_button_color(e.target.value)}
                          />
                          <div>
                            <div style={styles.swatch} onClick={() => set_button_color_picker(!button_color_picker)}>
                              <div
                                style={{
                                  width: "36px",
                                  height: "14px",
                                  borderRadius: "2px",
                                  background: button_color
                                }}
                              />
                            </div>
                            {button_color_picker ? (
                              <div style={styles.popover}>
                                <div style={styles.cover} onClick={() => set_button_color_picker(false)} />
                                <SketchPicker
                                  color={button_color}
                                  presetColors={preset_colors}
                                  onChange={color => set_button_color(color.hex)}
                                />
                              </div>
                            ) : null}
                          </div>
                        </li>
                      </ul>
                      <li>
                        <label htmlFor="subject">Subject</label>
                        <input type="text" name="subject" value={subject} id="subject" onChange={e => set_subject(e.target.value)} />
                      </li>
                      <li>
                        <label htmlFor="email_h1">Heading</label>
                        <input type="text" name="email_h1" value={email_h1} id="email_h1" onChange={e => set_email_h1(e.target.value)} />
                      </li>
                      <li>
                        <label htmlFor="email_h2">Summary</label>
                        <textarea
                          className="edit_product_textarea h-10rem"
                          name="email_h2"
                          value={email_h2}
                          id="email_h2"
                          onChange={e => set_email_h2(e.target.value)}
                        />
                      </li>
                      <ImageDisplay images={images} set_images={set_images} image={image} set_image={set_image} />
                      <li>
                        <label htmlFor="email_p">Body</label>
                        <textarea
                          className="edit_product_textarea h-50rem"
                          name="email_p"
                          value={email_p}
                          id="email_p"
                          onChange={e => set_email_p(e.target.value)}
                        />
                      </li>
                      <li>
                        <label htmlFor="email_button">Button Text</label>
                        <input
                          type="text"
                          name="email_button"
                          value={email_button}
                          id="email_button"
                          onChange={e => set_email_button(e.target.value)}
                        />
                      </li>
                      <li>
                        <input
                          type="text"
                          name="email_link"
                          value={email_link}
                          id="email_link"
                          onChange={e => set_email_link(e.target.value)}
                        />
                      </li>

                      <div className="jc-b g-10px">
                        <div className="column w-100per">
                          <label htmlFor="email_link">Scheduled Date</label>
                          <input type="text" value={date} className="w-100per" onChange={e => set_date(e.target.value)} />
                        </div>
                        <div className="column w-100per">
                          <label htmlFor="email_link">Scheduled Time</label>
                          <input type="text" value={time} className="w-100per" onChange={e => set_time(e.target.value)} />
                        </div>
                      </div>

                      {loading_checkboxes ? (
                        <div>Loading...</div>
                      ) : (
                        <li>
                          <label htmlFor="email_active">Active</label>
                          <input
                            type="checkbox"
                            name="email_active"
                            defaultChecked={email_active}
                            id="email_active"
                            onChange={e => {
                              set_email_active(e.target.checked);
                            }}
                          />
                        </li>
                      )}
                    </div>
                  </div>
                  {/* {image_display(images)} */}

                  <li>
                    <GLButton type="submit" variant="primary">
                      {id ? "Update" : "Create"}
                    </GLButton>
                  </li>
                  <li>
                    <Link to={"/secure/glow/emails/announcement/" + email._id}>
                      <GLButton variant="secondary" className="w-100per" aria-label="view">
                        Go to Email Sender
                      </GLButton>
                    </Link>
                  </li>
                  <li>
                    <Link to="/secure/glow/emails/">
                      <GLButton variant="secondary" className="w-100per">
                        Back to Emails
                      </GLButton>
                    </Link>
                  </li>
                  <li>{template}</li>
                </ul>
              </div>
            )}
          </Loading>
          {/* )} */}
        </form>
      </div>
    </div>
  );
};
export default EditEmailPage;
