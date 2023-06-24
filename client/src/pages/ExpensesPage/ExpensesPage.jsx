import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Notification } from "../../shared/SharedComponents";
import { Helmet } from "react-helmet";
import { GLButton } from "../../shared/GlowLEDsComponents";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import { EditExpenseModal } from "./components";
import * as API from "../../api";
import { Button } from "@mui/material";
import { getExpenses } from "../../api";
import { format_date } from "../../utils/helper_functions";
import { open_create_expense_modal, open_edit_expense_modal } from "../../slices/expenseSlice";

const ExpensesPage = () => {
  const expensePage = useSelector(state => state.expenses.expensePage);
  const { message, loading, remoteVersionRequirement } = expensePage;
  const dispatch = useDispatch();

  const column_defs = useMemo(
    () => [
      { title: "Date Added", display: expense => expense.date_of_purchase && format_date(expense.date_of_purchase) },
      {
        title: "Place of Purchase",
        display: "place_of_purchase"
      },
      {
        title: "Category",
        display: "category"
      },
      {
        title: "Card",
        display: "card"
      },
      {
        title: "Documents",
        display: expense =>
          expense?.documents.map(document => {
            return (
              <div className="jc-c">
                <img src={document.link} alt={"receipt"} style={{ width: "50px", height: "50px" }} />
              </div>
            );
          })
      },
      {
        title: "Amount",
        display: expense => expense.amount && `$${expense.amount.toFixed(2)}`
      },

      {
        title: "Actions",
        display: expense => (
          <div className="jc-b">
            <GLButton variant="icon" aria-label="Edit" onClick={() => dispatch(open_edit_expense_modal(expense))}>
              <i className="fas fa-edit" />
            </GLButton>
            <GLButton variant="icon" onClick={() => dispatch(API.deleteExpense(expense._id))} aria-label="Delete">
              <i className="fas fa-trash-alt" />
            </GLButton>
          </div>
        )
      }
    ],
    []
  );

  const remoteApi = useCallback(options => getExpenses(options), []);
  // const remoteFiltersApi = useCallback(() => API.getProductFilters(), []);

  return (
    <div className="main_container p-20px">
      <Helmet>
        <title>Admin Expenses | Glow LEDs</title>
      </Helmet>
      <Notification message={message} />
      <GLTableV2
        remoteApi={remoteApi}
        // remoteFiltersApi={remoteFiltersApi}
        remoteVersionRequirement={remoteVersionRequirement}
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
      <EditExpenseModal />
    </div>
  );
};
export default ExpensesPage;
