import { useDispatch, useSelector } from "react-redux";
import GLModal from "../../../shared/GlowLEDsComponents/GLActiionModal/GLActiionModal";
import { set_edit_expense_modal, set_expense } from "../../../slices/expenseSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";

const EditExpenseModal = () => {
  const dispatch = useDispatch();
  const expensePage = useSelector(state => state.expenses.expensePage);
  const { edit_expense_modal, expense, loading } = expensePage;

  const formFields = {
    expense_name: {
      type: "text",
      label: "Expense"
    },
    date_of_purchase: {
      type: "date",
      label: "Date of Purchase"
    },
    amount: {
      type: "number",
      label: "Amount"
    },

    application: {
      type: "text",
      label: "Application"
    },
    url: {
      type: "text",
      label: "URL"
    },
    documents: {
      type: "image_upload",
      label: "Documents",
      labelProp: "link",
      album: `${expense.expense_name} Documents`,
      getOptionLabel: option => option.link,
      onUpload: (value, key) => dispatch(set_expense({ documents: [...expense.documents, ...value] }))
    },
    place_of_purchase: {
      type: "text",
      label: "Place of Purchase"
    },
    card: {
      type: "text",
      label: "Card"
    },

    category: {
      type: "text",
      label: "Category"
    }
  };

  return (
    <div>
      <GLModal
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
        <GLForm formData={formFields} state={expense} onChange={value => dispatch(set_expense(value))} loading={loading} />
      </GLModal>
    </div>
  );
};

export default EditExpenseModal;
