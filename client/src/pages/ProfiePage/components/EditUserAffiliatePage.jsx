import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { DropdownDisplay, Loading } from "../../../shared/SharedComponents";
import { Helmet } from "react-helmet";
import { snake_case } from "../../../utils/helper_functions";
import useWindowDimensions from "../../../shared/Hooks/windowDimensions";
import { GLButton } from "../../../shared/GlowLEDsComponents";
import * as API from "../../../api";

const EditUserAffiliatePage = props => {
  const [id, set_id] = useState("");
  const [user, set_user] = useState("");
  const [artist_name, set_artist_name] = useState("");
  const [instagram_handle, set_instagram_handle] = useState("");
  const [facebook_name, set_facebook_name] = useState("");
  // const [ promo_code, set_promo_code ] = useState('');
  const [sponsor, set_sponsor] = useState("");
  const [promoter, set_promoter] = useState("");
  const [style, set_style] = useState("");
  const [inspiration, set_inspiration] = useState("");
  const [bio, set_bio] = useState("");
  const [link, set_link] = useState("");
  const [location, set_location] = useState("");
  const [years, set_years] = useState("");
  const [tiktok, set_tiktok] = useState("");
  const [venmo, set_venmo] = useState("");
  const [pathname, set_pathname] = useState("");
  const [product, set_product] = useState("");
  const [products, set_products] = useState([]);
  const [chip, set_chip] = useState("");
  const [chips, set_chips] = useState([]);
  // const [ answers, set_answers ] = useState([]);
  const [answer_1, set_answer_1] = useState("");
  const [answer_2, set_answer_2] = useState("");
  const [answer_3, set_answer_3] = useState("");
  const [public_code, set_public_code] = useState("");
  const [private_code, set_private_code] = useState("");
  const [active, set_active] = useState("");

  const [loading_checkboxes, set_loading_checkboxes] = useState(true);

  const { height, width } = useWindowDimensions();

  const productSlice = useSelector(state => state.productSlice);
  const { products: products_list } = productSlice;

  const chipSlice = useSelector(state => state.chipSlice);
  const { chips: chips_list } = chipSlice;

  const promoSlice = useSelector(state => state.promoSlice);
  const { promos: promos_list } = promoSlice;
  const history = useHistory();

  const affiliateSlice = useSelector(state => state.affiliateSlice);
  const { affiliate, loading, error, success } = affiliateSlice;

  const userSlice = useSelector(state => state.userSlice);
  const { current_user } = userSlice;

  const set_state = () => {
    set_id(affiliate._id);
    set_user(affiliate.user && affiliate.user._id);
    set_artist_name(affiliate.artist_name);
    set_instagram_handle(affiliate.instagram_handle);
    set_facebook_name(affiliate.facebook_name);
    // set_promo_code(affiliate.promo_code);
    set_promoter(affiliate.promoter);
    set_sponsor(affiliate.sponsor);
    set_active(affiliate.active);
    set_bio(affiliate.bio);
    set_link(affiliate.link);
    set_style(affiliate.style);
    set_venmo(affiliate.venmo);
    set_inspiration(affiliate.inspiration);
    set_location(affiliate.location);
    set_years(affiliate.years);
    set_tiktok(affiliate.tiktok);
    set_pathname(affiliate.pathname);
    set_products(affiliate.products);
    set_chips(affiliate.chips);
    set_public_code(affiliate.public_code);
    set_private_code(affiliate.private_code);
  };
  const unset_state = () => {
    set_id("");
    set_user("");
    set_artist_name("");
    set_instagram_handle("");
    set_facebook_name("");
    // set_promo_code('');
    set_promoter("");
    set_sponsor("");
    set_active("");
    set_bio("");
    set_link("");
    set_style("");
    set_location("");
    set_years("");
    set_venmo("");
    set_inspiration("");
    set_tiktok("");
    set_pathname("");
    set_products([]);
    set_product("");
    set_chip([]);
    set_public_code("");
    set_private_code("");
    set_answer_1("");
    set_answer_2("");
    set_answer_3("");
  };

  const dispatch = useDispatch();

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (props.match.params.id) {
        dispatch(API.detailsAffiliate({ pathname: props.match.params.id }));
        dispatch(API.detailsAffiliate({ pathname: props.match.params.id }));
      } else {
        dispatch(API.detailsAffiliate(""));
      }
      dispatch(API.listUsers({}));
      dispatch(API.listProducts({ option: false, hidden: false }));
      dispatch(API.listChips({}));
      set_state();
    }
    return () => (clean = false);
  }, [dispatch, props.match.params.id]);

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (affiliate) {
        set_state();
      } else {
        unset_state();
      }
    }
    return () => (clean = false);
  }, [affiliate]);
  setTimeout(() => {
    set_loading_checkboxes(false);
  }, 500);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(
      API.saveAffiliate({
        _id: id,
        user: current_user._id,
        artist_name,
        instagram_handle,
        facebook_name,
        tiktok,
        active,
        bio,
        link,
        location,
        years,
        style,
        venmo,
        percentage_off: 20,
        inspiration,
        pathname: pathname ? pathname : artist_name && snake_case(artist_name),
        products,
        chips: chips && chips.map(chip => chip._id),
        answers: answer_1 && answer_2 && answer_3 && !props.match.params.id && [answer_1, answer_2, answer_3]
      })
    );

    e.target.reset();
    unset_state();
  };

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (success && affiliate_saved) {
        props.history.push("/pages/complete/affiliate/" + affiliate_saved.pathname);
      }
    }
    return () => (clean = false);
  }, [success]);

  // useEffect(() => {
  //   let clean = true;
  //   if (clean) {
  //     if (userInfo && !userInfo.is_affiliated) {
  //       history.push("/secure/account/profile/");
  //     }
  //   }
  //   return () => (clean = false);
  // }, [userInfo]);

  return (
    <div className="main_container p-20px">
      <h1 style={{ textAlign: "center" }}>{props.match.params.id ? "Update Affiliate" : "Affiliate Sign Up"}</h1>

      <div className="form">
        <form onSubmit={submitHandler} style={{ width: "100%" }}>
          {/* {loading_data ? (
						<div>Loading...</div>
					) : ( */}
          <Loading loading={loading} error={error}>
            {affiliate && (
              <div>
                <Helmet>
                  <title>Edit Affiliate| Glow LEDs</title>
                </Helmet>

                <ul
                  className={`edit-form-container ${width > 617 ? "max-w-55rem" : "max-w-40rem"}`}
                  style={{ maxWidth: "55rem", marginBottom: "20px" }}
                >
                  <div className="wrap jc-b">
                    <div className={`${width > 617 ? "w-228px" : "max-w-500px w-100per"}`}>
                      <li>
                        <label htmlFor="artist_name">Artist Name</label>
                        <input
                          type="text"
                          name="artist_name"
                          value={artist_name}
                          id="artist_name"
                          placeholder="Glover Name..."
                          // onFocus={() => this.placeholder('')}
                          // onBlur={() => this.placeholder('Glover Name...')}
                          onChange={e => set_artist_name(e.target.value)}
                        />
                      </li>
                      <li>
                        <label htmlFor="facebook_name">Facebook</label>
                        <input
                          type="text"
                          name="facebook_name"
                          value={facebook_name}
                          id="facebook_name"
                          onChange={e => set_facebook_name(e.target.value)}
                        />
                      </li>
                      <li>
                        <label htmlFor="instagram_handle">Instagram</label>
                        <input
                          type="text"
                          name="instagram_handle"
                          value={instagram_handle}
                          id="instagram_handle"
                          onChange={e => set_instagram_handle(e.target.value)}
                        />
                      </li>
                      <li>
                        <label htmlFor="tiktok">Tiktok</label>
                        <input type="text" name="tiktok" value={tiktok} id="tiktok" onChange={e => set_tiktok(e.target.value)} />
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
                          onChange={e => set_style(e.target.value)}
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
                          onChange={e => set_inspiration(e.target.value)}
                        />
                      </li>
                    </div>
                    <div className={`${width > 617 ? "w-228px" : "max-w-500px w-100per"}`}>
                      <li>
                        <label htmlFor="location">Location</label>
                        <input type="text" name="location" value={location} id="location" onChange={e => set_location(e.target.value)} />
                      </li>
                      <li>
                        <label htmlFor="years">Years Gloving</label>
                        <input type="text" name="years" value={years} id="years" onChange={e => set_years(e.target.value)} />
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
                          onChange={e => set_bio(e.target.value)}
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
                          onChange={e => set_link(e.target.value)}
                        />
                      </li>
                      <li>
                        <label htmlFor="venmo">Venmo</label>
                        <input
                          type="text"
                          name="venmo"
                          value={venmo}
                          placeholder="https://www..."
                          // onFocus={() => this.placeholder('')}
                          // onBlur={() => this.placeholder('https://www...')}
                          id="venmo"
                          onChange={e => set_venmo(e.target.value)}
                        />
                      </li>
                    </div>
                  </div>
                  {!props.match.params.id && (
                    <div className="jc-b wrap">
                      <li className="w-100per">
                        <label htmlFor="answer_1">How did you hear about Glow LEDs?</label>
                        <input
                          type="text"
                          name="answer_1"
                          id="answer_1"
                          className="w-100per"
                          value={answer_1}
                          onChange={e => set_answer_1(e.target.value)}
                        />
                      </li>
                      <li className="w-100per">
                        <label htmlFor="answer_2">Question 2: What is your favorite Glow LEDs Product?</label>
                        <input
                          type="text"
                          name="answer_2"
                          id="answer_2"
                          value={answer_2}
                          className="w-100per"
                          onChange={e => set_answer_2(e.target.value)}
                        />
                      </li>
                      <li className="w-100per">
                        <label htmlFor="answer_3">Question 3: Why do you want to be a Glow LEDs Affiliate?</label>
                        <input
                          type="text"
                          name="answer_3"
                          id="answer_3"
                          value={answer_3}
                          className="w-100per"
                          onChange={e => set_answer_3(e.target.value)}
                        />
                      </li>
                    </div>
                  )}
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
                  {/* {option_list(products_list, products, set_products, 'Glow Gear')}
									{option_list(chips_list, chips, set_chips, 'Chips')} */}
                  <li>
                    <GLButton type="submit" variant="primary">
                      {props.match.params.id ? "Update" : "Create"}
                    </GLButton>
                  </li>
                  <li>
                    <GLButton variant="secondary">
                      <Link to={`/secure/account/profile`}>Back to Profile</Link>
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
export default EditUserAffiliatePage;
