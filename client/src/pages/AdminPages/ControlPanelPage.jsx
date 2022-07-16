import React, { useEffect, useRef, useState } from "react";

import { Link, useHistory } from "react-router-dom";

// import { Chart, CategoryScale } from 'chart.js';
import { Bar, Pie } from "react-chartjs-2";
import {
  dates_in_year,
  hslToHex,
  toCapitalize,
} from "../../utils/helper_functions";
import { API_Orders } from "../../utils";
import { Helmet } from "react-helmet";
import { Loading } from "../../components/UtilityComponents";
import Overflow from "react-overflow-indicator";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { GLButton } from "../../components/GlowLEDsComponents";

const ControlPanelPage = props => {
  const this_year = props.match.params.year;

  const all_time_income_chart_ref = useRef();

  const [ all_time_income, set_all_time_income ] = useState({});
  const [ loading, set_loading ] = useState(false);

  const [ year, set_year ] = useState(this_year);
  const [ canScroll, setCanScroll ] = useState(false);

  useEffect(() => {
    let clean = true;
    if (clean) {
      get_all_time_income();
    }
    return () => (clean = false);
  }, []);

  const get_all_time_income = async year => {
    set_loading(true);
    const { data } = await API_Orders.income();
    console.log({ get_all_time_income: data });
    if (data) {
      set_all_time_income(data);
      set_loading(false);
    }
  };

  const bar_income_expenses_profit_data = {
    labels: [ "Income" ],
    datasets: [
      {
        label: [ "Income" ],
        data: [
          all_time_income &&
            all_time_income.macro_income &&
            all_time_income.macro_income.income,
        ],
        borderWidth: 1,
        fill: true,
        borderColor: "#3e4c6d",
        backgroundColor: hslToHex(150, 100, 50),
        color: "white",
      },
      {
        label: [ "Expenses" ],
        data: [
          all_time_income &&
            all_time_income.macro_income &&
            all_time_income.macro_income.expenses,
        ],
        borderWidth: 1,
        fill: true,
        borderColor: "#3e4c6d",
        backgroundColor: hslToHex(360, 100, 50),
        color: "white",
      },
      {
        label: [ "Profit" ],
        data: [
          all_time_income &&
            all_time_income.macro_income &&
            all_time_income.macro_income.profit,
        ],
        borderWidth: 1,
        fill: true,
        borderColor: "#3e4c6d",
        backgroundColor:
          all_time_income.profit > 0
            ? hslToHex(0, 100, 100)
            : hslToHex(0, 0, 0),
        color: "white",
      },
    ],
  };
  const bar_income_expenses_profit_options = {
    responsive: true,
    maintainAspectRatio: true,
    fontColor: "#000000",
  };

  const history = useHistory();

  const switch_year = e => {
    e.preventDefault();
    set_year(e.target.value);
    history.push("/secure/glow/controlpanel/monthly_expenes/" + e.target.value);
  };

  return (
    <div className="main_container p-20px">
      <Helmet>
        <title>Control Panel | Glow LEDs</title>
      </Helmet>
      <div className="">
        <Link to="/secure/glow/controlpanel">
          <GLButton variant="primary">Back to Control Panel</GLButton>
        </Link>
      </div>
      <div className="row">
        <div className="mv-2rem mr-2rem">
          <h2 className="mr-1rem">Choose Year</h2>
          <div className="row">
            <div className="custom-select ">
              <select
                defaultValue={year}
                className="qty_select_dropdown"
                onChange={e => {
                  switch_year(e);
                }}
              >
                <option value="">---Choose Year---</option>
                {/* {[...Array().keys].map} */}
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
              </select>
              <span className="custom-arrow" />
            </div>
          </div>
        </div>
      </div>
      <h2 className="ta-c w-100per jc-c">All Time Monthly Breakdown</h2>
      <Loading loading={loading} />
      {all_time_income &&
      Object.keys(all_time_income).length > 0 && (
        <Tabs>
          <Overflow
            onStateChange={state => setCanScroll(state.canScroll.right)}
          >
            <Overflow.Content>
              <TabList>
                <Tab
                  style={{
                    padding: "10px",
                    borderRadius: "10px 10px 0px 0px",
                  }}
                >
                  All Time Monthly Expenses
                </Tab>
                <Tab
                  style={{
                    padding: "10px",
                    borderRadius: "10px 10px 0px 0px",
                  }}
                >
                  All Time Whites
                </Tab>
                <Tab
                  style={{
                    padding: "10px",
                    borderRadius: "10px 10px 0px 0px",
                  }}
                >
                  All Time Refresh Packs
                </Tab>
                <Tab
                  style={{
                    padding: "10px",
                    borderRadius: "10px 10px 0px 0px",
                  }}
                >
                  All Time All Whites
                </Tab>
                <Tab
                  style={{
                    padding: "10px",
                    borderRadius: "10px 10px 0px 0px",
                  }}
                >
                  All Time Batteries
                </Tab>
                <Tab
                  style={{
                    padding: "10px",
                    borderRadius: "10px 10px 0px 0px",
                  }}
                >
                  All Time Decals
                </Tab>
              </TabList>
            </Overflow.Content>
            {canScroll && (
              <div className="tab_indicator bob br-5px ta-c bg-primary h-30px w-30px p-4px box-s-d b-1px">
                {">"}
              </div>
            )}
          </Overflow>
          <TabPanel style={{ borderRadius: "0px 10px 10px 10px" }}>
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Income</th>
                  <th>Expenses</th>
                  <th>Profit</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  style={{
                    backgroundColor: "#d1d1d1",
                    color: "#4d5061",
                  }}
                  className=""
                >
                  <th>
                    ${all_time_income.macro_income.income ? (
                      all_time_income.macro_income.income.toFixed(2)
                    ) : (
                      "0.00"
                    )}
                  </th>
                  <th>
                    ${all_time_income.macro_income.expenses ? (
                      all_time_income.macro_income.expenses.toFixed(2)
                    ) : (
                      "0.00"
                    )}
                  </th>
                  <th>
                    ${all_time_income.macro_income.profit ? (
                      all_time_income.macro_income.profit.toFixed(2)
                    ) : (
                      "0.00"
                    )}
                  </th>
                </tr>
              </tbody>
            </table>
            <div
              style={{ backgroundColor: "white" }}
              className="p-1rem br-10px m-1rem"
            >
              {all_time_income && (
                <Bar
                  data={bar_income_expenses_profit_data}
                  options={bar_income_expenses_profit_options}
                />
              )}
            </div>
          </TabPanel>
          <TabPanel>
            <h2 className="ta-c w-100per jc-c">All Time Whites</h2>
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Income</th>
                  <th>Expenses</th>
                  <th>Profit</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  style={{
                    backgroundColor: "#d1d1d1",
                    color: "#4d5061",
                  }}
                  className=""
                >
                  <th>
                    ${all_time_income.whites.total_income ? (
                      all_time_income.whites.total_income.toFixed(2)
                    ) : (
                      "0.00"
                    )}
                  </th>
                  <th>
                    ${all_time_income.whites.total_expenses ? (
                      all_time_income.whites.total_expenses.toFixed(2)
                    ) : (
                      "0.00"
                    )}
                  </th>

                  <th>
                    ${all_time_income.whites.total_profit ? (
                      all_time_income.whites.total_profit.toFixed(2)
                    ) : (
                      "0.00"
                    )}
                  </th>
                </tr>
              </tbody>
            </table>
            <h2 className="ta-c w-100per jc-c">
              All Time Whites Income By Size
            </h2>
            <table className="styled-table">
              <thead>
                <tr>
                  <th>S Income</th>
                  <th>M Income</th>
                  <th>L Income</th>
                  <th>XL Income</th>
                  <th>Total Income</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  style={{
                    backgroundColor: "#d1d1d1",
                    color: "#4d5061",
                  }}
                  className=""
                >
                  <th>
                    ${all_time_income.whites.s_total_income ? (
                      all_time_income.whites.s_total_income.toFixed(2)
                    ) : (
                      "0.00"
                    )}
                  </th>
                  <th>
                    ${all_time_income.whites.m_total_income ? (
                      all_time_income.whites.m_total_income.toFixed(2)
                    ) : (
                      "0.00"
                    )}
                  </th>
                  <th>
                    ${all_time_income.whites.l_total_income ? (
                      all_time_income.whites.l_total_income.toFixed(2)
                    ) : (
                      "0.00"
                    )}
                  </th>
                  <th>
                    ${all_time_income.whites.xl_total_income ? (
                      all_time_income.whites.xl_total_income.toFixed(2)
                    ) : (
                      "0.00"
                    )}
                  </th>
                  <th>
                    ${all_time_income.whites.total_income ? (
                      all_time_income.whites.total_income.toFixed(2)
                    ) : (
                      "0.00"
                    )}
                  </th>
                </tr>
              </tbody>
            </table>
            <h2 className="ta-c w-100per jc-c">All Time Whites</h2>
            <table className="styled-table">
              <thead>
                <tr>
                  <th>S Qty</th>
                  <th>M Qty</th>
                  <th>L Qty</th>
                  <th>XL Qty</th>
                  <th>Total Qty</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  style={{
                    backgroundColor: "#d1d1d1",
                    color: "#4d5061",
                  }}
                  className=""
                >
                  <th>
                    {all_time_income.whites.s_qty_sold ? (
                      all_time_income.whites.s_qty_sold
                    ) : (
                      "0"
                    )}
                  </th>
                  <th>
                    {all_time_income.whites.m_qty_sold ? (
                      all_time_income.whites.m_qty_sold
                    ) : (
                      "0"
                    )}
                  </th>
                  <th>
                    {all_time_income.whites.l_qty_sold ? (
                      all_time_income.whites.l_qty_sold
                    ) : (
                      "0"
                    )}
                  </th>
                  <th>
                    {all_time_income.whites.xl_qty_sold ? (
                      all_time_income.whites.xl_qty_sold
                    ) : (
                      "0"
                    )}
                  </th>
                  <th>
                    {all_time_income.whites.total_qty_sold ? (
                      all_time_income.whites.total_qty_sold
                    ) : (
                      "0"
                    )}
                  </th>
                </tr>
              </tbody>
            </table>
          </TabPanel>
          <TabPanel>
            <h2 className="ta-c w-100per jc-c">All Time Refresh Packs</h2>
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Income</th>
                  <th>Expenses</th>
                  <th>Profit</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  style={{
                    backgroundColor: "#d1d1d1",
                    color: "#4d5061",
                  }}
                  className=""
                >
                  <th>
                    ${all_time_income.refresh_packs.total_income ? (
                      all_time_income.refresh_packs.total_income.toFixed(2)
                    ) : (
                      "0.00"
                    )}
                  </th>
                  <th>
                    ${all_time_income.refresh_packs.total_expenses ? (
                      all_time_income.refresh_packs.total_expenses.toFixed(2)
                    ) : (
                      "0.00"
                    )}
                  </th>

                  <th>
                    ${all_time_income.refresh_packs.total_profit ? (
                      all_time_income.refresh_packs.total_profit.toFixed(2)
                    ) : (
                      "0.00"
                    )}
                  </th>
                </tr>
              </tbody>
            </table>
            <h2 className="ta-c w-100per jc-c">
              All Time Refresh Income By Size
            </h2>
            <table className="styled-table">
              <thead>
                <tr>
                  <th>S Income</th>
                  <th>M Income</th>
                  <th>L Income</th>
                  <th>XL Income</th>
                  <th>Total Income</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  style={{
                    backgroundColor: "#d1d1d1",
                    color: "#4d5061",
                  }}
                  className=""
                >
                  <th>
                    ${all_time_income.refresh_packs.s_total_income ? (
                      all_time_income.refresh_packs.s_total_income.toFixed(2)
                    ) : (
                      "0.00"
                    )}
                  </th>
                  <th>
                    ${all_time_income.refresh_packs.m_total_income ? (
                      all_time_income.refresh_packs.m_total_income.toFixed(2)
                    ) : (
                      "0.00"
                    )}
                  </th>
                  <th>
                    ${all_time_income.refresh_packs.l_total_income ? (
                      all_time_income.refresh_packs.l_total_income.toFixed(2)
                    ) : (
                      "0.00"
                    )}
                  </th>
                  <th>
                    ${all_time_income.refresh_packs.xl_total_income ? (
                      all_time_income.refresh_packs.xl_total_income.toFixed(2)
                    ) : (
                      "0.00"
                    )}
                  </th>
                  <th>
                    ${all_time_income.refresh_packs.total_income ? (
                      all_time_income.refresh_packs.total_income.toFixed(2)
                    ) : (
                      "0.00"
                    )}
                  </th>
                </tr>
              </tbody>
            </table>
            <h2 className="ta-c w-100per jc-c">All Time Refresh Packs Qty</h2>
            <table className="styled-table">
              <thead>
                <tr>
                  <th>S Qty</th>
                  <th>M Qty</th>
                  <th>L Qty</th>
                  <th>XL Qty</th>
                  <th>Total Qty</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  style={{
                    backgroundColor: "#d1d1d1",
                    color: "#4d5061",
                  }}
                  className=""
                >
                  <th>
                    {all_time_income.refresh_packs.s_qty_sold ? (
                      all_time_income.refresh_packs.s_qty_sold
                    ) : (
                      "0"
                    )}
                  </th>
                  <th>
                    {all_time_income.refresh_packs.m_qty_sold ? (
                      all_time_income.refresh_packs.m_qty_sold
                    ) : (
                      "0"
                    )}
                  </th>
                  <th>
                    {all_time_income.refresh_packs.l_qty_sold ? (
                      all_time_income.refresh_packs.l_qty_sold
                    ) : (
                      "0"
                    )}
                  </th>
                  <th>
                    {all_time_income.refresh_packs.xl_qty_sold ? (
                      all_time_income.refresh_packs.xl_qty_sold
                    ) : (
                      "0"
                    )}
                  </th>
                  <th>
                    {all_time_income.refresh_packs.total_qty_sold ? (
                      all_time_income.refresh_packs.total_qty_sold
                    ) : (
                      "0"
                    )}
                  </th>
                </tr>
              </tbody>
            </table>
          </TabPanel>
          <TabPanel>
            <h2 className="ta-c w-100per jc-c">All Time All Whites</h2>
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Income</th>
                  <th>Expenses</th>
                  <th>Profit</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  style={{
                    backgroundColor: "#d1d1d1",
                    color: "#4d5061",
                  }}
                  className=""
                >
                  <th>
                    ${all_time_income.total_whites.total_income ? (
                      all_time_income.total_whites.total_income.toFixed(2)
                    ) : (
                      "0.00"
                    )}
                  </th>
                  <th>
                    ${all_time_income.total_whites.total_expenses ? (
                      all_time_income.total_whites.total_expenses.toFixed(2)
                    ) : (
                      "0.00"
                    )}
                  </th>

                  <th>
                    ${all_time_income.total_whites.total_profit ? (
                      all_time_income.total_whites.total_profit.toFixed(2)
                    ) : (
                      "0.00"
                    )}
                  </th>
                </tr>
              </tbody>
            </table>
            <h2 className="ta-c w-100per jc-c">
              All Time Whites Income By Size
            </h2>
            <table className="styled-table">
              <thead>
                <tr>
                  <th>S Income</th>
                  <th>M Income</th>
                  <th>L Income</th>
                  <th>XL Income</th>
                  <th>Total Income</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  style={{
                    backgroundColor: "#d1d1d1",
                    color: "#4d5061",
                  }}
                  className=""
                >
                  <th>
                    ${all_time_income.total_whites.s_total_income ? (
                      all_time_income.total_whites.s_total_income.toFixed(2)
                    ) : (
                      "0.00"
                    )}
                  </th>
                  <th>
                    ${all_time_income.total_whites.m_total_income ? (
                      all_time_income.total_whites.m_total_income.toFixed(2)
                    ) : (
                      "0.00"
                    )}
                  </th>
                  <th>
                    ${all_time_income.total_whites.l_total_income ? (
                      all_time_income.total_whites.l_total_income.toFixed(2)
                    ) : (
                      "0.00"
                    )}
                  </th>
                  <th>
                    ${all_time_income.total_whites.xl_total_income ? (
                      all_time_income.total_whites.xl_total_income.toFixed(2)
                    ) : (
                      "0.00"
                    )}
                  </th>
                  <th>
                    ${all_time_income.total_whites.total_income ? (
                      all_time_income.total_whites.total_income.toFixed(2)
                    ) : (
                      "0.00"
                    )}
                  </th>
                </tr>
              </tbody>
            </table>
            <h2 className="ta-c w-100per jc-c">All Time Whites</h2>
            <table className="styled-table">
              <thead>
                <tr>
                  <th>S Qty</th>
                  <th>M Qty</th>
                  <th>L Qty</th>
                  <th>XL Qty</th>
                  <th>Total Qty</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  style={{
                    backgroundColor: "#d1d1d1",
                    color: "#4d5061",
                  }}
                  className=""
                >
                  <th>
                    {all_time_income.total_whites.s_qty_sold ? (
                      all_time_income.total_whites.s_qty_sold
                    ) : (
                      "0"
                    )}
                  </th>
                  <th>
                    {all_time_income.total_whites.m_qty_sold ? (
                      all_time_income.total_whites.m_qty_sold
                    ) : (
                      "0"
                    )}
                  </th>
                  <th>
                    {all_time_income.total_whites.l_qty_sold ? (
                      all_time_income.total_whites.l_qty_sold
                    ) : (
                      "0"
                    )}
                  </th>
                  <th>
                    {all_time_income.total_whites.xl_qty_sold ? (
                      all_time_income.total_whites.xl_qty_sold
                    ) : (
                      "0"
                    )}
                  </th>
                  <th>
                    {all_time_income.total_whites.total_qty_sold ? (
                      all_time_income.total_whites.total_qty_sold
                    ) : (
                      "0"
                    )}
                  </th>
                </tr>
              </tbody>
            </table>
          </TabPanel>
          <TabPanel>
            <h2 className="ta-c w-100per jc-c">All Time Batteries Income</h2>
            <table className="styled-table">
              <thead>
                <tr>
                  <th>CR1620 Income</th>
                  <th>CR1616 Income</th>
                  <th>CR1225 Income</th>
                  <th>Batteries Income</th>
                  <th>Batteries Expenses</th>
                  <th>Batteries Profit</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  style={{
                    backgroundColor: "#d1d1d1",
                    color: "#4d5061",
                  }}
                  className=""
                >
                  <th>
                    ${all_time_income.batteries.batt_1620_total_income ? (
                      all_time_income.batteries.batt_1620_total_income.toFixed(
                        2
                      )
                    ) : (
                      "0.00"
                    )}
                  </th>

                  <th>
                    ${all_time_income.batteries.batt_1616_total_income ? (
                      all_time_income.batteries.batt_1616_total_income.toFixed(
                        2
                      )
                    ) : (
                      "0.00"
                    )}
                  </th>

                  <th>
                    ${all_time_income.batteries.batt_1225_total_income ? (
                      all_time_income.batteries.batt_1225_total_income.toFixed(
                        2
                      )
                    ) : (
                      "0.00"
                    )}
                  </th>
                  <th>
                    ${all_time_income.batteries.total_income ? (
                      all_time_income.batteries.total_income.toFixed(2)
                    ) : (
                      "0.00"
                    )}
                  </th>
                  <th>
                    ${all_time_income.batteries.total_expenses ? (
                      all_time_income.batteries.total_expenses.toFixed(2)
                    ) : (
                      "0.00"
                    )}
                  </th>
                  <th>
                    ${all_time_income.batteries.total_profit ? (
                      all_time_income.batteries.total_profit.toFixed(2)
                    ) : (
                      "0.00"
                    )}
                  </th>
                </tr>
              </tbody>
            </table>
            <h2 className="ta-c w-100per jc-c">All Time Batteries</h2>
            <table className="styled-table">
              <thead>
                <tr>
                  <th>CR1620 Qty </th>
                  <th>CR1616 Qty </th>
                  <th>CR1225 Qty </th>
                  <th>Batteries Qty</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  style={{
                    backgroundColor: "#d1d1d1",
                    color: "#4d5061",
                  }}
                  className=""
                >
                  <th>
                    {all_time_income.batteries.batt_1620_qty_sold ? (
                      all_time_income.batteries.batt_1620_qty_sold
                    ) : (
                      "0"
                    )}
                  </th>
                  <th>
                    {all_time_income.batteries.batt_1616_qty_sold ? (
                      all_time_income.batteries.batt_1616_qty_sold
                    ) : (
                      "0"
                    )}
                  </th>
                  <th>
                    {all_time_income.batteries.batt_1225_qty_sold ? (
                      all_time_income.batteries.batt_1225_qty_sold
                    ) : (
                      "0"
                    )}
                  </th>
                  <th>
                    {all_time_income.batteries.total_qty_sold ? (
                      all_time_income.batteries.total_qty_sold
                    ) : (
                      "0"
                    )}
                  </th>
                </tr>
              </tbody>
            </table>
          </TabPanel>

          <TabPanel>
            <h2 className="ta-c w-100per jc-c">All Time Decals</h2>
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Individual</th>
                  <th>Sets</th>
                  <th>Income</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  style={{
                    backgroundColor: "#d1d1d1",
                    color: "#4d5061",
                  }}
                  className=""
                >
                  <th>
                    {all_time_income.decals.qty_sold ? (
                      all_time_income.decals.qty_sold
                    ) : (
                      "0"
                    )}
                  </th>
                  <th>
                    {all_time_income.decals.sets ? (
                      all_time_income.decals.sets
                    ) : (
                      "0"
                    )}
                  </th>
                  <th>
                    ${all_time_income.decals.total_income ? (
                      all_time_income.decals.total_income.toFixed(2)
                    ) : (
                      "0.00"
                    )}
                  </th>
                </tr>
              </tbody>
            </table>
          </TabPanel>
        </Tabs>
      )}
    </div>
  );
};
export default ControlPanelPage;
