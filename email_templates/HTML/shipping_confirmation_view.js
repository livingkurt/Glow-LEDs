module.exports = (props) => {
	const format_date_display = (unformatted_date) => {
		const date = new Date(unformatted_date);
		const day = date.getDate();
		const month = date.getMonth() + 1;
		const year = date.getFullYear();
		const formatted_date = `${month}/${day}/${year}`;
		return formatted_date;
	};
	return `
 
    <div class="placeorder">
      <div class="placeorder-info">
        <div>
          <div style="display: flex; justify-content: space-between; flex-wrap: wrap;">
            <div style="display: flex; flex-direction: column;">
              <h1 style="display: flex; font-family: Helvetica; font-size: 30px;">${props.title}</h1>
              <div>
              <div>${props.shipping.address}</div>
              <div>${props.shipping.city}, ${props.shipping.state} ${props.shipping.postalCode} ${props.shipping
		.country}</div>
              </div>
            </div>
            <div class="ship_deliver"
              style="display: flex; flex-direction: column; margin-top: auto; width: 373px;">
              <div
                style="display: flex; justify-content: space-between; align-items: center; flex-direction: row;">
                <label class="label" style="margin-top: 5px; font-size: 16px;">${props.isShipped
					? 'Shipped at ' + format_date_display(props.shippedAt)
					: ' Not Shipped'}</label>
              </div>
              <div
                style="display: flex; justify-content: space-between; align-items: center; flex-direction: row;">
                <label class="label" style="font-size:16px; margin-top:5px">${props.isDelivered
					? 'Delivered at ' + format_date_display(props.deliveredAt)
					: ' Not Delivered'}</label>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h1 style="display: flex; font-family: Helvetica; font-size: 30px;">Payment</h1>
          <div>Payment Method: paypal</div>
          <div>${props.isPaid ? 'Paid at ' + format_date_display(props.paidAt) : 'Not Paid'}</div>
        </div>
        <div>
          <ul class="cart-list-container" style="margin-top: 0px;">
            <li>
              <h1 style="display: flex; font-family: Helvetica; font-size: 30px;">Shopping Cart</h1>
              <div>Price</div>
            </li>
            ${props.orderItems.map((item) => {
				let item_item = `<li
              <div class="cart-image"><img
                  src="http://www.glow-leds.com/${item.display_image}
                  alt="product"></div>
              <div class="cart-name">
                <div><a href="http://www.glow-leds.com/product/${item.product}">${item.name}</a></div>
                <div>Qty: ${item.qty}</div>
              </div>
              <div class="cart-price">${item.price}</div>
            </li>`;
				return item_item;
			})}
          </ul>
        </div>
      </div>
      <div class="placeorder-action">
        <ul>
          <li>
            <h1 style="display: flex; font-family: Helvetica; font-size: 30px; margin-top: 0px;">Order Summary
            </h1>
          </li>
          <li>
            <div>Items</div>
            <div>$${props.itemsPrice.toFixed(2)}</div>
          </li>
          <li>
            <div>Shipping</div>
            // <div>$${props.shippingPrice.toFixed(2)}</div>
            <div>Free Shipping</div>
          </li>
          <li>
            <div>Tax</div>
            <div>$${props.taxPrice.toFixed(2)}</div>
          </li>
          <li>
            <div>Order Total</div>
            <div>$${props.totalPrice.toFixed(2)}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
</div>
	`;
};
