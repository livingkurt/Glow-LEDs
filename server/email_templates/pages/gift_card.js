export const gift_card_template = gift_cards => {
  return `
		<div style="padding: 20px; max-width: 600px; margin: 0 auto;">
			<h1 style="text-align: center; color: #333;">Your Glow LEDs Gift Card Purchase</h1>

			${gift_cards
        .map(
          gift_card => `
				<div style="background: #f8f8f8; padding: 20px; border-radius: 10px; margin-top: 20px;">
					<h2 style="color: #4a90e2; text-align: center;">$${gift_card.initialBalance.toFixed(2)} Gift Card${gift_card.quantity > 1 ? "s" : ""}</h2>

					${Array(gift_card.quantity)
            .fill()
            .map(
              (_, index) => `
						<div style="background: #e9ecef; padding: 15px; border-radius: 5px; margin: 15px 0; text-align: center;">
							<div style="font-size: 16px; color: #666; margin-bottom: 5px;">Gift Card ${gift_card.quantity > 1 ? index + 1 : ""}</div>
							<div style="font-size: 20px; letter-spacing: 2px; color: #333;">${gift_card.codes[index]}</div>
						</div>
					`
            )
            .join("")}
				</div>
			`
        )
        .join("")}

			<div style="margin-top: 20px; color: #666;">
				<h3>Share these codes with your gift recipients!</h3>
				<p>They can redeem them at checkout by following these steps:</p>
				<ol style="line-height: 1.6;">
					<li>Visit <a href="https://www.glowleds.com">Glow LEDs</a></li>
					<li>Add items to cart</li>
					<li>Enter a gift card code in the promo code field during checkout</li>
					<li>The gift card value will be automatically applied to their order</li>
				</ol>
			</div>

			<div style="margin-top: 30px; font-size: 14px; color: #999; text-align: center;">
				<p>Gift cards are non-transferable and cannot be redeemed for cash.</p>
				<p>Recipients can check their gift card balance anytime by entering the code at checkout.</p>
				<p>For assistance, please contact our support team.</p>
			</div>
		</div>
	`;
};
