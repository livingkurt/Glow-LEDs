"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (props) {
    var format_date_display = function (unformatted_date) {
        var date = new Date(unformatted_date);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        var formatted_date = month + "/" + day + "/" + year;
        return formatted_date;
    };
    return "\n \n          <div class=\"placeorder\">\n            <div class=\"placeorder-info\">\n              <div>\n                <div style=\"display: flex; justify-content: space-between; flex-wrap: wrap;\">\n                  <div style=\"display: flex; flex-direction: column;\">\n                  <h1 style=\"display: flex; font-size: 30px; margin-top: 0px;\">" + props.title + "</h1>\n              <h1 style=\"display: flex; font-size: 20px; margin: 0px;\">Order Number: <a href=\"" + (process.env.NODE_ENV ===
        'production'
        ? 'https://glow-leds-dev.herokuapp.com'
        : 'http://localhost:3000') + "/order/" + props._id + "\" style=\"color:white; text-decoration:none\">" + props._id + "</a></h1>\n                    <h1>Shipping</h1>\n                    <div>\n                    <div>" + props.shipping.address + "</div>\n                    <div>" + props.shipping.city + ", " + props.shipping.state + " " + props.shipping.postalCode + " " + props.shipping
        .country + "</div>\n                    </div>\n                  </div>\n                  <div class=\"ship_deliver\"\n                    style=\"display: flex; flex-direction: column; margin-top: auto; width: 373px;\">\n                    <div\n                      style=\"display: flex; justify-content: space-between; align-items: center; flex-direction: row;\">\n                      <label style=\"margin-top: 5px;\">" + (props.isShipped
        ? 'Shipped at ' + format_date_display(props.shippedAt)
        : ' Not Shipped') + "</label>\n                    </div>\n                  </div>\n                </div>\n              </div>\n              <div>\n                <h1>Payment</h1>\n                <div>Payment Method: paypal</div>\n                <div>" + (props.isPaid ? 'Paid at ' + format_date_display(props.paidAt) : 'Not Paid') + "</div>\n              </div>\n              <div>\n                <ul class=\"cart-list-container\" style=\"margin-top: 0px;\">\n                  <li>\n                    <h1>Shopping Cart</h1>\n                    <div>Price</div>\n                  </li>\n                  " + props.orderItems.map(function (item) {
        var item_item = "<li>\n                    <div class=\"cart-image\">\n                    <img src=\"" + (process.env.NODE_ENV === 'production'
            ? 'https://glow-leds-dev.herokuapp.com'
            : 'http://localhost:3000') + "/" + item.display_image + "\"\n                        alt=\"product\"></div>\n                    <div class=\"cart-name\">\n                      <div><a href=\"" + (process.env.NODE_ENV === 'production'
            ? 'https://glow-leds-dev.herokuapp.com'
            : 'http://localhost:3000') + "/product/" + item.product + "\">" + item.name + "</a></div>\n                      <div>Qty: " + item.qty + "</div>\n                    </div>\n                    <div class=\"cart-price\">\n                    " + (item.sale_price !== 0
            ? "<div style=\"width: 230px;\">\n\t\t\t\t\t\t\t<del style=\"color: red;\">\n\t\t\t\t\t\t\t\t<label style=\"color: white;\">" + (item.price ? item.price : item.price) + "</label>\n\t\t\t\t\t\t\t</del>{' '}\n\t\t\t\t\t\t\t<i class=\"fas fa-arrow-right\" /> " + (item.sale_price ? item.sale_price.toFixed(2) : item.sale_price) + "{' '}\n\t\t\t\t\t\t\tOn Sale!\n\t\t\t\t\t\t</div>"
            : "<label>" + (item.price ? item.price.toFixed(2) : item.price) + "</label>") + "\n                    </div>\n                  </li>";
        return item_item;
    }) + "\n                </ul>\n              </div>\n            </div>\n            <div class=\"placeorder-action\">\n              <ul>\n                <li>\n                  <h1 style=\"margin-top: 0px;\">Order Summary</h1>\n                </li>\n                <li>\n                  <div>Items</div>\n                  <div>$" + props.itemsPrice.toFixed(2) + "</div>\n                </li>\n                <li>\n                  <div>Shipping</div>\n                  <div>$" + props.shippingPrice.toFixed(2) + "</div>\n                </li>\n                <li>\n                  <div>Tax</div>\n                  <div>$" + props.taxPrice.toFixed(2) + "</div>\n                </li>\n                <li>\n                  <div>Order Total</div>\n                  <div>$" + props.totalPrice.toFixed(2) + "</div>\n                </li>\n                <li class=\"placeorder-actions-payment\" style=\"display: flex; justify-content: center;\">\n                  <div style=\"display: block;\"></div>\n                </li>\n                <div style=\"display: flex; flex-direction: column;\">\n                  <div for=\"order_note\">Order Note</div>\n                  <div>" + props.order_note + "</div>\n                </div>\n              </ul>\n            </div>\n          </div>\n\t";
});
