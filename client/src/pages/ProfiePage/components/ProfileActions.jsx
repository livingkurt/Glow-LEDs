import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { GLButton } from "../../../shared/GlowLEDsComponents";
import { open_edit_user_modal } from "../../../slices/userSlice";

import { open_edit_affiliate_modal } from "../../../slices/affiliateSlice";
import { EditAffiliateModal } from "../../AffiliatesPage/components";
import { open_edit_wholesaler_modal } from "../../../slices/wholesalerSlice";
import { EditWholesalerModal } from "../../WholesalersPage/components";
import * as API from "../../../api";

export const ProfileActions = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const userPage = useSelector(state => state.users.userPage);
  const { current_user, user } = userPage;
  const affiliatePage = useSelector(state => state.affiliates.affiliatePage);
  const { affiliate } = affiliatePage;
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
      {current_user?.isAdmin ? (
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
                maxWidth: "210px",
                marginRight: "10px"
              }}
              variant="primary"
            >
              Change Password
            </GLButton>
          </Link>
        </div>
      )}

      {user.is_affiliated && (
        <div>
          <GLButton
            variant="primary"
            onClick={() => {
              if (user?.affiliate?._id) {
                dispatch(API.detailsAffiliate({ id: user?.affiliate?._id }));
              }
              dispatch(open_edit_affiliate_modal(affiliate));
            }}
          >
            Edit Affiliate Profile
          </GLButton>
        </div>
      )}

      {user.isWholesaler && (
        <div>
          <GLButton
            variant="primary"
            onClick={() => {
              dispatch(open_edit_wholesaler_modal(user.wholesaler));
            }}
          >
            Edit Wholesaler Profile
          </GLButton>
        </div>
      )}
      {current_user?.isAdmin && (
        <div>
          <GLButton
            variant="primary"
            onClick={() => {
              dispatch(API.loginAsUser(user));
            }}
          >
            Sign In as User
          </GLButton>
        </div>
      )}
      <EditAffiliateModal />
      <EditWholesalerModal />
    </div>
  );
};
