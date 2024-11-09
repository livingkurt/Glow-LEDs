import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { set_edit_paycheck_modal, set_paycheck } from "../../../slices/paycheckSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { paycheckFormFields } from "../paycheckformFields";
import { useAffiliatesQuery, usePromosQuery, useTeamsQuery, useUsersQuery } from "../../../api/allRecordsApi";

const EditPaycheckModal = () => {
  const dispatch = useDispatch();
  const paycheckPage = useSelector(state => state.paychecks.paycheckPage);
  const { edit_paycheck_modal, paycheck, loading } = paycheckPage;

  const { data: users, isLoading: loadingUsers } = useUsersQuery({});
  const { data: promos, isLoading: loadingPromos } = usePromosQuery({});
  const { data: teams, isLoading: loadingTeams } = useTeamsQuery({});
  const { data: affiliates, isLoading: loadingAffiliates } = useAffiliatesQuery({ active: true });

  const formFields = paycheckFormFields({
    users: loadingUsers ? [] : users || [],
    promos: loadingPromos ? [] : promos || [],
    teams: loadingTeams ? [] : teams || [],
    affiliates: loadingAffiliates ? [] : affiliates || [],
  });

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
        title="Edit Paycheck"
        confirmLabel="Save"
        confirmColor="primary"
        cancelLabel="Cancel"
        cancelColor="secondary"
        disableEscapeKeyDown
      >
        <GLForm
          formData={formFields}
          state={paycheck}
          onChange={value => dispatch(set_paycheck(value))}
          loading={loading}
        />
      </GLActionModal>
    </div>
  );
};

export default EditPaycheckModal;
