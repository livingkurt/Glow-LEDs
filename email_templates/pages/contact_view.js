
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
      <div>Username: ${props.user_name}</div>

      <div>User Email: ${props.user_email}</div>

      <div>Order Number: ${props.order_number}</div>

      <div>Reason For Contact: ${props.reason_for_contact}</div>
    </p>
	`;
}