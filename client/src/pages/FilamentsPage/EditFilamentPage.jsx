import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveFilament, detailsFilament } from "../../actions/filamentActions";
import { useHistory, Link } from "react-router-dom";
import { Loading } from "../../shared/SharedComponents";
import { Helmet } from "react-helmet";
import { listChips } from "../../actions/chipActions";
import { GLButton } from "../../shared/GlowLEDsComponents";

const EditFilamentPage = props => {
  const [id, set_id] = useState("");
  const [type, set_type] = useState("");
  const [color, set_color] = useState();
  const [color_code, set_color_code] = useState();
  const [active, set_active] = useState();

  const [loading_checkboxes, set_loading_checkboxes] = useState(true);

  const history = useHistory();

  const filamentDetails = useSelector(state => state.filamentDetails);
  const { filament, loading, error } = filamentDetails;

  const set_state = () => {
    set_id(filament._id);
    set_type(filament.type);
    set_color(filament.color);
    set_color_code(filament.color_code);
    set_active(filament.active);
  };
  const unset_state = () => {
    set_id("");
    set_type("");
    set_color();
    set_color_code();
    set_active();
  };

  const dispatch = useDispatch();

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (props.match.params.id) {
        dispatch(detailsFilament(props.match.params.id));
        dispatch(detailsFilament(props.match.params.id));
      } else {
        dispatch(listChips({}));
      }
      set_state();
    }
    return () => (clean = false);
  }, [dispatch, props.match.params.id]);

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (filament) {
        set_state();
      } else {
        unset_state();
      }
    }
    return () => (clean = false);
  }, [filament]);

  setTimeout(() => {
    set_loading_checkboxes(false);
  }, 500);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(
      saveFilament({
        _id: id,
        type,
        color,
        color_code,
        active
      })
    );
    e.target.reset();
    unset_state();
    history.push("/secure/glow/filaments");
  };

  return (
    <div className="main_container p-20px">
      <ul>
        <h1 style={{ textAlign: "center" }}>{props.match.params.id ? "Edit Filament" : "Create Filament"}</h1>

        <div className="form">
          <form onSubmit={submitHandler} style={{ chip: "100%" }}>
            <Loading loading={loading} error={error}>
              <div>
                <Helmet>
                  <title>Edit Filament | Glow LEDs</title>
                </Helmet>

                <ul className="edit-form-container" style={{ maxWidth: "30rem", marginBottom: "20px" }}>
                  <div className="row wrap">
                    <div className="w-228px m-10px">
                      <li>
                        <div className="h-25px mv-10px mb-30px column">
                          <label>Filament Type</label>
                          <div className="custom-select w-100per">
                            <select className="qty_select_dropdown w-100per" onChange={e => set_type(e.target.value)} value={type}>
                              <option key={1} defaultValue="">
                                ---Choose Filament Type---
                              </option>
                              {["PETG", "TPU"].map((type, index) => (
                                <option key={index} value={type}>
                                  {type}
                                </option>
                              ))}
                            </select>
                            <span className="custom-arrow" />
                          </div>
                        </div>
                      </li>
                      <li>
                        <label htmlFor="color">Color</label>
                        <input type="text" name="color" defaultValue={color} id="color" onChange={e => set_color(e.target.value)} />
                      </li>
                      <li>
                        <label htmlFor="color_code">Color Code</label>
                        <input
                          type="text"
                          name="color_code"
                          defaultValue={color_code}
                          id="color_code"
                          onChange={e => set_color_code(e.target.value)}
                        />
                      </li>
                      {loading_checkboxes ? (
                        <div>Loading...</div>
                      ) : (
                        <li className="w-100per row">
                          <label htmlFor="active">Active</label>
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
                      <Link to="/secure/glow/filaments">Back to Filaments</Link>
                    </GLButton>
                  </li>
                </ul>
              </div>
            </Loading>
          </form>
        </div>
      </ul>
    </div>
  );
};
export default EditFilamentPage;
