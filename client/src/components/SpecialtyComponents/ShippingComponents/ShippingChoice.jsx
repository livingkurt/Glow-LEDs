// React
import React from 'react';
import ShippingSpeed from './ShippingSpeed';

const ShippingChoice = ({
	rates,
	hide_pay_button,
	shipping,
	current_shipping_speed,
	choose_shipping_rate,
	re_choose_shipping_rate
}) => {
	return (
		<li className="w-100per">
			{hide_pay_button &&
			rates && (
				<div className="w-100per">
					{shipping &&
					shipping.international && (
						<div>
							<ShippingSpeed
								rates={rates}
								service={'FirstClassPackageInternationalService'}
								name={'Standard'}
								time={'1-3+ Weeks'}
								choose_shipping_rate={choose_shipping_rate}
							/>
							<ShippingSpeed
								rates={rates}
								service={'PriorityMailInternational'}
								name={'Prority'}
								time={'6-10 Days'}
								choose_shipping_rate={choose_shipping_rate}
							/>
							<ShippingSpeed
								rates={rates}
								service={'ExpressMailInternational'}
								name={'Express'}
								time={'3-5 Days'}
								choose_shipping_rate={choose_shipping_rate}
							/>
							<ShippingSpeed
								rates={rates}
								service={'INTERNATIONAL_ECONOMY'}
								name={'Fedex Economy'}
								choose_shipping_rate={choose_shipping_rate}
							/>
							<ShippingSpeed
								rates={rates}
								service={'INTERNATIONAL_PRIORITY'}
								name={'Fedex Prioirty'}
								choose_shipping_rate={choose_shipping_rate}
							/>
						</div>
					)}
					{shipping &&
					!shipping.international && (
						<div>
							<ShippingSpeed
								rates={rates}
								service={'First'}
								name={'Standard'}
								choose_shipping_rate={choose_shipping_rate}
							/>
							<ShippingSpeed
								rates={rates}
								service={'Priority'}
								name={'Priority'}
								choose_shipping_rate={choose_shipping_rate}
							/>
							<ShippingSpeed
								rates={rates}
								service={'Express'}
								name={'Express'}
								choose_shipping_rate={choose_shipping_rate}
							/>
						</div>
					)}
				</div>
			)}

			{!hide_pay_button &&
			current_shipping_speed && (
				<div className=" mv-1rem jc-b ai-c w-100per">
					<div className="shipping_rates jc-b w-100per ">
						<div>
							{current_shipping_speed.speed} ${parseFloat(
								current_shipping_speed.rate.retail_rate
							).toFixed(2)}{' '}
							{current_shipping_speed.rate.est_delivery_days}{' '}
							{current_shipping_speed.rate.est_delivery_days === 1 ? 'Day' : 'Days'}
						</div>
					</div>
					<button className="custom-select-shipping_rates w-10rem" onClick={() => re_choose_shipping_rate()}>
						Change
					</button>
				</div>
			)}
		</li>
	);
};

export default ShippingChoice;
