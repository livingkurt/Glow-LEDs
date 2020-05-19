module.exports = function (props) {
  const format_date_display = unformatted_date => {
    const date = new Date(unformatted_date)
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formatted_date = `${month}/${day}/${year}`
    return formatted_date;
  }
  return `
        <div class="content"
          style="background:linear-gradient(180deg, rgba(138, 138, 138, 1) 0%, rgba(39, 39, 39, 1) 100%); background-color:#737373; border-radius:20px; box-shadow:0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); grid-area:main; margin:20px auto; padding:2rem; width:75%"
          bgcolor="#737373" width="75%">
          <div style="display: flex; justify-content: center; ">
          <div class="title"
            style='display:flex; text-align: center; flex-direction: column;font-family:"heading_font"; margin:0'>
            <h1 style="font-size: 40px; margin: 17px 0px 10px; width: 100%;">${props.title}</h1>
            <div>
              Thank you for the support!
              If you have any questions or concerns PLEASE don't hesitate to messge me
              <a style=" font-weight: bold; color: white; text-decoration: none;"
                href="https://glow-leds.herokuapp.com/contact">HERE</a>
            </div>
          </div>
        </div>
          <div>

            <div class="placeorder"
              style="color:white; display:flex; flex-grow:wrap; justify-content:space-between; padding:1rem">
              <div class="placeorder-info" style="flex:3 1 60rem">
                <div
                  style="background-color:#5a5a5a; border:0.1rem #c0c0c0 solid; border-radius:0.5rem; margin:1rem; padding:2rem; margin-top:0"
                  bgcolor="#5a5a5a">
                  <div style="display: flex; justify-content: space-between;">
                    <div style="display: flex; flex-direction: column;">
                      <div class="title" style='display:flex; font-family:"heading_font"; margin:0'>
                        <h1 style="font-size: 30px;">Shipping</h1>
                      </div>
                      <div>
                        <div>${props.shipping.address}</div>
                        <div>${props.shipping.city}, ${props.shipping.state} ${props.shipping.postalCode} ${props.shipping.country}</div>
                      </div>
                    </div>
                    <div style="display: flex; flex-direction: column; margin-top: auto; width: 373px;">
                      <div
                        style="display: flex; justify-content: space-between; align-items: center; flex-direction: row;">
                        <label class="label" style="font-size:16px; margin-top:5px">${props.isShipped ? "Shipped at " + format_date_display(props.shippedAt) : " Not Shipped"}</label>
  
                      </div>
                      <div
                        style="display: flex; justify-content: space-between; align-items: center; flex-direction: row;">
                        <label class="label" style="font-size:16px; margin-top:5px">${props.isDelivered ? "Delivered at " + format_date_display(props.deliveredAt) : " Not Delivered"}</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style="background-color:#5a5a5a; border:0.1rem #c0c0c0 solid; border-radius:0.5rem; margin:1rem; padding:2rem"
                  bgcolor="#5a5a5a">
                  <div class="title" style='display:flex; font-family:"heading_font"; margin:0'>
                    <h1 style="font-size: 30px;">Payment</h1>
                  </div>
                  <div style='font-size: 16px;'>Payment Method: paypal</div>
                  <div>${props.isPaid ? "Paid at " + props.paidAt : " Not Paid"}</div>
                </div>
                <div
                  style="background-color:#5a5a5a; border:0.1rem #c0c0c0 solid; border-radius:0.5rem; margin:1rem; padding:2rem"
                  bgcolor="#5a5a5a">
                  <ul class="cart-list-container" style="padding:0; list-style-type:none; margin-top:0">
                    <li
                      style="border-bottom:0.1rem #c0c0c0 solid; display:flex; justify-content:space-between; margin-bottom:1rem; padding-bottom:1rem; align-items:flex-end; margin-right:20px">
                      <div class="title" style='display:flex; font-family:"heading_font"; margin:0'>
                        <h1 style="font-size: 30px;">Shopping Cart</h1>
                      </div>
                      <div>Price</div>
                    </li>
                    ${props.orderItems.map(item => {
    let item_item = `<li
                        style="border-bottom:0.1rem #c0c0c0 solid; display:flex; justify-content:space-between; margin-bottom:1rem; padding-bottom:1rem">
                        <div class="cart-image" style="flex:1 1"><img
                        src="https://glow-leds.herokuapp.com${item.image_1}" alt="product"
                            style="border-radius:8px; margin-right:10px; max-height:10rem; max-width:10rem"></div>
                        <div class="cart-name" style="flex:8 1">
                          <div><a href="https://glow-leds.herokuapp.com/product/${item.product}" style="color:white; text-decoration:none">${item.name}</a></div>
                          <div>Qty: ${item.qty}</div>
                        </div>
                        <div class="cart-price" style="flex:1 1; font-size:2.5rem; text-align:right" align="right">$${item.price}</div>
                      </li>`
    return item_item
  })}
                    
                  </ul>
                </div>
              </div>
              <div class="placeorder-action"
                style="background-color:#5a5a5a; border:0.1rem #c0c0c0 solid; border-radius:0.5rem; flex:1 1 20rem; margin-bottom:10px; padding:2rem"
                bgcolor="#5a5a5a">
                <ul style="padding:0; list-style-type:none">
                  <li class="placeorder-actions-payment"
                    style="display:flex; justify-content:space-between; margin-bottom:1rem">
                  </li>
                  <li style="display:flex; justify-content:space-between; margin-bottom:1rem">
                    <div class="title" style='display:flex; font-family:"heading_font"; margin:0'>
                      <h1 style="font-size: 30px; margin-top: 0px;">Order Summary</h1>
                    </div>
                  </li>
                  <li style="display:flex; justify-content:space-between; margin-bottom:1rem">
                    <div>Items</div>
                    <div>$${props.itemsPrice.toFixed(2)}</div>
                  </li>
                  <li style="display:flex; justify-content:space-between; margin-bottom:1rem">
                    <div>Shipping</div>
                    <div>$${props.shippingPrice.toFixed(2)}</div>
                  </li>
                  <li style="display:flex; justify-content:space-between; margin-bottom:1rem">
                    <div>Tax</div>
                    <div>$${props.taxPrice.toFixed(2)}</div>
                  </li>
                  <li
                    style="display:flex; justify-content:space-between; margin-bottom:1rem; color:white; font-size:2rem; font-weight:bold">
                    <div>Order Total</div>
                    <div>${props.totalPrice.toFixed(2)}</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
	`;
}