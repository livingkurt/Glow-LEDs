import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveChip, detailsChip } from "../../actions/chipActions";
import { useHistory, Link } from "react-router-dom";
import { Loading, Notification } from "../../shared/SharedComponents";
import { Helmet } from "react-helmet";
import { snake_case } from "../../utils/helper_functions";
import { GLButton } from "../../shared/GlowLEDsComponents";
import * as API from "../../api";

const EditChipPage = props => {
  const [id, set_id] = useState("");
  const [name, set_name] = useState("");
  const [company, set_company] = useState("");
  const [category, set_category] = useState("");
  const [programmmable, set_programmmable] = useState("");
  const [number_of_modes, set_number_of_modes] = useState("");
  const [pathname, set_pathname] = useState("");
  const [characteristics, set_characteristics] = useState("");
  const [colors_per_mode, set_colors_per_mode] = useState(0);
  const [image, set_image] = useState("");
  const [colors, set_colors] = useState([]);
  const [dimensions, set_dimensions] = useState({});
  const [color, set_color] = useState("#333333");

  const [loading_checkboxes, set_loading_checkboxes] = useState(true);

  const history = useHistory();

  const chipSlice = useSelector(state => state.chipSlice);
  const { chip, message, loading, error } = chipSlice;

  const set_state = () => {
    set_id(chip._id);
    set_name(chip.name);
    set_company(chip.company);
    set_category(chip.category);
    set_programmmable(chip.programmmable);
    set_number_of_modes(chip.number_of_modes);
    set_characteristics(chip.characteristics);
    set_colors_per_mode(chip.colors_per_mode);
    set_image(chip.image);
    set_colors(chip.colors);
    set_dimensions(chip.dimensions);
    set_pathname(chip.pathname);
  };
  const unset_state = () => {
    set_id("");
    set_name("");
    set_company("");
    set_category("");
    set_programmmable("");
    set_number_of_modes("");
    set_characteristics("");
    set_colors_per_mode("");
    set_image("");
    set_colors([]);
    set_pathname("");
    set_dimensions({});
  };

  const dispatch = useDispatch();

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (props.match.params.id) {
        dispatch(API.detailsChip(props.match.params.id));
        dispatch(API.detailsChip(props.match.params.id));
      } else {
        dispatch(API.detailsChip(""));
      }
      set_state();
    }
    return () => (clean = false);
  }, [dispatch, props.match.params.id]);
  useEffect(() => {
    let clean = true;
    if (clean) {
      if (chip) {
        set_state();
      } else {
        unset_state();
      }
    }
    return () => (clean = false);
  }, [chip]);

  setTimeout(() => {
    set_loading_checkboxes(false);
  }, 500);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(
      API.saveChip({
        _id: id,
        name,
        company,
        category,
        programmmable,
        number_of_modes,
        characteristics,
        colors_per_mode,
        image,
        colors,
        dimensions,
        pathname: pathname ? pathname : snake_case(name)
      })
    );
    e.target.reset();
    unset_state();
    history.push("/secure/glow/chips");
  };

  // const remove_color = (color_index, e) => {
  // 	e.preventDefault();
  // 	set_colors((colors) =>
  // 		colors.filter((color, index) => {
  // 			return color_index !== index;
  // 		})
  // 	);
  // };
  // const update_color = (e) => {
  //   let new_colors = [...colors]
  //   new_colors[index] = {
  // 		...new_order_items[index],
  // 		name: order_item.name,
  // 		qty: orderItems[index].qty
  //   if (e.target.name === 'name') {

  //   }
  //   set_colors([ ...colors, { name: e.target.value } ])
  // }

  const update_color_item_property = (e, field_name, index) => {
    e.preventDefault();
    let new_color_items = [...colors];
    new_color_items[index] = {
      ...new_color_items[index],
      [field_name]: e.target.value
    };
    set_colors(new_color_items);
  };

  const add_color = (e, index, location) => {
    e.preventDefault();
    if (Number.isInteger(index)) {
      let new_array = [...colors];
      if (location === "above") {
        if (index === 0) {
          set_colors(colors => [{ label: "", color: "", icon: "" }, ...colors]);
        }
        new_array.splice(index, 0, { label: "", color: "", icon: "" });
      } else if (location === "below") {
        new_array.splice(index + 1, 0, { label: "", color: "", icon: "" });
      }

      set_colors(new_array);
    } else {
      set_colors(colors => [...colors, { label: "", color: "", icon: "" }]);
    }
  };
  const remove_color = async (color_index, e) => {
    e.preventDefault();
    set_colors(color =>
      color.filter((color, index) => {
        return color_index !== index;
      })
    );
  };
  return (
    <div className="main_container p-20px">
      <h1 style={{ textAlign: "center" }}>{props.match.params.id ? "Edit Chip" : "Create Chip"}</h1>

      <div className="form">
        <form onSubmit={submitHandler} style={{ width: "100%" }}>
          <Notification message={message} />
          <Loading loading={loading} error={error}>
            <div>
              <Helmet>
                <title>Edit Chip| Glow LEDs</title>
              </Helmet>

              <ul className="edit-form-container" style={{ maxWidth: "30rem", marginBottom: "20px" }}>
                <div className="row wrap">
                  <div className="w-228px m-10px">
                    <li>
                      <label htmlFor="name">Chip Name</label>
                      <input type="text" name="name" value={name} id="name" onChange={e => set_name(e.target.value)} />
                    </li>
                    <li>
                      <label htmlFor="company">Company</label>
                      <input type="text" name="company" value={company} id="company" onChange={e => set_company(e.target.value)} />
                    </li>
                    <li>
                      <label htmlFor="category">Category</label>
                      <input type="text" name="category" value={category} id="category" onChange={e => set_category(e.target.value)} />
                    </li>
                    <li>
                      <label htmlFor="number_of_modes">Number of Modes</label>
                      <input
                        type="text"
                        name="number_of_modes"
                        value={number_of_modes}
                        id="number_of_modes"
                        onChange={e => set_number_of_modes(e.target.value)}
                      />
                    </li>
                    <li>
                      <label htmlFor="characteristics">Characteristics</label>
                      <input
                        type="text"
                        name="characteristics"
                        value={characteristics}
                        id="characteristics"
                        onChange={e => set_characteristics(e.target.value)}
                      />
                    </li>
                    <li>
                      <label htmlFor="colors_per_mode">Colors Per Mode</label>
                      <input
                        type="text"
                        name="colors_per_mode"
                        value={colors_per_mode}
                        id="colors_per_mode"
                        onChange={e => set_colors_per_mode(e.target.value)}
                      />
                    </li>
                    {/* <li>
											<label htmlFor="colors">Color Name</label>
											<input
												type="text"
												name="name"
												value={colors}
												id="colors"
												onChange={(e) => update_color(e)}
											/>
										</li>
										<li>
											<label htmlFor="colors">Color</label>
											<input
												type="text"
												name="color"
												value={colors}
												id="colors"
												onChange={(e) => update_color(e)}
											/>
										</li> */}
                    {/* <BlockPicker color={color} onChangeComplete={(color) => set_color(color.hex)} /> */}
                    {/* <li>
											<GLButton
												variant="primary"
												onClick={(e) => {
													e.preventDefault();
													set_colors((colors) => [ ...colors, color ]);
												}}
											>
												Add Color
											</GLButton>
										</li>
										<li>
											<div className="column jc-b w-100per">
												{colors &&
													colors.map((color, index) => {
														return (
															<div
																className="promo_code mv-1rem jc-b max-w-55rem w-100per"
																key={index}
															>
																<div className="ai-c w-100per jc-b">
																	<div>
																		<GLButton
																			variant="icon"
																			onClick={(e) => remove_color(index, e)}
																		>
																			<i className="fas fa-times mr-5px" />
																		</GLButton>
																		<label>{color}</label>
																	</div>
																	<canvas
																		className=" ml-5px w-60px h-20px br-7px"
																		style={{ backgroundColor: color }}
																	/>
																</div>
															</div>
														);
													})}
											</div>
										</li> */}
                    <li>
                      <label htmlFor="image">Image</label>
                      <input type="text" name="image" value={image} id="image" onChange={e => set_image(e.target.value)} />
                    </li>
                    <li>
                      <label htmlFor="pathname">Pathname</label>
                      <input
                        type="text"
                        name="pathname"
                        defaultValue={pathname ? pathname : name && snake_case(name)}
                        id="pathname"
                        onChange={e => set_pathname(e.target.value)}
                      />
                    </li>
                    {loading_checkboxes ? (
                      <div>Loading...</div>
                    ) : (
                      <li>
                        <label htmlFor="programmmable">Programmmable</label>
                        <input
                          type="checkbox"
                          name="programmmable"
                          defaultChecked={programmmable}
                          id="programmmable"
                          onChange={e => {
                            set_programmmable(e.target.checked);
                          }}
                        />
                      </li>
                    )}
                  </div>
                </div>
                <div className="w-228px m-10px">
                  <h2>Links</h2>
                  {colors &&
                    colors.map((color, index) => (
                      <div>
                        <div className="jc-b">
                          <h3>Color {index + 1}</h3>
                          <GLButton
                            variant="primary"
                            className="w-4rem h-4rem p-14px mr-1rem mb-1rem"
                            onClick={e => remove_color(index, e)}
                            aria-label="Delete"
                          >
                            <i className="fas fa-times mr-5px" />
                          </GLButton>
                        </div>

                        <li>
                          <GLButton variant="primary" onClick={e => add_color(e, index, "above")}>
                            Add Color Above
                          </GLButton>
                        </li>
                        <li>
                          <label htmlFor="name">Name</label>
                          <input
                            type="text"
                            name="name"
                            value={color.name}
                            id="name"
                            onChange={e => update_color_item_property(e, e.target.name, index)}
                          />
                        </li>
                        <li>
                          <label htmlFor="color">Color</label>
                          <input
                            type="text"
                            name="color"
                            value={color.color}
                            id="color"
                            onChange={e => update_color_item_property(e, e.target.name, index)}
                          />
                        </li>
                        {index !== colors.length - 1 && (
                          <li>
                            <GLButton variant="primary" onClick={e => add_color(e, index, "below")}>
                              Add Color Below
                            </GLButton>
                          </li>
                        )}
                      </div>
                    ))}
                  <li>
                    <GLButton variant="primary" onClick={e => add_color(e)}>
                      Add Color
                    </GLButton>
                  </li>
                </div>
                <li>
                  <GLButton type="submit" variant="primary">
                    {id ? "Update" : "Create"}
                  </GLButton>
                </li>
                <li>
                  <GLButton variant="secondary" onClick={e => e.preventDefault()}>
                    <Link to="/secure/glow/chips">Back to Chips</Link>
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
export default EditChipPage;
