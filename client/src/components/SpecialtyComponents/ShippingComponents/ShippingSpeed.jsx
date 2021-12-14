// React
import React from 'react';

const ShippingSpeed = ({ rates, service, name, time, choose_shipping_rate }) => {
	return rates.map((rate, index) => {
		console.log({ rate });
		return (
			rate.service === service && (
				<div className=" mv-1rem jc-b  ai-c" key={index}>
					<div className="shipping_rates jc-b w-100per wrap ">
						<label className="service">{name}</label>
						<label> ${parseFloat(rate.retail_rate || rate.rate).toFixed(2)} </label>
						{time ? (
							<label>time</label>
						) : (
							<label>
								{' '}
								{rate.est_delivery_days} {rate.est_delivery_days === 1 ? 'Day' : 'Days'}
							</label>
						)}
					</div>
					<button
						className="btn custom-select-shipping_rates"
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
