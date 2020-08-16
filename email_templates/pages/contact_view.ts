export default (props: {
	message: string;
	first_name: string;
	last_name: string;
	email: string;
	order_number: string;
	reason_for_contact: string;
}) => {
	console.log({ props });

	return `
    <h1>
      Hello Kurt,
    </h1>
    <p>
      ${props.message}
    </p>
    <h3>
      Thank you,
    </h3>
    <p>

      <div>Name: ${props.first_name} ${props.last_name}</div>

      <div>User Email: ${props.email}</div>

      ${props.order_number ? `<div>Order Number: ${props.order_number}</div>` : `<div></div>`}

      <div>Reason For Contact: ${props.reason_for_contact}</div>
    </p>
	`;
};
