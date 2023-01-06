import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveAffiliate, detailsAffiliate } from "../../../actions/affiliateActions";
import { useHistory } from "react-router-dom";
import { DropdownDisplay, Loading, Notification } from "../../../components/UtilityComponents";
import { Helmet } from "react-helmet";
import { Prompt } from "react-router";
import { listUsers } from "../../../actions/userActions";
import { listProducts } from "../../../actions/productActions";
import { listChips } from "../../../actions/chipActions";
import { snake_case } from "../../../utils/helper_functions";
import { listPromos } from "../../../actions/promoActions";
import { option_list } from "../../../utils/react_helper_functions";
import { GLButton } from "../../../components/GlowLEDsComponents";
import { set_affiliate, set_loading_checkboxes, set_private_code, set_public_code } from "../../slices/affiliateSlice";
import * as API from "../../../api/affiliateApi";

const EditAffiliatePage = props => {
  // const [id, set_id] = useState("");
  // const [user, set_user] = useState("");
  // const [artist_name, set_artist_name] = useState("");
  // const [instagram_handle, set_instagram_handle] = useState("");
  // const [facebook_name, set_facebook_name] = useState("");
  // const [percentage_off, set_percentage_off] = useState("");

  // const [funds_generated, set_funds_generated] = useState("");
  // const [sponsor, set_sponsor] = useState("");
  // const [promoter, set_promoter] = useState("");
  // const [rave_mob, set_rave_mob] = useState("");
  // const [active, set_active] = useState("");
  // const [style, set_style] = useState("");
  // const [inspiration, set_inspiration] = useState("");
  // const [bio, set_bio] = useState("");
  // const [link, set_link] = useState("");
  // const [picture, set_picture] = useState("");
  // const [location, set_location] = useState("");
  // const [years, set_years] = useState("");
  // const [team, set_team] = useState("");
  // const [video, set_video] = useState("");
  // const [venmo, set_venmo] = useState("");
  // const [product, set_product] = useState("");
  // const [products, set_products] = useState([]);
  // const [chips, set_chips] = useState([]);
  // const [pathname, set_pathname] = useState("");
  // const [public_code, set_public_code] = useState("");
  // const [private_code, set_private_code] = useState("");
  // const [chip, set_chip] = useState("");

  // const [loading_checkboxes, set_loading_checkboxes] = useState(true);

  const userList = useSelector(state => state.userList);
  const { users } = userList;

  const history = useHistory();

  const affiliateDetails = useSelector(state => state.affiliateDetails);
  const {
    loading,
    affiliate,
    message,
    error,
    id,
    user,
    artist_name,
    instagram_handle,
    facebook_name,
    percentage_off,
    sponsor,
    promoter,
    rave_mob,
    active,
    style,
    inspiration,
    bio,
    link,
    picture,
    location,
    years,
    team,
    video,
    venmo,
    product,
    products,
    chips,
    pathname,
    public_code,
    private_code,
    chip,
    loading_checkboxes
  } = affiliateDetails;

  const productList = useSelector(state => state.productList);
  const { products: products_list } = productList;

  const chipList = useSelector(state => state.chipList);
  const { chips: chips_list } = chipList;

  const promoList = useSelector(state => state.promoList);
  const { promos: promos_list } = promoList;

  const dispatch = useDispatch();

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (props.match.params.pathname) {
        dispatch(API.detailsAffiliate({ pathname: props.match.params.pathname }));
        dispatch(API.detailsAffiliate({ pathname: props.match.params.pathname }));
      } else {
        dispatch(API.detailsAffiliate({}));
      }
      dispatch(listUsers({}));
      dispatch(listProducts({ option: false, hidden: false }));
      dispatch(listPromos({}));
      dispatch(listPromos({}));
      dispatch(listChips({}));
    }
    return () => (clean = false);
  }, [dispatch, props.match.params.pathname]);

  setTimeout(() => {
    dispatch(set_loading_checkboxes(false));
  }, 500);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(
      saveAffiliate({
        _id: id,
        user,
        artist_name,
        instagram_handle,
        facebook_name,
        percentage_off,
        sponsor,
        promoter,
        rave_mob,
        active,
        bio,
        link,
        picture,
        team,
        style,
        inspiration,
        location,
        years,
        video,
        venmo,
        public_code: public_code && public_code._id,
        private_code: private_code && private_code._id,
        pathname: pathname ? pathname : snake_case(artist_name),
        products,
        chips: chips && chips.map(chip => chip._id)
      })
    );
    e.target.reset();
    dispatch(set_affiliate({}));
    history.push("/secure/glow/affiliates");
  };

  const add_promo = (e, code_type) => {
    e.preventDefault();
    const promo_object = JSON.parse(e.target.value);

    //
    // if (promo.indexOf(' ') >= 0) {
    //
    // 	promo.split(' ').map((promo) => {
    // 		set_promos((promos) => [ ...promos, promo ]);
    // 	});
    // } else
    if (code_type === "public") {
      dispatch(set_public_code(promo_object));
    } else if (code_type === "private") {
      dispatch(set_private_code(promo_object));
    }
  };

  const remove_promo = (e, code_type) => {
    e.preventDefault();
    if (code_type === "public") {
      dispatch(set_public_code(""));
    } else if (code_type === "private") {
      dispatch(set_private_code(""));
    }
  };
  const promo_display = (promo, code_type) => {
    if (promo) {
      return (
        <div>
          <div className="jc-b">
            <div>
              <div className="promo_code mv-1rem row jc-b max-w-55rem w-100per">
                <div>
                  <GLButton variant="icon" onClick={e => remove_promo(e, code_type)} aria-label="Delete">
                    <i className="fas fa-times mr-5px" />
                  </GLButton>
                  {promo && promo.promo_code}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="main_container p-20px">
      <h1 style={{ textAlign: "center" }}>{props.match.params.id ? "Edit Affiliate" : "Create Affiliate"}</h1>

      <div className="form">
        <form onSubmit={submitHandler} style={{ width: "100%" }}>
          <Notification message={message} />
          <Loading loading={loading} error={error}>
            {affiliate && (
              <div>
                <Helmet>
                  <title>Edit Affiliate | Glow LEDs</title>
                </Helmet>
                <ul className="edit-form-container" style={{ maxWidth: "30rem", marginBottom: "20px" }}>
                  <div className="row wrap">
                    <div className="w-228px m-10px">
                      <li>
                        <label htmlFor="user">User</label>
                        <input
                          type="text"
                          name="user"
                          value={user}
                          id="user"
                          onChange={e => dispatch(set_affiliate({ user: e.target.value }))}
                        />
                      </li>
                      {users && (
                        <div className="ai-c h-25px mv-10px mb-30px jc-c">
                          <div className="custom-select w-100per">
                            <select
                              className="qty_select_dropdown w-100per"
                              onChange={e => dispatch(set_affiliate({ user: e.target.value }))}
                            >
                              <option key={1} defaultValue="">
                                ---Choose User---
                              </option>
                              {users.map((user, index) => (
                                <option key={index} value={user._id}>
                                  {user.first_name} {user.last_name}
                                </option>
                              ))}
                            </select>
                            <span className="custom-arrow" />
                          </div>
                        </div>
                      )}

                      <li>
                        <label htmlFor="artist_name">Artist Name</label>
                        <input
                          type="text"
                          name="artist_name"
                          value={artist_name}
                          id="artist_name"
                          onChange={e => dispatch(set_affiliate({ artist_name: e.target.value }))}
                        />
                      </li>

                      <li>
                        <label htmlFor="facebook_name">Facebook Glover Page</label>
                        <input
                          type="text"
                          name="facebook_name"
                          value={facebook_name}
                          id="facebook_name"
                          onChange={e => dispatch(set_affiliate({ facebook_name: e.target.value }))}
                        />
                      </li>
                      <li>
                        <label htmlFor="instagram_handle">Instagram Handle</label>
                        <input
                          type="text"
                          name="instagram_handle"
                          value={instagram_handle}
                          id="instagram_handle"
                          onChange={e => dispatch(set_affiliate({ instagram_handle: e.target.value }))}
                        />
                      </li>
                      <li>
                        <label htmlFor="location">Location</label>
                        <input
                          type="text"
                          name="location"
                          value={location}
                          id="location"
                          onChange={e => dispatch(set_affiliate({ location: e.target.value }))}
                        />
                      </li>
                      <li>
                        <label htmlFor="years">Years Gloving</label>
                        <input
                          type="text"
                          name="years"
                          value={years}
                          id="years"
                          onChange={e => dispatch(set_affiliate({ years: e.target.value }))}
                        />
                      </li>
                      <li>
                        <label htmlFor="picture">Picture</label>
                        <input
                          type="text"
                          name="picture"
                          value={picture}
                          id="picture"
                          onChange={e => dispatch(set_affiliate({ picture: e.target.value }))}
                        />
                      </li>
                      <li>
                        <label htmlFor="video">Video</label>
                        <input
                          type="text"
                          name="video"
                          value={video}
                          id="video"
                          onChange={e => dispatch(set_affiliate({ video: e.target.value }))}
                        />
                      </li>

                      <li>
                        <label htmlFor="style">Your Style</label>
                        <input
                          type="text"
                          name="style"
                          value={style}
                          placeholder="Wave Tuts, Clusters, Whips..."
                          // onFocus={() => this.placeholder('')}
                          // onBlur={() => this.placeholder('Wave Tuts, Clusters, Whips...')}
                          id="style"
                          onChange={e => dispatch(set_affiliate({ style: e.target.value }))}
                        />
                      </li>
                      <li>
                        <label htmlFor="inspiration">Inspiration</label>
                        <input
                          type="text"
                          name="inspiration"
                          value={inspiration}
                          placeholder="Flow, Megasloth, Jest..."
                          // onFocus={() => this.placeholder('')}
                          // onBlur={() => this.placeholder('Flow, Megasloth, Jest...')}
                          id="inspiration"
                          onChange={e => dispatch(set_affiliate({ inspiration: e.target.value }))}
                        />
                      </li>

                      <li>
                        <label htmlFor="bio">Bio</label>
                        <textarea
                          className="edit_product_textarea"
                          name="bio"
                          placeholder="Write a little something to introduce yourself..."
                          // onFocus={() => this.placeholder('')}
                          // onBlur={() =>
                          // this.placeholder(
                          // 	'Write a little something to introduce yourself...'
                          // )}
                          defaultValue={bio}
                          id="bio"
                          onChange={e => dispatch(set_affiliate({ bio: e.target.value }))}
                        />
                      </li>
                      <li>
                        <label htmlFor="link">Website</label>
                        <input
                          type="text"
                          name="link"
                          value={link}
                          placeholder="https://www..."
                          // onFocus={() => this.placeholder('')}
                          // onBlur={() => this.placeholder('https://www...')}
                          id="link"
                          onChange={e => dispatch(set_affiliate({ link: e.target.value }))}
                        />
                      </li>
                      <li>
                        <label htmlFor="percentage_off">Percentage Off</label>
                        <input
                          type="text"
                          name="percentage_off"
                          value={percentage_off}
                          id="percentage_off"
                          onChange={e => dispatch(set_affiliate({ percentage_off: e.target.value }))}
                        />
                      </li>

                      <li>
                        <label htmlFor="promo">Public Code</label>
                        <div className="ai-c h-25px mv-15px jc-c">
                          <div className="custom-select">
                            <select className="qty_select_dropdown" onChange={e => add_promo(e, "public")}>
                              <option key={1} defaultValue="">
                                ---Choose Public Code---
                              </option>
                              {promos_list
                                .filter(promo => !promo.hidden)
                                .map((promo, index) => (
                                  <option key={index} value={JSON.stringify(promo)}>
                                    {promo.promo_code}
                                  </option>
                                ))}
                            </select>
                            <span className="custom-arrow" />
                          </div>
                        </div>
                        {promo_display(public_code, "public")}
                      </li>

                      <li>
                        <label htmlFor="public_code">Public Code</label>
                        <input
                          type="text"
                          name="public_code"
                          value={public_code && public_code.promo_code}
                          id="public_code"
                          onChange={e => dispatch(set_affiliate({ public_code: e.target.value }))}
                        />
                      </li>
                      <li>
                        <label htmlFor="promo">Private Code</label>
                        <div className="ai-c h-25px mv-15px jc-c">
                          <div className="custom-select">
                            <select className="qty_select_dropdown" onChange={e => add_promo(e, "private")}>
                              <option key={1} defaultValue="">
                                ---Choose Private Code---
                              </option>
                              {promos_list
                                .filter(promo => !promo.hidden)
                                .map((promo, index) => (
                                  <option key={index} value={JSON.stringify(promo)}>
                                    {promo.promo_code}
                                  </option>
                                ))}
                            </select>
                            <span className="custom-arrow" />
                          </div>
                        </div>
                        {promo_display(private_code, "private")}
                      </li>
                      <li>
                        <label htmlFor="private_code">Private Code</label>
                        <input
                          type="text"
                          name="private_code"
                          value={private_code && private_code.promo_code}
                          id="private_code"
                          onChange={e => dispatch(set_affiliate({ private_code: e.target.value }))}
                        />
                      </li>
                      <li>
                        <label htmlFor="pathname">Pathname</label>
                        <input
                          type="text"
                          name="pathname"
                          value={pathname ? pathname : artist_name && snake_case(artist_name)}
                          id="pathname"
                          onChange={e => dispatch(set_affiliate({ pathname: e.target.value }))}
                        />
                      </li>
                      <li>
                        <label htmlFor="venmo">Venmo</label>
                        <input
                          type="text"
                          name="venmo"
                          value={venmo}
                          id="venmo"
                          onChange={e => dispatch(set_affiliate({ venmo: e.target.value }))}
                        />
                      </li>
                      {/* {option_list(products_list, products, set_products, 'Glow Gear')} */}
                      <DropdownDisplay
                        display_key={"name"}
                        item_list={products_list}
                        list_items={products}
                        set_items={set_products}
                        list_name={"Glow Gear"}
                      />
                      <DropdownDisplay
                        display_key={"name"}
                        item_list={chips_list}
                        list_items={chips}
                        set_items={set_chips}
                        list_name={"Chips"}
                      />
                      {/* {option_list(chips_list, chips, set_chips, 'Chips')} */}

                      {loading_checkboxes ? (
                        <div>Loading...</div>
                      ) : (
                        <li>
                          <label htmlFor="team">Team</label>
                          <input
                            type="checkbox"
                            name="team"
                            // defaultChecked={team ? 'checked' : 'unchecked'}
                            // defaultValue={team}
                            defaultChecked={team}
                            // value={team ? '1' : '0'}
                            id="team"
                            onChange={e => dispatch(set_affiliate({ team: e.target.checked }))}
                          />
                        </li>
                      )}
                      {loading_checkboxes ? (
                        <div>Loading...</div>
                      ) : (
                        <li>
                          <label htmlFor="sponsor">Sponsor</label>
                          <input
                            type="checkbox"
                            name="sponsor"
                            // defaultChecked={sponsor ? 'checked' : 'unchecked'}
                            // defaultValue={sponsor}
                            defaultChecked={sponsor}
                            // value={sponsor ? '1' : '0'}
                            id="sponsor"
                            onChange={e => dispatch(set_affiliate({ sponsor: e.target.checked }))}
                          />
                        </li>
                      )}
                      {loading_checkboxes ? (
                        <div>Loading...</div>
                      ) : (
                        <li>
                          <label htmlFor="promoter">Promoter</label>
                          <input
                            type="checkbox"
                            name="promoter"
                            // defaultChecked={promoter ? 'checked' : 'unchecked'}
                            // defaultValue={promoter}
                            defaultChecked={promoter}
                            // value={promoter ? '1' : '0'}
                            id="promoter"
                            onChange={e => dispatch(set_affiliate({ rave_mob: e.target.checked }))}
                          />
                        </li>
                      )}
                      {loading_checkboxes ? (
                        <div>Loading...</div>
                      ) : (
                        <li>
                          <label htmlFor="rave_mob">Rave Mob</label>
                          <input
                            type="checkbox"
                            name="rave_mob"
                            // defaultChecked={rave_mob ? 'checked' : 'unchecked'}
                            // defaultValue={rave_mob}
                            defaultChecked={rave_mob}
                            // value={rave_mob ? '1' : '0'}
                            id="rave_mob"
                            onChange={e => dispatch(set_affiliate({ rave_mob: e.target.checked }))}
                          />
                        </li>
                      )}
                      {loading_checkboxes ? (
                        <div>Loading...</div>
                      ) : (
                        <li>
                          <label htmlFor="active">Active</label>
                          <input
                            type="checkbox"
                            name="active"
                            // defaultChecked={active ? 'checked' : 'unchecked'}
                            // defaultValue={active}
                            defaultChecked={active}
                            // value={active ? '1' : '0'}
                            id="active"
                            onChange={e => dispatch(set_affiliate({ active: e.target.checked }))}
                          />
                        </li>
                      )}
                    </div>
                  </div>
                  <li>
                    <GLButton type="submit" variant="primary">
                      {id ? "Update" : "Create"}
                    </GLButton>
                  </li>
                  <li>
                    <GLButton variant="secondary" onClick={() => history.goBack()}>
                      Back to Affiliates
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
export default EditAffiliatePage;
