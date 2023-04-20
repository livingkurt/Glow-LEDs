import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { API_Orders } from "../../utils";
import { Link, useHistory } from "react-router-dom";
import { Loading, Notification } from "../../shared/SharedComponents";
import { Helmet } from "react-helmet";
import { facebook_catalog_upload, google_catalog_upload, current_orders_upload } from "../../utils/google_sheets_upload";
import { mutliDragAwareReorder, multiSelectTo as multiSelect, update_orders_url, getUrlParameter } from "../../utils/helper_functions";
import memoizeOne from "memoize-one";
import Search from "../../shared/GlowLEDsComponents/GLTable/Search";
import Sort from "../../shared/GlowLEDsComponents/GLTable/Sort";
import Pagination from "../../shared/GlowLEDsComponents/GLTable/Pagination";
import { OrderListItem } from "./components";
import { GLButton } from "../../shared/GlowLEDsComponents";
import { listOrders } from "../../api";

function OrderPage(props) {
  const history = useHistory();
  const [search, set_search] = useState("");
  const [sort, setSortOrder] = useState("");
  const [loading_upload, set_loading_upload] = useState(false);
  const [show_hidden, set_show_hidden] = useState(false);
  const [page, set_page] = useState(1);
  const [limit, set_limit] = useState(30);

  const category = props.match.params.category ? props.match.params.category : "";
  const subcategory = props.match.params.subcategory ? props.match.params.subcategory : "";

  const dispatch = useDispatch();
  const [orders_list, updateOrders] = useState([]);

  const orderPage = useSelector(state => state.orders.orderPage);
  const { loading, orders: items, totalPages, message, currentPage, error } = orderPage;

  useEffect(() => {
    let clean = true;
    if (clean) {
      determine_orders();
    }
    return () => (clean = false);
  }, []);

  const determine_orders = () => {
    const query = getUrlParameter(props.location);
    let category = props.match.params.category ? props.match.params.category : "";
    let subcategory = props.match.params.subcategory ? props.match.params.subcategory : "";
    let search = "";
    let sort = "";
    let filter = "";
    let collection = props.match.params.collection ? props.match.params.collection : "";
    let limit = 30;
    let page = "";
    let hidden = "";
    let option = false;

    // prnt({ query });
    if (category !== "our_picks" || category !== "discounted" || category !== "best_sellers") {
      if (Object.keys(query).length > 0) {
        if (query.search) {
          set_search(query.search.split("%20").join(" "));
          search = query.search.split("%20").join(" ");
        }
        // if (query.sort) {
        // 	set_sort(query.sort);
        // 	sort = query.sort;
        // }
        // if (query.filter) {
        // 	//
        // 	filter = waitForElement(query.filter, chips_list);
        // }
        if (query.page) {
          set_page(query.page);
          page = query.page;
        }
        if (query.limit) {
          set_limit(query.limit);
          limit = query.limit;
        }
      }

      dispatch(
        listOrders({
          category,
          subcategory,
          filter,
          search,
          sort,
          collection,
          page,
          limit,
          hidden,
          option
        })
      );
    }
  };

  const handleListItems = e => {
    e.preventDefault();
    dispatch(
      listOrders({
        category,
        subcategory,
        search,
        sort,
        option: false,
        limit
      })
    );
  };

  const sortHandler = e => {
    setSortOrder(e.target.value);
    dispatch(
      listOrders({
        category,
        subcategory,
        search,
        sort: e.target.value,
        option: false
      })
    );
  };
  const sort_options = ["Category", "Newest", "Lowest", "Highest", "Hidden"];

  const update_order = async () => {
    set_loading_upload(true);

    const { data } = await API_Orders.update_order_order(state);
    if (data) {
      dispatch(
        listOrders({
          category,
          subcategory,
          search,
          sort,
          page,
          limit,
          option: false
        })
      );
      set_loading_upload(false);
    }
  };

  const colors = [
    { name: "Not Category", color: "#333333" },
    { name: "OPYN Glowskinz", color: "#557b68" },
    { name: "Glowstringz", color: "#4b7188" },
    { name: "CLOZD Glowskinz", color: "#736084" },
    { name: "Decals", color: "#6f5aa3" },
    { name: "Diffusers", color: "#ca9160" },
    { name: "Diffuser Caps", color: "#6c7ea9" },
    { name: "Accessories", color: "#925757" },
    { name: "EXO Diffusers", color: "#4162ad" }
  ];

  const determine_color = (order, isSelected, isDragging) => {
    let result = "#797979";

    if (order.category === "opyn") {
      result = colors[1].color;
      // if (isSelected) {
      // 	result = '#6a7fad';
      // } else if (isDragging) {
      // 	result = colors[1].color;
      // } else {
      // 	result = '#557b68';
      // }
    }
    if (order.category === "glowstringz") {
      result = colors[2].color;
    }
    if (order.subcategory === "clozd") {
      result = colors[3].color;
    }
    if (order.category === "decals") {
      result = colors[4].color;
    }
    if (order.category === "diffusers") {
      result = colors[5].color;
    }
    if (order.category === "diffuser_caps") {
      result = colors[6].color;
    }
    if (order.category === "batteries") {
      result = colors[7].color;
    }
    if (order.category === "exo_diffusers") {
      result = colors[8].color;
    }
    if (order.hidden) {
      result = colors[0].color;
    }
    return result;
  };

  const update_order_catelog = async () => {
    set_loading_upload(true);
    const { data } = await API_Orders.findAllGrid_orders_a({
      limit: 0,
      hidden: false,
      deleted: false,
      option: false
    });

    await facebook_catalog_upload(data.orders);
    await current_orders_upload(data.orders);
    await google_catalog_upload(data.orders);
    set_loading_upload(false);
  };

  const show_hidden_orders = () => {
    if (show_hidden) {
      set_show_hidden(false);
    } else if (!show_hidden) {
      set_show_hidden(true);
    }
  };

  const [state, setState] = useState({
    entities: {
      orders: [],
      columns: {
        "column-1": {
          id: "column-1",
          title: "Orders",
          order_ids: []
        }
      },
      columnOrder: ["column-1"]
    },
    selectedOrderIds: [],
    draggingOrderId: null
  });

  useEffect(() => {
    window.addEventListener("click", onWindowClick);
    window.addEventListener("keydown", onWindowKeyDown);
    window.addEventListener("touchend", onWindowTouchEnd);
    // createData();
    return () => {
      window.removeEventListener("click", onWindowClick);
      window.removeEventListener("keydown", onWindowKeyDown);
      window.removeEventListener("touchend", onWindowTouchEnd);
    };
  }, []);

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (items) {
        set_state();
      }
    }
    return () => (clean = false);
  }, [items]);

  const set_state = () => {
    if (items) {
      if (items.columns) {
        setState({
          entities: items,
          selectedOrderIds: [],
          draggingOrderId: null
        });
        if (currentPage) {
          set_page(currentPage);
        }
      } else {
        setState({
          entities: {
            orders: items,
            columns: {
              "column-1": {
                id: "column-1",
                title: "Orders",
                order_ids: items.map(order => order._id)
              }
            },
            columnOrder: ["column-1"]
          },
          selectedOrderIds: [],
          draggingOrderId: null
        });
      }
    }
    updateOrders(items);
  };
  const update_page = (e, new_page) => {
    let category = props.match.params.category ? props.match.params.category : "";
    let subcategory = props.match.params.subcategory ? props.match.params.subcategory : "";
    let search = "";
    let sort = "";
    let filter = "";
    let collection = props.match.params.collection ? props.match.params.collection : "";

    let hidden = "";
    let limit = 30;
    let option = false;

    e.preventDefault();
    const page = parseInt(new_page);
    set_page(page);
    update_orders_url(history, search, "", "", page, limit);

    dispatch(
      listOrders({
        category,
        subcategory,
        collection,
        filter,
        search,
        page: new_page,
        limit,
        hidden,
        option,
        sort
      })
    );
  };

  const onDragStart = start => {
    //
    const id = start.draggableId;
    const selected = state.selectedOrderIds.find(orderId => orderId === id);

    // if dragging an item that is not selected - unselect all items
    if (!selected) {
      unselectAll();
    }
    setState(state => {
      return { ...state, draggingOrderId: start.draggableId };
    });
  };

  const onDragEnd = result => {
    //
    const { destination, source, draggableId } = result;

    if (!destination) {
      setState(state => {
        return { ...state, draggingOrderId: null };
      });
      return;
    }

    const processed = mutliDragAwareReorder({
      entities: state.entities,
      selectedOrderIds: state.selectedOrderIds,
      source,
      destination
    });
    setState(state => {
      return { ...processed, draggingOrderId: null };
    });
    updateOrders(processed.entities.orders);
    // updateOrders(state.entities);
  };

  const onWindowKeyDown = event => {
    if (event.defaultPrevented) {
      return;
    }

    if (event.key === "Escape") {
      unselectAll();
    }
  };

  const onWindowClick = event => {
    if (event.defaultPrevented) {
      return;
    }
    unselectAll();
  };

  const onWindowTouchEnd = event => {
    if (event.defaultPrevented) {
      return;
    }
    unselectAll();
  };

  const toggleSelection = orderId => {
    const selectedOrderIds = state.selectedOrderIds;
    //
    const wasSelected = selectedOrderIds.includes(orderId);

    const newOrderIds = (() => {
      // Order was not previously selected
      // now will be the only selected item
      if (!wasSelected) {
        return [orderId];
      }

      // Order was part of a selected group
      // will now become the only selected item
      if (selectedOrderIds.length > 1) {
        return [orderId];
      }

      // order was previously selected but not in a group
      // we will now clear the selection
      return [];
    })();
    setState(state => {
      return { ...state, selectedOrderIds: newOrderIds };
    });
  };

  const toggleSelectionInGroup = orderId => {
    const selectedOrderIds = state.selectedOrderIds;
    const index = selectedOrderIds.indexOf(orderId);

    // if not selected - add it to the selected items
    if (index === -1) {
      setState(state => {
        return {
          ...state,
          selectedOrderIds: [...selectedOrderIds, orderId]
        };
      });
      return;
    }

    // it was previously selected and now needs to be removed from the group
    const shallow = [...selectedOrderIds];
    shallow.splice(index, 1);

    setState(state => {
      return { ...state, selectedOrderIds: shallow };
    });
  };

  // This behaviour matches the MacOSX finder selection
  const multiSelectTo = newOrderId => {
    const updated = multiSelect(state.entities, state.selectedOrderIds, newOrderId);

    if (updated == null) {
      return;
    }

    setState(state => {
      return { ...state, selectedOrderIds: updated };
    });
  };

  const unselect = () => {
    unselectAll();
  };

  const unselectAll = () => {
    setState(state => {
      return { ...state, selectedOrderIds: [] };
    });
  };
  //

  const getSelectedMap = memoizeOne(selectedOrderIds =>
    selectedOrderIds.reduce((previous, current) => {
      previous[current] = true;
      return previous;
    }, {})
  );

  const add_item_group_id = e => {
    set_loading_upload(true);
    e.preventDefault();
    items.forEach(item_group => {
      const options = [...item_group.color_orders, ...item_group.secondary_color_orders, ...item_group.option_orders];
      options.forEach(async option => {
        const { data } = await API_Orders.save_item_group_id(option._id, item_group._id);
      });
    });
    set_loading_upload(false);
  };

  return (
    <div className="main_container p-20px">
      <Helmet>
        <title>Admin Orders | Glow LEDs</title>
      </Helmet>
      <Notification message={message} />
      <div className="jc-b">
        {/* <div className="w-20per">
					{colors.map((color, index) => {
						return (
							<div className="jc-b p-1rem" key={index}>
								<label style={{ marginRight: '1rem' }}>{color.name}</label>
								<div
									style={{
										backgroundColor: color.color,
										height: '20px',
										width: '60px',
										borderRadius: '5px'
									}}
								/>
							</div>
						);
					})}
				</div> */}
        <div className="jc-b w-100per">
          <Link to="/secure/glow/order_display">
            <GLButton variant="primary" className="h-35px ">
              Display Orders
            </GLButton>
          </Link>
          <GLButton variant="primary" className="h-35px" onClick={() => update_order_catelog()}>
            Update Order Catalog
          </GLButton>
          <Link to="/secure/glow/orders?page=1?limit=500">
            <GLButton
              variant="primary"
              className="h-35px "
              onClick={() => {
                set_show_hidden(true);
                set_limit(500);
                dispatch(
                  listOrders({
                    category,
                    subcategory,
                    search,
                    sort,
                    page,
                    limit: 500,
                    option: false
                  })
                );
              }}
            >
              Show All Orders
            </GLButton>
          </Link>

          {show_hidden && (
            <GLButton variant="primary" className="h-35px" onClick={update_order}>
              Update Order
            </GLButton>
          )}
          <Link to="/secure/glow/editorder">
            <GLButton variant="primary" className="h-35px">
              Create Order
            </GLButton>
          </Link>
          <GLButton
            variant="primary"
            className="h-35px"
            onClick={() =>
              dispatch(
                listOrders({
                  category,
                  subcategory,
                  search,
                  page: 1,
                  limit: 0,
                  hidden: false,
                  option: true,
                  sort
                })
              )
            }
          >
            Show Option Orders
          </GLButton>

          {/* <GLButton variant="primary" onClick={add_item_group_id}>
						Add Item Group ID
					</GLButton> */}
          {/* <GLButton variant="primary" onClick={generate_sitemap}>
					Add Item Group ID
				</GLButton> */}
        </div>
      </div>
      <div className="jc-c">
        <h1 style={{ textAlign: "center" }}>Orders</h1>
      </div>
      <Loading loading={loading_upload} error={error} />
      <Loading loading={loading} error={error} />
      <div className="search_and_sort jc-c ai-c">
        <GLButton variant="primary" style={{ whiteSpace: "nowrap" }} onClick={show_hidden_orders}>
          {!show_hidden ? "Show" : "Hide"} Hidden Orders
        </GLButton>
        <Search search={search} set_search={set_search} handleListItems={handleListItems} category={category} />
        <Sort sortHandler={sortHandler} sort_options={sort_options} />
      </div>
      <div className="jc-c">
        {totalPages && (
          <Pagination
            className="pagination-bar"
            currentPage={page}
            totalCount={totalPages}
            pageSize={limit}
            onPageChange={(e, page) => update_page(e, page)}
          />
        )}
      </div>
      <div className="ai-c mt-10px">
        <div className="w-500px">Order Name</div>
        <div className="w-100px">Hidden</div>
        <div className="w-200px">Category</div>
        <div className="w-120px">Order</div>
        <div className="w-500px">Price</div>
        <div className="w-300px">Use as Template</div>
        <div className="w-100px">Actions</div>
      </div>
      {!show_hidden && (
        <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
          {state.entities.columnOrder.map((columnId, index) => {
            const column = state.entities.columns[columnId];

            // const orders = column.order_ids.map((order_id, index) => state.entities.orders[index]);
            let orders = [];
            state.entities.orders
              // .filter(order => !order.option)
              .forEach(function (a) {
                orders[column.order_ids.indexOf(a._id)] = a;
              });
            const orders_2 = column.order_ids.map((order_id, index) => state.entities.orders[index + 1]);

            return (
              <Droppable droppableId={"column-1"} key={index}>
                {provided => (
                  <ul {...provided.droppableProps} ref={provided.innerRef}>
                    {orders
                      .filter(order => !order.hidden)
                      .map((order, index) => {
                        return (
                          <Draggable key={order._id} draggableId={order._id} index={index}>
                            {(provided, snapshot) => {
                              const isSelected = Boolean(getSelectedMap(state.selectedOrderIds)[order._id]);
                              let disAppearOrder = false;
                              if (snapshot.isDraggingOver && isSelected && state.draggingOrderId && order._id !== state.draggingOrderId) {
                                //
                                //
                                disAppearOrder = true;
                              }
                              return (
                                <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                  <OrderListItem
                                    size="50px"
                                    order={order}
                                    admin={true}
                                    determine_color={determine_color}
                                    isSelected={isSelected}
                                    selectionCount={state.selectedOrderIds.length}
                                    toggleSelection={toggleSelection}
                                    toggleSelectionInGroup={toggleSelectionInGroup}
                                    multiSelectTo={multiSelectTo}
                                    disAppearOrder={disAppearOrder}
                                    snapshot={snapshot}
                                  />
                                </li>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            );
          })}
        </DragDropContext>
      )}
      {show_hidden && (
        <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
          {state.entities.columnOrder.map(columnId => {
            const column = state.entities.columns[columnId];

            // const orders = column.order_ids.map((order_id, index) => state.entities.orders[index]);
            let orders = [];
            state.entities.orders
              .filter(order => !order.option)
              .forEach(function (a) {
                orders[column.order_ids.indexOf(a._id)] = a;
              });

            const orders_2 = column.order_ids.map((order_id, index) => state.entities.orders[index + 1]);

            return (
              <Droppable droppableId={"column-1"} index>
                {provided => (
                  <ul {...provided.droppableProps} ref={provided.innerRef}>
                    {orders.map((order, index) => {
                      return (
                        <Draggable key={order._id} draggableId={order._id} index={index}>
                          {(provided, snapshot) => {
                            const isSelected = Boolean(getSelectedMap(state.selectedOrderIds)[order._id]);
                            let disAppearOrder = false;
                            if (snapshot.isDraggingOver && isSelected && state.draggingOrderId && order._id !== state.draggingOrderId) {
                              //
                              //
                              disAppearOrder = true;
                            }
                            return (
                              <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                <OrderListItem
                                  size="50px"
                                  order={order}
                                  admin={true}
                                  determine_color={determine_color}
                                  isSelected={isSelected}
                                  selectionCount={state.selectedOrderIds.length}
                                  toggleSelection={toggleSelection}
                                  toggleSelectionInGroup={toggleSelectionInGroup}
                                  multiSelectTo={multiSelectTo}
                                  disAppearOrder={disAppearOrder}
                                  snapshot={snapshot}
                                />
                              </li>
                            );
                          }}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            );
          })}
        </DragDropContext>
      )}
      <div className="jc-c">
        {totalPages && (
          <Pagination
            className="pagination-bar"
            currentPage={page}
            totalCount={totalPages}
            pageSize={limit}
            onPageChange={(e, page) => update_page(e, page)}
          />
        )}
      </div>
    </div>
  );
}

export default OrderPage;
