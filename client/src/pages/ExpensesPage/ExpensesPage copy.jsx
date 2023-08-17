import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Loading, Notification } from "../../shared/SharedComponents";
import Search from "../../shared/GlowLEDsComponents/GLTable/Search";
import Sort from "../../shared/GlowLEDsComponents/GLTable/Sort";
import { Helmet } from "react-helmet";
import { format_date } from "../../utils/helper_functions";
import { API_Revenue } from "../../utils";
import { GLButton } from "../../shared/GlowLEDsComponents";
import CSVReader from "react-csv-reader";
import * as API from "../../api";

const ExpensesPage = props => {
  const [search, set_search] = useState("");
  const [sort, setSortOrder] = useState("");
  const [card_type, set_card_type] = useState("GL AMEX");
  const history = useHistory();

  const category = props.match.params.category ? props.match.params.category : "";

  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  const expensePage = useSelector(state => state.expenses);
  const { loading, expenses, message, error, success } = expensePage;

  const dispatch = useDispatch();

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listExpenses({ category, search, sort }));
    }
    return () => (clean = false);
  }, [sort]);

  const handleListItems = e => {
    e.preventDefault();
    dispatch(API.listExpenses({ category, search, sort }));
  };

  const sortHandler = e => {
    setSortOrder(e.target.value);
    dispatch(API.listExpenses({ category, search, sort: e.target.value }));
  };

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listExpenses({}));
    }
    return () => (clean = false);
  }, [success]);
  const deleteHandler = expense => {
    dispatch(API.deleteExpense(expense._id));
  };

  const colors = [
    { name: "Supplies", color: "#6d3e3e" },
    { name: "Website", color: "#6d3e5c" },
    { name: "Shipping", color: "#3e4c6d" },
    { name: "Business", color: "#6d5a3e" },
    { name: "Equipment", color: "#3f6561" },
    { name: "Refunds", color: "#4a4a4a" },
  ];

  const determine_color = expense => {
    let result = "";
    if (expense.category === "Supplies") {
      result = colors[0].color;
    }
    if (expense.category === "Website") {
      result = colors[1].color;
    }
    if (expense.category === "Shipping") {
      result = colors[2].color;
    }
    if (expense.category === "Business") {
      result = colors[3].color;
    }
    if (expense.category === "Equipment") {
      result = colors[4].color;
    }
    if (expense.amount < 0) {
      result = colors[5].color;
    }
    //
    return result;
  };

  const sort_options = ["Date", "Category", "Application", "Newest", "Lowest", "Highest"];

  const handle_csv_expenses = async (data, fileInfo, properties, card) => {
    const create_all_expenses_s = await API_Revenue.create_all_expenses_s(data, current_user, card, properties);

    dispatch(API.listExpenses({ category, search, sort }));
  };

  const card_types = ["FID", "GL AMEX", "AMZNK"];

  const determine_card_type = (data, fileInfo) => {
    let properties = [];
    switch (card_type) {
      case "FID":
        properties = ["date", "transaction", "place", "memo", "amount"];
        return handle_csv_expenses(data, fileInfo, properties, "FID");
      case "GL AMEX":
        properties = ["date", "receipt", "description", "card_member", "account", "amount"];
        return handle_csv_expenses(data, fileInfo, properties, "GL AMEX");
      case "AMZNK":
        properties = ["date", "post_date", "place", "category", "type", "amount"];
        return handle_csv_expenses(data, fileInfo, properties, "AMZNK");
      default:
        return;
    }
  };

  // const expenses_breakdown_multiplier = 360 / [ 2020, 2021 ].length;

  // let expenses_breakdown_num = -expenses_breakdown_multiplier;
  // const expenses_breakdown_bar_data = {
  // 	labels: [ 2020, 2021 ],
  // 	datasets: [
  // 		{
  // 			label: 'Year',
  // 			data: [
  // 				expenses
  // 					.filter(
  // 						(order) =>
  // 							new Date(order.createdAt) > new Date('2020-01-01') &&
  // 							new Date(order.createdAt) < new Date('2020-12-31')
  // 					)
  // 					.reduce((a, order) => a + order.totalPrice - order.taxPrice, 0),
  // 				expenses
  // 					.filter(
  // 						(order) =>
  // 							new Date(order.createdAt) > new Date('2021-01-01') &&
  // 							new Date(order.createdAt) < new Date('2021-12-31')
  // 					)
  // 					.reduce((a, order) => a + order.totalPrice - order.taxPrice, 0)
  // 			],
  // 			fill: false,
  // 			borderColor: '#3e4c6d',
  // 			// backgroundColor: '#333333',
  // 			// backgroundColor: [ 'red', 'blue', 'green', 'blue', 'red', 'blue' ],
  // 			backgroundColor: product_occurrences.map((item) => {
  // 				expenses_breakdown_num += expenses_breakdown_multiplier;
  // 				let color = hslToHex(expenses_breakdown_num, 100, 50);
  // 				// return `hsl(${expenses_breakdown_num}, 50%, 100%)`;
  // 				return color;
  // 			}),
  // 			color: 'white'
  // 		}
  // 	]
  // };

  // const expenses_breakdown_bar_options = {
  // 	responsive: true,
  // 	maintainAspectRatio: true,
  // 	fontColor: '#000000'
  // };

  return (
    <div className="main_container p-20px">
      <Helmet>
        <title>Admin Expenses | Glow LEDs</title>
      </Helmet>

      <div className="wrap jc-b">
        <div className="wrap jc-b">
          {colors.map((color, index) => {
            return (
              <div className="wrap jc-b w-16rem m-1rem" key={index}>
                <label style={{ marginRight: "1rem" }}>{color.name}</label>
                <div
                  style={{
                    backgroundColor: color.color,
                    height: "20px",
                    width: "60px",
                    borderRadius: "5px",
                  }}
                />
              </div>
            );
          })}
        </div>
        <Link to="/secure/glow/editexpense">
          <GLButton variant="primary" style={{ width: "160px" }}>
            Create Expense
          </GLButton>
        </Link>
      </div>
      <div className="ai-c w-325px jc-b">
        <div className="">
          <div className="custom-select">
            <select className="qty_select_dropdown" onChange={e => set_card_type(e.target.value)} value={card_type}>
              <option key={1} defaultValue="">
                ---Card Type---
              </option>
              {card_types.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <span className="custom-arrow" />
          </div>
        </div>
        <label className="btn primary">
          Upload CSV
          <CSVReader onFileLoaded={(data, fileInfo) => determine_card_type(data, fileInfo)} />
        </label>
      </div>

      <div className="jc-c">
        <h1 style={{ textAlign: "center" }}>Expenses</h1>
      </div>
      <div className="search_and_sort row jc-c ai-c" style={{ overflowX: "scroll" }}>
        <Search search={search} set_search={set_search} handleListItems={handleListItems} category={category} />
        <Sort sortHandler={sortHandler} sort_options={sort_options} />
      </div>
      <Loading loading={loading} error={error}>
        {expenses && (
          <div className="expense-list responsive_table">
            <table className="table">
              <thead>
                <tr>
                  <th>Total</th>
                  <th>Supplies</th>
                  <th>Website</th>
                  <th>Shipping</th>
                  <th>Business</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  // key={expense._id}
                  style={{
                    backgroundColor: "#626262",
                    fontSize: "16px",
                  }}
                >
                  <td className="p-10px">
                    <label>${expenses.reduce((a, expense) => a + expense.amount, 0).toFixed(2)}</label>
                  </td>
                  <td className="p-10px">
                    <label>
                      $
                      {expenses
                        .filter(expense => expense.category === "Supplies")
                        .reduce((a, expense) => a + expense.amount, 0)
                        .toFixed(2)}
                    </label>
                  </td>
                  <td className="p-10px">
                    <label>
                      $
                      {expenses
                        .filter(expense => expense.category === "Website")
                        .reduce((a, expense) => a + expense.amount, 0)
                        .toFixed(2)}
                    </label>
                  </td>
                  <td className="p-10px">
                    <label>
                      $
                      {expenses
                        .filter(expense => expense.category === "Shipping")
                        .reduce((a, expense) => a + expense.amount, 0)
                        .toFixed(2)}
                    </label>
                  </td>
                  <td className="p-10px">
                    <label>
                      $
                      {expenses
                        .filter(expense => expense.category === "Business")
                        .reduce((a, expense) => a + expense.amount, 0)
                        .toFixed(2)}
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>expense name</th>
                  <th>date</th>
                  <th>category</th>
                  <th>amount</th>
                  <th>card</th>
                  <th>place</th>
                  <th>application</th>
                  {/* <th>url</th> */}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense, index) => (
                  <tr
                    key={index}
                    style={{
                      backgroundColor: determine_color(expense),
                      fontSize: "16px",
                    }}
                  >
                    <td className="p-10px">{expense._id}</td>
                    <td className="p-10px min-w-300px">{expense.expense_name}</td>
                    <td className="p-10px">{format_date(expense.date_of_purchase)}</td>
                    <td className="p-10px">{expense.category}</td>
                    <td className="p-10px">${expense.amount ? expense.amount.toFixed(2) : expense.amount}</td>
                    <td className="p-10px min-w-100px">{expense.card}</td>
                    <td className="p-10px min-w-150px">{expense.place_of_purchase}</td>
                    <td className="p-10px min-w-200px">{expense.application}</td>
                    {/* <td className="p-10px min-w-800px">{expense.url}</td> */}
                    <td className="p-10px">
                      <div className="jc-b">
                        <Link to={"/secure/glow/editexpense/" + expense._id}>
                          <GLButton variant="icon" aria-label="Edit">
                            <i className="fas fa-edit" />
                          </GLButton>
                        </Link>
                        <GLButton variant="icon" onClick={() => deleteHandler(expense)} aria-label="Delete">
                          <i className="fas fa-trash-alt" />
                        </GLButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Loading>
    </div>
  );
};
export default ExpensesPage;
