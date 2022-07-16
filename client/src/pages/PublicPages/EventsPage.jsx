import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { API_External } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../../components/UtilityComponents";
import { daysBetween, format_date } from "../../utils/helper_functions";
import { GLButton } from "../../components/GlowLEDsComponents";

const EventsPage = props => {
  const [ events, set_events ] = useState([]);
  const [ loading, set_loading ] = useState(false);
  const [ going, set_going ] = useState(false);
  const [ loading_checkboxes, set_loading_checkboxes ] = useState(true);

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  setTimeout(() => {
    set_loading_checkboxes(false);
  }, 500);

  useEffect(() => {
    let clean = true;
    if (clean) {
      get_events();
    }
    return () => (clean = false);
  }, []);

  const get_events = async () => {
    set_loading(true);
    const { data } = await API_External.get_events();
    console.log({ events: data });
    set_events(data);
    set_loading(false);
  };

  const today = new Date();

  const colors = [
    { name: "< 7 Days", color: "#4a4a4a" },
    { name: "7-14 Days", color: "#3e4c6d" },
    { name: "14-28 Days", color: "#3f6561" },
    { name: "> 28", color: "#6d3e3e" },
    { name: "7 Days", color: "#323232" },
    { name: "14 Days", color: "#5f75a9" },
    { name: "28 Days", color: "#6aa59e" },
  ];

  const festivals_going = "Festival: ILLfest Music Arts Festival Austin, Tex.";
  const determine_color = event => {
    const days = daysBetween(event.date, today);

    if (days < 7) {
      return "#4a4a4a";
    }
    if (days >= 7 && days <= 14) {
      return "#3e4c6d";
    }
    if (days >= 14 && days <= 28) {
      return "#3f6561";
    }
    if (days > 28) {
      return "#6d3e3e";
    }
    if (days === 7) {
      return "#323232";
    }
    if (days === 14) {
      return "#5f75a9";
    }
    if (days === 28) {
      return "#6aa59e";
    }
  };
  const determine_font = (date, days_until) => {
    const d = new Date(date);
    d.setDate(d.getDate() - days_until).toLocaleString();
    // return format_date(d.toISOString());
    const days = daysBetween(d, today);
    console.log({ days });
    if (days === 0) {
      return { backgroundColor: "#810000" };
    }
    if (days === 1) {
      return { backgroundColor: "#006258" };
    }
    if (days === 2) {
      return { backgroundColor: "#001f68" };
    }
  };
  const determine_alt_days_until = (date, days_until) => {
    const d = new Date(date);
    d.setDate(d.getDate() - days_until).toLocaleString();
    // return format_date(d.toISOString());
    return daysBetween(d, today);
  };

  const determine_action_dates = (date, days) => {
    const d = new Date(date);
    d.setDate(d.getDate() - days).toLocaleString();
    return format_date(d.toISOString());
  };

  return (
    <div className="">
      <Helmet>
        <title>Events Page | Glow LEDs</title>
        <meta property="og:title" content="Events Page" />
        <meta name="twitter:title" content="Events Page" />
        <link
          rel="canonical"
          href="https://www.glow-leds.com/account/checkemail"
        />
        <meta
          property="og:url"
          content="https://www.glow-leds.com/account/checkemail"
        />
      </Helmet>
      <Loading loading={loading} />
      <div className="wrap jc-b">
        <div className="wrap jc-b">
          {userInfo &&
            userInfo.isAdmin &&
            colors.map((color, index) => {
              return (
                <div className="wrap jc-b w-16rem m-1rem" key={index}>
                  <label style={{ marginRight: "1rem" }}>{color.name}</label>
                  <div
                    style={{
                      backgroundColor: color.color,
                      height: "20px",
                      width: "60px",
                      borderRadius: "5px",
                    }}
                  />
                </div>
              );
            })}
        </div>
        <GLButton
          variant={!going ? "primary" : "secondary"}
          onClick={() => set_going(going => (going ? false : true))}
        >
          {going ? "Show All Festivals" : "Show Going Festivals"}
        </GLButton>
      </div>

      <h1 style={{ textAlign: "center" }}>US Festivals</h1>
      <ul>
        {!going &&
          events &&
          events.map(event => (
            <li
              className={`container`}
              style={{
                backgroundColor:
                  userInfo && userInfo.isAdmin
                    ? determine_color(event)
                    : festivals_going.includes(event.title)
                      ? "#4d5061"
                      : "#6a6c80",
              }}
            >
              <div className="jc-b">
                <div>
                  <a
                    href={event.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Event Title"
                  >
                    <div className="title_font">{event.title}</div>
                  </a>

                  <div className="mt-5px">
                    {event.date} - {daysBetween(event.date, today)} Days Until{" "}
                  </div>

                  <div className="mt-5px">
                    {event.city}, {event.state}
                  </div>
                  <div className="mt-5px">{event.age}</div>
                </div>
                {userInfo &&
                userInfo.isAdmin && (
                  <div className="w-350px">
                    <div
                      className="mt-5px p-5px br-10px"
                      style={determine_font(event.date, 28)}
                    >
                      Sale: {determine_action_dates(event.date, 28)}
                      {determine_alt_days_until(event.date, 28) > 0 ? (
                        " | " +
                        determine_alt_days_until(event.date, 28) +
                        " Days Until"
                      ) : (
                        " | " +
                        Math.abs(determine_alt_days_until(event.date, 28)) +
                        " Days Past"
                      )}
                    </div>
                    <div
                      className="mt-5px p-5px br-10px"
                      style={determine_font(event.date, 14)}
                    >
                      Reminder: {determine_action_dates(event.date, 14)}
                      {determine_alt_days_until(event.date, 14) > 0 ? (
                        " | " +
                        determine_alt_days_until(event.date, 14) +
                        " Days Until"
                      ) : (
                        " | " +
                        Math.abs(determine_alt_days_until(event.date, 14)) +
                        " Days Past"
                      )}
                    </div>
                    <div
                      className="mt-5px p-5px br-10px"
                      style={determine_font(event.date, 7)}
                    >
                      Last Chance: {determine_action_dates(event.date, 7)}
                      {determine_alt_days_until(event.date, 7) > 0 ? (
                        " | " +
                        determine_alt_days_until(event.date, 7) +
                        " Days Until"
                      ) : (
                        " | " +
                        Math.abs(determine_alt_days_until(event.date, 7)) +
                        " Days Past"
                      )}
                    </div>
                    <div
                      className="mt-5px p-5px br-10px"
                      style={determine_font(event.date, 0)}
                    >
                      Festival: {determine_action_dates(event.date, 0)}
                      {determine_alt_days_until(event.date, 0) > 0 ? (
                        " | " +
                        determine_alt_days_until(event.date, 0) +
                        " Days Until"
                      ) : (
                        " | " +
                        Math.abs(determine_alt_days_until(event.date, 0)) +
                        " Days Past"
                      )}
                    </div>
                  </div>
                )}
              </div>
            </li>
          ))}
        {going &&
          events &&
          events
            .filter(event => festivals_going.includes(event.title))
            .map(event => (
              <li
                className={`container`}
                style={{
                  backgroundColor: festivals_going.includes(event.title)
                    ? "#4d5061"
                    : "#6a6c80",
                }}
              >
                <a
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Event Title"
                >
                  <div className="title_font">{event.title}</div>
                </a>
                <div className="mt-5px">
                  {event.date} - {daysBetween(event.date, today)} Days Until{" "}
                </div>
                <div className="mt-5px">
                  {event.city}, {event.state}
                </div>
                <div className="mt-5px">{event.age}</div>
              </li>
            ))}
      </ul>
    </div>
  );
};
export default EventsPage;
