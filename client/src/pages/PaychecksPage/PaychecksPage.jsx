import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Notification } from "../../shared/SharedComponents";
import { Helmet } from "react-helmet";
import { GLButton } from "../../shared/GlowLEDsComponents";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import { open_create_paycheck_modal, open_edit_paycheck_modal } from "../../slices/paycheckSlice";
import { EditPaycheckModal } from "./components";
import * as API from "../../api";
import { Button } from "@mui/material";
import { determine_color } from "./paychecksHelpers";
import { format_date } from "../../utils/helper_functions";
import { fullName } from "../UsersPage/usersHelpers";

const PaychecksPage = () => {
  const paycheckPage = useSelector(state => state.paychecks.paycheckPage);
  const { message, loading, remoteVersionRequirement } = paycheckPage;

  const paycheckTable = useSelector(state => state.paychecks.paycheckTable);
  const { selectedRows } = paycheckTable;
  const date = new Date();
  const dispatch = useDispatch();

  const today = date.toISOString();

  const column_defs = useMemo(
    () => [
      { title: "Date Paid", display: paycheck => paycheck.paid_at && format_date(paycheck.paid_at) },
      {
        title: "Paid",
        display: paycheck => (paycheck.paid ? <i className="fas fa-check-circle" /> : <i className="fas fa-times-circle" />)
      },
      {
        title: "Affiliate",
        display: paycheck => (paycheck.affiliate ? paycheck.affiliate.artist_name : paycheck.team && paycheck.team.team_name)
      },
      {
        title: "User",
        display: paycheck => (paycheck.user ? fullName(paycheck.user) : "")
      },

      { title: "Amount", display: paycheck => `$${paycheck.amount.toFixed(2)}` },
      {
        title: "Team",
        display: paycheck => (paycheck.team ? <i className="fas fa-check-circle" /> : <i className="fas fa-times-circle" />)
      },
      {
        title: "Actions",
        display: paycheck => (
          <div className="jc-b">
            <GLButton variant="icon" aria-label="Edit" onClick={() => dispatch(open_edit_paycheck_modal(paycheck))}>
              <i className="fas fa-edit" />
            </GLButton>
            <GLButton
              variant="icon"
              onClick={() =>
                dispatch(
                  API.savePaycheck({
                    amount: paycheck.amount,
                    affiliate: paycheck.affiliate,
                    team: paycheck.team,
                    venmo: paycheck.venmo,
                    receipt: paycheck.receipt,
                    paid: true,
                    paid_at: format_date(today)
                  })
                )
              }
              aria-label="duplicate"
            >
              <i className="fas fa-clone" />
            </GLButton>
            <GLButton
              variant="icon"
              onClick={() =>
                dispatch(
                  API.savePaycheck({
                    ...paycheck,
                    paid: true,
                    paid_at: format_date(today)
                  })
                )
              }
              aria-label="mark paid"
            >
              <i className="fas fa-check-circle" />
            </GLButton>
            <GLButton variant="icon" onClick={() => dispatch(API.deletePaycheck(paycheck._id))} aria-label="Delete">
              <i className="fas fa-trash-alt" />
            </GLButton>
          </div>
        )
      }
    ],
    []
  );

  const remoteApi = useCallback(options => API.getPaychecks(options), []);
  const remoteFiltersApi = useCallback(() => API.getPaycheckFilters(), []);

  return (
    <div className="main_container p-20px">
      <Helmet>
        <title>Admin Paychecks | Glow LEDs</title>
      </Helmet>
      <Notification message={message} />
      <GLTableV2
        remoteApi={remoteApi}
        remoteFiltersApi={remoteFiltersApi}
        remoteVersionRequirement={remoteVersionRequirement}
        determine_color={determine_color}
        tableName={"Paychecks"}
        namespaceScope="paychecks"
        namespace="paycheckTable"
        columnDefs={column_defs}
        loading={loading}
        enableRowSelect={true}
        titleActions={
          <div className="row g-10px">
            {selectedRows.length > 1 && (
              <Button
                color="secondary"
                variant="contained"
                onClick={() => {
                  const confirm = window.confirm(`Are you sure you want to Delete ${selectedRows.length} Paychecks?`);
                  if (confirm) {
                    dispatch(API.deleteMultiplePaychecks(selectedRows));
                  }
                }}
              >
                Delete Paychecks
              </Button>
            )}
            <Button color="primary" variant="contained" onClick={() => dispatch(open_create_paycheck_modal())}>
              Create Paycheck
            </Button>
          </div>
        }
      />
      <EditPaycheckModal />
    </div>
  );
};
export default PaychecksPage;

// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Link, useHistory } from "react-router-dom";
// import { Loading, Notification } from "../../shared/SharedComponents";
// import { Helmet } from "react-helmet";
// import * as API from "../../api";
// import {
//   dates_in_year,
//   format_date,
//   getUrlParameter,
//   removeDuplicates,
//   toCapitalize,
//   update_products_url
// } from "../../utils/helper_functions";
// import { API_Orders, API_Paychecks, API_Promos } from "../../utils";
// import { GLButton } from "../../shared/GlowLEDsComponents";
// import GLTable from "../../shared/GlowLEDsComponents/GLTable/GLTable";
// import axios from "axios";

// const PaychecksPage = props => {
//   const history = useHistory();
//   const [search, set_search] = useState("");
//   const [sort, set_sort] = useState("");
//   const [message_note, set_message_note] = useState([]);
//   const [loading_paychecks, set_loading_paychecks] = useState(false);
//   const [loading_checkboxes, set_loading_checkboxes] = useState(false);
//   const [create_paychecks, set_create_paychecks] = useState(false);
//   const [update_google_sheets, set_update_google_sheets] = useState(false);
//   const [update_discount_code, set_update_discount_code] = useState(false);
//   const [page, set_page] = useState(1);
//   const [limit, set_limit] = useState(10);
//   const [selectedRows, setSelectedRows] = useState([]);

//   const category = props.match.params.category ? props.match.params.category : "";
// const paycheckPage = useSelector(state => state.paychecks.paycheckPage);
//   const { loading, paychecks, message, error, totalPages, success } = paycheckPage;

//   const dispatch = useDispatch();

//   const affiliatePage = useSelector(state => state.affiliates.affiliatePage);
//   const { affiliates } = affiliatePage;

//   const teamPage = useSelector(state => state.teams);
//   const { teams } = teamPage;
//   const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

//   const date = new Date();
//   const previous_month_number = date.getMonth() - 1 === -1 ? 11 : date.getMonth();
//   const [month, set_month] = useState(months[date.getMonth()]);
//   // const [previous_month, set_previous_month] = useState(months[previous_month_number]);
//   const [year, set_year] = useState(date.getFullYear());

//   const delete_multiple_paychecks = () => {
//     set_loading_checkboxes(true);
//     const response = API_Paychecks.delete_multiple_paychecks(selectedRows.map(row => row._id));
//     setSelectedRows([]);
//     dispatch(API.listPaychecks({ category, search, sort }));
//   };

//   setTimeout(() => {
//     set_loading_checkboxes(false);
//   }, 500);

//   useEffect(() => {
//     let clean = true;
//     if (clean) {
//       dispatch(API.listAffiliates({ active: true }));
//       dispatch(API.listTeams({}));
//       dispatch(API.listOrders({}));
//     }
//     return () => (clean = false);
//   }, [success, dispatch]);

//   useEffect(() => {
//     let clean = true;
//     if (clean) {
//       if (paychecks) {
//         set_message_note(message);
//       }
//     }
//     return () => {};
//   }, [paychecks]);

//   const submitHandler = e => {
//     e.preventDefault();
//     dispatch(API.listPaychecks({ category, search, sort }));
//   };

//   const sortHandler = e => {
//     set_sort(e.target.value);
//     dispatch(API.listPaychecks({ category, search, sort: e.target.value }));
//   };

//   const deleteHandler = paycheck => {
//     dispatch(API.deletePaycheck(paycheck._id));
//   };

