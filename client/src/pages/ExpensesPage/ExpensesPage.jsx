import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Helmet } from "react-helmet";
import { GLButton } from "../../shared/GlowLEDsComponents";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import { EditExpenseModal } from "./components";
import * as API from "../../api";
import { Button } from "@mui/material";
import { getExpenses } from "../../api";
import { format_date } from "../../utils/helper_functions";
import { open_create_expense_modal, open_edit_expense_modal } from "../../slices/expenseSlice";
import GLImageModal from "../../shared/GlowLEDsComponents/GLImageModal/GLImageModal";
import { close_image_display_modal, open_image_display_modal } from "../../slices/imageSlice";
import { determineExpenseColors } from "./expensesPageHelpers";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ExpensesPage = () => {
  const expensePage = useSelector(state => state.expenses.expensePage);
  const { message, loading, remoteVersionRequirement } = expensePage;
  const imagePage = useSelector(state => state.images.imagePage);
  const { image_display_modal, selected_image } = imagePage;
  const dispatch = useDispatch();

  const column_defs = useMemo(
    () => [
      { title: "Date Added", display: expense => expense.date_of_purchase && format_date(expense.date_of_purchase) },
      {
        title: "Expense",
        display: "expense_name",
      },
      {
        title: "Place of Purchase",
        display: "place_of_purchase",
      },
      {
        title: "Category",
        display: "category",
      },
      {
        title: "Card",
        display: "card",
      },
      // {
      //   title: "Airtable ID",
      //   display: "airtable_id"
      // },
      // {
      //   title: "Invoice URL",
      //   display: expense => <div style={{ overflow: "hidden", width: "100px" }}>{expense.invoice_url}</div>
      // },
      {
        title: "Documents",
        display: expense =>
          expense?.documents.map(document => {
            return (
              <div className="jc-c">
                <img
                  src={document.link}
                  alt={"receipt"}
                  style={{ width: "50px", height: "50px" }}
                  onClick={() => dispatch(open_image_display_modal(document.link))}
                />
              </div>
            );
          }),
      },
      {
        title: "Invoice Links",
        display: expense => (
          <div style={{ overflow: "hidden", width: "100px" }}>
            {expense?.airtable_invoice_links.map(links => links).join(", ")}
          </div>
        ),
      },
      {
        title: "Amount",
        display: expense => expense.amount && `$${expense.amount.toFixed(2)}`,
      },

      {
        title: "Actions",
        display: expense => (
          <div className="jc-b">
            <IconButton aria-label="Edit" onClick={() => dispatch(open_edit_expense_modal(expense))}>
              <EditIcon />
            </IconButton>

            <IconButton onClick={() => dispatch(API.deleteExpense(expense._id))} aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </div>
        ),
      },
    ],
    []
  );

  const remoteApi = useCallback(options => getExpenses(options), []);
  const remoteFiltersApi = useCallback(() => API.getExpenseFilters(), []);

  return (
    <div className="main_container p-20px">
      <Helmet>
        <title>Admin Expenses | Glow LEDs</title>
      </Helmet>

      <GLTableV2
        remoteApi={remoteApi}
        remoteFiltersApi={remoteFiltersApi}
        remoteVersionRequirement={remoteVersionRequirement}
        determine_color={determineExpenseColors}
        tableName={"Expenses"}
        namespaceScope="expenses"
        namespace="expenseTable"
        columnDefs={column_defs}
        loading={loading}
        enableRowSelect={true}
        titleActions={
          <Button color="primary" variant="contained" onClick={() => dispatch(open_create_expense_modal())}>
            Create Expense
          </Button>
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
