import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GLModal from "../../../shared/GlowLEDsComponents/GLActiionModal/GLActiionModal";
import { set_edit_paycheck_modal, set_paycheck } from "../../../slices/paycheckSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";

const EditPaycheckModal = () => {
  const dispatch = useDispatch();
  const paychecksSlice = useSelector(state => state.paycheckSlice.paycheckPage);
  const { edit_paycheck_modal, paycheck, loading } = paychecksSlice;
  const { affiliate, user, team, promo_code } = paycheck;

  const affiliateSlice = useSelector(state => state.affiliateSlice);
  const { affiliates, loading: loading_affiliates } = affiliateSlice;

  const userSlice = useSelector(state => state.userSlice);
  const { users, loading: loading_users } = userSlice;

  const teamSlice = useSelector(state => state.teamSlice);
  const { teams, loading: loading_teams } = teamSlice;

  const promoSlice = useSelector(state => state.promoSlice);
  const { promos, loading: loading_promos } = promoSlice;

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
      type: "autocomplete",
      label: "Affiliate",
      options: affiliates,
      labelProp: "artist_name"
    },
    user: {
      type: "autocomplete",
      label: "User",
      options: users,
      labelProp: "artist_name"
    },
    team: {
      type: "autocomplete",
      label: "User",
      options: teams,
      labelProp: "artist_name"
    },
    promo_code: {
      type: "autocomplete",
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
