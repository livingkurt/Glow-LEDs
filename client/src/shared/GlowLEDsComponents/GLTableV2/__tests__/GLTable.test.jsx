/* eslint-disable jest/no-disabled-tests */
import * as React from "react";
import userEvent from "@testing-library/user-event";
import { tagKeyMatchFull } from "covalent/MaterialUI/TagInput/tagRegex";
import { debug } from "jest-preview";
import { screen, within, render } from "../../../../test_utils/renderRedux";
import GLTable from "../GLTableV2";
import props from "../__mocks__/mockState";
import glTableReducer from "../reducers/glTableReducer";
import { applySearch } from "../actions/actions";

const initialState = props;

const renderGLTable = state => {
  const reducers = {
    glTable: glTableReducer("glTable"),
  };
  const { glTable } = state;

  const { store } = render(<GLTable {...glTable} />, { ...state }, reducers);

  return { store, state };
};

describe("<GLTable/>, Page Visibility", () => {
  test("it render table", () => {
    renderGLTable(initialState);
    expect(screen.queryByTestId(/table-head/i)).toBeInTheDocument();
  });
});

describe("<GLTable/>, basic table functionality", () => {
  test("it shows 10 rows upon landing", () => {
    renderGLTable(initialState);
    expect(screen.queryAllByTestId(/glTable-row/i).length).toEqual(10);
  });
  test("it shows tag values when tag key is clicked", () => {
    const newProps = { ...initialState, glTable: { ...initialState.glTable, expandRow: "archive56401" } };
    renderGLTable(newProps);
    debug();
    expect(screen.queryAllByTestId(/glTable-subrow/i).length).toEqual(3);
  });
  test("it shows that filter menus can open", () => {
    const newProps = {
      ...initialState,
      glTable: { ...initialState.glTable, menuOpen: true, menuSelection: "locations" },
    };
    renderGLTable(newProps);
    expect(screen.queryByTestId(/matrix-sub-menu-input/i)).toBeInTheDocument();
  });
  test("it shows that filtering works", () => {
    const newProps = {
      ...initialState,
      glTable: { ...initialState.glTable, menuOpen: true, menuSelection: "locations" },
    };
    renderGLTable(newProps);

    userEvent.click(screen.getByText("Rome"));

    expect(screen.queryAllByTestId(/glTable-row/i).length).toEqual(3);
  });
  test("it shows that filtering search works", () => {
    const newProps = {
      ...initialState,
      glTable: { ...initialState.glTable, menuOpen: true, menuSelection: "locations" },
    };
    renderGLTable(newProps);

    userEvent.type(
      within(screen.queryByTestId("covalent-table-sub-menu-search-input")).queryByTestId("mui-text-field-container"),
      "Rome"
    );

    expect(within(screen.queryByTestId("matrix-sub-menu")).queryAllByTestId("menu-item").length).toEqual(1);
  });
  test("it shows that search works", () => {
    const { store: glTableStore, state } = renderGLTable(initialState);
    const { glTable } = state;
    glTableStore.dispatch(applySearch(glTable.namespace, "zztop"));

    expect(screen.queryAllByTestId(/glTable-row/i).length).toEqual(1);
  });
  test("it shows that search restricts spaces and special characters", () => {
    const newProps = {
      ...initialState,
      glTable: {
        ...initialState.glTable,
        searchPlaceholder: "Search by Tag Name",
        restrictSearchChars: e => {
          if (!tagKeyMatchFull(e.key)) {
            e.preventDefault();
            return false;
          }
          return e;
        },
      },
    };
    renderGLTable(newProps);
    const inputEl = screen.queryByPlaceholderText("Search by Tag Name");
    userEvent.type(inputEl, " ");
    userEvent.type(inputEl, "x");
    userEvent.type(inputEl, "$");
    expect(inputEl.value).toEqual("x");
  });
  test("it shows that sort works", () => {
    renderGLTable(initialState);
    userEvent.click(screen.queryByTestId(/tableHeaderColumn-1/i));

    expect(within(screen.queryAllByTestId(/glTable-row/i)[0]).getByText(/zztop/i)).toBeInTheDocument();
  });
});
