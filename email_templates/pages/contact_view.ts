export default (props: {
	message: string;
	username: string;
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
      <div>Username: ${props.username}</div>

      <div>Username: ${props.first_name} ${props.last_name}</div>

      <div>User Email: ${props.email}</div>

      <div>Order Number: ${props.order_number}</div>

      <div>Reason For Contact: ${props.reason_for_contact}</div>
    </p>
	`;
};
