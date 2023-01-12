import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveFeature, detailsFeature } from "../../../actions/featureActions";
import { useHistory } from "react-router-dom";
import { Loading } from "../../../components/SharedComponents";
import { format_date, unformat_date } from "../../utils/helper_functions";
import { Helmet } from "react-helmet";
import { listProducts } from "../../../actions/productActions";
import { listUsers } from "../../../actions/userActions";
import { GLButton } from "../../../components/GlowLEDsComponents";

const EditFeaturePage = props => {
  const [id, set_id] = useState("");
  const [user, set_user] = useState("");
  const [artist_name, set_artist_name] = useState("");
  const [instagram_handle, set_instagram_handle] = useState("");
  const [facebook_name, set_facebook_name] = useState("");
  const [product, set_product] = useState("");
  const [song_id, set_song_id] = useState("");
  const [video, set_video] = useState("");
  const [category, set_category] = useState("");
  const [pathname, set_pathname] = useState("");
  const [images, set_images] = useState([]);
  const [image, set_image] = useState("");
  const [link, set_link] = useState("");
  const [logo, set_logo] = useState("");
  const [description, set_description] = useState("");
  const [release_date, set_release_date] = useState("");

  const userList = useSelector(state => state.userList);
  const { users } = userList;

  const history = useHistory();

  const featureDetails = useSelector(state => state.featureDetails);
  const { feature, loading, error } = featureDetails;

  const productList = useSelector(state => state.productList);
  const { products } = productList;

  const dispatch = useDispatch();

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (props.match.params.pathname) {
        dispatch(detailsFeature(props.match.params.pathname));
        dispatch(detailsFeature(props.match.params.pathname));
      } else {
        dispatch(detailsFeature({}));
      }
      dispatch(listProducts({ option: false, hidden: false }));
      dispatch(listUsers({}));

      set_state();
    }
    return () => (clean = false);
  }, []);

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (feature) {
        set_state();
      } else {
        unset_state();
      }
    }
    return () => (clean = false);
  }, [feature]);

  const set_state = () => {
    set_id(feature._id);
    set_user(feature.user);
    set_artist_name(feature.artist_name);
    set_instagram_handle(feature.instagram_handle);
    set_facebook_name(feature.facebook_name);
    set_product(feature.product);
    set_song_id(feature.song_id);
    set_link(feature.link);
    set_logo(feature.logo);
    set_video(feature.video);
    set_description(feature.description);
    set_category(feature.category);
    set_pathname(feature.pathname);
    set_images(feature.images);
    if (feature.release_date) {
      set_release_date(format_date(feature.release_date));
    }
  };
  const unset_state = () => {
    set_id("");
    set_user("");
    set_artist_name("");
    set_instagram_handle("");
    set_facebook_name("");
    set_product("");
    set_song_id("");
    set_link("");
    set_logo("");
    set_description("");
    set_video("");
    set_category("");
    set_pathname("");
    set_images([]);
    set_image("");
    set_release_date("");
  };

  const submitHandler = e => {
    e.preventDefault();
    dispatch(
      saveFeature({
        _id: id,
        user,
        artist_name,
        instagram_handle,
        facebook_name,
        product,
        song_id,
        link,
        logo,
        video,
        images,
        description,
        pathname,
        category,
        release_date: unformat_date(release_date)
      })
    );
    e.target.reset();
    unset_state();
    history.push("/secure/glow/features");
  };

  const add_image = e => {
    e.preventDefault();

    if (image.indexOf(" ") >= 0) {
      image.split(" ").map(image => {
        set_images(images => [...images, image]);
      });
    } else if (images) {
      set_images(images => [...images, image]);
    } else {
      set_images([image]);
    }

    set_image("");
  };

  const remove_image = (image_index, e) => {
    e.preventDefault();
    set_images(images =>
      images.filter((image, index) => {
        return image_index !== index;
      })
    );
  };

  const move_image_up = (image_index, e) => {
    e.preventDefault();
    const new_array = move(images, image_index, image_index - 1);
    set_images(new_array);
    // set_new_array(new_array);
    image_display(new_array);
  };
  const move_image_down = (image_index, e) => {
    e.preventDefault();
    const new_array = move(images, image_index, image_index + 1);
    set_images(new_array);
    // set_new_array(new_array);
    image_display(new_array);
  };

  function move(arr, old_index, new_index) {
    while (old_index < 0) {
      old_index += arr.length;
    }
    while (new_index < 0) {
      new_index += arr.length;
    }
    if (new_index >= arr.length) {
      const k = new_index - arr.length;
      while (k-- + 1) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);

    return arr;
  }

  const image_display = images => {
    return (
      <div>
        <div className="wrap jc-b">
          {images &&
            images.map((picture, index) => {
              return (
                <div className="promo_code mv-1rem jc-b max-w-46rem w-100per">
                  <div className="pos-rel">
                    <img
                      alt="Feature"
                      style={{
                        width: "100%",
                        package_height: "auto",
                        maxWidth: "100px",
                        maxHeight: "100px",
                        borderRadius: "15px"
                      }}
                      className="mv-10px ml-10px"
                      src={picture}
                    />
                    <div className="ml-10px">{picture}</div>

                    <GLButton
                      variant="icon"
                      className="pos-abs right-10px top-15px"
                      onClick={e => remove_image(index, e)}
                      aria-label="Delete"
                    >
                      <i className="fas fa-times" />
                    </GLButton>
                    <div className="pos-abs right-40px top-15px column">
                      {index > 0 && (
                        <GLButton variant="icon" onClick={e => move_image_up(index, e)} aria-label="Move Up">
                          <i className=" fas fa-sort-up" />
                        </GLButton>
                      )}

                      {index < images.length - 1 && (
                        <GLButton variant="icon" onClick={e => move_image_down(index, e)}>
                          <i style={{ WebkitTransform: "rotate(-180deg)" }} className=" fas fa-sort-up" />
                        </GLButton>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="promo_code mv-1rem jc-b max-w-46rem w-100per fs-14px">
          <p>
            {images &&
              images.map((picture, index) => {
                return `${picture}\n`;
              })}
          </p>
        </div>
      </div>
    );
  };
  return (
    <div className="main_container p-20px">
      <h1 style={{ textAlign: "center" }}>{props.match.params.pathname ? "Edit Feature" : "Create Feature"}</h1>

      <div className="form">
        <form onSubmit={submitHandler} style={{ width: "100%" }}>
          <Loading loading={loading} error={error}>
            {feature && (
              <div>
                <Helmet>
                  <title>Edit Feature| Glow LEDs</title>
                </Helmet>

                <ul className="edit-form-container" style={{ maxWidth: "95rem", marginBottom: "20px" }}>
                  <div className="row wrap jc-b m-10px">
                    <div className="w-420px m-10px">
                      <li>
                        <label aria-label="Sort" htmlFor="sort" className="select-label mb-15px">
                          Users
                        </label>
                        <div className="ai-c h-25px mb-15px">
                          <div className="custom-select">
                            <select defaultValue={users} className="qty_select_dropdown" onChange={e => set_user(e.target.value)}>
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
                        <label htmlFor="user">User</label>
                        <input type="text" name="user" value={user} id="user" onChange={e => set_user(e.target.value)} />
                      </li>

                      <li>
                        <label htmlFor="artist_name">Artist Name</label>
                        <input
                          type="text"
                          name="artist_name"
                          value={artist_name}
                          id="artist_name"
                          onChange={e => set_artist_name(e.target.value)}
                        />
                      </li>
                      <li>
                        <label htmlFor="instagram_handle">Instagram Handle</label>
                        <input
                          type="text"
                          name="instagram_handle"
                          value={instagram_handle}
                          id="instagram_handle"
                          onChange={e => set_instagram_handle(e.target.value)}
                        />
                      </li>
                      <li>
                        <label htmlFor="facebook_name">Facebook Link</label>
                        <input
                          type="text"
                          name="facebook_name"
                          value={facebook_name}
                          id="facebook_name"
                          onChange={e => set_facebook_name(e.target.value)}
                        />
                      </li>
                      <li>
                        <label htmlFor="category">Category</label>
                        <input type="text" name="category" value={category} id="category" onChange={e => set_category(e.target.value)} />
                      </li>
                      <li>
                        <label htmlFor="pathname">Pathname</label>
                        <input type="text" name="pathname" value={pathname} id="pathname" onChange={e => set_pathname(e.target.value)} />
                      </li>
                      <li>
                        <label htmlFor="description">Description</label>
                        <textarea
                          className=""
                          name="description"
                          defaultValue={description}
                          id="description"
                          onChange={e => set_description(e.target.value)}
                        />
                      </li>
                    </div>

                    <div className="w-420px m-10px">
                      <li>
                        <label aria-label="Sort" htmlFor="sort" className="select-label mb-15px">
                          Product
                        </label>
                        <div className="ai-c h-25px mb-15px">
                          <div className="custom-select">
                            <select defaultValue={product} className="qty_select_dropdown" onChange={e => set_product(e.target.value)}>
                              <option key={1} defaultValue="">
                                ---Choose Product---
                              </option>
                              {products
                                .filter(product => !product.option)
                                .filter(product => !product.hidden)
                                .map((product, index) => (
                                  <option key={index} value={product.pathname}>
                                    {product.name}
                                  </option>
                                ))}
                            </select>
                            <span className="custom-arrow" />
                          </div>
                        </div>
                      </li>
                      <li>
                        <label htmlFor="product">Product</label>
                        <input type="text" name="product" value={product} id="product" onChange={e => set_product(e.target.value)} />
                      </li>

                      <li>
                        <label htmlFor="video">Video</label>
                        <input type="text" name="video" value={video} id="video" onChange={e => set_video(e.target.value)} />
                      </li>
                      <li>
                        <label htmlFor="link">Link</label>
                        <input type="text" name="link" value={link} id="link" onChange={e => set_link(e.target.value)} />
                      </li>
                      <li>
                        <label htmlFor="logo">Logo</label>
                        <input type="text" name="logo" value={logo} id="logo" onChange={e => set_logo(e.target.value)} />
                      </li>
                      <li>
                        <label htmlFor="song_id">Song ID</label>
                        <input type="text" name="song_id" value={song_id} id="song_id" onChange={e => set_song_id(e.target.value)} />
                      </li>
                      <li>
                        <label htmlFor="release_date">Release Date</label>
                        <input
                          type="text"
                          name="release_date"
                          value={release_date}
                          id="release_date"
                          onChange={e => set_release_date(e.target.value)}
                        />
                      </li>
                      <li>
                        <label htmlFor="image">Image</label>
                        <input type="text" name="image" value={image} id="image" onChange={e => set_image(e.target.value)} />
                        <GLButton variant="primary" onClick={e => add_image(e)}>
                          Add Image
                        </GLButton>
                      </li>
                      {image_display(images)}
                    </div>
                  </div>

                  <li>
                    <GLButton type="submit" variant="primary">
                      {id ? "Update" : "Create"}
                    </GLButton>
                  </li>
                  <li>
                    <GLButton variant="secondary" onClick={() => history.goBack()}>
                      Back to Features
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
export default EditFeaturePage;
