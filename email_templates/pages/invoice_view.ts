export default (
	props: any
	// title: string;
	// _id: string;
	// shipping: {
	// 	first_name: string;
	// 	last_name: string;
	// 	email: string;
	// 	address: string;
	// 	city: string;
	// 	state: string;
	// 	postalCode: number;
	// 	country: string;
	// 	international: boolean;
	// };
	// isShipped: boolean;
	// shippedAt: Date;
	// isPaid: boolean;
	// paidAt: Date;
	// orderItems: object[];
	// itemsPrice: number;
	// shippingPrice: number;
	// taxPrice: number;
	// totalPrice: number;
	// order_note: string;
	// promo_code: string;
	// paid: string;
	// shipped: string;
) => {
	console.log({ props });
	const format_date = (unformatted_date: any) => {
		const month = unformatted_date.slice(5, 7);
		const day = unformatted_date.slice(8, 10);
		const year = unformatted_date.slice(0, 4);
		const formatted_date = `${month}/${day}/20`;
		return formatted_date;
	};
	// 	return `

	//   <!doctype html>
	// <html>

	// <head>
	//   <meta charset="utf-8">
	//   <title>A simple, clean, and responsive HTML invoice template</title>

	// </head>

	// <body>
	//   <div class="invoice-box"
	//     style="max-width: 800px; margin: auto; padding: 30px; font-size: 16px; line-height: 24px; font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; color: #555;">
	//     <table cellpadding="0" cellspacing="0" style="width: 100%; line-height: inherit; text-align: left;" width="100%"
	//       align="left">
	//       <tr class="top">
	//         <td colspan="2" style="padding: 5px; vertical-align: top;" valign="top">
	//           <table style="width: 100%; line-height: inherit; text-align: left;" width="100%" align="left">
	//             <tr>
	//               <td class="title"
	//                 style="vertical-align: top; padding-bottom: 20px; font-size: 45px; line-height: 45px; color: #333; "
	//                 valign="top">
	//                 <img src="https://images2.imgbox.com/43/9c/VfPHO7QY_o.png"
	//                   style="width:100%; max-width:400px; margin-left: -13px;">
	//               </td>

	//               <td style="padding: 5px; vertical-align: top; text-align: right; padding-bottom: 20px;" valign="top"
	//                 align="right">
	//                 Invoice #: ${props._id}<br>
	//                 Created: ${format_date(props.createdAt)}<br>
	//               </td>
	//             </tr>
	//           </table>
	//         </td>
	//       </tr>

	//       <tr class="information">
	//         <td colspan="2" style="padding: 5px; vertical-align: top;" valign="top">
	//           <table style="width: 100%; line-height: inherit; text-align: left;" width="100%" align="left">
	//             <tr>
	//               <td style="padding: 5px; vertical-align: top; padding-bottom: 40px;" valign="top">
	//                 Glow LEDs<br>
	//                 404 Kenniston Dr<br>
	//                 Austin, TX 78752
	//               </td>

	//               <td style="padding: 5px; vertical-align: top; text-align: right; padding-bottom: 40px;" valign="top"
	//                 align="right">
	//                 ${props.shipping.first_name} ${props.shipping.last_name}<br>
	//                 ${props.shipping.address}<br>
	//                 ${props.shipping.city}, ${props.shipping.state} ${props.shipping.postalCode}<br>
	//                 ${props.shipping.email}
	//               </td>
	//             </tr>
	//           </table>
	//         </td>
	//       </tr>

	//       <tr class="heading">
	//         <td
	//           style="padding: 5px; vertical-align: top; background: #eee; border-bottom: 1px solid #ddd; font-weight: bold;"
	//           valign="top">
	//           Payment Method
	//         </td>

	//         <td
	//           style="padding: 5px; vertical-align: top; text-align: right; background: #eee; border-bottom: 1px solid #ddd; font-weight: bold;"
	//           valign="top" align="right">
	//           Last 4
	//         </td>
	//       </tr>

	//       <tr class="details">
	//         <td style="padding: 5px; vertical-align: top; padding-bottom: 20px;" valign="top">
	//         ${props.token.card.brand}
	//         </td>

	//         <td style="padding: 5px; vertical-align: top; text-align: right; padding-bottom: 20px;" valign="top"
	//           align="right">
	//           ${props.token.card.last4}
	//         </td>
	//       </tr>

	//       <tr class="heading">
	//         <td
	//           style="padding: 5px; vertical-align: top; background: #eee; border-bottom: 1px solid #ddd; font-weight: bold;"
	//           valign="top">
	//           Item
	//         </td>

	//         <td
	//           style="padding: 5px; vertical-align: top; text-align: right; background: #eee; border-bottom: 1px solid #ddd; font-weight: bold;"
	//           valign="top" align="right">
	//           Price
	//         </td>
	//       </tr>
	//       ${props.orderItems.map((item: any) => {
	// 			let item_item = `<tr class="item">
	//         <td style="padding: 5px; vertical-align: top; border-bottom: 1px solid #eee;" valign="top">
	//           ${item.name}
	//         </td>

	//         <td style="padding: 5px; vertical-align: top; text-align: right; border-bottom: 1px solid #eee;" valign="top"
	//           align="right">
	//           ${item.price}
	//         </td>
	//       </tr>`;
	// 			return item_item;
	// 		})}

	//       <tr class="total">
	//         <td style="padding: 5px; vertical-align: top;" valign="top"></td>

	//         <td style="padding: 5px; vertical-align: top; text-align: right; border-top: 2px solid #eee; font-weight: bold;"
	//           valign="top" align="right">
	//           Shipping: $${props.shippingPrice.toFixed(2)}
	//         </td>
	//         <td style="padding: 5px; vertical-align: top; text-align: right; border-top: 2px solid #eee; font-weight: bold;"
	//           valign="top" align="right">
	//           Tax: $${props.taxPrice.toFixed(2)}
	//         </td>
	//         <td style="padding: 5px; vertical-align: top; text-align: right; border-top: 2px solid #eee; font-weight: bold;"
	//           valign="top" align="right">
	//           Total: $${props.totalPrice.toFixed(2)}
	//         </td>
	//       </tr>
	//     </table>
	//   </div>
	// </body>

	// </html>

	// 	`;
};
