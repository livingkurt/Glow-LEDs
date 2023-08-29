import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Loading } from "../../shared/SharedComponents";
import { Helmet } from "react-helmet";
import { GLButton } from "../../shared/GlowLEDsComponents";
import * as API from "../../api";

const EditSettingPage = () => {
  const params = useParams();
  const [id, set_id] = useState("");
  const [settings, set_settings] = useState("");
  const [active, set_active] = useState("");

  const [loading_checkboxes, set_loading_checkboxes] = useState(true);

  const navigate = useNavigate();

  const settingPage = useSelector(state => state.settings);
  const { settings: settings_list, setting, loading, error } = settingPage;

  const teamPage = useSelector(state => state.teams);
  const { teams } = teamPage;

  const set_state = () => {
    set_id(setting._id);
    set_settings(setting.settings);
    set_active(setting.active);
  };
  const unset_state = () => {
    set_id("");
    set_settings("");
    set_active("");
  };

  const dispatch = useDispatch();

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (params.id) {
        dispatch(API.detailsSetting(params.id));
        dispatch(API.detailsSetting(params.id));
      } else {
        dispatch(API.detailsSetting(""));
      }
      dispatch(API.listSettings(""));
      set_state();
    }
    return () => (clean = false);
  }, [dispatch, params.id]);
  useEffect(() => {
    let clean = true;
    if (clean) {
      if (setting) {
        set_state();
      } else {
        unset_state();
      }
    }
    return () => (clean = false);
  }, [setting]);

  setTimeout(() => {
    set_loading_checkboxes(false);
  }, 500);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(
      API.saveSetting({
        _id: id,
        settings,
        active,
      })
    );
    e.target.reset();
    unset_state();
    navigate("/secure/glow/settings");
  };

  // const update_fields = (e) => {
  // 	e.preventDefault();
  // 	const data = JSON.parse(e.target.value);
  // 	set_settings(data);
  // 	// set_team(data);
  // 	set_venmo(data.venmo);
  //
  //
  // };
  // const date = new Date();

  // const today = date.toISOString();

  const add_setting = e => {
    e.preventDefault();
    // set_settings((options) => { ...options });
    set_settings(prevState => ({
      ...prevState,
      setting: "",
    }));
  };

  return (
    <div className="main_container p-20px">
      <h1 style={{ textAlign: "center" }}>{params.id ? "Edit Setting" : "Create Setting"}</h1>

      <div className="form">
        <form onSubmit={submitHandler} style={{ width: "100%" }}>
          {/* {loading_data ? (
						<div>Loading...</div>
					) : ( */}
          <Loading loading={loading} error={error}>
            {/* {setting && ( */}
            <div>
              <Helmet>
                <title>Edit Setting | Glow LEDs</title>
              </Helmet>

              <ul className="edit-form-container" style={{ maxWidth: "30rem", marginBottom: "20px" }}>
                <div className="row wrap">
                  <div className="w-228px m-10px">
                    <GLButton variant="primary" onClick={e => add_setting(e)}>
                      Add Setting
                    </GLButton>
                    {settings &&
                      Object.entries(settings).map((setting, index) => {
                        return (
                          <li>
                            <label htmlFor={"setting_" + index}>{setting.key}</label>
                            <input
                              type="text"
                              name={"setting_" + index}
                              value={setting["setting_" + index]}
                              id={"setting_" + index}
                              onChange={e =>
                                set_settings(prevState => ({
                                  ...prevState,
                                  [setting.key]: setting.value,
                                }))
                              }
                            />
                          </li>
                        );
                      })}
                    {/* {settings && (
											<div className="ai-c h-25px mv-10px mb-30px jc-c">
												<div className="custom-select w-100per">
													<select
														className="qty_select_dropdown w-100per"

														onChange={(e) => update_fields(e)}
													>
														<option key={1} defaultValue="">
															---Choose Settings---
														</option>
														{settings.map((settings, index) => (
															<option key={index} value={JSON.stringify(settings)}>
																{settings.artist_name}
															</option>
														))}
													</select>
													<span className="custom-arrow" />
												</div>
											</div>
										)} */}

                    {loading_checkboxes ? (
                      <div>Loading...</div>
                    ) : (
                      <li>
                        <label htmlFor="active">Paid</label>
                        <input
                          type="checkbox"
                          name="active"
                          defaultChecked={active}
                          id="active"
                          onChange={e => {
                            set_active(e.target.checked);
                          }}
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
                  <GLButton variant="secondary" onClick={e => e.preventDefault()}>
                    <Link to="/secure/glow/settings">Back to Settings</Link>
                  </GLButton>
                </li>
              </ul>
            </div>
            {/* )} */}
          </Loading>
          {/* )} */}
        </form>
      </div>
    </div>
  );
};
export default EditSettingPage;
