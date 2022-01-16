// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

import App from './App';
import {
	account_created,
	affiliate,
	announcement,
	contact,
	contact_confirmation,
	feature,
	order,
	password_reset,
	reset_password,
	review,
	email_subscription,
	order_status
} from './pages';
import express from 'express';
import { Header, Footer } from './components';
import { content_db, email_db, order_db, user_db } from '../db';
const router = express.Router();

// App({header: Header({title: 'Glow LEDs Reset Password'}), footer: Footer()})

router.get('/email_subscription', async (req: { body: any }, res: { send: (arg0: string) => void }) => {
	const contents = await content_db.findAll_contents_db({ deleted: false }, { _id: -1 }, 0);
	const body = {
		email: 'info.glowleds@gmail.com',
		promo_code: 'xoteag',
		categories: contents && contents[0].home_page.slideshow
	};

	res.send(App({ body: email_subscription(body), title: 'Enjoy 10% off your next purchase!' }));
});
router.get('/order', async (req: { body: any }, res: { send: (arg0: string) => void }) => {
	// const order = await order_db.findById_orders_db('61e423d48fff204d7a14f174');
	const body = {
		email: {
			show_image: true,
			active: true,
			deleted: false,
			email_type: 'Order',
			h1: 'Thank you for your purchase!',
			image: '',
			h2: 'we are starting production on your order. We will notify your as your order progresses.',
			createdAt: '2020-11-19T16:24:12.273Z',
			updatedAt: '2021-07-06T18:52:09.037Z',
			images: [],
			p: ''
		},
		order: {
			_id: '61b2e51ca58ea5002bbb6de1',
			payment: {
				paymentMethod: 'stripe',
				charge: {
					id: 'pi_3K51dBHHW1jy2HDN0NIxElzd',
					object: 'payment_intent',
					amount: 5850,
					amount_capturable: 0,
					amount_received: 5850,
					application: null,
					application_fee_amount: null,
					automatic_payment_methods: null,
					canceled_at: null,
					cancellation_reason: null,
					capture_method: 'automatic',
					charges: {
						object: 'list',
						data: [
							{
								id: 'ch_3K51dBHHW1jy2HDN0zGwM35V',
								object: 'charge',
								amount: 5850,
								amount_captured: 5850,
								amount_refunded: 0,
								application: null,
								application_fee: null,
								application_fee_amount: null,
								balance_transaction: 'txn_3K51dBHHW1jy2HDN02OfkkJN',
								billing_details: {
									address: {
										city: null,
										country: null,
										line1: null,
										line2: null,
										postal_code: '94002',
										state: null
									},
									email: null,
									name: null,
									phone: null
								},
								calculated_statement_descriptor: 'GLOW-LEDS',
								captured: true,
								created: 1639114013,
								currency: 'usd',
								customer: null,
								description: null,
								destination: null,
								dispute: null,
								disputed: false,
								failure_code: null,
								failure_message: null,
								invoice: null,
								livemode: true,
								on_behalf_of: null,
								order: null,
								outcome: {
									network_status: 'approved_by_network',
									reason: null,
									risk_level: 'normal',
									seller_message: 'Payment complete.',
									type: 'authorized'
								},
								paid: true,
								payment_intent: 'pi_3K51dBHHW1jy2HDN0NIxElzd',
								payment_method: 'pm_1K51d9HHW1jy2HDNAioTrUSE',
								payment_method_details: {
									card: {
										brand: 'visa',
										checks: {
											address_line1_check: null,
											address_postal_code_check: 'pass',
											cvc_check: 'pass'
										},
										country: 'US',
										exp_month: 1,
										exp_year: 2024,
										fingerprint: 'pIBF9FhjiGh0i1qN',
										funding: 'credit',
										installments: null,
										last4: '7823',
										network: 'visa',
										three_d_secure: null,
										wallet: null
									},
									type: 'card'
								},
								receipt_email: null,
								receipt_number: null,
								receipt_url:
									'https://pay.stripe.com/receipts/acct_1I5NG5HHW1jy2HDN/ch_3K51dBHHW1jy2HDN0zGwM35V/rcpt_KkWgJdvPmR8ktAuNJdk3xV1HQuSTBe6',
								refunded: false,
								refunds: {
									object: 'list',
									data: [],
									has_more: false,
									total_count: 0,
									url: '/v1/charges/ch_3K51dBHHW1jy2HDN0zGwM35V/refunds'
								},
								review: null,
								shipping: null,
								source: null,
								source_transfer: null,
								statement_descriptor: null,
								statement_descriptor_suffix: null,
								status: 'succeeded',
								transfer_data: null,
								transfer_group: null
							}
						],
						has_more: false,
						total_count: 1,
						url: '/v1/charges?payment_intent=pi_3K51dBHHW1jy2HDN0NIxElzd'
					},
					client_secret: 'pi_3K51dBHHW1jy2HDN0NIxElzd_secret_5pObVIZ80Sk2JeLYbM67P1rsj',
					confirmation_method: 'automatic',
					created: 1639114013,
					currency: 'usd',
					customer: null,
					description: null,
					invoice: null,
					last_payment_error: null,
					livemode: true,
					next_action: null,
					on_behalf_of: null,
					payment_method: 'pm_1K51d9HHW1jy2HDNAioTrUSE',
					payment_method_options: {
						card: {
							installments: null,
							network: null,
							request_three_d_secure: 'automatic'
						}
					},
					payment_method_types: [ 'card' ],
					receipt_email: null,
					review: null,
					setup_future_usage: null,
					shipping: null,
					source: null,
					statement_descriptor: null,
					statement_descriptor_suffix: null,
					status: 'succeeded',
					transfer_data: null,
					transfer_group: null
				},
				refund: [
					{
						id: 're_3K51dBHHW1jy2HDN0pffHwOJ',
						object: 'refund',
						amount: 5850,
						balance_transaction: 'txn_3K51dBHHW1jy2HDN01VIXJXi',
						charge: 'ch_3K51dBHHW1jy2HDN0zGwM35V',
						created: 1639159834,
						currency: 'usd',
						payment_intent: 'pi_3K51dBHHW1jy2HDN0NIxElzd',
						reason: null,
						receipt_number: null,
						source_transfer_reversal: null,
						status: 'succeeded',
						transfer_reversal: null
					}
				],
				refund_reason: [ 'Duplicate Order' ]
			},
			guest: false,
			isPaid: true,
			isReassured: false,
			isManufactured: false,
			isPackaged: false,
			isShipped: false,
			isDelivered: false,
			isRefunded: true,
			deleted: true,
			orderItems: [
				{
					reviewed: false,
					_id: '61b2e51ca58ea5002bbb6de2',
					product: '617882d6bf66b4002ba730b9',
					color_product: '610b287e45c76d002a6e5a5f',
					color_group_name: 'Skin Color',
					secondary_color_group_name: 'Sled Color',
					secondary_color_product: '610b33fe45c76d002a6e5da8',
					option_group_name: 'Set of',
					option_product: '60efd85ee0d9c44c752a5762',
					option_product_name: 'Alt Novaskins - 2',
					secondary_product: null,
					secondary_product_name: '',
					secondary_group_name: 'Style',
					name: 'Alt Novaskins w Nano Sleds',
					size: '2',
					color: 'Clear',
					color_code: '#4b4b4b',
					secondary_color: 'Clear',
					secondary_color_code: '#4b4b4b',
					display_image: 'https://thumbs2.imgbox.com/01/81/xlAMpqaO_t.jpeg',
					secondary_image: '',
					price: 12.99,
					sale_price: 10.392,
					count_in_stock: 29,
					weight_pounds: 0,
					weight_ounces: 0.4,
					package_length: 4,
					package_width: 3,
					package_height: 0.75,
					package_volume: 9,
					pathname: 'alt_novaskins_w_nano_sleds',
					subcategory: 'alt_novaskins',
					category: 'glowskins',
					qty: 2,
					createdAt: '2021-12-10T18:10:35.464Z',
					updatedAt: '2021-12-10T18:10:35.464Z'
				},
				{
					reviewed: false,
					_id: '61b2e51ca58ea5002bbb6de3',
					product: '61a93b4c914391295a264f8d',
					color_product: '60ee99183a3c5e002ac7989b',
					secondary_color_product: null,
					option_group_name: 'Size',
					option_product: '61a99f1f8c53cb002b372c59',
					option_product_name: 'Supreme Gloves - XL',
					secondary_product: null,
					secondary_product_name: '',
					secondary_group_name: '',
					name: 'Supremes',
					size: 'XL',
					color: 'White',
					color_code: 'black',
					secondary_color_code: '',
					display_image: 'https://thumbs2.imgbox.com/9c/5d/vjBlyZT8_t.jpeg',
					secondary_image: '',
					price: 3.95,
					preorder: false,
					sale_price: 0,
					count_in_stock: 200,
					weight_pounds: 0,
					weight_ounces: 3.3,
					package_length: 7,
					package_width: 6,
					package_height: 0.75,
					package_volume: 31.5,
					pathname: 'supremes',
					subcategory: 'singles',
					category: 'whites',
					qty: 1,
					createdAt: '2021-12-10T18:10:35.464Z',
					updatedAt: '2021-12-10T18:10:35.464Z'
				},
				{
					reviewed: false,
					_id: '61b2e51ca58ea5002bbb6de4',
					product: '61a93b4c914391295a264f8d',
					color_product: '60ee99183a3c5e002ac7989b',
					secondary_color_product: null,
					option_group_name: 'Size',
					option_product: '61a99ec48c53cb002b3729b4',
					option_product_name: 'Supreme Gloves - L',
					secondary_product: null,
					secondary_product_name: '',
					secondary_group_name: '',
					name: 'Supremes',
					size: 'L',
					color: 'White',
					color_code: 'black',
					secondary_color_code: '',
					display_image: 'https://thumbs2.imgbox.com/9c/5d/vjBlyZT8_t.jpeg',
					secondary_image: '',
					price: 3.95,
					preorder: false,
					sale_price: 0,
					count_in_stock: 200,
					weight_pounds: 0,
					weight_ounces: 3.3,
					package_length: 7,
					package_width: 6,
					package_height: 0.75,
					package_volume: 31.5,
					pathname: 'supremes',
					subcategory: 'singles',
					category: 'whites',
					qty: 1,
					createdAt: '2021-12-10T18:10:35.464Z',
					updatedAt: '2021-12-10T18:10:35.464Z'
				},
				{
					reviewed: false,
					_id: '61b2e51ca58ea5002bbb6de5',
					product: '60e158d4e615fa002a6c2de4',
					color_product: '60ee99183a3c5e002ac7989b',
					secondary_color_product: null,
					option_group_name: 'Set of',
					option_product: '60eff41c983ca35495453b3d',
					option_product_name: 'Bulk CR1225 Batteries - 80',
					secondary_product: null,
					secondary_product_name: '',
					name: 'Bulk CR1225 Batteries',
					size: '80',
					color_code: 'black',
					secondary_color_code: '',
					display_image: 'https://thumbs2.imgbox.com/b2/c2/E9E1r1KW_t.jpeg',
					secondary_image: '',
					price: 9.99,
					preorder: false,
					sale_price: 0,
					count_in_stock: 29,
					weight_pounds: 0,
					weight_ounces: 3,
					package_length: 6,
					package_width: 5,
					package_height: 0.24,
					package_volume: 7.2,
					pathname: '1225_batteries',
					subcategory: 'batteries',
					category: 'accessories',
					qty: 1,
					createdAt: '2021-12-10T18:10:35.464Z',
					updatedAt: '2021-12-10T18:10:35.464Z'
				}
			],
			user: '61b043ba7abb88002bde770e',
			shipping: {
				first_name: 'Alexander',
				last_name: 'Holland',
				email: 'misterkrocks@gmail.com',
				address_1: '2128 Lyon Ave',
				address_2: '',
				city: 'Belmont',
				state: 'CA',
				postalCode: '94002',
				country: 'US',
				international: false,
				shipment_id: 'shp_4f7dd086cfe248b284e0cdca115a4297',
				shipping_rate: {
					id: 'rate_1faa456b75cb4d0b94914c2ca6c37f5c',
					object: 'Rate',
					created_at: '2021-12-10T05:23:41Z',
					updated_at: '2021-12-10T05:23:41Z',
					mode: 'production',
					service: 'First',
					carrier: 'USPS',
					rate: '4.83',
					currency: 'USD',
					retail_rate: '6.15',
					retail_currency: 'USD',
					list_rate: '4.83',
					list_currency: 'USD',
					delivery_days: 3,
					delivery_date: null,
					delivery_date_guaranteed: false,
					est_delivery_days: 3,
					shipment_id: 'shp_4f7dd086cfe248b284e0cdca115a4297',
					carrier_account_id: 'ca_945306ac434f4c5baa70e5d9eb9db72c'
				}
			},
			itemsPrice: 39.483,
			taxPrice: 2.8625175,
			shippingPrice: 6.15,
			totalPrice: 58.4955175,
			order_note:
				'PLEASE MAKE MY SLEDS THE DUAL CHIP ONES WE DISCUSSED FOR THE EMAZING EVOS. :)     HIT ME UP WITH FURSTHER QUESTIONS, COMMENTS, CONCERNS. THANK YOU MUCH!',
			promo_code: 'SNAPS',
			parcel: '60c25b1575b455002a999820',
			paidAt: '2021-12-10T05:26:55.084Z',
			createdAt: '2021-12-10T05:26:52.608Z',
			updatedAt: '2021-12-10T18:11:04.643Z',
			__v: 0,
			refundedAt: '2021-12-10T18:10:35.453Z'
		}
	};
	res.send(App({ body: order(body), title: 'Thank you for your purchase!' }));
});
router.get('/order_status', async (req: { body: any }, res: { send: (arg0: string) => void }) => {
	const body = {
		email: {
			show_image: true,
			active: true,
			deleted: false,
			email_type: 'Order',
			h1: 'Thank you for your purchase!',
			image: '',
			h2: 'we are starting production on your order. We will notify your as your order progresses.',
			createdAt: '2020-11-19T16:24:12.273Z',
			updatedAt: '2021-07-06T18:52:09.037Z',
			images: [],
			p: ''
		},
		status: 'shipped',
		message_to_user: '',
		order: {
			_id: '61b2e51ca58ea5002bbb6de1',
			payment: {
				paymentMethod: 'stripe',
				charge: {
					id: 'pi_3K51dBHHW1jy2HDN0NIxElzd',
					object: 'payment_intent',
					amount: 5850,
					amount_capturable: 0,
					amount_received: 5850,
					application: null,
					application_fee_amount: null,
					automatic_payment_methods: null,
					canceled_at: null,
					cancellation_reason: null,
					capture_method: 'automatic',
					charges: {
						object: 'list',
						data: [
							{
								id: 'ch_3K51dBHHW1jy2HDN0zGwM35V',
								object: 'charge',
								amount: 5850,
								amount_captured: 5850,
								amount_refunded: 0,
								application: null,
								application_fee: null,
								application_fee_amount: null,
								balance_transaction: 'txn_3K51dBHHW1jy2HDN02OfkkJN',
								billing_details: {
									address: {
										city: null,
										country: null,
										line1: null,
										line2: null,
										postal_code: '94002',
										state: null
									},
									email: null,
									name: null,
									phone: null
								},
								calculated_statement_descriptor: 'GLOW-LEDS',
								captured: true,
								created: 1639114013,
								currency: 'usd',
								customer: null,
								description: null,
								destination: null,
								dispute: null,
								disputed: false,
								failure_code: null,
								failure_message: null,
								invoice: null,
								livemode: true,
								on_behalf_of: null,
								order: null,
								outcome: {
									network_status: 'approved_by_network',
									reason: null,
									risk_level: 'normal',
									seller_message: 'Payment complete.',
									type: 'authorized'
								},
								paid: true,
								payment_intent: 'pi_3K51dBHHW1jy2HDN0NIxElzd',
								payment_method: 'pm_1K51d9HHW1jy2HDNAioTrUSE',
								payment_method_details: {
									card: {
										brand: 'visa',
										checks: {
											address_line1_check: null,
											address_postal_code_check: 'pass',
											cvc_check: 'pass'
										},
										country: 'US',
										exp_month: 1,
										exp_year: 2024,
										fingerprint: 'pIBF9FhjiGh0i1qN',
										funding: 'credit',
										installments: null,
										last4: '7823',
										network: 'visa',
										three_d_secure: null,
										wallet: null
									},
									type: 'card'
								},
								receipt_email: null,
								receipt_number: null,
								receipt_url:
									'https://pay.stripe.com/receipts/acct_1I5NG5HHW1jy2HDN/ch_3K51dBHHW1jy2HDN0zGwM35V/rcpt_KkWgJdvPmR8ktAuNJdk3xV1HQuSTBe6',
								refunded: false,
								refunds: {
									object: 'list',
									data: [],
									has_more: false,
									total_count: 0,
									url: '/v1/charges/ch_3K51dBHHW1jy2HDN0zGwM35V/refunds'
								},
								review: null,
								shipping: null,
								source: null,
								source_transfer: null,
								statement_descriptor: null,
								statement_descriptor_suffix: null,
								status: 'succeeded',
								transfer_data: null,
								transfer_group: null
							}
						],
						has_more: false,
						total_count: 1,
						url: '/v1/charges?payment_intent=pi_3K51dBHHW1jy2HDN0NIxElzd'
					},
					client_secret: 'pi_3K51dBHHW1jy2HDN0NIxElzd_secret_5pObVIZ80Sk2JeLYbM67P1rsj',
					confirmation_method: 'automatic',
					created: 1639114013,
					currency: 'usd',
					customer: null,
					description: null,
					invoice: null,
					last_payment_error: null,
					livemode: true,
					next_action: null,
					on_behalf_of: null,
					payment_method: 'pm_1K51d9HHW1jy2HDNAioTrUSE',
					payment_method_options: {
						card: {
							installments: null,
							network: null,
							request_three_d_secure: 'automatic'
						}
					},
					payment_method_types: [ 'card' ],
					receipt_email: null,
					review: null,
					setup_future_usage: null,
					shipping: null,
					source: null,
					statement_descriptor: null,
					statement_descriptor_suffix: null,
					status: 'succeeded',
					transfer_data: null,
					transfer_group: null
				},
				refund: [
					{
						id: 're_3K51dBHHW1jy2HDN0pffHwOJ',
						object: 'refund',
						amount: 5850,
						balance_transaction: 'txn_3K51dBHHW1jy2HDN01VIXJXi',
						charge: 'ch_3K51dBHHW1jy2HDN0zGwM35V',
						created: 1639159834,
						currency: 'usd',
						payment_intent: 'pi_3K51dBHHW1jy2HDN0NIxElzd',
						reason: null,
						receipt_number: null,
						source_transfer_reversal: null,
						status: 'succeeded',
						transfer_reversal: null
					}
				],
				refund_reason: [ 'Duplicate Order' ]
			},
			guest: false,
			isPaid: true,
			isReassured: false,
			isManufactured: false,
			isPackaged: false,
			isShipped: false,
			isDelivered: false,
			isRefunded: true,
			deleted: true,
			orderItems: [
				{
					reviewed: false,
					_id: '61b2e51ca58ea5002bbb6de2',
					product: '617882d6bf66b4002ba730b9',
					color_product: '610b287e45c76d002a6e5a5f',
					color_group_name: 'Skin Color',
					secondary_color_group_name: 'Sled Color',
					secondary_color_product: '610b33fe45c76d002a6e5da8',
					option_group_name: 'Set of',
					option_product: '60efd85ee0d9c44c752a5762',
					option_product_name: 'Alt Novaskins - 2',
					secondary_product: null,
					secondary_product_name: '',
					secondary_group_name: 'Style',
					name: 'Alt Novaskins w Nano Sleds',
					size: '2',
					color: 'Clear',
					color_code: '#4b4b4b',
					secondary_color: 'Clear',
					secondary_color_code: '#4b4b4b',
					display_image: 'https://thumbs2.imgbox.com/01/81/xlAMpqaO_t.jpeg',
					secondary_image: '',
					price: 12.99,
					sale_price: 10.392,
					count_in_stock: 29,
					weight_pounds: 0,
					weight_ounces: 0.4,
					package_length: 4,
					package_width: 3,
					package_height: 0.75,
					package_volume: 9,
					pathname: 'alt_novaskins_w_nano_sleds',
					subcategory: 'alt_novaskins',
					category: 'glowskins',
					qty: 2,
					createdAt: '2021-12-10T18:10:35.464Z',
					updatedAt: '2021-12-10T18:10:35.464Z'
				},
				{
					reviewed: false,
					_id: '61b2e51ca58ea5002bbb6de3',
					product: '61a93b4c914391295a264f8d',
					color_product: '60ee99183a3c5e002ac7989b',
					secondary_color_product: null,
					option_group_name: 'Size',
					option_product: '61a99f1f8c53cb002b372c59',
					option_product_name: 'Supreme Gloves - XL',
					secondary_product: null,
					secondary_product_name: '',
					secondary_group_name: '',
					name: 'Supremes',
					size: 'XL',
					color: 'White',
					color_code: 'black',
					secondary_color_code: '',
					display_image: 'https://thumbs2.imgbox.com/9c/5d/vjBlyZT8_t.jpeg',
					secondary_image: '',
					price: 3.95,
					preorder: false,
					sale_price: 0,
					count_in_stock: 200,
					weight_pounds: 0,
					weight_ounces: 3.3,
					package_length: 7,
					package_width: 6,
					package_height: 0.75,
					package_volume: 31.5,
					pathname: 'supremes',
					subcategory: 'singles',
					category: 'whites',
					qty: 1,
					createdAt: '2021-12-10T18:10:35.464Z',
					updatedAt: '2021-12-10T18:10:35.464Z'
				},
				{
					reviewed: false,
					_id: '61b2e51ca58ea5002bbb6de4',
					product: '61a93b4c914391295a264f8d',
					color_product: '60ee99183a3c5e002ac7989b',
					secondary_color_product: null,
					option_group_name: 'Size',
					option_product: '61a99ec48c53cb002b3729b4',
					option_product_name: 'Supreme Gloves - L',
					secondary_product: null,
					secondary_product_name: '',
					secondary_group_name: '',
					name: 'Supremes',
					size: 'L',
					color: 'White',
					color_code: 'black',
					secondary_color_code: '',
					display_image: 'https://thumbs2.imgbox.com/9c/5d/vjBlyZT8_t.jpeg',
					secondary_image: '',
					price: 3.95,
					preorder: false,
					sale_price: 0,
					count_in_stock: 200,
					weight_pounds: 0,
					weight_ounces: 3.3,
					package_length: 7,
					package_width: 6,
					package_height: 0.75,
					package_volume: 31.5,
					pathname: 'supremes',
					subcategory: 'singles',
					category: 'whites',
					qty: 1,
					createdAt: '2021-12-10T18:10:35.464Z',
					updatedAt: '2021-12-10T18:10:35.464Z'
				},
				{
					reviewed: false,
					_id: '61b2e51ca58ea5002bbb6de5',
					product: '60e158d4e615fa002a6c2de4',
					color_product: '60ee99183a3c5e002ac7989b',
					secondary_color_product: null,
					option_group_name: 'Set of',
					option_product: '60eff41c983ca35495453b3d',
					option_product_name: 'Bulk CR1225 Batteries - 80',
					secondary_product: null,
					secondary_product_name: '',
					name: 'Bulk CR1225 Batteries',
					size: '80',
					color_code: 'black',
					secondary_color_code: '',
					display_image: 'https://thumbs2.imgbox.com/b2/c2/E9E1r1KW_t.jpeg',
					secondary_image: '',
					price: 9.99,
					preorder: false,
					sale_price: 0,
					count_in_stock: 29,
					weight_pounds: 0,
					weight_ounces: 3,
					package_length: 6,
					package_width: 5,
					package_height: 0.24,
					package_volume: 7.2,
					pathname: '1225_batteries',
					subcategory: 'batteries',
					category: 'accessories',
					qty: 1,
					createdAt: '2021-12-10T18:10:35.464Z',
					updatedAt: '2021-12-10T18:10:35.464Z'
				}
			],
			user: '61b043ba7abb88002bde770e',
			shipping: {
				first_name: 'Alexander',
				last_name: 'Holland',
				email: 'misterkrocks@gmail.com',
				address_1: '2128 Lyon Ave',
				address_2: '',
				city: 'Belmont',
				state: 'CA',
				postalCode: '94002',
				country: 'US',
				international: false,
				shipment_id: 'shp_4f7dd086cfe248b284e0cdca115a4297',
				shipping_rate: {
					id: 'rate_1faa456b75cb4d0b94914c2ca6c37f5c',
					object: 'Rate',
					created_at: '2021-12-10T05:23:41Z',
					updated_at: '2021-12-10T05:23:41Z',
					mode: 'production',
					service: 'First',
					carrier: 'USPS',
					rate: '4.83',
					currency: 'USD',
					retail_rate: '6.15',
					retail_currency: 'USD',
					list_rate: '4.83',
					list_currency: 'USD',
					delivery_days: 3,
					delivery_date: null,
					delivery_date_guaranteed: false,
					est_delivery_days: 3,
					shipment_id: 'shp_4f7dd086cfe248b284e0cdca115a4297',
					carrier_account_id: 'ca_945306ac434f4c5baa70e5d9eb9db72c'
				}
			},
			itemsPrice: 39.483,
			taxPrice: 2.8625175,
			shippingPrice: 6.15,
			totalPrice: 58.4955175,
			order_note:
				'PLEASE MAKE MY SLEDS THE DUAL CHIP ONES WE DISCUSSED FOR THE EMAZING EVOS. :)     HIT ME UP WITH FURSTHER QUESTIONS, COMMENTS, CONCERNS. THANK YOU MUCH!',
			promo_code: 'SNAPS',
			parcel: '60c25b1575b455002a999820',
			paidAt: '2021-12-10T05:26:55.084Z',
			createdAt: '2021-12-10T05:26:52.608Z',
			updatedAt: '2021-12-10T18:11:04.643Z',
			__v: 0,
			refundedAt: '2021-12-10T18:10:35.453Z'
		}
	};
	res.send(App({ body: order_status(body), title: 'Thank you for your purchase!' }));
});
router.get('/review', async (req: { body: any }, res: { send: (arg0: string) => void }) => {
	const contents = await content_db.findAll_contents_db({ deleted: false }, { _id: -1 }, 0);
	const body = {
		email: 'info.glowleds@gmail.com',
		promo_code: 'xoteag',
		categories: contents && contents[0].home_page.slideshow
	};

	res.send(App({ body: review(body), title: 'Enjoy 10% off your next purchase!' }));
});
router.get('/affiliate', async (req: { body: any }, res: { send: (arg0: string) => void }) => {
	const body = {
		affiliate: {
			_id: '5f6a57dbf04766002a52230e',
			active: true,
			deleted: false,
			artist_name: 'Cosmo',
			instagram_handle: 'cosmoglover',
			facebook_name: 'cosmoglover',
			percentage_off: 30,
			promo_code: 'cosmo',
			createdAt: '2020-09-22T20:00:27.101Z',
			updatedAt: '2022-01-10T20:58:07.152Z',
			__v: 0,
			promoter: false,
			sponsor: true,
			user: '5f6a7891f8bfc0002ab4904b',
			picture: 'https://thumbs2.imgbox.com/f7/ca/Su3FEQr9_t.jpg',
			bio: "I'm here for the flow.  Gaming, Magic the Gathering, Poi",
			inspiration: 'Stunna, Flowsonn, Megasloth, Puppet',
			location: 'Austin, TX',
			years: '9',
			team: true,
			video: 'k5GRzQ8683w',
			products: [
				'5f610da07279cf002a073d89',
				'5eb1eb29094a5e002a417d0a',
				'5f90e245454528002af7df4a',
				'5f90e21b454528002af7df42',
				'605008e3d2946c002a82c293',
				'5ff882654cb3b7002a667747',
				'5f90e202454528002af7df30',
				'600722965510ff002aceaeb0'
			],
			chips: [],
			pathname: 'cosmo',
			private_code: {
				_id: '5f6a5a82f04766002a522310',
				excluded_categories: [],
				excluded_products: [],
				active: true,
				deleted: false,
				promo_code: 'xcpwtv',
				for_customer: false,
				percentage_off: 50,
				createdAt: '2020-09-22T20:11:46.431Z',
				updatedAt: '2021-07-02T00:41:15.084Z',
				__v: 0,
				user: '5f6a7891f8bfc0002ab4904b',
				minimum_total: null,
				admin_only: false,
				affiliate_only: true,
				used_once: false,
				free_shipping: true
			},
			public_code: {
				_id: '5f6a57ebf04766002a52230f',
				excluded_categories: [],
				excluded_products: [],
				active: true,
				deleted: false,
				promo_code: 'cosmo',
				for_customer: true,
				percentage_off: 10,
				createdAt: '2020-09-22T20:00:43.566Z',
				updatedAt: '2021-12-09T03:40:49.329Z',
				__v: 0,
				minimum_total: 0,
				admin_only: false,
				affiliate_only: false,
				used_once: true,
				end_date: '2021-01-01T00:00:00.000Z',
				start_date: '2021-01-01T00:00:00.000Z',
				included_categories: [],
				included_products: [],
				sponsor_only: false
			},
			venmo: '@joseph-conner-12'
		}
	};
	console.log({ body });
	res.send(App({ body: affiliate(body), title: 'Welcome to the Team!' }));
});
router.get('/feature', async (req: { body: any }, res: { send: (arg0: string) => void }) => {
	const contents = await content_db.findAll_contents_db({ deleted: false }, { _id: -1 }, 0);
	const body = {
		email: 'info.glowleds@gmail.com',
		promo_code: 'xoteag',
		categories: contents && contents[0].home_page.slideshow
	};

	res.send(App({ body: feature(body), title: 'Enjoy 10% off your next purchase!' }));
});
router.get('/announcement', async (req: { body: any }, res: { send: (arg0: string) => void }) => {
	const emails = await email_db.findAll_emails_db({ deleted: false, active: true }, { _id: -1 });
	// console.log({ emails });
	// const body = {
	// 	content: emails[0]
	// };

	res.send(App({ body: announcement(emails[0]), title: emails[0].h1 }));
});

