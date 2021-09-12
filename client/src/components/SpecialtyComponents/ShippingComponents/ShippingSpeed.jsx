// React
import React from 'react';

const ShippingSpeed = ({ rates, service, name, time, choose_shipping_rate }) => {
	return rates.map((rate, index) => {
		return (
			rate.service === service && (
				<div className=" mv-1rem jc-b  ai-c" key={index}>
					<div className="shipping_rates jc-b w-100per wrap ">
						<div className="service">{name}</div>
						<div> ${parseFloat(rate.retail_rate).toFixed(2)} </div>
						<div>
							{time ? (
								time
							) : (
								<div>
									{' '}
									{rate.est_delivery_days} {rate.est_delivery_days === 1 ? 'Day' : 'Days'}
								</div>
							)}
						</div>
					</div>
					<button
						className="custom-select-shipping_rates"
						onClick={() => choose_shipping_rate(rate, service)}
					>
						Select
					</button>
				</div>
			)
		);
	});
};

export default ShippingSpeed;
