import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Helmet } from "react-helmet";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import { open_create_paycheck_modal, open_edit_paycheck_modal } from "../../slices/paycheckSlice";
import { EditPaycheckModal } from "./components";
import * as API from "../../api";

import { determineColor } from "./paychecksHelpers";
import { fullName } from "../UsersPage/usersHelpers";
import GLBoolean from "../../shared/GlowLEDsComponents/GLBoolean/GLBoolean";
import GLIconButton from "../../shared/GlowLEDsComponents/GLIconButton/GLIconButton";
import Edit from "@mui/icons-material/Edit";
import FileCopy from "@mui/icons-material/FileCopy";

import Delete from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Container from "@mui/material/Container";

const PaychecksPage = () => {
  const paycheckPage = useSelector(state => state.paychecks.paycheckPage);
  const { loading, remoteVersionRequirement } = paycheckPage;

  const paycheckTable = useSelector(state => state.paychecks.paycheckTable);
  const { selectedRows } = paycheckTable;
  const dispatch = useDispatch();

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
        title: "",
        nonSelectable: true,
        display: paycheck => (
          <Box display="flex" justifyContent="flex-end">
            <GLIconButton tooltip="Edit" onClick={() => dispatch(open_edit_paycheck_modal(paycheck))}>
              <Edit color="white" />
            </GLIconButton>
            <GLIconButton
              onClick={() =>
                dispatch(
                  API.savePaycheck({
                    ...paycheck,
                    _id: null,
                  })
                )
              }
              tooltip="Duplicate"
            >
              <FileCopy color="white" />
            </GLIconButton>
            <GLIconButton
              onClick={() =>
                dispatch(
                  API.savePaycheck({
                    ...paycheck,
                  })
                )
              }
              tooltip="Mark Paid"
            >
              <CheckCircle color="white" />
            </GLIconButton>
            <GLIconButton onClick={() => dispatch(API.deletePaycheck(paycheck._id))} tooltip="Delete">
              <Delete color="white" />
            </GLIconButton>
          </Box>
        ),
      },
    ],

    []
  );

  const remoteApi = useCallback(options => API.getPaychecks(options), []);
  const remoteFiltersApi = useCallback(() => API.getPaycheckFilters(), []);

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Helmet>
        <title>{"Admin Paychecks | Glow LEDs"}</title>
      </Helmet>

      <GLTableV2
        remoteApi={remoteApi}
        remoteFiltersApi={remoteFiltersApi}
        remoteVersionRequirement={remoteVersionRequirement}
        determineColor={determineColor}
        tableName="Paychecks"
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
                {"Delete Paychecks"}
              </Button>
            )}
            <Button color="primary" variant="contained" onClick={() => dispatch(open_create_paycheck_modal())}>
              {"Create Paycheck"}
            </Button>
          </div>
        }
      />

      <EditPaycheckModal />
    </Container>
  );
};
export default PaychecksPage;
