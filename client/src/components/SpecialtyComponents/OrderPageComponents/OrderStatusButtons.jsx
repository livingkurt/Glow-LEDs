import React from 'react';

const OrderStatusButtons = ({ order, update_order_payment_state, update_order_state }) => {
	return (
		<div>
			<div className="row ai-c">
				<button
					className="btn primary mv-5px w-100per"
					onClick={() => update_order_payment_state(order, order.isPaid, 'isPaid', 'paidAt')}
				>
					{order.isPaid ? 'Unset to Paid' : 'Set to Paid'}
				</button>
			</div>
			<div className="row ai-c">
				<button
					className="btn primary mv-5px w-100per"
					onClick={() => update_order_state(order, order.isReassured, 'isReassured', 'reassuredAt')}
				>
					{order.isReassured ? 'Unset to Reassured' : 'Set to Reassured'}
				</button>
			</div>
			<div className="row ai-c">
				<button
					className="btn primary mv-5px w-100per"
					onClick={() => update_order_state(order, order.isManufactured, 'isManufactured', 'manufacturedAt')}
				>
					{order.isManufactured ? 'Unset to Manufactured' : 'Set to Manufactured'}
				</button>
			</div>
			<div className="row ai-c">
				<button
					className="btn primary mv-5px w-100per"
					onClick={() => update_order_state(order, order.isPackaged, 'isPackaged', 'packagedAt')}
				>
					{order.isPackaged ? 'Unset to Packaged' : 'Set to Packaged'}
				</button>
			</div>
			<div className="row ai-c">
				<button
					className="btn primary mv-5px w-100per"
					onClick={() => update_order_state(order, order.isShipped, 'isShipped', 'shippedAt')}
				>
					{order.isShipped ? 'Unset to Shipped' : 'Set to Shipped'}
				</button>
			</div>
			<div className="row ai-c">
				<button
					className="btn primary mv-5px w-100per"
					onClick={() => update_order_state(order, order.isDelivered, 'isDelivered', 'deliveredAt')}
				>
					{order.isDelivered ? 'Unset to Delivered' : 'Set to Delivered'}
				</button>
			</div>
			<div className="row ai-c">
				<button
					className="btn primary mv-5px w-100per"
					onClick={() => update_order_state(order, order.isRefunded, 'isRefunded', 'refundedAt')}
				>
					{order.isRefunded ? 'Unset to Refunded' : 'Set to Refunded'}
				</button>
			</div>
		</div>
	);
};

export default OrderStatusButtons;
