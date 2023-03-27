import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Notification } from "../../shared/SharedComponents";
import { Helmet } from "react-helmet";
import * as API from "../../api/wholesalerApi";
import { getUrlParameter, months, update_products_url } from "../../utils/helper_functions";
import { GLButton } from "../../shared/GlowLEDsComponents";
import CSVReader from "react-csv-reader";
import GLTable from "../../shared/GlowLEDsComponents/GLTable/GLTable";
import { set_limit, set_loading, set_page, set_search, set_sort } from "../../slices/wholesalerSlice";
import { API_Promos } from "../../utils";

const WholesalersPage = props => {
  const history = useHistory();
  const category = props.match.params.category ? props.match.params.category : "";

  const wholesalersSlice = useSelector(state => state.wholesalerSlice);
  const { wholesalers, message, totalPages, page, limit, sort, colors, search, sort_options } = wholesalersSlice;

  const dispatch = useDispatch();

  const deleteHandler = pathname => {
    dispatch(API.deleteWholesaler(pathname));
  };

  const determine_color = wholesaler => {
    if (wholesaler.sponsor) {
      return colors[0].color;
    }
    if (wholesaler.team) {
      return colors[2].color;
    }
    if (wholesaler.rave_mob) {
      return colors[4].color;
    }
    if (wholesaler.promoter) {
      return colors[1].color;
    }
    if (!wholesaler.active) {
      return colors[3].color;
    }
    return "";
  };

  const update_page = (e, new_page) => {
    let search = "";
    let sort = "";
    let filter = "";
    let limit = 10;
    let option = false;

    e.preventDefault();
    const page = parseInt(new_page);
    dispatch(set_page(page));
    update_products_url(history, search, "", "", page, limit);

    dispatch(API.listWholesalers({ active: true, limit, page, sort }));
  };

  useEffect(() => {
    let clean = true;
    if (clean) {
      determine_wholesalers();
    }
    return () => (clean = false);
  }, []);

  const determine_wholesalers = () => {
    const query = getUrlParameter(props.location);
    let search = "";
    let sort = "";
    let filter = "";
    let limit = "";
    let page = "";

    // prnt({ query });
    if (Object.keys(query).length > 0) {
      if (query.search) {
        dispatch(set_search(query.search.split("%20").join(" ")));
        search = query.search.split("%20").join(" ");
      }
      if (query.sort) {
        dispatch(set_sort(query.sort));
        sort = query.sort;
      }
      // if (query.filter) {
      // 	//
      // 	filter = waitForElement(query.filter, chips_list);
      // }
      if (query.page) {
        dispatch(set_page(query.page));
        page = query.page;
      }
      if (query.limit) {
        dispatch(set_limit(query.limit));
        limit = query.limit;
      }
      dispatch(
        API.listWholesalers({
          active: true,
          filter,
          search,
          sort,
          page,
          limit
        })
      );
    }
  };

  const update_discount = async e => {
    e.preventDefault();
    dispatch(set_loading(true));
    const date = new Date();
    const request = await API_Promos.update_discount(date.getFullYear(), months[date.getMonth()]);
    if (request) {
      determine_wholesalers();
    }
    dispatch(set_loading(false));
  };

  const column_defs = [
    {
      title: "Active",
      display: wholesaler => (
        <GLButton
          variant="icon"
          onClick={() => {
            dispatch(
              API.saveWholesaler({
                ...wholesaler,
                active: wholesaler.active ? false : true
              })
            );
            dispatch(API.listWholesalers({ active: true, limit, page, sort }));
          }}
          aria-label={wholesaler.active ? "deactivate" : "activate"}
        >
          {wholesaler.active ? <i className="fas fa-check-circle" /> : <i className="fas fa-times-circle" />}
        </GLButton>
      )
    },
    { title: "Artist Name", display: "artist_name" },
    {
      title: "Percentage Off",
      display: wholesaler => `${wholesaler.private_code && wholesaler.private_code.percentage_off}%`
    },
    { title: "Venmo", display: "venmo" },
    { title: "Public Code", display: wholesaler => wholesaler.private_code && wholesaler.public_code.promo_code },
    { title: "Private Code", display: wholesaler => wholesaler.private_code && wholesaler.private_code.promo_code }
  ];

  return (
    <div className="main_container p-20px">
      <Helmet>
        <title>Admin Wholesalers | Glow LEDs</title>
      </Helmet>
      <Notification message={message} />
      <div className="wrap jc-b">
        <GLButton variant="primary" onChange={update_discount}>
          Update Discount
        </GLButton>
        <Link to="/secure/glow/editwholesaler">
          <GLButton variant="primary">Create Wholesaler</GLButton>
        </Link>
      </div>
      <Notification message={message} />
      <GLTable
        title="Wholesalers"
        rows={wholesalers}
        column_defs={column_defs}
        determine_color={determine_color}
        colors={colors}
        search={search}
        set_search={e => {
          dispatch(set_search(e.target.value));
        }}
        submitHandler={e => {
          e.preventDefault();
          dispatch(API.listWholesalers({ active: true, category, search, sort, limit, page: 1 }));
        }}
        sortHandler={e => {
          dispatch(set_sort(e.target.value));
          dispatch(API.listWholesalers({ active: true, category, search, sort: e.target.value, limit, page: 1 }));
        }}
        sort_options={sort_options}
        totalPages={totalPages}
        page={page}
        limit={limit}
        update_page={update_page}
        action_row={wholesaler => (
          <div className="jc-b">
            <Link
              to={{
                pathname: "/secure/glow/editwholesaler/" + wholesaler.pathname,
                previous_path: history.location.pathname + history.location.search
              }}
            >
              <GLButton variant="icon" aria-label="Edit">
                <i className="fas fa-edit" />
              </GLButton>
            </Link>
            <GLButton variant="icon" onClick={() => deleteHandler(wholesaler.pathname)} aria-label="Delete">
              <i className="fas fa-trash-alt" />
            </GLButton>
          </div>
        )}
      />
    </div>
  );
};
export default WholesalersPage;
