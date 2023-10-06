import { useDispatch, useSelector } from "react-redux";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { set_edit_expense_modal, set_expense } from "../../../slices/expenseSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { expenseFormFields } from "./expenseFormFields";

const EditExpenseModal = () => {
  const dispatch = useDispatch();
  const expensePage = useSelector(state => state.expenses.expensePage);
  const { edit_expense_modal, expense, loading } = expensePage;

  const formFields = expenseFormFields({
    expense,
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
        title={"Edit Expense"}
        confirmLabel={"Save"}
        confirmColor="primary"
        cancelLabel={"Cancel"}
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
