import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Helmet } from "react-helmet";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import { EditExpenseModal } from "./components";
import * as API from "../../api";
import { Button } from "@mui/material";
import { getExpenses } from "../../api";
import { open_create_expense_modal, open_edit_expense_modal } from "../../slices/expenseSlice";
import GLImageModal from "../../shared/GlowLEDsComponents/GLImageModal/GLImageModal";
import { close_image_display_modal } from "../../slices/imageSlice";
import { determineExpenseColors } from "./expensesPageHelpers";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import { ContentCopy } from "@mui/icons-material";
import Papa from "papaparse";

const ExpensesPage = () => {
  const expensePage = useSelector(state => state.expenses.expensePage);
  const { loading, remoteVersionRequirement, expenses } = expensePage;
  const imagePage = useSelector(state => state.images.imagePage);
  const { image_display_modal, selected_image } = imagePage;

  const expenseTable = useSelector(state => state.expenses.expenseTable);
  const { selectedRows } = expenseTable;
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
      { title: "Date Purchased", display: expense => expense.date_of_purchase && formatDate(expense.date_of_purchase) },
      {
        title: "Expense",
        display: "expense_name",
      },
      {
        title: "Place of Purchase",
        display: "place_of_purchase",
      },
      {
        title: "IRS Category",
        display: "irs_category",
      },
      {
        title: "Card",
        display: "card",
      },
      {
        title: "Amount",
        display: expense => (expense.amount ? `$${expense.amount.toFixed(2)}` : "$0.00"),
      },

      {
        title: "Actions",
        display: expense => (
          <div className="jc-b">
            <IconButton aria-label="Edit" onClick={() => dispatch(open_edit_expense_modal(expense))}>
              <EditIcon color="white" />
            </IconButton>
            <IconButton
              aria-label="Edit"
              onClick={() =>
                dispatch(
                  API.saveExpense({
                    ...expense,
                    _id: null,
                    expense_name: `${expense.expense_name} Copy`,
                  })
                )
              }
            >
              <ContentCopy color="white" />
            </IconButton>
            {expense.is_subscription && (
              <IconButton
                aria-label="Edit"
                onClick={() => {
                  const confirm = window.confirm(`Are you sure you want to backfill ${expense.expense_name}?`);
                  if (confirm) {
                    dispatch(API.backfillSubscriptions(expense._id));
                  }
                }}
              >
                <BackupTableIcon color="white" />
              </IconButton>
            )}

            <IconButton onClick={() => dispatch(API.deleteExpense(expense._id))} aria-label="Delete">
              <DeleteIcon color="white" />
            </IconButton>
          </div>
        ),
      },
    ],
    []
  );

  const remoteApi = useCallback(options => getExpenses(options), []);
  const remoteFiltersApi = useCallback(() => API.getExpenseFilters(), []);

  const showFiles = async e => {
    const file = e.target.files[0];

    Papa.parse(file, {
      header: true,
      complete: function (results) {
        const expenses = results.data
          .filter(
            row =>
              row.date_of_purchase &&
              row.amount &&
              row.category &&
              row.irs_category &&
              row.expense_name &&
              row.place_of_purchase &&
              row.card
          )
          .map(row => ({
            date_of_purchase: new Date(row.date_of_purchase),
            amount: parseFloat(row.amount),
            category: row.category,
            irs_category: row.irs_category,
            expense_name: row.expense_name,
            place_of_purchase: row.place_of_purchase,
            card: row.card,
          }));
        dispatch(API.bulkSaveExpenses(expenses));
      },
    });
  };

  return (
    <div className="main_container p-20px">
      <Helmet>
        <title>Admin Expenses | Glow LEDs</title>
      </Helmet>
      <GLTableV2
        remoteApi={remoteApi}
        remoteFiltersApi={remoteFiltersApi}
        remoteVersionRequirement={remoteVersionRequirement}
        determineColor={determineExpenseColors}
        tableName={"Expenses"}
        namespaceScope="expenses"
        namespace="expenseTable"
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
                  const confirm = window.confirm(`Are you sure you want to Delete ${selectedRows.length} Expenses?`);
                  if (confirm) {
                    dispatch(API.deleteMultipleExpenses(selectedRows));
                  }
                }}
              >
                Delete Expenses
              </Button>
            )}
            <div>
              <Button variant="contained" color="primary" component="label" fullWidth>
                Import CSV
                <input type="file" id="file" hidden multiple onChange={e => showFiles(e)} />
              </Button>
            </div>
            <Button color="primary" variant="contained" onClick={() => dispatch(open_create_expense_modal())}>
              Create Expense
            </Button>
          </div>
        }
      />
      <GLImageModal
        open={image_display_modal}
        onClose={() => dispatch(close_image_display_modal(false))}
        selected_image={selected_image}
      />
      <EditExpenseModal />
    </div>
  );
};
export default ExpensesPage;