router.get(
	'/contact',
	(
		req: {
			body: {
				message: string;
				first_name: string;
				last_name: string;
				email: string;
				order_number: string;
				reason_for_contact: string;
				inspirational_pictures: string[];
				artist_name: string;
				instagram_handle: string;
				facebook_name: string;
				song_id: string;
				quote: string;
			};
		},
		res: { send: (arg0: string) => void }
	) => {
		res.send(contact(req.body));
	}
);

router.get(
	'/contact_confirmation',
	(
		req: {
			body: {
				message: string;
				first_name: string;
				last_name: string;
				email: string;
				order_number: string;
				reason_for_contact: string;
				inspirational_pictures: string[];
				artist_name: string;
				instagram_handle: string;
				facebook_name: string;
				song_id: string;
				quote: string;
			};
		},
		res: { send: (arg0: string) => void }
	) => {
		res.send(contact_confirmation(req.body));
	}
);

router.get('/reset_password', async (req: { body: any }, res: { send: (arg0: string) => void }) => {
	const user = await user_db.findByEmail_users_db('lavacquek@icloud.com');
	res.send(App({ body: reset_password(user), title: 'Password Reset Instructions ' }));
});
router.get('/password_reset', async (req: { body: any }, res: { send: (arg0: string) => void }) => {
	const user = await user_db.findById_users_db('5f2d7c0e9005a57059801ce8');
	res.send(App({ body: password_reset(user), title: 'Password Reset Successful' }));
});

router.get('/account_created', async (req: { body: any }, res: { send: (arg0: string) => void }) => {
	const user = await user_db.findById_users_db('5f2d7c0e9005a57059801ce8');
	const contents = await content_db.findAll_contents_db({ deleted: false }, { _id: -1 }, 0);
	const body = {
		user,
		categories: contents && contents[0].home_page.slideshow
	};

	res.send(App({ body: account_created(body), title: 'Glow LEDs Account Created' }));
});

export default router;
