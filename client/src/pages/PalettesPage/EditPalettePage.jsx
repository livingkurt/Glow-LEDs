import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { SketchPicker } from "react-color";
import * as API from "../../api";

const EditPalettePage = () => {
  const params = useParams();
  const [id, set_id] = useState("");
  const [type, set_type] = useState("");
  const [name, set_name] = useState();
  const [chip, set_chip] = useState({});
  const [colors_per_mode, set_colors_per_mode] = useState();
  const [colors, set_colors] = useState(0);
  const [quantity_state, set_quantity_state] = useState(1);
  const [color, set_color] = useState("#333333");
  const [chips, set_chips] = useState([]);
  const [preset_colors, set_preset_colors] = useState(["red", "green", "blue"]);
  // const [ chip_object, set_chip_object ] = useState({});

  const chipPage = useSelector(state => state.chips.chipPage);
  const { chips: chips_list } = chipPage;

  const [loading_checkboxes, set_loading_checkboxes] = useState(true);

  const navigate = useNavigate();

  const palettePage = useSelector(state => state.palettes);
  const { palette, loading, error } = palettePage;

  const set_state = () => {
    set_id(palette._id);
    set_type(palette.type);
    set_name(palette.name);
    set_chip(palette.chip);
    set_colors(palette.colors);
    set_quantity_state(palette.quantity_state);
  };
  const unset_state = () => {
    set_id("");
    set_type("");
    set_name();
    set_chip();
    set_colors();
    set_quantity_state();
  };

  const dispatch = useDispatch();

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (params.id) {
        dispatch(API.detailsPalette(params.id));
        dispatch(API.detailsPalette(params.id));
      } else {
        dispatch(API.listChips({}));
      }
      set_state();
    }
    return () => (clean = false);
  }, [dispatch, params.id]);

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (chip && chip.colors) {
        //
        const chip_colors = chip.colors.map(color => color.color);
        //
        set_preset_colors(chip_colors);
        set_colors_per_mode(chip.colors_per_mode);
      }
    }
    return () => (clean = false);
  }, [chip]);

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (palette) {
        set_state();
      } else {
        unset_state();
      }
    }
    return () => (clean = false);
  }, [palette]);

  setTimeout(() => {
    set_loading_checkboxes(false);
  }, 500);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(
      API.savePalette({
        _id: id,
        type,
        name,
        chip,
        colors_per_mode,
        colors: name * chip * colors_per_mode,
        quantity_state,
      })
    );
    e.target.reset();
    unset_state();
    navigate("/secure/glow/palettes");
  };

  const handleChangeComplete = color => {
    set_color(color.hex);
  };
  return (
    <div className="main_container p-20px">
      <ul>
        <h1 style={{ textAlign: "center" }}>{params.id ? "Edit Palette" : "Create Palette"}</h1>
        {/* <Circle color={color} onChangeComplete={handleChangeComplete} /> */}
        {/* <AlphaPicker color={color} onChangeComplete={handleChangeComplete} /> */}
        {/* <BlockPicker color={color} onChangeComplete={handleChangeComplete} /> */}
        {/* <ChromePicker color={color} onChangeComplete={handleChangeComplete} /> */}
        {/* <CirclePicker color={color} onChangeComplete={handleChangeComplete} /> */}
        {/* <CompactPicker color={color} onChangeComplete={handleChangeComplete} /> */}
        {/* <GithubPicker color={color} onChangeComplete={handleChangeComplete} /> */}
        {/* <HuePicker color={color} onChangeComplete={handleChangeComplete} /> */}
        {/* <MaterialPicker color={color} onChangeComplete={handleChangeComplete} /> */}
        {/* <PhotoshopPicker color={color} onChangeComplete={handleChangeComplete} /> */}
        <li className="mb-20px">
          <label aria-label="Sort" htmlFor="sort" className="select-label mb-20px">
            Chips
          </label>
        </li>
        <li>
          <div className="ai-c h-25px mb-15px">
            <div className="custom-select">
              <select
                defaultValue={JSON.stringify(chip)}
                // value={JSON.stringify(chip)}
                className="qty_select_dropdown"
                name="chips"
                onChange={e => set_chip(JSON.parse(e.target.value))}
              >
                <option key={1} defaultValue="">
                  ---Choose Chip---
                </option>
                {chips_list &&
                  chips_list.map((chip, index) => (
                    <option key={index} value={JSON.stringify(chip)}>
                      {chip.name}
                    </option>
                  ))}
              </select>
              <span className="custom-arrow" />
            </div>
          </div>
        </li>

        {chip && <SketchPicker color={color} presetColors={preset_colors} onChangeComplete={handleChangeComplete} />}
        <div className="jc-b h-100per mt-10px">
          {chip &&
            chip.colors &&
            chip.colors.map((color, index) => (
              <div>
                <label>{color.name}</label>
                <canvas
                  className={"ml-5px h-100per br-7px w-" + (100 / chip.colors.length - 2).toFixed(0) + "per"}
                  style={{ backgroundColor: color.color }}
                />
              </div>
            ))}
        </div>
        <div className="jc-b h-100per mt-10px">
          {[...Array(colors_per_mode)].map((tile, index) => (
            <canvas
              className={"ml-5px h-100per br-7px w-" + (100 / colors_per_mode - 2).toFixed(0) + "per"}
              style={{ backgroundColor: colors ? colors[index] : "#333333" }}
            />
          ))}
        </div>
        {/* <SliderPicker color={color} onChangeComplete={handleChangeComplete} /> */}
        {/* <SwatchesPicker color={color} onChangeComplete={handleChangeComplete} /> */}
        {/* <TwitterPicker color={color} onChangeComplete={handleChangeComplete} /> */}

        {/* <div className="form">
				<form onSubmit={submitHandler} style={{ chip: '100%' }}>
					<Loading loading={loading} error={error}>
						<div>
							<Helmet>
								<title>Edit Palette | Glow LEDs</title>
							</Helmet>

							<ul className="edit-form-container" style={{ maxWidth: '30rem', marginBottom: '20px' }}>
								<div className="row wrap">
									<div className="w-228px m-10px">
										<div className="ai-c h-25px mv-10px mb-30px jc-c">
											<div className="custom-select w-100per">
												<select
													className="qty_select_dropdown w-100per"
													onChange={(e) => set_type(e.target.value)}
												>
													<option key={1} defaultValue="">
														---Choose Palette Type---
                        </option>
													{[ 'bubble_mailer', 'box', 'envelope' ].map((type, index) => (
														<option key={index} value={type}>
															{humanize(type)}
														</option>
													))}
												</select>
												<span className="custom-arrow" />
											</div>
										</div>

										<li>
											<label htmlFor="type">Type</label>
											<input
												type="text"
												name="type"
												defaultValue={type}
												id="type"
												onChange={(e) => set_type(e.target.value)}
											/>
										</li>
										<li>
											<label htmlFor="name">Length</label>
											<input
												type="text"
												name="name"
												defaultValue={name}
												id="name"
												onChange={(e) => set_name(e.target.value)}
											/>
										</li>
										<li>
											<label htmlFor="chip">Width</label>
											<input
												type="text"
												name="chip"
												defaultValue={chip}
												id="chip"
												onChange={(e) => set_chip(e.target.value)}
											/>
										</li>
										<li>
											<label htmlFor="colors_per_mode">Height</label>
											<input
												type="text"
												name="colors_per_mode"
												defaultValue={colors_per_mode}
												id="colors_per_mode"
												onChange={(e) => set_colors_per_mode(e.target.value)}
											/>
										</li>

										<li>
											<label htmlFor="colors">Volume</label>
											<input
												type="text"
												name="colors"
												value={name && chip && colors_per_mode && name * chip * colors_per_mode}
												id="colors"
												onChange={(e) => set_colors(e.target.value)}
											/>
										</li>
										<li>
											<label htmlFor="quantity_state">Count In Stock</label>
											<input
												type="text"
												name="quantity_state"
												defaultValue={quantity_state}
												id="quantity_state"
												onChange={(e) => set_quantity_state(e.target.value)}
											/>
										</li>
									</div>
								</div>
								<li>
									<GLButton type="submit" variant="primary">
										{id ? 'Update' : 'Create'}
									</GLButton>
								</li>
								<li>
									<GLButton variant="secondary" onClick={(e) => e.preventDefault()}>
										<Link to="/secure/glow/palettes">Back to Palettes</Link>
									</GLButton>
								</li>
							</ul>
						</div>
					</Loading>
				</form>
			</div> */}
      </ul>
    </div>
  );
};
export default EditPalettePage;
