import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../../actions/productActions';

const DropdownDisplay = ({ item_list, list_items, set_items, list_name, placement, display_key }) => {

	const dispatch = useDispatch();
	const remove_list_item = (item_index, e) => {
		e.preventDefault();
		set_items((items) =>
			items.filter((item, index) => {
				return item_index !== index;
			})
		);
	};

	const remove_list_item_and_delete = (item_index, e, product_id) => {
		e.preventDefault();
		set_items((items) =>
			items.filter((item, index) => {
				return item_index !== index;
			})
		);
		dispatch(deleteProduct(product_id));
	};

	const add_item = (e) => {
		e.preventDefault();
		const item_object = JSON.parse(e.target.value);
		if (list_items) {
			console.log('items.length > 0');
			if (placement === 'top') {
				set_items((items) => [ item_object, ...items ]);
			} else {
				set_items((items) => [ ...items, item_object ]);
			}
		} else {
			console.log('items.length === 0');
			set_items([ item_object ]);
		}
	};

	return (
		<div className="jc-b">
			<li>
				<label htmlFor={list_name.toLowerCase()}>{list_name}</label>
				<div className="ai-c h-25px mv-15px jc-c">
					<div className="custom-select">
						<select className="qty_select_dropdown" onChange={(e) => add_item(e)}>
							<option key={1} defaultValue="">
								---Choose {list_name}---
							</option>
							{item_list.map((item, index) => (
								<option key={index} value={JSON.stringify(item)}>
									{display_key === 'first_name' ? (
										`${item[display_key]} ${item.last_name}`
									) : (
										item[display_key]
									)}
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
									// console.log({ item });
									return (
										<div className="promo_code mv-1rem row jc-b max-w-55rem w-100per" key={index}>
											<div className="ai-c w-100per jc-b">
												<div>
												<button
													className="btn icon"
													onClick={(e) => remove_list_item(index, e)}
													aria-label="Delete"
												>
													<i className="fas fa-times mr-5px" />
												</button>
												<Link to={'/secure/glow/editproduct/' + item.pathname + '/false'}>
													{display_key === 'first_name' ? (
														`${item[display_key]} ${item.last_name}`
													) : (
														item[display_key]
													)}
												</Link>
												</div>
												<button
													className="btn secondary icon ml-1rem"
													onClick={(e) => remove_list_item_and_delete(index, e, item._id)}
													aria-label="Delete"
												>
													Delete
												</button>
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
