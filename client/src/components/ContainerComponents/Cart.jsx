import React, { useRef, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/userActions';
import { HashLink } from 'react-router-hash-link';
import { addToCart, removeFromCart } from '../../actions/cartActions';
import { cart_sale_price_switch, determine_product_name } from '../../utils/react_helper_functions';

const Cart = (props) => {
	const history = useHistory();

	function useOutsideAlerter(ref) {
		useEffect(
			() => {
				/** Alert if clicked on outside of element */
				function handleClickOutside(event) {
					if (ref.current && !ref.current.contains(event.target)) {
						// alert('You clicked outside of me!');
						document.querySelector('.cart_sidebar').classList.remove('open');
					}
				}
				// Bind the event listener
				document.addEventListener('mousedown', handleClickOutside);
				return () => {
					// Unbind the event listener on clean up
					document.removeEventListener('mousedown', handleClickOutside);
				};
			},
			[ ref ]
		);
	}
	const wrapperRef = useRef(null);
	useOutsideAlerter(wrapperRef);

	const closeMenu = () => {
		document.querySelector('.cart_sidebar').classList.remove('open');
	};
	const dispatch = useDispatch();

	// const [ first_name, set_first_name ] = useState('');
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const cart = useSelector((state) => state.cart);

	const { cartItems } = cart;
	// console.log({ cartItems });

	const [ no_items_in_cart, set_no_items_in_cart ] = useState('');

	const removeFromCartHandler = (product) => {
		dispatch(removeFromCart(product));
	};

	const checkoutHandler = () => {
		if (cartItems.length === 0) {
			set_no_items_in_cart('Cannot proceed to checkout without any items in cart');
		} else {
			if (userInfo.hasOwnProperty('first_name')) {
				history.push('/account/login?redirect=/secure/checkout/placeorder');
			} else {
				history.push('/checkout/decision');
			}
		}
		closeMenu();
	};

	const decide_warning = () => {
		if (new Date() > new Date('2020-12-17') && new Date() < new Date('2021-01-02')) {
			const confirm = window.confirm(
				'Glow LEDs will be out of office from 12/18/20 - 1/2/21. Orders will not be shipped until after January 2nd 2021'
			);
			if (confirm) {
				checkoutHandler();
			}
		} else {
			checkoutHandler();
		}
	};
	const no_adapters_warning = () => {
		const categories = cartItems.map((cartItem) => {
			return cartItem.category;
		});
		// const names = cartItems.map((cartItem) => {
		// 	return cartItem.name;
		// });
		if (
			!categories.includes('Custom Diffuser Caps Final Payment') ||
			!categories.includes('Custom Diffuser Caps Deposit')
		) {
			if (categories.includes('diffuser_caps')) {
				// console.log('Caps');
				if (!categories.includes('diffuser_adapters')) {
					return "Don't Forget: You'll need a set of Diffuser Adapters to use Diffuser Caps!";
				}
			}
		}
	};
	const navbarStyles = {
		transition: 'top 0.2s'
	};

	const determine_top = () => {
		if (props.width >= 1177) {
			return '179px';
		} else if (props.width < 1140 && props.width > 704) {
			return '130px';
		} else if (props.width < 704 && props.width > 528) {
			return '116px';
		} else if (props.width < 528) {
			return '110px';
		} else {
			return '110px';
		}
	};

	const mobile_check = () => {
		let check = false;
		((a) => {
			if (
				/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
					a
				) ||
				/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
					a.substr(0, 4)
				)
			)
				check = true;
		})(navigator.userAgent || navigator.vendor || window.opera);
		return check;
	};
	useEffect(() => {
		console.log({ isMobile: mobile_check() });
		return () => {};
	}, []);

	return (
		<aside
			ref={wrapperRef}
			className="cart_sidebar"
			style={{
				top: '-10px',
				zIndex: 4,
				borderRadius: '0px 0px 20px 20px',
				height: mobile_check()
					? cartItems.length === 0 ? '300px' : '100%'
					: cartItems.length === 0 ? '300px' : 'unset'
			}}
		>
			<ul
				className={`cart_sidebar-list-container column jc-b ${mobile_check() ? `h-100per` : `h-unset`}`}
				style={{ height: cartItems.length === 0 ? '300px' : 'unset' }}
				// className={`cart_sidebar-list-container column jc-b w-100per mr-1rem ${mobile_check()
				// 	? `h-90vh`
				// 	: `h-100per`}`}
			>
				<div>
					<li className="w-100per pb-5px">
						<div className="p-1rem w-100per">
							<button className="cart_sidebar_close_button" aria-label="close" onClick={closeMenu}>
								<i className="fas fa-times" />
							</button>
							<div className="jc-b">
								<div className="logo_text ai-c">
									<Link to="/">
										<div className="h-50px w-50px">
											<img
												className="zoom logo_s"
												src="/images/optimized_images/logo_images/glow_logo_optimized.png"
												alt="Glow LEDs Logo"
												title="Small Logo"
											/>
										</div>
									</Link>
									<Link to="/">
										<div className="row">
											<label className="ml-5px fs-30px mv-0px ff-h">Shopping Cart</label>
										</div>
									</Link>
								</div>

								<div className="column jc-fe">
									<div className="ta-r ">Price</div>
								</div>
							</div>
						</div>
					</li>
					{cartItems.length === 0 ? (
						<div className="column ai-b">
							<div>Cart is empty</div>
						</div>
					) : (
						<div
							className={`${mobile_check() ? `h-90vh` : `h-unset`} mb-175px`}
							style={{
								overflowY: 'scroll'
							}}
						>
							{/* <div className={mobile_check() ? 'h-40vh max-h-65vh' : ''} > */}
							{/* <h4>{no_adapters_warning()}</h4> */}
							{cartItems.map((item, index) => (
								<li key={index} className="ph-1rem">
									{/* <div className="p-1rem"> */}
									<div className="cart_sidebar-image br-5px ai-c">
										<Link to={'/collections/all/products/' + item.pathname}>
											<img
												src={item.display_image}
												height="50px"
												width="50px"
												alt={item.name}
												title="Product Image"
											/>
										</Link>
									</div>
									<div className="cart_sidebar-name">
										<div className="mb-10px">
											<Link to={'/collections/all/products/' + item.pathname}>
												{determine_product_name(item, true)}
											</Link>
										</div>
										<div>
											<div className="ai-c h-25px">
												<label
													aria-label="sortOrder"
													htmlFor="sortOrder"
													className="select-label mr-1rem"
												>
													Qty: {item.qty}
												</label>
											</div>
										</div>
									</div>

									<div className="">
										<div className="cart_sidebar-price fs-16px">{cart_sale_price_switch(item)}</div>
										<div style={{ textAlign: 'right', width: '100%' }}>
											<button className="btn icon" onClick={() => removeFromCartHandler(item)}>
												<i className="fas fa-trash-alt" />
											</button>
										</div>
										{/* </div> */}
									</div>
								</li>
							))}
							{mobile_check() && <li className="h-175px" />}
						</div>
					)}

					{/* {no_items_in_cart && <h4 style={{ textAlign: 'center' }}>{no_items_in_cart}</h4>} */}
				</div>
			</ul>
			<div
				className="column w-100per pos-fix add_to_cart ph-1rem br-20px"
				style={{ bottom: cartItems.length === 0 ? '-10px' : '0px' }}
			>
				<h3 className="subtotal_h3">
					Subtotal ( {cartItems.reduce((a, c) => parseInt(a) + parseInt(c.qty), 0)} items ) : ${' '}
					{cartItems.reduce((a, c) => a + c.sale_price * c.qty, 0) === 0 ? (
						cartItems.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2)
					) : (
						cartItems.reduce((a, c) => a + c.sale_price * c.qty, 0).toFixed(2)
					)}
				</h3>
				<Link to="/checkout/cart" className="w-100per">
					<button className="btn secondary w-100per mb-2rem" onClick={closeMenu}>
						View Cart
					</button>
				</Link>

				<button onClick={decide_warning} className="btn primary w-100per mb-1rem ">
					Proceed to Checkout
				</button>
			</div>
		</aside>
	);
};

export default Cart;
