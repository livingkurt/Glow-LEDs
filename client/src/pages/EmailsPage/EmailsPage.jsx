import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Loading, Notification } from "../../shared/SharedComponents";
import { Helmet } from "react-helmet";
import Search from "../../shared/GlowLEDsComponents/GLTable/Search";
import Sort from "../../shared/GlowLEDsComponents/GLTable/Sort";
import { humanize } from "../../utils/helper_functions";
import { GLButton } from "../../shared/GlowLEDsComponents";
import * as API from "../../api";

const EmailsPage = props => {
  const [search, set_search] = useState("");
  const [sort, setSortOrder] = useState("");

  const category = props.match.params.category ? props.match.params.category : "";
  const emailSlice = useSelector(state => state.emailSlice);
  const { loading, emails, message, error, success } = emailSlice;

  const dispatch = useDispatch();

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listEmails({}));
    }
    return () => (clean = false);
  }, [success, dispatch]);

  const handleListItems = e => {
    e.preventDefault();
    dispatch(API.listEmails({ category, search, sort }));
  };

  const sortHandler = e => {
    setSortOrder(e.target.value);
    dispatch(API.listEmails({ category, search, sort: e.target.value }));
  };

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listEmails({ category, search, sort }));
    }
    return () => (clean = false);
  }, [dispatch, category, search, sort]);
  const deleteHandler = email => {
    dispatch(API.deleteEmail(email._id));
  };
  const colors = [
    { name: "Draft", color: "#7d5555" },
    { name: "Scheduled", color: "#3e4c6d" },
    { name: "Sent", color: "#3e6d69" }
  ];

  const determine_color = email => {
    let result = "";
    if (email.status === "draft") {
      result = colors[0].color;
    } else if (email.status === "scheduled") {
      result = colors[1].color;
    } else if (email.status === "sent") {
      result = colors[2].color;
    }

    return result;
  };

  const change_email_status = email => {
    dispatch(
      API.saveEmail({
        ...email,
        active: email.active ? false : true
      })
    );
    dispatch(API.listEmails({}));
    dispatch(API.listEmails({}));
  };

  const sort_options = ["Email Type"];

  const templates = [
    "announcement",
    "review",
    "account_created",
    "reset_password",
    "password_reset",
    "email_subscription",
    "order",
    "review",
    "affiliate",
    "feature",
    "contact",
    "contact_confirmation",
    "custom_contact",
    "account_created"
  ];

  const [link, set_link] = useState("announcement");

  const determine_status_icon = status => {
    switch (status) {
      case "draft":
        return <i className="fas fa-memo" aria-hidden="false" />;
      case "scheduled":
        return <i className="fas fa-clock" aria-hidden="false" />;
      case "sent":
        return <i className="fas fa-paper-plane" aria-hidden="false" />;

      default:
        break;
    }
  };

  return (
    <div className="main_container p-20px">
      <Helmet>
        <title>Admin Emails | Glow LEDs</title>
      </Helmet>
      <Notification message={message} />
      <div className="wrap jc-b ai-c">
        <div className="ai-c h-25px mv-15px jc-c">
          <div className="custom-select">
            <select className="qty_select_dropdown" onChange={e => set_link(e.target.value)}>
              <option key={1} defaultValue="">
                ---Choose Email Template---
              </option>
              {templates.map((item, index) => (
                <option key={index} value={item}>
                  {humanize(item)}
                </option>
              ))}
            </select>
            <span className="custom-arrow" />
          </div>
          <a href={"/api/templates/" + link} rel="noreferrer" target="_blank" className="ml-10px">
            <GLButton variant="primary">Preview</GLButton>
          </a>
        </div>

        <Link to="/secure/glow/editemail">
          <GLButton variant="primary">Create Email</GLButton>
        </Link>
      </div>

      <div className="wrap">
        {colors.map((color, index) => {
          return (
            <div className="wrap jc-b m-1rem" key={index}>
              <label style={{ marginRight: "1rem" }}>{color.name}</label>
              <div
                style={{
                  backgroundColor: color.color,
                  height: "20px",
                  width: "60px",
                  borderRadius: "5px"
                }}
              />
            </div>
          );
        })}
      </div>
      <div className="jc-c">
        <h1 style={{ textAlign: "center" }}>Emails</h1>
      </div>
      <div className="search_and_sort row jc-c ai-c" style={{ overflowX: "scroll" }}>
        <Search search={search} set_search={set_search} handleListItems={handleListItems} category={category} />
        <Sort sortHandler={sortHandler} sort_options={sort_options} />
      </div>
      <Loading loading={loading} error={error}>
        {emails && (
          <div className="email-list responsive_table ">
            <table className="table">
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Subjects</th>
                  <th>Title</th>
                  <th>Scheduled At</th>
                  {/* <th>Active</th> */}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {emails.map((email, index) => (
                  <tr
                    key={index}
                    style={{
                      backgroundColor: determine_color(email),
                      fontSize: "16px"
                    }}
                  >
                    <td className="paragraph_font ta-c">
                      {email.status === "draft" ? (
                        <i className="fas fa-file-alt" />
                      ) : email.status === "scheduled" ? (
                        <i className="fas fa-clock" />
                      ) : (
                        <i className="fas fa-paper-plane" />
                      )}
                    </td>
                    <td className="p-10px min-w-300px paragraph_font">{email.subject}</td>
                    <td className="p-10px min-w-300px paragraph_font">{email.h1}</td>
                    <td className="p-10px  min-w-350px paragraph_font">{email.h2 && email.h2.slice(0, 30)}...</td>
                    {/* <td className="p-10px  min-w-200px paragraph_font">
                      {email.scheduled_at &&
                        `${format_date(email.scheduled_at)} ${format_time(
                          email.scheduled_at
                        )}`}
                    </td> */}
                    {/* <td className="p-10px paragraph_font min-w-10px">
                      <GLButton
                        variant="icon"
                        onClick={() => change_email_status(email)}
                      >
                        {email.active ? (
                          <i className="fas fa-check-circle" />
                        ) : (
                          <i className="fas fa-times-circle" />
                        )}
                      </GLButton>
                    </td> */}
                    <td className="p-10px">
                      <div className="jc-b">
                        <Link to={"/secure/glow/editemail/" + email._id}>
                          <GLButton variant="icon" aria-label="Edit">
                            <i className="fas fa-edit" />
                          </GLButton>
                        </Link>
                        <Link to={"/secure/glow/emails/announcement/" + email._id}>
                          <GLButton variant="icon" aria-label="view">
                            <i className="fas fa-mountain" />
                          </GLButton>
                        </Link>
                        <GLButton variant="icon" onClick={() => deleteHandler(email)} aria-label="Delete">
                          <i className="fas fa-trash-alt" />
                        </GLButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Loading>
    </div>
  );
};
export default EmailsPage;
