import * as React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { snake_case } from "../../utils/helper_functions";
import { GLButton } from "../GlowLEDsComponents";
import * as API from "../../api";
import { ArrowDownward, ArrowUpward, Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const DropdownDisplay = ({ item_list, list_items, set_items, list_name, placement, display_key, item_group_id }) => {
  const dispatch = useDispatch();
  const remove_list_item = (item_index, e) => {
    e.preventDefault();
    set_items(items =>
      items.filter((item, index) => {
        return item_index !== index;
      })
    );
  };

  const remove_list_item_and_delete = (item_index, e, product_id) => {
    e.preventDefault();
    set_items(items =>
      items.filter((item, index) => {
        return item_index !== index;
      })
    );
    dispatch(API.deleteProduct(product_id));
  };

  const add_item = e => {
    e.preventDefault();
    const item_object = JSON.parse(e.target.value);
    if (list_items) {
      if (placement === "top") {
        set_items(items => [item_object, ...items]);
      } else {
        set_items(items => [...items, item_object]);
      }
    } else {
      set_items([item_object]);
    }
  };

  const move = (from, to, arr) => {
    const newArr = [...arr];

    const item = newArr.splice(from, 1)[0];
    newArr.splice(to, 0, item);
    set_items(newArr);
  };

  return (
    <div className="jc-b">
      <li>
        <label htmlFor={list_name.toLowerCase()}>{list_name}</label>
        <div className="ai-c h-25px mv-15px jc-c">
          <div className="custom-select">
            <select className="qty_select_dropdown" onChange={e => add_item(e)}>
              <option key={1} defaultValue="">
                ---Choose {list_name}---
              </option>
              {item_list &&
                item_list.map((item, index) => (
                  <option key={index} value={JSON.stringify(item)}>
                    {display_key === "first_name" ? `${item[display_key]} ${item.last_name}` : item[display_key]}
                  </option>
                ))}
            </select>
            <span className="custom-arrow" />
          </div>
        </div>
        <div>
          <div className="jc-b">
            <div>
              {list_items &&
                list_items.map((item, index) => {
                  return (
                    <div className="promo_code mv-1rem row jc-b  w-100per" key={index}>
                      <div className="ai-c w-100per jc-b">
                        <div>
                          <IconButton onClick={e => remove_list_item(index, e)} aria-label="Delete">
                            <Close />
                          </IconButton>
                          <Link to={`/secure/glow/editproduct/${item.pathname}/false`}>
                            {display_key === "first_name"
                              ? `${item[display_key]} ${item.last_name}`
                              : item[display_key]}
                          </Link>
                        </div>
                        <div className="row">
                          <div className="ai-c">
                            {index > 0 && (
                              <IconButton
                                className="ml-5px mt-5px"
                                onClick={e => move(index, index - 1, list_items)}
                                aria-label="Move Up"
                              >
                                <ArrowUpward />
                              </IconButton>
                            )}

                            {index < list_items.length - 1 && (
                              <IconButton
                                className="ml-5px mb-5px"
                                onClick={e => move(index, index + 1, list_items)}
                                aria-label="Move Down"
                              >
                                <ArrowDownward />
                              </IconButton>
                            )}
                          </div>
                          {/* <Link
                            to={`/secure/glow/editproduct/${item.pathname}/true`}
                          > */}
                          <Link
                            to={`/secure/glow/editproduct/${item.pathname}/true/${snake_case(
                              list_name.slice(0, -1)
                            )}/${item_group_id}`}
                          >
                            <GLButton variant="secondary" className="ml-1rem">
                              Use as Template
                            </GLButton>
                          </Link>
                          <GLButton
                            variant="primary icon"
                            className="ml-1rem"
                            onClick={e => remove_list_item_and_delete(index, e, item._id)}
                            aria-label="Delete"
                          >
                            Delete
                          </GLButton>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </li>
    </div>
  );
};
export default DropdownDisplay;