//   const today = date.toISOString();

// const mark_paid = paycheck => {
//   dispatch(
//     API.savePaycheck({
//       ...paycheck,
//       paid: true,
//       paid_at: format_date(today)
//     })
//   );
//   dispatch(API.listPaychecks({ limit, page }));
// };
// const duplicate_paycheck = paycheck => {
//   dispatch(
//     API.savePaycheck({
//       amount: paycheck.amount,
//       affiliate: paycheck.affiliate,
//       team: paycheck.team,
//       venmo: paycheck.venmo,
//       receipt: paycheck.receipt,
//       paid: true,
//       paid_at: format_date(today)
//     })
//   );
//   dispatch(API.listPaychecks({ limit, page }));
// };

//   const sort_options = ["Newest", "Artist Name", "Facebook Name", "Instagram Handle", "Sponsor", "Promoter"];

//   const years = ["2025", "2024", "2023", "2022", "2021", "2020"];

// const column_defs = [
//   { title: "Date Paid", display: paycheck => paycheck.paid_at && format_date(paycheck.paid_at) },
//   { title: "Paid", display: paycheck => (paycheck.paid ? <i className="fas fa-check-circle" /> : <i className="fas fa-times-circle" />) },
//   {
//     title: "Affiliate",
//     display: paycheck => (paycheck.affiliate ? paycheck.affiliate.artist_name : paycheck.team && paycheck.team.team_name)
//   },

//   { title: "Amount", display: paycheck => `$${paycheck.amount.toFixed(2)}` },
//   {
//     title: "Team",
//     display: paycheck => (paycheck.team ? <i className="fas fa-check-circle" /> : <i className="fas fa-times-circle" />)
//   }
// ];

// const colors = [
//   { name: "Paid", color: "#3e4c6d" },
//   { name: "Not Paid", color: "#6f3c3c" }
// ];

// const determine_color = paycheck => {
//   let result = "";
//   if (paycheck.paid) {
//     result = colors[0].color;
//   }
//   if (!paycheck.paid) {
//     result = colors[1].color;
//   }
//   return result;
// };

//   const update_page = (e, new_page) => {
//     let search = "";
//     let sort = "";
//     let filter = "";
//     let limit = 10;
//     let option = false;

//     e.preventDefault();
//     const page = parseInt(new_page);
//     set_page(page);
//     update_products_url(history, search, "", "", page, limit);

//     dispatch(API.listPaychecks({ limit, page }));
//   };

//   useEffect(() => {
//     let clean = true;
//     if (clean) {
//       determine_paychecks();
//     }
//     return () => (clean = false);
//   }, []);

//   const determine_paychecks = () => {
//     const query = getUrlParameter(props.location);
//     let search = "";
//     let sort = "";
//     let filter = "";
//     let limit = "";
//     let page = "";

//     // prnt({ query });
//     if (Object.keys(query).length > 0) {
//       if (query.search) {
//         set_search(query.search.split("%20").join(" "));
//         search = query.search.split("%20").join(" ");
//       }
//       if (query.sort) {
//         set_sort(query.sort);
//         sort = query.sort;
//       }
//       // if (query.filter) {
//       // 	//
//       // 	filter = waitForElement(query.filter, chips_list);
//       // }
//       if (query.page) {
//         set_page(query.page);
//         page = query.page;
//       }
//       if (query.limit) {
//         set_limit(query.limit);
//         limit = query.limit;
//       }

//       dispatch(
//         API.listPaychecks({
//           filter,
//           search,
//           sort,
//           page,
//           limit
//         })
//       );
//     }
//   };
//   return (
//     <div className="main_container">
//       <Helmet>
//         <title>Admin Paychecks | Glow LEDs</title>
//       </Helmet>
//       <Notification message={message_note} />
//       <Loading loading={loading_paychecks} error={error} />

