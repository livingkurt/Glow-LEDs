import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { API_Emails, API_Promos } from "../../../utils";
import { validate_email } from "../../../utils/validations";
import { GLButton } from "../../../shared/GlowLEDsComponents";
import useWindowDimensions from "../../../shared/Hooks/useWindowDimensions";
import * as API from "../../../api";
import { daysBetween } from "../../../utils/helper_functions";
import Close from "@mui/icons-material/Close";

import GLIconButton from "../../../shared/GlowLEDsComponents/GLIconButton/GLIconButton";
import GLLazyImage from "../../../shared/GlowLEDsComponents/GLLazyImage/GLLazyImage";
import Typography from "@mui/material/Typography";

const AskForEmailModal = () => {
  const [email, set_email] = useState("");
  const [complete, set_complete] = useState(false);
  const dispatch = useDispatch();
  const [email_validations, setEmailValidations] = useState("");
  const [show_modal, set_show_modal] = useState(false);

  var modal = document.getElementById("myModal");

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  const date = new Date();
  const today = date.toISOString();

  useEffect(() => {
    let clean = true;
    if (clean) {
      const popup = JSON.parse(localStorage.getItem("popup"));
      if (!popup || daysBetween(popup.date, today) > 2) {
        setTimeout(() => {
          set_show_modal(true);
          // Update local storage when the popup shows
          localStorage.setItem("popup", JSON.stringify({ date: today }));
        }, 5000);
      }
    }
    return () => (clean = false);
  }, [today]);

  const submitHandler = async e => {
    e.preventDefault();
    const data = { email };
    const request = await validate_email(data);

    setEmailValidations(request.errors.email);
    if (request.isValid) {
      dispatch(
        API.saveUser({
          user: {
            _id: null,
            first_name: "",
            last_name: "",
            email,
            affiliate: null,
            is_affiliated: false,
            isVerified: true,
            isAdmin: false,
            email_subscription: true,
            shipping: {},
          },
          profile: false,
        })
      );
      const { data: promo } = await API_Promos.create_one_time_use_code();
      await API_Emails.send_email_subscription(email, promo.promo_code);
      localStorage.setItem("popup", JSON.stringify({ date: today, email: true }));
      set_complete(true);

      setTimeout(() => {
        set_show_modal(false);
      }, 5000);
    }
  };

  const { width } = useWindowDimensions();
  return (
    <div
      id="myModal"
      style={{
        display: show_modal ? "block" : "none",
      }}
      className={`modal-floating ${complete ? "max-h-325px" : "max-h-300px"} max-w-500px fade_in ${
        width < 535 && "mh-auto-20px"
      }`}
    >
      <GLIconButton
        className="pos-abs right-15px top-10px close"
        data-testid="close_email_modal"
        tooltip="Close"
        onClick={() => {
          set_show_modal(false);
          localStorage.setItem("popup", JSON.stringify({ date: today, email: false }));
        }}
      >
        <Close />
      </GLIconButton>
      {complete ? (
        <div className="column jc-b ai-c p-20px">
          <div className="mb-2rem">
            <Typography
              variant="h2"
              className={`title_font ${width < 535 ? "fs-20px lh-30px" : "fs-28px lh-40px"} ta-c jc-c `}
            >
              {"Thank you for Signing Up!"}
            </Typography>
          </div>

          <div>
            <GLLazyImage
              src="https://thumbs2.imgbox.com/b1/08/2Dnle6TI_t.jpeg"
              alt=""
              className="w-100per h-auto br-20px max-w-250px"
            />
          </div>
          <div>
            <p className="p_descriptions fs-16px ta-c jc-c">{"Check your email for your 10% off Promo Code!"}</p>
          </div>
        </div>
      ) : (
        <form onSubmit={submitHandler} className="modal-content-floating ">
          <div className="h-100per jc-b column">
            <Typography variant="h3" className="p_descriptions fs-16px ta-c jc-c">
              {"Come Into the Light"}
            </Typography>
            <Typography
              variant="h2"
              className={`title_font ${width < 535 ? "fs-20px lh-30px" : "fs-30px lh-40px"} ta-c jc-c `}
            >
              {"Get 10% Off Your Next Order"}
            </Typography>
            <Typography variant="h3" className="p_descriptions fs-16px ta-c jc-c">
              {"It's Brighter Over Here"}
            </Typography>
            <div>
              <div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="w-100per"
                  onChange={e => set_email(e.target.value)}
                />
              </div>
              <div className="mt-10px">
                <div className="validation_text" style={{ textAlign: "center" }}>
                  {email_validations}
                </div>
              </div>
              <div>
                <GLButton
                  type="submit"
                  variant="inherit"
                  className="w-100per mt-2rem bg-white ft-primary title_font bob"
                >
                  {"Join Us"}
                </GLButton>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default AskForEmailModal;
