import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GLModal from "../../../shared/GlowLEDsComponents/GLActiionModal/GLActiionModal";
import { set_edit_paycheck_modal, set_paycheck } from "../../../slices/paycheckSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";

const EditPaycheckModal = () => {
  const dispatch = useDispatch();
  const paycheckPage = useSelector(state => state.paychecks.paycheckPage);
  const { edit_paycheck_modal, paycheck, loading } = paycheckPage;
  const { affiliate, user, team, promo_code } = paycheck;

  const affiliatePage = useSelector(state => state.affiliates);
  const { affiliates, loading: loading_affiliates } = affiliatePage;

  const userPage = useSelector(state => state.users.userPage);
  const { users, loading: loading_users } = userPage;

  const teamPage = useSelector(state => state.teams);
  const { teams, loading: loading_teams } = teamPage;

  const promoPage = useSelector(state => state.promos);
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

  const formFields = {
    affiliate: {
      type: "autocomplete_single",
      label: "Affiliate",
      options: affiliates,
      labelProp: "artist_name"
    },
    user: {
      type: "autocomplete_single",
      label: "User",
      options: users,
      labelProp: "artist_name"
    },
    team: {
      type: "autocomplete_single",
      label: "User",
      options: teams,
      labelProp: "artist_name"
    },
    promo_code: {
      type: "autocomplete_single",
      label: "User",
      options: promos,
      labelProp: "artist_name"
    },
    amount: {
      type: "number",
      label: "Amount"
    },
    revenue: {
      type: "number",
      label: "Revenue"
    },
    earned: {
      type: "number",
      label: "Earned"
    },
    uses: {
      type: "number",
      label: "Uses"
    },
    venmo: {
      type: "number",
      label: "Venmo"
    },
    stripe_connect_id: {
      type: "number",
      label: "Stripe Connect ID"
    },
    paid: {
      type: "number",
      label: "Paid"
    },
    paid_at: {
      type: "number",
      label: "Paid At"
    },
    reciept: {
      type: "number",
      label: "Reciept"
    }
  };

  return (
    <div>
      <GLModal
        isOpen={edit_paycheck_modal}
        onConfirm={() => {
          dispatch(API.savePaycheck({ ...paycheck, affiliate: affiliate._id, user: user._id, team: team._id, promo_code: promo_code._id }));
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
      </GLModal>
    </div>
  );
};

export default EditPaycheckModal;
