export default (props: {
	message: string;
	first_name: string;
	last_name: string;
	email: string;
	order_number: string;
	reason_for_contact: string;
	content_type: string;
	glover_name: string;
	instagram_handle: string;
	facebook_name: string;
	song_id: string;
	quote: string;
}) => {
	console.log({ props });

	return `
    <h1>
      Hello ${props.first_name},
    </h1>
    <p>
      Thank you for contacting Glow LED! 
      We'll answer your questions/requests as soon as possible. Thank you for your patience and support!
    </p>
    <h3>
      Message to Glow LEDs from you,
    </h3>
    <p>
      ${props.message}
    </p>
    <h3>
      Thank you,
    </h3>
    <p>
      <div>Name: ${props.first_name} ${props.last_name}</div>

      <div>Email: ${props.email}</div>

      ${props.order_number ? `<div>Order Number: ${props.order_number}</div>` : `<div></div>`}
      
      <div>Reason For Contact: ${props.reason_for_contact}</div>

      ${props.content_type ? `<div>Content Type: ${props.content_type}</div>` : `<div></div>`}

      ${props.glover_name ? `<div>Glover Name: ${props.glover_name}</div>` : `<div></div>`}

      ${props.instagram_handle ? `<div>Instagram Handle: ${props.instagram_handle}</div>` : `<div></div>`}

      ${props.facebook_name ? `<div>Facebook Name: ${props.facebook_name}</div>` : `<div></div>`}

      ${props.song_id ? `<div>Song ID: ${props.song_id}</div>` : `<div></div>`}
      
      ${props.quote ? `<div>Quote: ${props.quote}</div>` : `<div></div>`}

    </p>
	`;
};
