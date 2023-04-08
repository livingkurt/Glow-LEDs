// React
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LazyImage } from "../../../shared/SharedComponents";
import { sale_price_switch } from "../../../utils/react_helper_functions";
import styled from "styled-components";
import { GLButton } from "../../../shared/GlowLEDsComponents";
import * as API from "../../../api";

const grid = 8;
const size = 30;

const SelectionCount = styled.div`
  left: -${grid}px;
  bottom: -${grid}px;
  color: white;
  background: #4d5061;
  border-radius: 50%;
  height: ${size}px;
  width: ${size}px;
  line-height: ${size}px;
  position: absolute;
  text-align: center;
  font-size: 1.5rem;
`;

const Container = styled.div`
  border-radius: ${props => (props.isDragging ? "3rem" : "2rem")};
  background-color: ${props => (props.isDragging ? "#4d5061" : "white")};
  animation: ${props => (props.isDragging ? "${keyFrameDragRowAnimation} 0.5s ease-in-out 0s infinite" : null)};
`;

const ProductListItem = props => {
  const userSlice = useSelector(state => state.userSlice.userPage);
  const { current_user } = userSlice;
  const history = useHistory();
  const keyCodes = {
    enter: 13,
    escape: 27,
    arrowDown: 40,
    arrowUp: 38,
    tab: 9
  };
  const getBackgroundColor = ({ isSelected, isDragging }) => {
    if (isDragging) {
      // return determine_color(product, isDragging, false);
      return "#4d5061";
    }

    if (isSelected) {
      // return determine_color(product, false, isSelected);
      return "#a7a7a7";
    }

    return determine_color(product, false, false);
  };

  const { product, determine_color, admin, snapshot, provided, disAppearProduct, isSelected, selectionCount } = props;
  const dispatch = useDispatch();

  //

  const show_hide = id => {
    const row = document.getElementById(id);

    row.classList.toggle("hide-row");
  };
  const deleteHandler = product => {
    dispatch(API.deleteProduct(product._id));
  };

  const onKeyDown = (event, provided, snapshot) => {
    if (provided.dragHandleProps) {
      provided.dragHandleProps.onKeyDown(event);
    }

    if (event.defaultPrevented) {
      return;
    }

    if (snapshot.isDragging) {
      return;
    }

    if (event.keyCode !== keyCodes.enter) {
      return;
    }

    // we are using the event for selection
    event.preventDefault();

    performAction(event);
  };

  // Using onClick as it will be correctly
  // preventing if there was a drag
  const onClick = event => {
    //
    if (event.defaultPrevented) {
      return;
    }

    if (event.button !== 0) {
      return;
    }

    // marking the event as used
    event.preventDefault();

    performAction(event);
  };

  const onTouchEnd = event => {
    if (event.defaultPrevented) {
      return;
    }

    // marking the event as used
    // we would also need to add some extra logic to prevent the click
    // if this element was an anchor
    event.preventDefault();
    props.toggleSelectionInGroup(props.product._id);
  };

  // Determines if the platform specific toggle selection in group key was used
  const wasToggleInSelectionGroupKeyUsed = event => {
    const isUsingWindows = navigator.platform.indexOf("Win") >= 0;
    return isUsingWindows ? event.ctrlKey : event.metaKey;
  };

  // Determines if the multiSelect key was used
  const wasMultiSelectKeyUsed = event => event.shiftKey;

  const performAction = event => {
    //
    const { product, toggleSelection, toggleSelectionInGroup, multiSelectTo } = props;

    if (wasToggleInSelectionGroupKeyUsed(event)) {
      toggleSelectionInGroup(product._id);
      return;
    }

    if (wasMultiSelectKeyUsed(event)) {
      multiSelectTo(product._id);
      return;
    }
    //
    toggleSelection(product._id);
  };

  const shouldShowSelection = snapshot.isDragging && selectionCount > 1;
  if (disAppearProduct) {
    //
    return null;
  }
  //

  const show_hide_product = product => {
    dispatch(
      API.saveProduct({
        ...product,
        hidden: product.hidden ? false : true
      })
    );
    dispatch(API.listProducts({ option: false }));
  };

  return (
    <Container
      className="product_list_item noselect"
      style={{ backgroundColor: getBackgroundColor(props) }}
      isDragging={snapshot.isDragging}
      onClick={onClick}
      onTouchEnd={onTouchEnd}
      onKeyDown={event => onKeyDown(event, provided, snapshot)}
      isSelected={isSelected}
    >
      <div className="ai-c">
        <Link
          className="w-500px"
          to={{
            pathname: "/collections/all/products/" + product.pathname,
            previous_path: history.location.pathname
          }}
        >
          <label style={{ fontSize: "1.6rem" }}>{snapshot.isDragging ? props.product.name + " - Moving" : props.product.name}</label>
          {/* <label style={{ fontSize: '1.6rem' }}>{product.name}</label> */}
        </Link>
        {/* <label className="w-100px">
					{product.hidden ? <i className="fas fa-eye-slash" /> : <i className="fas fa-eye" />}
				</label> */}
        <GLButton variant="icon" onClick={() => show_hide_product(product)} aria-label={product.hidden ? "hide" : "show"}>
          {product.hidden ? <i className="fas fa-eye-slash" /> : <i className="fas fa-eye" />}
        </GLButton>
        <label className="w-200px">{product.category}</label>
        <label className="w-100px">{product.order}</label>
        <label className="product-price w-500px">
          {sale_price_switch({
            product,
            wholesaler: current_user?.isWholesaler
          })}
          }
        </label>
        <Link className="w-500px" to={"/secure/glow/editproduct/" + product.pathname + "/" + true}>
          <GLButton variant="primary">Use as Template</GLButton>
        </Link>
        {/* <label className="product-price w-250px">{product.product_options.length} Options</label> */}
        <div>
          <div>
            <div className="jc-b">
              <Link to={"/secure/glow/editproduct/" + product.pathname + "/" + false}>
                <GLButton variant="icon" aria-label="Edit">
                  <i className="fas fa-edit" />
                </GLButton>
              </Link>
              <GLButton variant="icon" onClick={() => deleteHandler(product)} aria-label="Delete">
                <i className="fas fa-trash-alt" />
              </GLButton>
              {admin && (
                <div className="jc-fe column ml-auto ">
                  <GLButton variant="icon" className="h-3rem" onClick={() => show_hide(product._id)}>
                    <i style={{ WebkitTransform: "rotate(-180deg)" }} className="top-8px fas fa-sort-up" />
                  </GLButton>
                </div>
              )}
            </div>
          </div>
          <div />
        </div>
        {shouldShowSelection ? <SelectionCount>{selectionCount}</SelectionCount> : null}
      </div>
      {admin && (
        <div id={product._id} className="expanded-row-content hide-row">
          <div className="jc-b pt-10px mt-10px" style={{ borderTop: "1px solid white" }}>
            {/* <div className="" /> */}
            <ul className="ai-c jc-a w-100per">
              <li className="">
                <LazyImage
                  className="product-image w-100px h-100px br-10px mr-15px"
                  alt={product.name}
                  title="Product Image"
                  effect="blur"
                  src={product.images && product.images[0]} // use normal <img> attributes as
                />
              </li>
              <li>
                <div>ID</div>
                <div>{product._id}</div>
              </li>
              <li>
                <div className="w-200px">Subcategory</div>
                <div className="w-200px">{product.subcategory}</div>
              </li>

              {/* <li>
								<div>Hidden</div>
								<div>
									{product.hidden ? <i className="fas fa-eye-slash" /> : <i className="fas fa-eye" />}
								</div>
							</li> */}
            </ul>
          </div>
          {product.option_products &&
            product.option_products.map(product => (
              <div className="ai-c jc-b w-100per">
                <Link
                  className="w-500px"
                  to={{
                    pathname: "/collections/all/products/" + product.pathname,
                    previous_path: history.location.pathname
                  }}
                >
                  <label style={{ fontSize: "1.6rem" }}>{product.name}</label>
                  {/* <label style={{ fontSize: '1.6rem' }}>{product.name}</label> */}
                </Link>
                <label className="w-100px">{product.hidden ? <i className="fas fa-eye-slash" /> : <i className="fas fa-eye" />}</label>
                <label className="w-200px">{product.category}</label>
                {/* <label className="w-100px">{product.order}</label> */}
                <label className="w-200px">${product.price}</label>
                <div>
                  <div>
                    <div className="jc-b">
                      <Link to={"/secure/glow/editproduct/" + product.pathname + "/" + false}>
                        <GLButton variant="icon" aria-label="Edit">
                          <i className="fas fa-edit" />
                        </GLButton>
                      </Link>
                      <GLButton variant="icon" onClick={() => deleteHandler(product)} aria-label="Delete">
                        <i className="fas fa-trash-alt" />
                      </GLButton>
                      {/* {admin && (
												<div className="jc-fe column ml-auto ">
													<GLButton
														variant="icon"
														className="h-3rem"
														onClick={() => show_hide(product._id)}
													>
														<i
															style={{ WebkitTransform: 'rotate(-180deg)' }}
															className="top-8px fas fa-sort-up"
														/>
													</GLButton>
												</div>
											)} */}
                    </div>
                  </div>
                  <div />
                </div>
                {shouldShowSelection ? <SelectionCount>{selectionCount}</SelectionCount> : null}
              </div>
            ))}
          {product.color_products &&
            product.color_products.map(product => (
              <div className="ai-c jc-b w-100per">
                <Link
                  className="w-500px"
                  to={{
                    pathname: "/collections/all/products/" + product.pathname,
                    previous_path: history.location.pathname
                  }}
                >
                  <label style={{ fontSize: "1.6rem" }}>{product.name}</label>
                  {/* <label style={{ fontSize: '1.6rem' }}>{product.name}</label> */}
                </Link>
                <label className="w-100px">{product.hidden ? <i className="fas fa-eye-slash" /> : <i className="fas fa-eye" />}</label>
                <label className="w-200px">{product.category}</label>
                {/* <label className="w-100px">{product.order}</label> */}
                <label className="w-200px">${product.price}</label>
                <div>
                  <div>
                    <div className="jc-b">
                      <Link to={"/secure/glow/editproduct/" + product.pathname + "/" + false}>
                        <GLButton variant="icon" aria-label="Edit">
                          <i className="fas fa-edit" />
                        </GLButton>
                      </Link>
                      <GLButton variant="icon" onClick={() => deleteHandler(product)} aria-label="Delete">
                        <i className="fas fa-trash-alt" />
                      </GLButton>
                      {/* {admin && (
												<div className="jc-fe column ml-auto ">
													<GLButton
														variant="icon"
														className="h-3rem"
														onClick={() => show_hide(product._id)}
													>
														<i
															style={{ WebkitTransform: 'rotate(-180deg)' }}
															className="top-8px fas fa-sort-up"
														/>
													</GLButton>
												</div>
											)} */}
                    </div>
                  </div>
                  <div />
                </div>
                {shouldShowSelection ? <SelectionCount>{selectionCount}</SelectionCount> : null}
              </div>
            ))}
          {product.secondary_color_products &&
            product.secondary_color_products.map(product => (
              <div className="ai-c jc-b w-100per">
                <Link
                  className="w-500px"
                  to={{
                    pathname: "/collections/all/products/" + product.pathname,
                    previous_path: history.location.pathname
                  }}
                >
                  <label style={{ fontSize: "1.6rem" }}>{product.name}</label>
                  {/* <label style={{ fontSize: '1.6rem' }}>{product.name}</label> */}
                </Link>
                <label className="w-100px">{product.hidden ? <i className="fas fa-eye-slash" /> : <i className="fas fa-eye" />}</label>
                <label className="w-200px">{product.category}</label>
                {/* <label className="w-100px">{product.order}</label> */}
                <label className="w-200px">${product.price}</label>
                <div>
                  <div>
                    <div className="jc-b">
                      <Link to={"/secure/glow/editproduct/" + product.pathname + "/" + false}>
                        <GLButton variant="icon" aria-label="Edit">
                          <i className="fas fa-edit" />
                        </GLButton>
                      </Link>
                      <GLButton variant="icon" onClick={() => deleteHandler(product)} aria-label="Delete">
                        <i className="fas fa-trash-alt" />
                      </GLButton>
                      {/* {admin && (
												<div className="jc-fe column ml-auto ">
													<GLButton
														variant="icon"
														className="h-3rem"
														onClick={() => show_hide(product._id)}
													>
														<i
															style={{ WebkitTransform: 'rotate(-180deg)' }}
															className="top-8px fas fa-sort-up"
														/>
													</GLButton>
												</div>
											)} */}
                    </div>
                  </div>
                  <div />
                </div>
                {shouldShowSelection ? <SelectionCount>{selectionCount}</SelectionCount> : null}
              </div>
            ))}
          {product.secondary_products &&
            product.secondary_products.map(product => (
              <div className="ai-c jc-b w-100per">
                <Link
                  className=""
                  to={{
                    pathname: "/collections/all/products/" + product.pathname,
                    previous_path: history.location.pathname
                  }}
                >
                  <label style={{ fontSize: "1.6rem" }}>{product.name}</label>
                  {/* <label style={{ fontSize: '1.6rem' }}>{product.name}</label> */}
                </Link>
                <label className="">{product.hidden ? <i className="fas fa-eye-slash" /> : <i className="fas fa-eye" />}</label>
                <label className="">{product.category}</label>
                {/* <label className="">{product.order}</label> */}
                <label className="w-200px">${product.price}</label>
                <div>
                  <div>
                    <div className="jc-b">
                      <Link to={"/secure/glow/editproduct/" + product.pathname + "/" + false}>
                        <GLButton variant="icon" aria-label="Edit">
                          <i className="fas fa-edit" />
                        </GLButton>
                      </Link>
                      <GLButton variant="icon" onClick={() => deleteHandler(product)} aria-label="Delete">
                        <i className="fas fa-trash-alt" />
                      </GLButton>
                    </div>
                  </div>
                  <div />
                </div>
                {shouldShowSelection ? <SelectionCount>{selectionCount}</SelectionCount> : null}
              </div>
            ))}
        </div>
      )}
    </Container>
  );
};

export default ProductListItem;
