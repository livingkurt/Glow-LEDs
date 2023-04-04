import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { ImageDisplay, Loading } from "../../shared/SharedComponents";
import { Helmet } from "react-helmet";
import { snake_case } from "../../utils/helper_functions";
import { GLButton } from "../../shared/GlowLEDsComponents";
import * as API from "../../api";
import { set_team } from "../../slices/teamSlice";

const EditTeamPage = props => {
  const [loading_checkboxes, set_loading_checkboxes] = useState(true);

  const affiliateSlice = useSelector(state => state.affiliateSlice.affiliatePage);
  const { affiliates: affiliates_list } = affiliateSlice;

  const history = useHistory();

  const teamSlice = useSelector(state => state.teamSlice);
  const { team, loading, error } = teamSlice;
  const {
    _id: id,
    affiliates,
    team_name,
    instagram_handle,
    facebook_name,
    percentage_off,
    captain,
    sponsor,
    promoter,
    rave_mob,
    active,
    bio,
    map,
    link,
    pathname,
    images,
    image,
    picture,
    video,
    public_code,
    private_code,
    venmo
  } = team;

  const userSlice = useSelector(state => state.userSlice);
  const { users } = userSlice;

  const promoSlice = useSelector(state => state.promoSlice);
  const { promos: promos_list } = promoSlice;

  const dispatch = useDispatch();

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.detailsTeam(props.match.params.pathname));
      dispatch(API.listAffiliates({}));
      dispatch(API.listPromos({}));
      dispatch(API.listUsers({}));
    }
    return () => (clean = false);
  }, [props.match.params.pathname]);

  setTimeout(() => {
    set_loading_checkboxes(false);
  }, 500);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(
      API.saveTeam({
        _id: id,
        team_name,
        instagram_handle,
        facebook_name,
        percentage_off,
        images,
        sponsor,
        map,
        captain,
        promoter,
        rave_mob,
        active,
        bio,
        link,
        video,
        picture,
        venmo,
        public_code: public_code && public_code._id,
        private_code: private_code && private_code._id,
        pathname: pathname ? pathname : snake_case(team_name),
        affiliates: affiliates && affiliates.map(affiliate => affiliate._id)
      })
    );
    history.push("/secure/glow/teams");
  };

  const add_affiliate = e => {
    e.preventDefault();
    const affiliate_object = JSON.parse(e.target.value);
    //
    // if (affiliate.indexOf(' ') >= 0) {
    //
    // 	affiliate.split(' ').map((affiliate) => {
    // 		set_affiliates((affiliates) => [ ...affiliates, affiliate ]);
    // 	});
    // } else
    if (affiliates) {
      dispatch(set_team({ affiliates: [...affiliates, affiliate_object] }));
    } else {
      dispatch(set_team({ affiliates: [affiliate_object] }));
    }
  };

  const remove_affiliate = (affiliate_index, e) => {
    e.preventDefault();
    dispatch(
      set_team({
        affiliates: affiliates.filter((affiliate, index) => {
          return affiliate_index !== index;
        })
      })
    );
  };

  const affiliate_display = affiliates => {
    return (
      <div>
        <div className="jc-b">
          <div>
            {affiliates &&
              affiliates.map((affiliate, index) => {
                return (
                  <div className="promo_code mv-1rem row jc-b max-w-55rem w-100per" key={index}>
                    <div>
                      <GLButton variant="icon" onClick={e => remove_affiliate(index, e)} aria-label="Delete">
                        <i className="fas fa-times mr-5px" />
                      </GLButton>
                      {affiliate.artist_name}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
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
      dispatch(set_team({ public_code: promo_object }));
    } else if (code_type === "private") {
      dispatch(set_team({ private_code: promo_object }));
    }
  };

  const remove_promo = (e, code_type) => {
    e.preventDefault();
    if (code_type === "public") {
      dispatch(set_team({ public_code: {} }));
    } else if (code_type === "private") {
      dispatch(set_team({ private_code: {} }));
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
      <h1 style={{ textAlign: "center" }}>{props.match.params.id ? "Edit Team" : "Create Team"}</h1>

      <div className="form">
        <form onSubmit={submitHandler} style={{ width: "100%" }}>
          <Loading loading={loading} error={error}>
            {team && (
              <div>
                <Helmet>
                  <title>Edit Team | Glow LEDs</title>
                </Helmet>

                <ul className="edit-form-container" style={{ maxWidth: "30rem", marginBottom: "20px" }}>
                  <div className="row wrap">
                    <div className="w-228px m-10px">
                      <li>
                        <label htmlFor="affiliate">Affiliate</label>
                        <div className="ai-c h-25px mv-15px jc-c">
                          <div className="custom-select">
                            <select className="qty_select_dropdown" onChange={e => add_affiliate(e)}>
                              <option key={1} defaultValue="">
                                ---Choose Affiliate---
                              </option>
                              {affiliates_list.map((affiliate, index) => (
                                <option key={index} value={JSON.stringify(affiliate)}>
                                  {affiliate.artist_name || affiliate.glover_name}
                                </option>
                              ))}
                            </select>
                            <span className="custom-arrow" />
                          </div>
                        </div>
                        <GLButton variant="primary" onClick={e => add_affiliate(e)}>
                          Add Affiliate
                        </GLButton>
                        {affiliate_display(affiliates)}
                      </li>

                      <li>
                        <label htmlFor="team_name">Team Name</label>
                        <input
                          type="text"
                          name="team_name"
                          value={team_name}
                          id="team_name"
                          onChange={e => dispatch(set_team({ [e.target.name]: e.target.value }))}
                        />
                      </li>
                      <li>
                        <label aria-label="Sort" htmlFor="sort" className="select-label mb-15px">
                          Users
                        </label>
                        <div className="ai-c h-25px mb-15px">
                          <div className="custom-select">
                            <select
                              defaultValue={users}
                              className="qty_select_dropdown"
                              onChange={e => dispatch(set_team({ [e.target.name]: e.target.value }))}
                            >
                              <option key={1} defaultValue="">
                                ---Choose User---
                              </option>
                              {users &&
                                users.map((user, index) => (
                                  <option key={index} value={user._id}>
                                    {user.first_name} {user.last_name}
                                  </option>
                                ))}
                            </select>
                            <span className="custom-arrow" />
                          </div>
                        </div>
                      </li>
                      <li>
                        <label htmlFor="captain">Team Captain</label>
                        <input
                          type="text"
                          name="captain"
                          value={captain}
                          id="captain"
                          onChange={e => dispatch(set_team({ [e.target.name]: e.target.value }))}
                        />
                      </li>

                      <li>
                        <label htmlFor="instagram_handle">Instagram Handle</label>
                        <input
                          type="text"
                          name="instagram_handle"
                          value={instagram_handle}
                          id="instagram_handle"
                          onChange={e => dispatch(set_team({ [e.target.name]: e.target.value }))}
                        />
                      </li>
                      <li>
                        <label htmlFor="facebook_name">Facebook Name</label>
                        <input
                          type="text"
                          name="facebook_name"
                          value={facebook_name}
                          id="facebook_name"
                          onChange={e => dispatch(set_team({ [e.target.name]: e.target.value }))}
                        />
                      </li>
                      <li>
                        <label htmlFor="picture">Picture</label>
                        <input
                          type="text"
                          name="picture"
                          value={picture}
                          id="picture"
                          onChange={e => dispatch(set_team({ [e.target.name]: e.target.value }))}
                        />
                      </li>
                      <li>
                        <label htmlFor="map">Map</label>
                        <input
                          type="text"
                          name="map"
                          value={map}
                          id="map"
                          onChange={e => dispatch(set_team({ [e.target.name]: e.target.value }))}
                        />
                      </li>
                      <li>
                        <label htmlFor="video">Video</label>
                        <input
                          type="text"
                          name="video"
                          value={video}
                          id="video"
                          onChange={e => dispatch(set_team({ [e.target.name]: e.target.value }))}
                        />
                      </li>
                      <li>
                        <label htmlFor="bio">Bio</label>
                        <textarea
                          className="edit_product_textarea"
                          name="bio"
                          placeholder="Write a little something to introduce yourself..."
                          defaultValue={bio}
                          id="bio"
                          onChange={e => dispatch(set_team({ [e.target.name]: e.target.value }))}
                        />
                      </li>
                      <li>
                        <label htmlFor="link">Website</label>
                        <input
                          type="text"
                          name="link"
                          value={link}
                          placeholder="https://www..."
                          onFocus={() => this.placeholder("")}
                          onBlur={() => this.placeholder("https://www...")}
                          id="link"
                          onChange={e => dispatch(set_team({ [e.target.name]: e.target.value }))}
                        />
                      </li>
                      <li>
                        <label htmlFor="pathname">Pathname</label>
                        <input
                          type="text"
                          name="pathname"
                          defaultValue={pathname ? pathname : team_name && snake_case(team_name)}
                          id="pathname"
                          onChange={e => dispatch(set_team({ [e.target.name]: e.target.value }))}
                        />
                      </li>
                      <li>
                        <label htmlFor="venmo">Venmo</label>
                        <input
                          type="text"
                          name="venmo"
                          value={venmo}
                          id="venmo"
                          onChange={e => dispatch(set_team({ [e.target.name]: e.target.value }))}
                        />
                      </li>
                      <li>
                        <label htmlFor="percentage_off">Percentage Off</label>
                        <input
                          type="text"
                          name="percentage_off"
                          value={percentage_off}
                          id="percentage_off"
                          onChange={e => dispatch(set_team({ [e.target.name]: e.target.value }))}
                        />
                      </li>
                      <ImageDisplay
                        images={images}
                        set_images={value => dispatch(set_team({ images: value }))}
                        image={image}
                        set_image={value => dispatch(set_team({ image: value }))}
                        name={"Images"}
                      />
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

                      {loading_checkboxes ? (
                        <div>Loading...</div>
                      ) : (
                        <li>
                          <label htmlFor="sponsor">Sponsor</label>
                          <input
                            type="checkbox"
                            name="sponsor"
                            defaultChecked={sponsor}
                            id="sponsor"
                            onChange={e => dispatch(set_team({ [e.target.name]: e.target.checked }))}
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
                            defaultChecked={rave_mob}
                            id="rave_mob"
                            onChange={e => dispatch(set_team({ [e.target.name]: e.target.checked }))}
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
                            defaultChecked={promoter}
                            id="promoter"
                            onChange={e => dispatch(set_team({ [e.target.name]: e.target.checked }))}
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
                            defaultChecked={active}
                            id="active"
                            onChange={e => dispatch(set_team({ [e.target.name]: e.target.checked }))}
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
                    <GLButton variant="econdary" onClick={() => history.goBack()}>
                      Back to Teams
                    </GLButton>
                  </li>
                </ul>
              </div>
            )}
          </Loading>
        </form>
      </div>
    </div>
  );
};
export default EditTeamPage;
