import { useDispatch, useSelector } from "react-redux";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { set_edit_expense_modal, set_expense, set_filters } from "../../../slices/expenseSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { expenseFormFields } from "./expenseFormFields";
import { useEffect } from "react";

const EditExpenseModal = () => {
  const dispatch = useDispatch();
  const expensePage = useSelector(state => state.expenses.expensePage);
  const { edit_expense_modal, expense, loading, expenses, filters } = expensePage;

  useEffect(() => {
    const fetchData = async () => {
      dispatch(API.listExpenses({ is_subscription: true }));
      const response = await API.getExpenseFilters();

      dispatch(set_filters(response));
    };
    fetchData();
  }, [dispatch]);

  const formFields = expenseFormFields({
    expense,
    expenses,
    filters,
    dispatch,
  });

  return (
    <div>
      <GLActionModal
        isOpen={edit_expense_modal}
        onConfirm={() => {
          dispatch(API.saveExpense(expense));
        }}
        onCancel={() => {
          dispatch(set_edit_expense_modal(false));
        }}
        title="Edit Expense"
        confirmLabel="Save"
        confirmColor="primary"
        cancelLabel="Cancel"
        cancelColor="secondary"
        disableEscapeKeyDown
      >
        <GLForm
          formData={formFields}
          state={expense}
          onChange={value => dispatch(set_expense(value))}
          loading={loading}
        />
      </GLActionModal>
    </div>
  );
};

export default EditExpenseModal;
