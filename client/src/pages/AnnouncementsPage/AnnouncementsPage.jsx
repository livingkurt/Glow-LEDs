import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import * as API from "../../api";

const AnnouncementsPage = props => {
  const emailSlice = useSelector(state => state.emailSlice);
  const { emails } = emailSlice;

  const dispatch = useDispatch();

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listEmails({ email_type: "Announcements", active: true, limit: 1 }));
    }
    return () => (clean = false);
  }, [dispatch]);

  useEffect(() => {
    let clean = true;
    if (clean) {
      const active_email = emails.find(email => email.active === true);
      if (active_email) {
        dispatch(API.detailsEmail(active_email._id));
      }
    }
    return () => (clean = false);
  }, [emails, dispatch]);
  return (
    <div className="main_container p-20px">
      <Helmet>
        <title>Announcements | Glow LEDs</title>
        <meta property="og:title" content="Featured" />
        <meta name="twitter:title" content="Featured" />
        <link rel="canonical" href="https://www.glow-leds.com/pages/featured" />
        <meta property="og:url" content="https://www.glow-leds.com/pages/featured" />
        <meta
          name="description"
          content="Here at Glow LEDs we want all you glovers, ravers, festival goers, and even home decor peeps to be apart of our community."
        />
        <meta
          property="og:description"
          content="Here at Glow LEDs we want all you glovers, ravers, festival goers, and even home decor peeps to be apart of our community."
        />
        <meta
          name="twitter:description"
          content="Here at Glow LEDs we want all you glovers, ravers, festival goers, and even home decor peeps to be apart of our community."
        />
      </Helmet>
      <div className="jc-c">
        <h1>Annoucements</h1>
      </div>

      {emails &&
        emails.slice(0).map((email, index) => {
          return (
            <div className="container" key={index}>
              <div style={{ backgroundColor: "#333333", padding: "20px" }} className="br-10px">
                <h4
                  style={{
                    textAlign: "center",
                    fontFamily: "helvetica",
                    width: "100%",
                    margin: "0 auto",
                    lineHeight: "50px",
                    color: "white",
                    fontSize: "2em"
                  }}
                >
                  {email.h1}
                </h4>
              </div>
              <div style={{ padding: "20px" }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {email.show_image && (
                    <table width="100%" style={{ maxWidth: "900px" }}>
                      <tr>
                        <td>
                          <img
                            src={email.images.length > 0 ? email.images[0] : email.image}
                            alt="Promo"
                            title="Promo"
                            style={{
                              textAlign: "center",
                              width: "100%",
                              borderRadius: "20px"
                            }}
                          />
                        </td>
                      </tr>
                    </table>
                  )}
                </div>
                <h4
                  style={{
                    textAlign: "center",
                    fontFamily: "helvetica",
                    color: "white",
                    fontSize: "1.5em",
                    marginTop: "20px",
                    marginBottom: "0"
                  }}
                >
                  {email.h2}
                </h4>

                <pre
                  style={{
                    fontFamily: "helvetica",
                    overflowX: "auto",
                    whiteSpace: "pre-wrap",
                    whiteSpace: "-moz-pre-wrap",
                    whiteSpace: "-pre-wrap",
                    whiteSpace: "-o-pre-wrap",
                    wordWrap: "break-word",
                    maxWidth: "800px",
                    width: "100%",
                    margin: "20px auto",
                    color: "white",
                    fontSize: "16px",
                    lineHeight: "30px"
                  }}
                >
                  {email.p}
                </pre>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center"
                  }}
                >
                  <a
                    href={email.link}
                    style={{
                      backgroundColor: "#4c4f60",
                      color: "white",
                      borderRadius: "10px",
                      border: 0,
                      padding: "15px"
                    }}
                  >
                    <h4
                      style={{
                        fontFamily: "helvetica",
                        margin: 0,
                        fontSize: "1.2em",
                        textAlign: "center"
                      }}
                    >
                      {email.button}
                    </h4>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};
export default AnnouncementsPage;
