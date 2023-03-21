import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { ImageDisplay, Loading } from "../../shared/SharedComponents";
import { Helmet } from "react-helmet";
import { listEmails, saveEmail } from "../../actions/emailActions";
import { API_Emails } from "../../utils";
import { GLButton } from "../../shared/GlowLEDsComponents";
import * as API from "../../api";

const EditContentPage = props => {
  const [id, set_id] = useState("");
  const [home_page, set_home_page] = useState({});
  const [links, set_links] = useState([{}]);
  const [banner, set_banner] = useState({});
  const [images, set_images] = useState([]);
  const [slideshow, set_slideshow] = useState([{}]);
  const [image, set_image] = useState("");
  const [create_email, set_create_email] = useState(true);
  // const [ slideshow, set_slideshow ] = useState('');

  const [active, set_active] = useState(true);
  const [loading_checkboxes, set_loading_checkboxes] = useState(true);
  const [using_template, set_using_template] = useState(false);
  const [email, set_email] = useState(false);

  const history = useHistory();

  const contentDetails = useSelector(state => state.contentDetails);
  const { content, loading, error } = contentDetails;

  const contentSlice = useSelector(state => state.contentSlice);
  const { contents } = contentSlice;

  // const emailDetails = useSelector((state) => state.emailDetails);
  // const { email, loading: loading_email, error: error_email } = emailDetails;

  const emailSlice = useSelector(state => state.emailSlice);
  const { emails } = emailSlice;

  const dispatch = useDispatch();

  const set_state = () => {
    set_id(content._id);
    set_home_page(content.home_page);
    if (content.home_page && content.home_page.images) {
      set_images(content.home_page.images);
      set_slideshow(content.home_page.slideshow);
    }
    set_banner(content.banner);
    set_links(content.links);

    set_active(content.active);
  };

  const set_email_state = data => {
    set_home_page(data);
    // if (content.home_page && content.home_page.images) {
    set_images(data.images);
    // }
  };

  const unset_state = () => {
    set_id("");
    set_home_page("");
    set_images([]);
    set_slideshow([]);
    set_banner("");
    set_links("");
    set_active(true);
  };

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (props.match.params.id) {
        dispatch(API.detailsContent(props.match.params.id));
        dispatch(API.detailsContent(props.match.params.id));
      } else {
        dispatch(API.detailsContent(""));
      }
      dispatch(API.listEmails({}));

      // set_loading_data(false);
      set_state();
    }
    return () => (clean = false);
  }, [dispatch]);

  const use_template = e => {
    dispatch(API.detailsContent(e.target.value));
    set_using_template(true);
  };

  // const use_email_template = (e) => {
  // 	dispatch(API.detailsEmail(e.target.value));
  // 	set_using_template(true);
  // };

  const use_email_template = async e => {
    // dispatch(API.detailsContent(e.target.value));
    const { data } = await API_Emails.get_email(e.target.value);
    set_email(data);
    const formatted_link = data.link && data.link.replace("https://www.glow-leds.com", "");
    set_email_state({ ...data, link: formatted_link });
    set_using_template(true);
  };

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (content && content.home_page) {
        set_state(content.home_page);
      } else {
        unset_state();
      }
    }
    return () => (clean = false);
  }, [content]);

  setTimeout(() => {
    set_loading_checkboxes(false);
  }, 500);

  const submitHandler = e => {
    e.preventDefault();

    dispatch(
      API.saveContent({
        _id: using_template ? null : id,
        home_page: { ...home_page, images, slideshow },
        banner,
        links,
        active
      })
    );
    if (create_email && (using_template || id)) {
      dispatch(
        API.saveEmail({
          _id: using_template ? null : id,
          email_type: "Announcements",
          h1: home_page.h1,
          images,
          h2: home_page.h2,
          p: home_page.p,
          button: home_page.button,
          link: `https://www.glow-leds.com${home_page.link}`,
          active: home_page.active
        })
      );
    }
    e.target.reset();
    unset_state();
    history.push("/secure/glow/contents");
  };

  const update_link_item_property = (e, field_name, index) => {
    e.preventDefault();
    let new_link_items = [...links];
    new_link_items[index] = {
      ...new_link_items[index],
      [field_name]: e.target.value
    };
    set_links(new_link_items);
  };

  const add_link = (e, index, location) => {
    e.preventDefault();
    if (Number.isInteger(index)) {
      let new_array = [...links];
      if (location === "above") {
        if (index === 0) {
          set_links(links => [{ label: "", link: "", icon: "" }, ...links]);
        }
        new_array.splice(index, 0, { label: "", link: "", icon: "" });
      } else if (location === "below") {
        new_array.splice(index + 1, 0, { label: "", link: "", icon: "" });
      }

      set_links(new_array);
    } else {
      set_links(links => [...links, { label: "", link: "", icon: "" }]);
    }
  };
  const remove_link = async (link_index, e) => {
    e.preventDefault();
    set_links(link =>
      link.filter((link, index) => {
        return link_index !== index;
      })
    );
  };

  const update_slideshow_item_property = (e, field_name, index) => {
    e.preventDefault();
    let new_slideshow_items = [...slideshow];
    new_slideshow_items[index] = {
      ...new_slideshow_items[index],
      [field_name]: e.target.value
    };
    set_slideshow(new_slideshow_items);
  };

  const add_slideshow = (e, index, location) => {
    e.preventDefault();
    if (Number.isInteger(index)) {
      let new_array = [...slideshow];
      if (location === "above") {
        if (index === 0) {
          set_slideshow(slideshow => [{ label: "", image: "", link: "" }, ...slideshow]);
        }
        new_array.splice(index, 0, { label: "", image: "", link: "" });
      } else if (location === "below") {
        new_array.splice(index + 1, 0, { label: "", image: "", link: "" });
      }

      set_slideshow(new_array);
    } else {
      set_slideshow(slideshow => [...slideshow, { label: "", image: "", link: "" }]);
    }
  };
  const remove_slideshow = async (slideshow_index, e) => {
    e.preventDefault();
    set_slideshow(slideshow =>
      slideshow.filter((slideshow, index) => {
        return slideshow_index !== index;
      })
    );
  };

  const move = (from, to, arr, e, set_state) => {
    e.preventDefault();
    const newArr = [...arr];

    const item = newArr.splice(from, 1)[0];
    newArr.splice(to, 0, item);
    set_state(newArr);
  };

  return (
    <div className="main_container p-20px">
      <h1 style={{ textAlign: "center" }}>{props.match.params.id ? "Edit Content" : "Create Content"}</h1>

      <div className="form">
        <form onSubmit={submitHandler} style={{ width: "100%" }}>
          {/* {loading_data ? (
						<div>Loading...</div>
					) : ( */}
          <Loading loading={loading} error={error}>
            {content && (
              <div>
                <Helmet>
                  <title>Edit Content | Glow LEDs</title>
                </Helmet>

                <ul className="edit-form-container jc-b" style={{ maxWidth: "90rem", marginBottom: "20px" }}>
                  <div className="ai-c h-25px mb-15px jc-c">
                    <div className="custom-select">
                      <select className="qty_select_dropdown" onChange={e => use_template(e)}>
                        <option key={1} defaultValue="">
                          ---Content Template---
                        </option>
                        {contents.map((content, index) => (
                          <option key={index} value={content._id}>
                            {content.home_page.h1}
                          </option>
                        ))}
                      </select>
                      <span className="custom-arrow" />
                    </div>
                  </div>
                  <div className="ai-c h-25px mb-15px jc-c">
                    <div className="custom-select">
                      <select className="qty_select_dropdown" onChange={e => use_email_template(e)}>
                        <option key={1} defaultValue="">
                          ---Email Template---
                        </option>
                        {emails.map((email, index) => (
                          <option key={index} value={email._id}>
                            {email.h1}
                          </option>
                        ))}
                      </select>
                      <span className="custom-arrow" />
                    </div>
                  </div>
                  <div className="wrap jc-b">
                    <div className="w-228px m-10px">
                      <h2>Home Page</h2>
                      <li>
                        <label htmlFor="home_page_h1">Home Page H1</label>
                        <input
                          type="text"
                          name="home_page_h1"
                          value={home_page && home_page.h1}
                          id="home_page_h1"
                          onChange={e => set_home_page({ ...home_page, h1: e.target.value })}
                        />
                      </li>
                      {/* <li>
												<label htmlFor="home_page_image">Home Page Image</label>
												<input
													type="text"
													name="home_page_image"
													value={home_page && home_page.image}
													id="home_page_image"
													onChange={(e) =>
														set_home_page({ ...home_page, image: e.target.value })}
												/>
											</li> */}

                      <li>
                        <label htmlFor="home_page_video">Home Page Video</label>
                        <input
                          type="text"
                          name="home_page_video"
                          value={home_page && home_page.video}
                          id="home_page_video"
                          onChange={e =>
                            set_home_page({
                              ...home_page,
                              video: e.target.value
                            })
                          }
                        />
                      </li>
                      {loading_checkboxes ? (
                        <div>Loading...</div>
                      ) : (
                        <li>
                          <label htmlFor="show_video">Show Video</label>
                          <input
                            type="checkbox"
                            name="show_video"
                            defaultChecked={home_page && home_page.show_video}
                            id="show_video"
                            onChange={e => {
                              set_home_page({
                                ...home_page,
                                show_video: e.target.checked
                              });
                            }}
                          />
                        </li>
                      )}
                      <li>
                        <label htmlFor="home_page_h2">Home Page H2</label>
                        <input
                          type="text"
                          name="home_page_h2"
                          value={home_page && home_page.h2}
                          id="home_page_h2"
                          onChange={e => set_home_page({ ...home_page, h2: e.target.value })}
                        />
                      </li>

                      <li>
                        <label htmlFor="home_page_p">Home Page P</label>
                        <textarea
                          className="edit_product_textarea"
                          name="home_page_p"
                          value={home_page && home_page.p}
                          id="home_page_p"
                          onChange={e => set_home_page({ ...home_page, p: e.target.value })}
                        />
                      </li>
                      <li>
                        <label htmlFor="home_page_button">Home Page Button</label>
                        <input
                          type="text"
                          name="home_page_button"
                          value={home_page && home_page.button}
                          id="home_page_button"
                          onChange={e =>
                            set_home_page({
                              ...home_page,
                              button: e.target.value
                            })
                          }
                        />
                      </li>

                      <li>
                        <label htmlFor="home_page_link">Home Page Path</label>
                        <input
                          type="text"
                          name="home_page_link"
                          value={home_page && home_page.link}
                          id="home_page_link"
                          onChange={e =>
                            set_home_page({
                              ...home_page,
                              link: e.target.value
                            })
                          }
                        />
                      </li>
                      {loading_checkboxes ? (
                        <div>Loading...</div>
                      ) : (
                        <li>
                          <label htmlFor="show_image">Show Image</label>
                          <input
                            type="checkbox"
                            name="show_image"
                            defaultChecked={home_page && home_page.show_image}
                            id="show_image"
                            onChange={e => {
                              set_home_page({
                                ...home_page,
                                show_image: e.target.checked
                              });
                            }}
                          />
                        </li>
                      )}
                      <li>
                        <label htmlFor="image">Banner Image</label>
                        <input
                          type="text"
                          name="image"
                          value={home_page && home_page.banner_image}
                          id="image"
                          onChange={e => {
                            set_home_page({
                              ...home_page,
                              banner_image: e.target.value
                            });
                          }}
                        />
                      </li>
                      <ImageDisplay images={images} set_images={set_images} image={image} set_image={set_image} name={"Images"} />
                      {/* <div className="w-228px m-10px"> */}
                      <h2>Images</h2>
                      <div className="scroll-y h-100per max-h-900px ">
                        {slideshow &&
                          slideshow.map((items, index) => (
                            <div>
                              <div className="jc-b ai-c">
                                <label>Button {index + 1}</label>
                                <GLButton
                                  variant="primary"
                                  className="w-4rem h-4rem p-14px mr-1rem mb-1rem"
                                  onClick={e => remove_slideshow(index, e)}
                                  aria-label="Delete"
                                >
                                  <i className="fas fa-times mr-5px" />
                                </GLButton>
                              </div>
                              <div className="ai-c">
                                {index > 0 && (
                                  <GLButton
                                    variant="secondary icon"
                                    className="ph-10px pb-20px ml-5px"
                                    onClick={e => move(index, index - 1, slideshow, e, set_slideshow)}
                                    aria-label="Move Up"
                                  >
                                    <i className=" fas fa-sort-up" />
                                  </GLButton>
                                )}

                                {index < slideshow.length - 1 && (
                                  <GLButton
                                    variant="secondary icon"
                                    className="ph-10px pb-20px ml-5px "
                                    onClick={e => move(index, index + 1, slideshow, e, set_slideshow)}
                                    aria-label="Move Down"
                                  >
                                    <i
                                      style={{
                                        WebkitTransform: "rotate(-180deg)"
                                      }}
                                      className=" fas fa-sort-up"
                                    />
                                  </GLButton>
                                )}
                              </div>
                              <li>
                                <GLButton variant="primary" onClick={e => add_slideshow(e, index, "above")}>
                                  Add Image Above
                                </GLButton>
                              </li>
                              <li>
                                <label htmlFor="label">Label</label>
                                <input
                                  type="text"
                                  name="label"
                                  value={items.label}
                                  id="label"
                                  onChange={e => update_slideshow_item_property(e, e.target.name, index)}
                                />
                              </li>
                              <li>
                                <label htmlFor="image">Image</label>
                                <input
                                  type="text"
                                  name="image"
                                  value={items.image}
                                  id="image"
                                  onChange={e => update_slideshow_item_property(e, e.target.name, index)}
                                />
                              </li>
                              <li>
                                <label htmlFor="link">Path</label>
                                <input
                                  type="text"
                                  name="link"
                                  value={items.link}
                                  id="link"
                                  onChange={e => update_slideshow_item_property(e, e.target.name, index)}
                                />
                              </li>
                              {index !== slideshow.length - 1 && (
                                <li>
                                  <GLButton variant="primary" onClick={e => add_slideshow(e, index, "below")}>
                                    Add Image Below
                                  </GLButton>
                                </li>
                              )}
                            </div>
                          ))}

                        <li>
                          <GLButton variant="primary" onClick={e => add_slideshow(e)}>
                            Add Image
                          </GLButton>
                        </li>
                      </div>
                      {/* </div> */}
                    </div>

                    <div className="w-228px m-10px">
                      <h2>Banner</h2>
                      <li>
                        <label htmlFor="banner_label">Banner Label</label>
                        <input
                          type="text"
                          name="banner_label"
                          value={banner && banner.label}
                          id="banner_label"
                          onChange={e => set_banner({ ...banner, label: e.target.value })}
                        />
                      </li>
                      <li>
                        <label htmlFor="banner_button_text">Banner Button Text</label>
                        <input
                          type="text"
                          name="banner_button_text"
                          value={banner && banner.button}
                          id="banner_button_text"
                          onChange={e => set_banner({ ...banner, button: e.target.value })}
                        />
                      </li>
                      <li>
                        <label htmlFor="banner_link">Banner Path</label>
                        <input
                          type="text"
                          name="banner_link"
                          value={banner && banner.link}
                          id="banner_link"
                          onChange={e => set_banner({ ...banner, link: e.target.value })}
                        />
                      </li>
                      {loading_checkboxes ? (
                        <div>Loading...</div>
                      ) : (
                        <li>
                          <label htmlFor="active">Active?</label>
                          <input
                            type="checkbox"
                            name="active"
                            // defaultChecked={active ? 'checked' : 'unchecked'}
                            // defaultValue={active}
                            defaultChecked={active}
                            // value={active && active ? '1' : '0'}
                            id="active"
                            onChange={e => {
                              set_active(e.target.checked);
                            }}
                          />
                        </li>
                      )}
                    </div>
                    <div className="w-228px m-10px">
                      <h2>Links</h2>
                      <div className="scroll-y h-100per max-h-900px ">
                        {links &&
                          links.map((link, index) => (
                            <div>
                              <div className="jc-b ai-c">
                                <label>Button {index + 1}</label>
                                <GLButton
                                  variant="primary"
                                  className="w-4rem h-4rem p-14px mr-1rem mb-1rem"
                                  onClick={e => remove_link(index, e)}
                                  aria-label="Delete"
                                >
                                  <i className="fas fa-times mr-5px" />
                                </GLButton>
                              </div>
                              <div className="ai-c">
                                {index > 0 && (
                                  <GLButton
                                    variant="secondary icon"
                                    className="ph-10px pb-20px ml-5px"
                                    onClick={e => move(index, index - 1, links, e, set_links)}
                                    aria-label="Move Up"
                                  >
                                    <i className=" fas fa-sort-up" />
                                  </GLButton>
                                )}

                                {index < links.length - 1 && (
                                  <GLButton
                                    variant="secondary icon"
                                    className="ph-10px pb-20px ml-5px "
                                    onClick={e => move(index, index + 1, links, e, set_links)}
                                    aria-label="Move Down"
                                  >
                                    <i
                                      style={{
                                        WebkitTransform: "rotate(-180deg)"
                                      }}
                                      className=" fas fa-sort-up"
                                    />
                                  </GLButton>
                                )}
                              </div>
                              <li>
                                <GLButton variant="primary" onClick={e => add_link(e, index, "above")}>
                                  Add Link Above
                                </GLButton>
                              </li>
                              <li>
                                <label htmlFor="label">Label</label>
                                <input
                                  type="text"
                                  name="label"
                                  value={link.label}
                                  id="label"
                                  onChange={e => update_link_item_property(e, e.target.name, index)}
                                />
                              </li>
                              <li>
                                <label htmlFor="link">Link</label>
                                <input
                                  type="text"
                                  name="link"
                                  value={link.link}
                                  id="link"
                                  onChange={e => update_link_item_property(e, e.target.name, index)}
                                />
                              </li>
                              <li>
                                <label htmlFor="icon">Icon</label>
                                <input
                                  type="text"
                                  name="icon"
                                  value={link.icon}
                                  id="icon"
                                  onChange={e => update_link_item_property(e, e.target.name, index)}
                                />
                              </li>
                              {index !== links.length - 1 && (
                                <li>
                                  <GLButton variant="primary" onClick={e => add_link(e, index, "below")}>
                                    Add Link Below
                                  </GLButton>
                                </li>
                              )}
                            </div>
                          ))}

                        <li>
                          <GLButton variant="primary" onClick={e => add_link(e)}>
                            Add Link
                          </GLButton>
                        </li>
                      </div>
                    </div>
                  </div>
                  {loading_checkboxes ? (
                    <div>Loading...</div>
                  ) : (
                    <li>
                      <label htmlFor="show_video">Create Email</label>
                      <input
                        type="checkbox"
                        name="show_video"
                        defaultChecked={create_email}
                        id="show_video"
                        onChange={e => {
                          set_create_email(e.target.checked);
                        }}
                      />
                    </li>
                  )}
                  <li>
                    <GLButton type="submit" variant="primary">
                      {id ? "Update" : "Create"}
                    </GLButton>
                  </li>
                  <li>
                    <GLButton variant="secondary" onClick={() => history.goBack()}>
                      Back to Contents
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
export default EditContentPage;
