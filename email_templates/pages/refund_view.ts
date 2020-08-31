export default (props: {
	title: string;
	// body: string;
	_id: string;
	shipping: {
		first_name: string;
		last_name: string;
		email: string;
		address: string;
		city: string;
		state: string;
		postalCode: number;
		country: string;
		international: boolean;
	};
	isShipped: boolean;
	shippedAt: Date;
	isPaid: boolean;
	paidAt: Date;
	isRefunded: boolean;
	refundedAt: Date;
	payment: any;
	orderItems: object[];
	itemsPrice: number;
	shippingPrice: number;
	taxPrice: number;
	totalPrice: number;
	order_note: string;
	promo_code: string;
	paid: string;
	shipped: string;
	createdAt: Date;
	refunded: Boolean;
	// token: any;
}) => {
	const format_date_display = (unformatted_date: string | number | Date) => {
		const date = new Date(unformatted_date);
		const day = date.getDate();
		const month = date.getMonth() + 1;
		const year = date.getFullYear();
		const formatted_date = `${month}/${day}/${year}`;
		return formatted_date;
	};
	console.log({ order_view_props: props });
	// console.log({ order_view_props_order_items: props.orderItems });
	console.log({ order_view_props_order_items: props.payment.charge });
	return `
 
  <div class="placeorder" style="display: flex;flex-wrap: wrap;justify-content: space-between;color: white;">
      <div class="placeorder-info" style="box-sizing: border-box;flex: 3 1 60rem;">
      
        <div style="box-sizing: border-box;border-radius: 1rem;background-color: #8a8a8a;padding: 1rem;margin: 1rem;  margin-bottom: 0;">
          <div style="display: flex;justify-content: space-between; flex-direction: column;">
            <div style="display: block;flex-direction: column;box-sizing: border-box;">
              <h1 style="display: flex; width: 100%; font-size: 30px;margin-top: 0px; margin-bottom: 0px;box-sizing: border-box;font-family: Helvetica;">
                ${props.title}</h1>
                <div style="  display: flex;  flex-wrap: wrap; ">
                ${props.refunded
					? `<h2>
                      Refunded: ${props.payment.refund_reason[
							props.payment.refund_reason.length - 1
						]} on ${format_date_display(props.refundedAt)}
                    </h2>`
					: `<div></div>`}
              </div>
              <div style=" display: flex;  flex-wrap: wrap; width: 100%;">
                <h3 style="margin: 0px; box-sizing: border-box;font-family: Helvetica;"><strong>Order
                    Number: </strong><a href="${process.env.NODE_ENV === 'production'
						? 'http://glow-leds.com'
						: 'http://localhost:3000'}/secure/account/order/${props._id}"
                    style="color: white;text-decoration: none;box-sizing: border-box;">${props._id}</a></h3>
              </div>
              
              </div>
              </div>
            </div>
          </div>
        </div>
        <div class="placeorder-action">
      <div style="box-sizing: border-box;border-radius: 1rem;background-color: #8a8a8a;padding: 1rem; margin: 1rem;">
        <h1 style="box-sizing: border-box;font-family: Helvetica;  margin-top: 0;">Shipping</h1>

        <div style=" width: 100%;">

          <div style="box-sizing: border-box;">${props.shipping.first_name} ${props.shipping.last_name}
          </div>
          <div style="box-sizing: border-box;">${props.shipping.address}</div>
          <div style="box-sizing: border-box;">${props.shipping.city}, ${props.shipping.state}
            ${props.shipping.postalCode} ${props.shipping.country}</div>
          ${props.shipping.international ? `<div style="box-sizing: border-box;">International</div>` : `<div></div>`}

          <div style="box-sizing: border-box; text-decoration: none; color: white;">${props.shipping.email}</div>
          <div style="    border-top: 0.1rem solid white;width: 100%;">
            <label style="margin-top: 10px;box-sizing: border-box;"><strong>${props.shipped}</strong></label>
          </div>
        </div>
      </div>
    </div>
        <div style="box-sizing: border-box;border-radius: 1rem;background-color: #8a8a8a;padding: 1rem; margin: 1rem;">
          <ul class="cart-list-container"
            style="margin-top: 0px;box-sizing: border-box;padding: 0;list-style-type: none;margin-right: 10px;">
            <li
              style="box-sizing: border-box;display: flex;justify-content: space-between;padding-bottom: 1rem;margin-bottom: 1rem;border-bottom: .1rem #c0c0c0 solid;align-items: flex-end;">
              <h1 style="box-sizing: border-box;font-family: Helvetica;">Shopping Cart</h1>
              <div style="box-sizing: border-box;">Price</div>
            </li>
            ${props.orderItems.map((item: any) => {
				let item_item = `<li
              style="box-sizing: border-box;display: flex;justify-content: space-between;padding-bottom: 1rem;margin-bottom: 1rem;border-bottom: .1rem #c0c0c0 solid;">
              <div style="display:flex; width: 100%;">
                <div class="cart-image" style="box-sizing: border-box;">
                  <img src="${process.env.NODE_ENV === 'production'
						? 'http://glow-leds.com'
						: 'http://localhost:3000'}${item.display_image}" alt="product"
                    style="height: auto;
                    width: 100%;box-sizing: border-box;max-width: 10rem;max-height: 10rem;border-radius: 1.5rem;margin-right: 10px;">
                </div>
                <div class="cart-name" style="box-sizing: border-box;">
                  <div style="box-sizing: border-box;"><a href="${process.env.NODE_ENV === 'production'
						? 'http://glow-leds.com'
						: 'http://localhost:3000'}/collections/all/products/${item.pathname}"
                      style="box-sizing: border-box;text-decoration: none;color: white;">${item.name}</a></div>
                  <div style="box-sizing: border-box;">Qty: ${item.qty}</div>
                </div>
              </div>
              <div class="cart-price" style="box-sizing: border-box;text-align: right; width: 100px;">
                ${item.sale_price !== 0
					? `<div style="width: 100px;box-sizing: border-box;">
                  <del style="color: red;box-sizing: border-box;">
                    <label style="color: white;box-sizing: border-box;">$${item.price ? item.price : item.price}</label>
                  </del>{' '}
                  <i class="fas fa-arrow-right" style="box-sizing: border-box;"></i> $${item.sale_price
						? item.sale_price.toFixed(2)
						: item.sale_price}{' '}
                  On Sale!
                </div>`
					: `<label style="box-sizing: border-box;">$${item.price
							? item.price.toFixed(2)
							: item.price}</label>`}
              </div>
            </li>`;
				return item_item;
			})}
          </ul>
        <div style="display: flex;flex-direction: column;box-sizing: border-box;">
          <div for="promo_code" style="box-sizing: border-box;">Order Note: </div>
          <div style="box-sizing: border-box;">${props.promo_code}</div>
        </div>
        <div style="display: flex;flex-direction: column;box-sizing: border-box;">
          <div for="order_note" style="box-sizing: border-box;">Order Note: </div>
          <div style="box-sizing: border-box;">${props.order_note}</div>
        </div>
        </div>
      </div>
      <div class="placeorder-action"
        style="box-sizing: border-box;flex: 1 1 20rem;border-radius: 1rem;background-color: #8a8a8a;padding: 1rem; margin: 1rem;margin-bottom: 10px;">
        <ul style="box-sizing: border-box;padding: 0;list-style-type: none;">
          <li style="box-sizing: border-box;display: flex;justify-content: space-between;margin-bottom: 1rem;">
            <h1 style="margin-top: 0px;box-sizing: border-box;font-family: Helvetica;">Payment Summary</h1>
          </li>
          <li
            style="box-sizing: border-box;display: flex; flex-wrap: wrap;justify-content: space-between;margin-bottom: 1rem;">
            <div style="box-sizing: border-box;">Items</div>
            <div style="box-sizing: border-box;">$${props.itemsPrice.toFixed(2)}</div>
          </li>
          <li
            style="box-sizing: border-box;display: flex; flex-wrap: wrap;justify-content: space-between;margin-bottom: 1rem;">
            <div style="box-sizing: border-box;">Shipping</div>
            <div style="box-sizing: border-box;">$${props.shippingPrice.toFixed(2)}</div>
          </li>
          <li style="box-sizing: border-box; display: flex;flex-wrap: wrap;justify-content: space-between;margin-bottom: 1rem;">
            <div style="box-sizing: border-box;">Tax</div>
            <div style="box-sizing: border-box;">$${props.taxPrice.toFixed(2)}</div>
          </li>
          <li style="box-sizing: border-box;display: flex;justify-content: space-between;margin-bottom: 1rem;">
            <div style="display: flex; flex-direction: column; width: 100%;">
            <div style="box-sizing: border-box; border-top: 0.1rem solid white;width: 100%; display: flex; flex-direction: column;"><label>
            </div>
          </li>
                ${props.refunded
					? `<li style="box-sizing: border-box;display: flex; flex-wrap: wrap;justify-content: space-between;margin-bottom: 1rem;">
                    <div style="box-sizing: border-box;">Order Total</div>
                    <del style={{ color: 'red' }}>
                      <label style={{ color: 'white' }}>
                        <div style="box-sizing: border-box;">$${props.totalPrice
							? props.totalPrice.toFixed(2)
							: props.totalPrice}</div>
                      </label>
                    </del>
                  </li>`
					: `<li style="box-sizing: border-box;display: flex; flex-wrap: wrap;justify-content: space-between;margin-bottom: 1rem;">
          <div style="box-sizing: border-box;">Order Total</div>
          <div style="box-sizing: border-box;">$${props.totalPrice
				? props.totalPrice.toFixed(2)
				: props.totalPrice}</div>
        </li>`}
                ${props.refunded
					? `<li style="box-sizing: border-box;display: flex; flex-wrap: wrap;justify-content: space-between;margin-bottom: 1rem;">
                    <div style="box-sizing: border-box;">Refund Amount</div>
                    <div style="box-sizing: border-box;">$${(props.payment.refund.reduce(
						(a: any, c: any) => a + c.amount,
						0
					) / 100).toFixed(2)}</div>
                  </li>`
					: `<div style="box-sizing: border-box;"></div>`}
                ${props.refunded
					? `<li style="box-sizing: border-box;display: flex; flex-wrap: wrap;justify-content: space-between;margin-bottom: 1rem;">
                    <div style="box-sizing: border-box;">New Order Total</div>
                    <div style="box-sizing: border-box;">
                      $${(props.totalPrice -
							props.payment.refund.reduce((a: any, c: any) => a + c.amount, 0) / 100).toFixed(2)}
                    </div>
                  </li>`
					: `<div style="box-sizing: border-box;"></div>`}
          <li
            style="box-sizing: border-box;display: flex; flex-wrap: wrap;justify-content: space-between;margin-bottom: 1rem;">
            <div style="box-sizing: border-box;">${props.paid}</div>
            <div style="box-sizing: border-box;">${props.payment.charge.payment_method_details.card
				.brand} ending in ${props.payment.charge.payment_method_details.card.last4}</div>
          </li>
        </ul>
      </div>
    </div>
	`;
};
