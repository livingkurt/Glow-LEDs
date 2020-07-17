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
                  <h1 style="display: flex; font-size: 30px; margin-top: 0px;">${props.title}</h1>
              <h1 style="display: flex; font-size: 20px; margin: 0px;">Order Number: <a href="${process.env.NODE_ENV ===
				'production'
					? 'https://glow-leds-dev.herokuapp.com'
					: 'http://localhost:3000'}/order/${props._id}" style="color:white; text-decoration:none">${props._id}</a></h1>
                    <h1>Shipping</h1>
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
                      <label style="margin-top: 5px;">${props.isShipped
							? 'Shipped at ' + format_date_display(props.shippedAt)
							: ' Not Shipped'}</label>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h1>Payment</h1>
                <div>Payment Method: paypal</div>
                <div>${props.isPaid ? 'Paid at ' + format_date_display(props.paidAt) : 'Not Paid'}</div>
              </div>
              <div>
                <ul class="cart-list-container" style="margin-top: 0px;">
                  <li>
                    <h1>Shopping Cart</h1>
                    <div>Price</div>
                  </li>
                  ${props.orderItems.map((item) => {
						let item_item = `<li>
                    <div class="cart-image">
                    <img src="${process.env.NODE_ENV === 'production'
						? 'https://glow-leds-dev.herokuapp.com'
						: 'http://localhost:3000'}/${item.display_image}"
                        alt="product"></div>
                    <div class="cart-name">
                      <div><a href="${process.env.NODE_ENV === 'production'
							? 'https://glow-leds-dev.herokuapp.com'
							: 'http://localhost:3000'}/product/${item.product}">${item.name}</a></div>
                      <div>Qty: ${item.qty}</div>
                    </div>
                    <div class="cart-price">
                    ${item.sale_price !== 0
						? `<div style="width: 230px;">
							<del style="color: red;">
								<label style="color: white;">${item.price ? item.price : item.price}</label>
							</del>{' '}
							<i class="fas fa-arrow-right" /> ${item.sale_price ? item.sale_price.toFixed(2) : item.sale_price}{' '}
							On Sale!
						</div>`
						: `<label>${item.price ? item.price.toFixed(2) : item.price}</label>`}
                    </div>
                  </li>`;
						return item_item;
					})}
                </ul>
              </div>
            </div>
            <div class="placeorder-action">
              <ul>
                <li>
                  <h1 style="margin-top: 0px;">Order Summary</h1>
                </li>
                <li>
                  <div>Items</div>
                  <div>$${props.itemsPrice.toFixed(2)}</div>
                </li>
                <li>
                  <div>Shipping</div>
                  <div>$${props.shippingPrice.toFixed(2)}</div>
                </li>
                <li>
                  <div>Tax</div>
                  <div>$${props.taxPrice.toFixed(2)}</div>
                </li>
                <li>
                  <div>Order Total</div>
                  <div>$${props.totalPrice.toFixed(2)}</div>
                </li>
                <li class="placeorder-actions-payment" style="display: flex; justify-content: center;">
                  <div style="display: block;"></div>
                </li>
                <div style="display: flex; flex-direction: column;">
                  <div for="order_note">Order Note</div>
                  <div>${props.order_note}</div>
                </div>
              </ul>
            </div>
          </div>
	`;
};
