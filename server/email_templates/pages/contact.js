const contact = ({ message, first_name, last_name, email, order_number, reason_for_contact }) => {
  return `
    <h1>
      Hello Kurt,
    </h1>
    <p>
      ${message}
    </p>

    <h3>
      Thank you,
    </h3>
    <p>

      <div>Name: ${first_name} ${last_name}</div>

      <div>Email: ${email}</div>

      ${order_number ? `<div>Order Number: ${order_number}</div>` : `<div></div>`}

      <div>Reason For Contact: ${reason_for_contact}</div>

      </p>
	`;
};

export default contact;
