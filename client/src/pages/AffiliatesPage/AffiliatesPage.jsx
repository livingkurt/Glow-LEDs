import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Notification } from "../../shared/SharedComponents";
import { Helmet } from "react-helmet";
import * as API from "../../api/affiliateApi";
import { getUrlParameter, months, update_products_url } from "../../utils/helper_functions";
import { GLButton } from "../../shared/GlowLEDsComponents";
import CSVReader from "react-csv-reader";
import GLTable from "../../shared/GlowLEDsComponents/GLTable/GLTable";
import { set_limit, set_loading, set_page, set_search, set_sort } from "../../slices/affiliateSlice";
import { API_Promos } from "../../utils";

const AffiliatesPage = props => {
  const history = useHistory();
  const category = props.match.params.category ? props.match.params.category : "";

  const affiliatesSlice = useSelector(state => state.affiliateSlice);
  const { affiliates, message, totalPages, page, limit, sort, colors, search, sort_options } = affiliatesSlice;

  const dispatch = useDispatch();

  const deleteHandler = pathname => {
    dispatch(API.deleteAffiliate(pathname));
  };

  const determine_color = affiliate => {
    if (affiliate.sponsor) {
      return colors[0].color;
    }
    if (affiliate.team) {
      return colors[2].color;
    }
    if (affiliate.rave_mob) {
      return colors[4].color;
    }
    if (affiliate.promoter) {
      return colors[1].color;
    }
    if (!affiliate.active) {
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

    dispatch(API.listAffiliates({ active: true, limit, page, sort }));
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
      dispatch(
        API.listAffiliates({
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
      determine_affiliates();
    }
    dispatch(set_loading(false));
  };

  const create_rave_mob_affiliates = async csv => {
    const { data } = dispatch(API.create_rave_mob_affiliates(csv));

    determine_affiliates();
  };

  const column_defs = [
    {
      title: "Active",
      display: affiliate => (
        <GLButton
          variant="icon"
          onClick={() => {
            dispatch(
              API.createAffiliate({
                ...affiliate,
                active: affiliate.active ? false : true
              })
            );
            dispatch(API.listAffiliates({ active: true, limit, page, sort }));
          }}
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
        <GLButton variant="primary" className="h-40px">
          <CSVReader
            onFileLoaded={(data, fileInfo, originalFile) => create_rave_mob_affiliates(data, fileInfo, originalFile)}
            label="Create Rave Mob Affiliates"
          />
        </GLButton>
        <GLButton variant="primary" onChange={update_discount}>
          Update Discount
        </GLButton>
        <Link to="/secure/glow/editaffiliate">
          <GLButton variant="primary">Create Affiliate</GLButton>
        </Link>
      </div>
      <Notification message={message} />
      <GLTable
        title="Affiliates"
        rows={affiliates}
        column_defs={column_defs}
        determine_color={determine_color}
        colors={colors}
        search={search}
        set_search={e => {
          dispatch(set_search(e.target.value));
        }}
        submitHandler={e => {
          e.preventDefault();
          dispatch(API.listAffiliates({ active: true, category, search, sort, limit, page: 1 }));
        }}
        sortHandler={e => {
          dispatch(set_sort(e.target.value));
          dispatch(API.listAffiliates({ active: true, category, search, sort: e.target.value, limit, page: 1 }));
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
