import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../shared/SharedComponents";
import { format_date, unformat_date } from "../../utils/helper_functions";
import { Helmet } from "react-helmet";
import { GLButton } from "../../shared/GlowLEDsComponents";
import * as API from "../../api";

const EditExpensePage = props => {
  const [id, set_id] = useState("");
  const [expense_name, set_expense_name] = useState("");
  const [application, set_application] = useState("");
  const [url, set_url] = useState("");
  const [place_of_purchase, set_place_of_purchase] = useState("");
  const [date_of_purchase, set_date_of_purchase] = useState("");
  const [category, set_category] = useState("");
  const [card, set_card] = useState("");
  const [amount, set_amount] = useState("");

  const navigate = useNavigate();

  const expensePage = useSelector(state => state.expenses);
  const { expense, loading, error } = expensePage;

  const dispatch = useDispatch();

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (props.match.params.id) {
        dispatch(API.detailsExpense(props.match.params.id));
        dispatch(API.detailsExpense(props.match.params.id));
      } else {
        dispatch(API.detailsExpense(""));
      }
      set_state();
    }
    return () => (clean = false);
  }, []);

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (expense) {
        set_state();
      } else {
        unset_state();
      }
    }
    return () => (clean = false);
  }, [expense]);

  const set_state = () => {
    set_id(expense._id);
    set_expense_name(expense.expense_name);
    set_application(expense.application);
    set_url(expense.url);
    set_place_of_purchase(expense.place_of_purchase);
    set_date_of_purchase(expense.date_of_purchase && format_date(expense.date_of_purchase));
    set_category(expense.category);
    set_card(expense.card);
    set_amount(expense.amount);
  };
  const unset_state = () => {
    set_id("");
    set_expense_name("");
    set_application("");
    set_url("");
    set_place_of_purchase("");
    set_date_of_purchase("");
    set_category("");
    set_card("");
    set_amount("");
  };

  const submitHandler = e => {
    e.preventDefault();

    dispatch(
      API.saveExpense({
        _id: id,
        expense_name,
        application,
        url,
        place_of_purchase,
        date_of_purchase: unformat_date(date_of_purchase),
        category,
        card,
        amount,
      })
    );
    e.target.reset();
    unset_state();
    navigate("/secure/glow/expenses");
  };

  return (
    <div className="main_container p-20px">
      <h1 style={{ textAlign: "center" }}>{props.match.params.id ? "Edit Expense" : "Create Expense"}</h1>

      <div className="form">
        <form onSubmit={submitHandler} style={{ width: "100%" }}>
          {/* {loading_data ? (
						<div>Loading...</div>
					) : ( */}
          <Loading loading={loading} error={error}>
            {expense && (
              <div>
                <Helmet>
                  <title>Edit Expense| Glow LEDs</title>
                </Helmet>

                <ul className="edit-form-container" style={{ maxWidth: "30rem", marginBottom: "20px" }}>
                  <div className="row wrap">
                    <div className="w-228px m-10px">
                      <li>
                        <label htmlFor="expense_name">Expense</label>
                        <input
                          type="text"
                          name="expense_name"
                          value={expense_name}
                          id="expense_name"
                          onChange={e => set_expense_name(e.target.value)}
                        />
                      </li>
                      <li>
                        <label htmlFor="application">Application</label>
                        <input
                          type="text"
                          name="application"
                          value={application}
                          id="application"
                          onChange={e => set_application(e.target.value)}
                        />
                      </li>
                      <li>
                        <label htmlFor="url">URL</label>
                        <input type="text" name="url" value={url} id="url" onChange={e => set_url(e.target.value)} />
                      </li>
                      <li>
                        <label htmlFor="category">Category</label>
                        <input
                          type="text"
                          name="category"
                          value={category}
                          id="category"
                          onChange={e => set_category(e.target.value)}
                        />
                      </li>
                      <li>
                        <label htmlFor="place_of_purchase">Place of Purchase</label>
                        <input
                          type="text"
                          name="place_of_purchase"
                          value={place_of_purchase}
                          id="place_of_purchase"
                          onChange={e => set_place_of_purchase(e.target.value)}
                        />
                      </li>
                      <li>
                        <label htmlFor="date_of_purchase">Date of Purchase</label>
                        <input
                          type="text"
                          name="date_of_purchase"
                          value={date_of_purchase}
                          id="date_of_purchase"
                          onChange={e => set_date_of_purchase(e.target.value)}
                        />
                      </li>

                      <li>
                        <label htmlFor="card">Card</label>
                        <input
                          type="text"
                          name="card"
                          value={card}
                          id="card"
                          onChange={e => set_card(e.target.value)}
                        />
                      </li>
                      <li>
                        <label htmlFor="amount">Amount</label>
                        <input
                          type="text"
                          name="amount"
                          value={amount}
                          id="amount"
                          onChange={e => set_amount(e.target.value)}
                        />
                      </li>
                    </div>
                  </div>
                  <li>
                    <GLButton type="submit" variant="primary">
                      {id ? "Update" : "Create"}
                    </GLButton>
                  </li>
                  <li>
                    <GLButton variant="secondary" onClick={() => navigate.goBack()}>
                      Back to Expenses
                    </GLButton>
                  </li>
                </ul>
              </div>
            )}
          </Loading>
          {/* )} */}
        </form>
      </div>
    </div>
  );
};
export default EditExpensePage;
