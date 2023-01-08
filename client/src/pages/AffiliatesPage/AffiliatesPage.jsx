import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { listAffiliates, deleteAffiliate, saveAffiliate } from "../../../actions/affiliateActions";
import { Link, useHistory } from "react-router-dom";
import { Loading, Notification } from "../../components/UtilityComponents";
import { Helmet } from "react-helmet";
import { Search, Sort } from "../../components/SpecialtyComponents";
import { listOrders } from "../../actions/orderActions";
import * as API from "../../api/affiliateApi";
import {
  dates_in_year,
  determine_promoter_code_tier,
  determine_sponsor_code_tier,
  getUrlParameter,
  months,
  toCapitalize,
  update_products_url
} from "../../utils/helper_functions";
import { API_Affiliates, API_Orders, API_Promos, API_Revenue } from "../../utils";
import { GLButton } from "../../components/GlowLEDsComponents";
import CSVReader from "react-csv-reader";
import GLTable from "../../components/GlowLEDsComponents/GLTable/GLTable";
import { set_limit, set_loading, set_page, set_search, set_sort } from "../../slices/affiliateSlice";

const AffiliatesPage = props => {
  const history = useHistory();
  const category = props.match.params.category ? props.match.params.category : "";
  // const [search, set_search] = useState("");
  // const [sort, dispatch(set_sort] = useState(""));
  // const [last_months_orders, set_last_months_orders] = useState([]);
  // const [loading_promo_update, set_loading_promo_update] = useState(false);
  // const [total_orders, set_total_orders] = useState([]);
  // const [page, set_page] = useState(1));
  // const [limit, set_limit] = useState(10);

  const affiliatesSlice = useSelector(state => state.affiliateSlice);
  console.log({ affiliatesSlice });
  const { loading, affiliates, message, error, totalPages, page, limit, sort, colors, search, sort_options } = affiliatesSlice;

  // const affiliateList = useSelector(state => state.affiliateList);
  // const { loading, affiliates, message, error, totalPages } = affiliateList;

  // const affiliateSave = useSelector(state => state.affiliateSave);
  // const { success: successSave } = affiliateSave;

  // const affiliateDelete = useSelector(state => state.affiliateDelete);
  // const { success: successDelete } = affiliateDelete;

  const dispatch = useDispatch();

  // useEffect(() => {
  //   let clean = true;
  //   if (clean) {
  //     dispatch(listOrders({}));
  //     get_last_months_orders();
  //     get_total_orders();
  //   }
  //   return () => (clean = false);
  // }, [successDelete]);

  // const submitHandler = e => {
  //   e.preventDefault();
  //   dispatch(API.listAffiliates({ category, search, sort }));
  // };

  // const sortHandler = e => {
  //   dispatch(set_sort(e.target.value));
  //   dispatch(API.listAffiliates({ category, search, sort: e.target.value }));
  // };

  // useEffect(() => {
  //   let clean = true;
  //   if (clean) {
  //     dispatch(listOrders({}));
  //     get_last_months_orders();
  //     get_total_orders();
  //   }
  //   return () => (clean = false);
  // }, []);

  const deleteHandler = pathname => {
    dispatch(API.deleteAffiliate(pathname));
  };

  const determine_color = affiliate => {
    let result = "";

    if (affiliate.sponsor) {
      result = colors[0].color;
    }
    if (affiliate.promoter) {
      result = colors[1].color;
    }
    if (affiliate.team) {
      result = colors[2].color;
    }
    if (!affiliate.active) {
      result = colors[3].color;
    }
    if (affiliate.rave_mob) {
      result = colors[4].color;
    }
    return result;
  };

  const update_page = (e, new_page) => {
    let search = "";
    let sort = "";
    let filter = "";
    let limit = 10;
    let option = false;

    e.preventDefault();
    const page = parseInt(new_page);
    console.log({ page });
    dispatch(set_page(page));
    update_products_url(history, search, "", "", page, limit);

    dispatch(API.listAffiliates({ limit, page, sort }));
  };

  useEffect(() => {
    let clean = true;
    if (clean) {
      determine_affiliates();
    }
    return () => (clean = false);
  }, []);

  const determine_affiliates = () => {
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
      console.log({ page });
      dispatch(
        API.listAffiliates({
          filter,
          search,
          sort,
          page,
          limit
        })
      );
    }
  };

  // const update_ = (e) => {
  // 	setSortOrder(e.target.value);
  // 	dispatch(listAffiliates({category, search, sort: e.target.value}));
  // };

  // const get_last_months_orders = async () => {
  //   const { data } = await API_Orders.last_months_orders();

  //   set_last_months_orders(data);
  // };
  // const get_total_orders = async () => {
  //   const { data } = await API_Orders.findAll_orders_a();

  //   set_total_orders(data);
  // };

  const update_discount = async e => {
    e.preventDefault();
    dispatch(set_loading(true));
    const date = new Date();
    const request = await API_Promos.update_discount(date.getFullYear(), months[date.getMonth()]);
    if (request) {
      dispatch(API.listAffiliates({ limit, page }));
    }
    dispatch(set_loading(false));
  };

  // const get_code_usage = async affiliate => {
  //   //
  //   const {
  //     data: { number_of_uses, revenue }
  //   } = await API_Promos.get_code_usage(affiliate.public_code.promo_code);

  //   return { number_of_uses, revenue };
  //   // set_number_of_uses(number_of_uses);
  //   // set_revenue(revenue);
  // };

  // const change_affiliate_status = affiliate => {
  //   dispatch(
  //     saveAffiliate({
  //       ...affiliate,
  //       active: affiliate.active ? false : true
  //     })
  //   );
  //   dispatch(listAffiliates({ limit, page }));
  //   dispatch(listAffiliates({ limit, page }));
  // };

  // const upload_rave_mob_csv = async csv => {
  //   const { data } = API_Affiliates.upload_rave_mob_csv(csv);

  //   dispatch(listAffiliates({ limit, page }));
  //   dispatch(listAffiliates({ limit, page }));
  // };

  const column_defs = [
    {
      title: "Active",
      display: affiliate => (
        <GLButton
          variant="icon"
          onClick={() => {
            dispatch(
              API.saveAffiliate({
                ...affiliate,
                active: affiliate.active ? false : true
              })
            );
            dispatch(API.listAffiliates({ limit, page, sort }));
          }}
          // onClick={() => change_affiliate_status(affiliate)}
          aria-label={affiliate.active ? "deactivate" : "activate"}
        >
          {affiliate.active ? <i className="fas fa-check-circle" /> : <i className="fas fa-times-circle" />}
        </GLButton>
      )
    },
    { title: "Artist Name", display: "artist_name" },
    {
      title: "Percentage Off",
      display: affiliate => `${affiliate.private_code && affiliate.private_code.percentage_off}%`
    },
    { title: "Venmo", display: "venmo" },
    { title: "Public Code", display: affiliate => affiliate.private_code && affiliate.public_code.promo_code },
    { title: "Private Code", display: affiliate => affiliate.private_code && affiliate.private_code.promo_code }
  ];

  return (
    <div className="main_container p-20px">
      <Helmet>
        <title>Admin Affiliates | Glow LEDs</title>
      </Helmet>
      <Notification message={message} />
      <div className="wrap jc-b">
        {/* <GLButton variant="primary" className="h-40px">
          Upload CSV */}
        {/* <CSVReader onFileLoaded={(data, fileInfo) => upload_rave_mob_csv(data, fileInfo)} /> */}
        {/* <CSVReader
          onFileLoaded={(data, fileInfo, originalFile) => upload_rave_mob_csv(data, fileInfo, originalFile)}
          label="Upload Rave Mob CSV"
        /> */}
        {/* </GLButton> */}
        <GLButton variant="primary" onChange={update_discount}>
          Update Discount
        </GLButton>
        <Link to="/secure/glow/editaffiliate">
          <GLButton variant="primary">Create Affiliate</GLButton>
        </Link>
      </div>
      <Notification message={message} />
      {/* <Loading loading={loading_promo_update} /> */}
      <GLTable
        title="Affiliates"
        rows={affiliates}
        column_defs={column_defs}
        determine_color={determine_color}
        colors={colors}
        search={search}
        set_search={e => {
          console.log({ value: e.target.value });
          dispatch(set_search(e.target.value));
        }}
        submitHandler={e => {
          e.preventDefault();
          dispatch(API.listAffiliates({ category, search, sort, limit, page: 1 }));
        }}
        sortHandler={e => {
          dispatch(set_sort(e.target.value));
          dispatch(API.listAffiliates({ category, search, sort: e.target.value, limit, page: 1 }));
        }}
        sort_options={sort_options}
        totalPages={totalPages}
        page={page}
        limit={limit}
        update_page={update_page}
        action_row={affiliate => (
          <div className="jc-b">
            <Link to={"/secure/glow/editaffiliate/" + affiliate.pathname}>
              <GLButton variant="icon" aria-label="Edit">
                <i className="fas fa-edit" />
              </GLButton>
            </Link>
            <GLButton variant="icon" onClick={() => deleteHandler(affiliate.pathname)} aria-label="Delete">
              <i className="fas fa-trash-alt" />
            </GLButton>
          </div>
        )}
      />
    </div>
  );
};
export default AffiliatesPage;
