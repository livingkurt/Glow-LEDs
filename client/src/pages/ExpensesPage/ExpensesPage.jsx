import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Helmet } from "react-helmet";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import { EditExpenseModal } from "./components";
import * as API from "../../api";
import { Box, Button, Container } from "@mui/material";
import { getExpenses } from "../../api";
import { open_create_expense_modal, open_edit_expense_modal, set_loading } from "../../slices/expenseSlice";
import GLImageModal from "../../shared/GlowLEDsComponents/GLImageModal/GLImageModal";
import { close_image_display_modal } from "../../slices/imageSlice";
import { determineExpenseColors } from "./expensesPageHelpers";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import { ContentCopy } from "@mui/icons-material";
import Papa from "papaparse";
import GLIconButton from "../../shared/GlowLEDsComponents/GLIconButton/GLIconButton";
import { showError, showInfo } from "../../slices/snackbarSlice";

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
        title: "",
        nonSelectable: true,
        display: expense => (
          <Box display="flex" justifyContent="flex-end">
            <GLIconButton tooltip="Edit" onClick={() => dispatch(open_edit_expense_modal(expense))}>
              <EditIcon color="white" />
            </GLIconButton>
            <GLIconButton
              tooltip="Duplicate"
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
            </GLIconButton>
            {expense.is_subscription && (
              <GLIconButton
                tooltip="Edit"
                onClick={() => {
                  const confirm = window.confirm(`Are you sure you want to backfill ${expense.expense_name}?`);
                  if (confirm) {
                    dispatch(API.backfillSubscriptions(expense._id));
                  }
                }}
              >
                <BackupTableIcon color="white" />
              </GLIconButton>
            )}

            <GLIconButton onClick={() => dispatch(API.deleteExpense(expense._id))} tooltip="Delete">
              <DeleteIcon color="white" />
            </GLIconButton>
          </Box>
        ),
      },
    ],
    []
  );

  const remoteApi = useCallback(options => getExpenses(options), []);
  const remoteFiltersApi = useCallback(() => API.getExpenseFilters(), []);

  const showFiles = async e => {
    const file = e.target.files[0];
    dispatch(set_loading(true));

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true, // Add this to skip empty lines
      transformHeader: header => header.trim(), // Add this to clean headers
      complete: async function (results) {
        try {
          // Debug the parsing results
          console.log("Parse results:", {
            data: results.data,
            errors: results.errors,
            meta: results.meta,
          });

          if (results.errors.length > 0) {
            console.error("CSV parsing errors:", results.errors);
            throw new Error(`CSV parsing failed: ${results.errors[0].message}`);
          }

          // Filter out any rows with empty or invalid dates
          const validData = results.data.filter(row => row.Date && row.Amount && !isNaN(new Date(row.Date).getTime()));

          if (validData.length === 0) {
            throw new Error("No valid data found in CSV");
          }

          const response = await dispatch(API.bulkSaveExpenses(validData));

          dispatch(
            showInfo({
              message: `Successfully imported ${response.length} expenses (${results.data.length - response.length} skipped)`,
              type: "success",
            })
          );
        } catch (error) {
          console.error("Import error:", error);
          dispatch(
            showError({
              message: error.message || "Failed to import expenses",
              type: "error",
            })
          );
        } finally {
          dispatch(set_loading(false));
        }
      },
      error: error => {
        console.error("Papa Parse error:", error);
        dispatch(
          showError({
            message: `Failed to read CSV file: ${error.message}`,
            type: "error",
          })
        );
        dispatch(set_loading(false));
      },
    });
  };
  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Helmet>
        <title>{"Admin Expenses | Glow LEDs"}</title>
      </Helmet>
      <GLTableV2
        remoteApi={remoteApi}
        remoteFiltersApi={remoteFiltersApi}
        remoteVersionRequirement={remoteVersionRequirement}
        determineColor={determineExpenseColors}
        tableName="Expenses"
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
                {"Delete Expenses"}
              </Button>
            )}
            <div>
              <Button variant="contained" color="primary" component="label" fullWidth>
                {"Import CSV"}
                <input type="file" id="file" hidden multiple onChange={e => showFiles(e)} />
              </Button>
            </div>
            <Button color="primary" variant="contained" onClick={() => dispatch(open_create_expense_modal())}>
              {"Create Expense"}
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
    </Container>
  );
};
export default ExpensesPage;
