"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (props
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
) {
    var format_date = function (unformatted_date) {
        var month = unformatted_date.slice(5, 7);
        var day = unformatted_date.slice(8, 10);
        var year = unformatted_date.slice(0, 4);
        var formatted_date = month + "/" + day + "/20";
        return formatted_date;
    };
    console.log('invoice_view');
    return "\n \n  <!doctype html>\n<html>\n\n<head>\n  <meta charset=\"utf-8\">\n  <title>Glow LEDs Invoice</title>\n\n</head>\n\n<body>\n  <div class=\"invoice-box\"\n    style=\"width: 800px; margin: auto;  font-size: 16px; line-height: 24px; font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; color: #555;\">\n    <h1>Hello</h1>\n    <table cellpadding=\"0\" cellspacing=\"0\" style=\"width: 100%; line-height: inherit; text-align: left;\" width=\"100%\"\n      align=\"left\">\n      <tr class=\"top\">\n        <td colspan=\"2\" style=\"padding: 5px; vertical-align: top;\" valign=\"top\">\n          <table style=\"width: 100%; line-height: inherit; text-align: left;\" width=\"100%\" align=\"left\">\n            <tr>\n              <td class=\"title\"\n                style=\"vertical-align: top; padding-bottom: 20px; font-size: 45px; line-height: 45px; color: #333; \"\n                valign=\"top\">\n                <img src=\"https://images2.imgbox.com/43/9c/VfPHO7QY_o.png\"\n                  style=\"width:100%; max-width:400px; margin-left: -13px;\">\n              </td>\n\n              <td style=\"padding: 5px; vertical-align: top; text-align: right; padding-bottom: 20px;\" valign=\"top\"\n                align=\"right\">\n                Invoice #: " + props._id + "<br>\n                Created: " + format_date(props.createdAt) + "<br>\n              </td>\n            </tr>\n          </table>\n        </td>\n      </tr>\n\n      <tr class=\"information\">\n        <td colspan=\"2\" style=\"padding: 5px; vertical-align: top;\" valign=\"top\">\n          <table style=\"width: 100%; line-height: inherit; text-align: left;\" width=\"100%\" align=\"left\">\n            <tr>\n              <td style=\"padding: 5px; vertical-align: top; padding-bottom: 40px;\" valign=\"top\">\n                Glow LEDs<br>\n                404 Kenniston Dr<br>\n                Austin, TX 78752\n              </td>\n\n              <td style=\"padding: 5px; vertical-align: top; text-align: right; padding-bottom: 40px;\" valign=\"top\"\n                align=\"right\">\n                " + props.shipping.first_name + " " + props.shipping.last_name + "<br>\n                " + props.shipping.address + "<br>\n                " + props.shipping.city + ", " + props.shipping.state + " " + props.shipping.postalCode + "<br>\n                " + props.shipping.email + "\n              </td>\n            </tr>\n          </table>\n        </td>\n      </tr>\n\n      <tr class=\"heading\">\n        <td\n          style=\"padding: 5px; vertical-align: top; background: #eee; border-bottom: 1px solid #ddd; font-weight: bold;\"\n          valign=\"top\">\n          Payment Method\n        </td>\n\n        <td\n          style=\"padding: 5px; vertical-align: top; text-align: right; background: #eee; border-bottom: 1px solid #ddd; font-weight: bold;\"\n          valign=\"top\" align=\"right\">\n          Last 4\n        </td>\n      </tr>\n\n      <tr class=\"details\">\n        <td style=\"padding: 5px; vertical-align: top; padding-bottom: 20px;\" valign=\"top\">\n          " + props.token.card.brand + "\n        </td>\n\n        <td style=\"padding: 5px; vertical-align: top; text-align: right; padding-bottom: 20px;\" valign=\"top\"\n          align=\"right\">\n          " + props.token.card.last4 + "\n        </td>\n      </tr>\n\n      <tr class=\"heading\">\n        <td\n          style=\"padding: 5px; vertical-align: top; background: #eee; border-bottom: 1px solid #ddd; font-weight: bold;\"\n          valign=\"top\">\n          Item\n        </td>\n\n        <td\n          style=\"padding: 5px; vertical-align: top; text-align: right; background: #eee; border-bottom: 1px solid #ddd; font-weight: bold;\"\n          valign=\"top\" align=\"right\">\n          Price\n        </td>\n      </tr>\n      " + props.orderItems.map(function (item) {
        var item_item = "<tr class=\"item\">\n        <td style=\"padding: 5px; vertical-align: top; border-bottom: 1px solid #eee;\" valign=\"top\">\n          " + item.name + "\n        </td>\n\n        <td style=\"padding: 5px; vertical-align: top; text-align: right; border-bottom: 1px solid #eee;\" valign=\"top\"\n          align=\"right\">\n          " + item.price + "\n        </td>\n      </tr>";
        return item_item;
    }) + "\n\n      <tr class=\"total\">\n        <td style=\"padding: 5px; vertical-align: top;\" valign=\"top\"></td>\n\n        <td style=\"padding: 5px; vertical-align: top; text-align: right; border-top: 2px solid #eee; font-weight: bold;\"\n          valign=\"top\" align=\"right\">\n          Shipping: $" + props.shippingPrice.toFixed(2) + "\n        </td>\n        <td style=\"padding: 5px; vertical-align: top; text-align: right; border-top: 2px solid #eee; font-weight: bold;\"\n          valign=\"top\" align=\"right\">\n          Tax: $" + props.taxPrice.toFixed(2) + "\n        </td>\n        <td style=\"padding: 5px; vertical-align: top; text-align: right; border-top: 2px solid #eee; font-weight: bold;\"\n          valign=\"top\" align=\"right\">\n          Total: $" + props.totalPrice.toFixed(2) + "\n        </td>\n      </tr>\n    </table>\n  </div>\n</body>\n\n</html>\n\n\t";
});
