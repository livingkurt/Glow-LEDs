import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Helmet } from "react-helmet";
import { GLButton } from "../../shared/GlowLEDsComponents";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import { open_create_paycheck_modal, open_edit_paycheck_modal } from "../../slices/paycheckSlice";
import { EditPaycheckModal } from "./components";
import * as API from "../../api";
import { Button } from "@mui/material";
import { determineColor } from "./paychecksHelpers";
import { format_date } from "../../utils/helper_functions";
import { fullName } from "../UsersPage/usersHelpers";
import GLBoolean from "../../shared/GlowLEDsComponents/GLBoolean/GLBoolean";

const PaychecksPage = () => {
  const paycheckPage = useSelector(state => state.paychecks.paycheckPage);
  const { message, loading, remoteVersionRequirement } = paycheckPage;

  const paycheckTable = useSelector(state => state.paychecks.paycheckTable);
  const { selectedRows } = paycheckTable;
  const date = new Date();
  const dispatch = useDispatch();

  const today = date.toISOString();

  const formatDate = dateString => {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = ("0" + (date.getUTCMonth() + 1)).slice(-2);
    const day = ("0" + date.getUTCDate()).slice(-2);
    const formattedDate = `${month}/${day}/${year}`;
    return formattedDate;
  };

  const columnDefs = useMemo(
    () => [
      { title: "Date Paid", display: paycheck => paycheck.paid_at && formatDate(paycheck.paid_at) },
      {
        title: "Paid",
        display: paycheck => <GLBoolean boolean={paycheck.paid} />,
      },
      {
        title: "Affiliate/Team",
        display: paycheck =>
          paycheck.affiliate ? paycheck.affiliate.artist_name : paycheck.team && paycheck.team.team_name,
      },
      {
        title: "User",
        display: paycheck => (paycheck.user ? fullName(paycheck.user) : ""),
      },

      { title: "Description", display: "description" },
      { title: "Amount", display: paycheck => `$${paycheck.amount.toFixed(2)}` },
      {
        title: "Team",
        display: paycheck => <GLBoolean boolean={paycheck.team} />,
      },
      {
        title: "Actions",
        display: paycheck => (
          <div className="jc-b">
            <GLButton variant="icon" aria-label="Edit" onClick={() => dispatch(open_edit_paycheck_modal(paycheck))}>
              <i className="fas fa-edit" />
            </GLButton>
            <GLButton
              variant="icon"
              onClick={() =>
                dispatch(
                  API.savePaycheck({
                    ...paycheck,
                    _id: null,
                  })
                )
              }
              aria-label="duplicate"
            >
              <i className="fas fa-clone" />
            </GLButton>
            <GLButton
              variant="icon"
              onClick={() =>
                dispatch(
                  API.savePaycheck({
                    ...paycheck,
                  })
                )
              }
              aria-label="mark paid"
            >
              <i className="fas fa-check-circle" />
            </GLButton>
            <GLButton variant="icon" onClick={() => dispatch(API.deletePaycheck(paycheck._id))} aria-label="Delete">
              <i className="fas fa-trash-alt" />
            </GLButton>
          </div>
        ),
      },
    ],
    []
  );

  const remoteApi = useCallback(options => API.getPaychecks(options), []);
  const remoteFiltersApi = useCallback(() => API.getPaycheckFilters(), []);

  return (
    <div className="main_container p-20px">
      <Helmet>
        <title>Admin Paychecks | Glow LEDs</title>
      </Helmet>

      <GLTableV2
        remoteApi={remoteApi}
        remoteFiltersApi={remoteFiltersApi}
        remoteVersionRequirement={remoteVersionRequirement}
        determineColor={determineColor}
        tableName={"Paychecks"}
        namespaceScope="paychecks"
        namespace="paycheckTable"
        columnDefs={columnDefs}
        loading={loading}
        enableRowSelect={true}
        titleActions={
          <div className="row g-10px">
            {selectedRows.length > 1 && (
              <Button
                color="secondary"
                variant="contained"
                onClick={() => {
                  const confirm = window.confirm(`Are you sure you want to Delete ${selectedRows.length} Paychecks?`);
                  if (confirm) {
                    dispatch(API.deleteMultiplePaychecks(selectedRows));
                  }
                }}
              >
                Delete Paychecks
              </Button>
            )}
            <Button color="primary" variant="contained" onClick={() => dispatch(open_create_paycheck_modal())}>
              Create Paycheck
            </Button>
          </div>
        }
      />
      <EditPaycheckModal />
    </div>
  );
};
export default PaychecksPage;
