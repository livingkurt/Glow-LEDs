import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { set_edit_paycheck_modal, set_paycheck } from "../../../slices/paycheckSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { paycheckFormFields } from "../paycheckformFields";

const EditPaycheckModal = () => {
  const dispatch = useDispatch();
  const paycheckPage = useSelector(state => state.paychecks.paycheckPage);
  const { edit_paycheck_modal, paycheck, loading } = paycheckPage;
  const { affiliate, user, team, promo_code } = paycheck;

  const affiliatePage = useSelector(state => state.affiliates.affiliatePage);
  const { affiliates, loading: loading_affiliates } = affiliatePage;

  const userPage = useSelector(state => state.users.userPage);
  const { users, loading: loading_users } = userPage;

  const teamPage = useSelector(state => state.teams.teamPage);
  const { teams, loading: loading_teams } = teamPage;

  const promoPage = useSelector(state => state.promos.promoPage);
  const { promos, loading: loading_promos } = promoPage;

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listAffiliates({ active: true }));
      dispatch(API.listUsers({}));
      dispatch(API.listTeams({}));
      dispatch(API.listPromos({}));
    }
    return () => {
      clean = false;
    };
  }, [dispatch, paycheck._id]);

  const formFields = paycheckFormFields({ users, promos, teams, affiliates });

  return (
    <div>
      <GLActionModal
        isOpen={edit_paycheck_modal}
        onConfirm={() => {
          dispatch(API.savePaycheck(paycheck));
          dispatch(API.listAffiliates({ active: true }));
        }}
        onCancel={() => {
          dispatch(set_edit_paycheck_modal(false));
        }}
        title={"Edit Paycheck"}
        confirmLabel={"Save"}
        confirmColor="primary"
        cancelLabel={"Cancel"}
        cancelColor="secondary"
        disableEscapeKeyDown
      >
        <GLForm
          formData={formFields}
          state={paycheck}
          onChange={value => dispatch(set_paycheck(value))}
          loading={loading && loading_affiliates}
        />
      </GLActionModal>
    </div>
  );
};

export default EditPaycheckModal;
