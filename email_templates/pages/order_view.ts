export default (props: {
	title: string;
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
	};
	isShipped: boolean;
	shippedAt: Date;
	isPaid: boolean;
	paidAt: Date;
	orderItems: object[];
	itemsPrice: number;
	shippingPrice: number;
	taxPrice: number;
	totalPrice: number;
	order_note: string;
	paid: string;
	shipped: string;
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
	console.log({ order_view_props_order_items: props.orderItems });
	return `
 
  <div class="placeorder" style="display: flex;flex-wrap: wrap;justify-content: space-between;color: white;">
      <div class="placeorder-info" style="box-sizing: border-box;flex: 3 1 60rem;">
        <div style="box-sizing: border-box;border-radius: 1rem;background-color: #8a8a8a;padding: 1rem;margin: 1rem;">
          <div style="display: flex;justify-content: space-between;flex-wrap: wrap;">
            <div style="display: flex;flex-direction: column;box-sizing: border-box;">
              <h1 style="display: flex;font-size: 30px;margin-top: 0px;box-sizing: border-box;font-family: Helvetica;">
                ${props.title}</h1>

              <div class="  display: flex;  flex-wrap: wrap;" style="box-sizing: border-box;">

                <h2 style="font-size: 20px;margin: 0px;box-sizing: border-box;font-family: Helvetica;">Order
                  Number: </h2>

                <a href="${process.env.NODE_ENV === 'production'
					? 'http://glow-leds.com'
					: 'http://localhost:3000'}/order/${props._id}"
                  style="color: white;text-decoration: none;box-sizing: border-box;">${props._id}</a>
              </div>
              <h1 style="box-sizing: border-box;font-family: Helvetica;">Shipping</h1>

              <div style="box-sizing: border-box;">

                <div style="box-sizing: border-box;">${props.shipping.first_name} ${props.shipping.last_name}
                </div>
                <div style="box-sizing: border-box;">${props.shipping.address}</div>
                <div style="box-sizing: border-box;">${props.shipping.city}, ${props.shipping.state}
                  ${props.shipping.postalCode} ${props.shipping.country}</div>
                <div style="box-sizing: border-box; text-decoration: none; color: white;">${props.shipping.email}</div>
              </div>
            </div>
            <div class="ship_deliver"
              style="display: flex;flex-direction: column;margin-top: auto;box-sizing: border-box;">
              <div
                style="display: flex;justify-content: space-between;align-items: center;flex-direction: row;box-sizing: border-box;">
                <label style="margin-top: 5px;box-sizing: border-box;">${props.shipped}</label>
              </div>
            </div>
          </div>
        </div>
        <div style="box-sizing: border-box;border-radius: 1rem;background-color: #8a8a8a;padding: 1rem; margin: 1rem;">
          <h1 style="box-sizing: border-box;font-family: Helvetica;">Payment</h1>
          <div style="box-sizing: border-box;">Payment Method: paypal</div>
          <div style="box-sizing: border-box;">${props.paid}</div>
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
              <div class="cart-image" style="box-sizing: border-box;">
                <img src="${process.env.NODE_ENV === 'production'
					? 'http://glow-leds.com'
					: 'http://localhost:3000'}${item.display_image}" alt="product"
                  style="box-sizing: border-box;max-width: 10rem;max-height: 10rem;border-radius: 1.5rem;margin-right: 10px;">
              </div>
              <div class="cart-name" style="box-sizing: border-box;">
                <div style="box-sizing: border-box;"><a href="${process.env.NODE_ENV === 'production'
					? 'http://glow-leds.com'
					: 'http://localhost:3000'}/product/${item.product}"
                    style="box-sizing: border-box;text-decoration: none;color: white;">${item.name}</a></div>
                <div style="box-sizing: border-box;">Qty: ${item.qty}</div>
              </div>
              <div class="cart-price" style="box-sizing: border-box;text-align: right; width: 230px;">
                ${item.sale_price !== 0
					? `<div style="width: 230px;box-sizing: border-box;">
                  <del style="color: red;box-sizing: border-box;">
                    <label style="color: white;box-sizing: border-box;">${item.price ? item.price : item.price}</label>
                  </del>{' '}
                  <i class="fas fa-arrow-right" style="box-sizing: border-box;"></i> ${item.sale_price
						? item.sale_price.toFixed(2)
						: item.sale_price}{' '}
                  On Sale!
                </div>`
					: `<label style="box-sizing: border-box;">${item.price
							? item.price.toFixed(2)
							: item.price}</label>`}
              </div>
            </li>`;
				return item_item;
			})}
          </ul>
        </div>
      </div>
      <div class="placeorder-action"
        style="box-sizing: border-box;flex: 1 1 20rem;border-radius: 1rem;background-color: #8a8a8a;padding: 1rem; margin: 1rem;margin-bottom: 10px;">
        <ul style="box-sizing: border-box;padding: 0;list-style-type: none;">
          <li style="box-sizing: border-box;display: flex;justify-content: space-between;margin-bottom: 1rem;">
            <h1 style="margin-top: 0px;box-sizing: border-box;font-family: Helvetica;">Order Summary</h1>
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
          <li
            style="box-sizing: border-box;display: flex; flex-wrap: wrap;justify-content: space-between;margin-bottom: 1rem;">
            <div style="box-sizing: border-box;">Order Total</div>
            <div style="box-sizing: border-box;">$${props.totalPrice.toFixed(2)}</div>
          </li>
          <li class="placeorder-actions-payment"
            style="display: flex;justify-content: center;box-sizing: border-box;margin-bottom: 1rem;">
            <div style="display: block;box-sizing: border-box;width: 100%;"></div>
          </li>
          <div style="display: flex;flex-direction: column;box-sizing: border-box;">
            <div for="order_note" style="box-sizing: border-box;">Order Note</div>
            <div style="box-sizing: border-box;">${props.order_note}</div>
          </div>
        </ul>
      </div>
    </div>
	`;
};
