import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { open_edit_paycheck_modal } from "../../slices/paycheckSlice";
import * as API from "../../api";
import { Box } from "@mui/material";
import { fullName } from "../UsersPage/usersHelpers";
import GLBoolean from "../../shared/GlowLEDsComponents/GLBoolean/GLBoolean";
import GLIconButton from "../../shared/GlowLEDsComponents/GLIconButton/GLIconButton";
import Edit from "@mui/icons-material/Edit";
import FileCopy from "@mui/icons-material/FileCopy";
import { CheckCircle } from "@mui/icons-material";
import Delete from "@mui/icons-material/Delete";

const usePaychecksPage = () => {
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
  const user_id = userId || current_user._id;
  const paychecksRemoteApi = useCallback(
    options => API.getMyPaychecks(options, { affiliateId: user?.affiliate?._id }),
    [user?.affiliate?._id]
  );
  const remoteFiltersApi = useCallback(() => API.getPaycheckFilters(), []);
  return {
    columnDefs,
    remoteApi,
    remoteFiltersApi,
    loading,
    remoteVersionRequirement,
    selectedRows,
  };
};

export default usePaychecksPage;
