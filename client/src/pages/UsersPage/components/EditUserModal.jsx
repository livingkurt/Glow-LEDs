import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { set_edit_user_modal, set_user } from "../../../slices/userSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { useLocation } from "react-router-dom";
import { userFormFields } from "../userFormFields";
import { useAffiliatesQuery, usePromosQuery, useTeamsQuery, useWholesalersQuery } from "../../../api/allRecordsApi";

const EditUserModal = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const userPage = useSelector(state => state.users.userPage);
  const { edit_user_modal, user, loading } = userPage;

  const { affiliate } = user;

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listAffiliates({ active: true, limit: 0, page: 0 }));
      dispatch(API.listWholesalers());
      dispatch(API.listPromos({}));
      dispatch(API.listTeams({}));
    }
    return () => {
      clean = false;
    };
  }, [dispatch]);

  const { data: promos, isLoading: promosLoading } = usePromosQuery();
  const { data: affiliates, isLoading: affiliatesLoading } = useAffiliatesQuery();
  const { data: wholesalers, isLoading: wholesalersLoading } = useWholesalersQuery();
  const { data: teams, isLoading: teamsLoading } = useTeamsQuery();

  const formFields = userFormFields({
    affiliates: affiliatesLoading ? [] : affiliates,
    wholesalers: wholesalersLoading ? [] : wholesalers,
    promos: promosLoading ? [] : promos,
    teams: teamsLoading ? [] : teams,
  });

  return (
    <div>
      <GLActionModal
        isOpen={edit_user_modal}
        onConfirm={() => {
          dispatch(
            API.saveUser({
              user: { ...user, affiliate: affiliate?._id ? affiliate?._id : null },
              profile: location.pathname === "/secure/account/profile",
            })
          );
        }}
        onCancel={() => {
          dispatch(set_edit_user_modal(false));
        }}
        title="Edit User"
        confirmLabel="Save"
        confirmColor="primary"
        cancelLabel="Cancel"
        cancelColor="secondary"
        disableEscapeKeyDown
      >
        <GLForm formData={formFields} state={user} onChange={value => dispatch(set_user(value))} loading={loading} />
      </GLActionModal>
    </div>
  );
};

export default EditUserModal;
