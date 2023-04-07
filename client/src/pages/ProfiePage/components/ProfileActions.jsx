import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { GLButton } from "../../../shared/GlowLEDsComponents";
import { open_edit_user_modal } from "../../../slices/userSlice";
import { is_admin } from "../../../utils/helpers/user_helpers";
import { open_edit_affiliate_modal } from "../../../slices/affiliateSlice";
import { EditAffiliateModal } from "../../AffiliatesPage/components";

export const ProfileActions = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const userSlice = useSelector(state => state.userSlice.userPage);
  const { current_user, user } = userSlice;
  const { _id } = user;
  return (
    <div className="row">
      <div
        style={{
          height: 50
        }}
      >
        <GLButton
          style={{
            marginRight: "10px",
            maxWidth: "225px"
          }}
          onClick={() => {
            dispatch(open_edit_user_modal(user));
          }}
          variant="primary"
        >
          Edit Profile
        </GLButton>
      </div>
      {is_admin(current_user) ? (
        <div
          style={{
            height: 50
          }}
        >
          <Link to={"/secure/glow/change_password/" + id}>
            <GLButton
              style={{
                marginRight: "10px",
                maxWidth: "210px"
              }}
              variant="primary"
            >
              Change Password
            </GLButton>
          </Link>
        </div>
      ) : (
        <div>
          <Link to={"/account/changepassword"}>
            <GLButton
              style={{
                maxWidth: "210px"
              }}
              variant="primary"
            >
              Change Password
            </GLButton>
          </Link>
        </div>
      )}

      <div className="ml-10px">
        {user.is_affiliated && (
          <div>
            <GLButton
              variant="primary"
              onClick={() => {
                dispatch(open_edit_affiliate_modal(user.affiliate));
              }}
            >
              Edit Affiliate Profile
            </GLButton>
          </div>
        )}{" "}
      </div>
      <EditAffiliateModal />
    </div>
  );
};