//       <p className="fs-20px title_font">Choose Paycheck Month</p>
//       {loading_checkboxes ? (
//         <div>Loading...</div>
//       ) : (
//         <div>
//           <label htmlFor="create_paychecks">Create Paychecks</label>
//           <input
//             type="checkbox"
//             name="create_paychecks"
//             defaultChecked={create_paychecks}
//             id="create_paychecks"
//             onChange={e => {
//               set_create_paychecks(e.target.checked);
//             }}
//           />
//         </div>
//       )}

//       {loading_checkboxes ? (
//         <div>Loading...</div>
//       ) : (
//         <div>
//           <label htmlFor="update_google_sheets">Create Google Sheets</label>
//           <input
//             type="checkbox"
//             name="update_google_sheets"
//             defaultChecked={update_google_sheets}
//             id="update_google_sheets"
//             onChange={e => {
//               set_update_google_sheets(e.target.checked);
//             }}
//           />
//         </div>
//       )}
//       {loading_checkboxes ? (
//         <div>Loading...</div>
//       ) : (
//         <div>
//           <label htmlFor="update_discount_code">Update Discount Code</label>
//           <input
//             type="checkbox"
//             name="update_discount_code"
//             defaultChecked={update_discount_code}
//             id="update_discount_code"
//             onChange={e => {
//               set_update_discount_code(e.target.checked);
//             }}
//           />
//         </div>
//       )}
//       <div className="jc-b">
//         <div className="row g-10px mv-10px">
//           <div className="row">
//             <div className="custom-select ">
//               <select
//                 defaultValue={date.getFullYear()}
//                 className="qty_select_dropdown"
//                 onChange={e => {
//                   set_year(e.target.value);
//                 }}
//               >
//                 {years.map(year => (
//                   <option value={year}>{year}</option>
//                 ))}
//               </select>
//               <span className="custom-arrow" />
//             </div>
//           </div>

//           <div className="row">
//             <div className="custom-select ">
//               <select
//                 // defaultValue={previous_month && previous_month.toLowerCase()}
//                 defaultValue={month && month.toLowerCase()}
//                 className="qty_select_dropdown"
//                 onChange={e => {
//                   set_month(e.target.value);
//                 }}
//               >
//                 {dates_in_year(year).map(month => (
//                   <option value={month.month.toLowerCase()}>{toCapitalize(month.month)}</option>
//                 ))}
//               </select>
//               <span className="custom-arrow" />
//             </div>
//           </div>
//         </div>

//         <div className="row g-10px">
//           <Link to="/secure/glow/editpaycheck">
//             <GLButton variant="primary">Create Paycheck</GLButton>
//           </Link>
//           <GLButton variant="primary" onClick={() => delete_multiple_paychecks()}>
//             Delete Multiple
//           </GLButton>
//         </div>
//       </div>
//       <GLTable
//         title="Paychecks"
//         rows={paychecks}
//         column_defs={column_defs}
//         determine_color={determine_color}
//         colors={colors}
//         search={search}
//         set_search={set_search}
//         handleListItems={submitHandler}
//         sortHandler={sortHandler}
//         sort_options={sort_options}
//         totalPages={totalPages}
//         page={page}
//         limit={limit}
//         update_page={update_page}
//         setSelectedRows={setSelectedRows}
//         selectedRows={selectedRows}
//         action_row={paycheck => (
// <div className="jc-b">
//   <Link to={"/secure/glow/editpaycheck/" + paycheck._id}>
//     <GLButton variant="icon" aria-label="Edit">
//       <i className="fas fa-edit" />
//     </GLButton>
//   </Link>
//   <GLButton variant="icon" onClick={() => duplicate_paycheck(paycheck)} aria-label="duplicate">
//     <i className="fas fa-clone" />
//   </GLButton>
//   <GLButton variant="icon" onClick={() => mark_paid(paycheck)} aria-label="mark paid">
//     <i className="fas fa-check-circle" />
//   </GLButton>
//   <GLButton variant="icon" onClick={() => deleteHandler(paycheck)} aria-label="Delete">
//     <i className="fas fa-trash-alt" />
//   </GLButton>
// </div>
//         )}
//       />
//     </div>
//   );
// };
// export default PaychecksPage;
