export default (props: any) => {
	return `<table style="border-spacing:0;width:100%; padding: 20px; max-width: 600px; width: 100%; margin: auto;">
  <tbody>
    <tr style="font-size:16px">
      <td>
        <p
          style=" font-family:helvetica;overflow-x:auto;word-wrap:break-word;max-width:600px;width:100%;margin:0px auto;color:white;font-size:16px;line-height:30px; margin-bottom: 20px;">
          Hello ${props.email},
        </p>
        <p
          style=" font-family:helvetica;overflow-x:auto;word-wrap:break-word;max-width:600px;width:100%;margin:0px auto;color:white;font-size:16px;line-height:30px; ">
          Click the button to reset your password for your Glow LEDs account.
        </p>
        <div style="display:flex;justify-content:center;margin:10px 0"><a href="${process.env.NODE_ENV === 'production'
			? 'http://www.glow-leds.com'
			: 'http://localhost:3000'}/account/resetpassword/${props._id}" alt="discount image"
            style="background-color:#4c4f60;color:white;border-radius:10px;border:0;padding:15px; width: 100%;     text-decoration: none;">
            <h4 style="font-family:helvetica;margin:0;font-size:1.2em;text-align:center; ">Reset Password</h4>
          </a></div>

        <p
          style=" font-family:helvetica;overflow-x:auto;word-wrap:break-word;max-width:600px;width:100%;margin:0px auto;color:white;font-size:16px;line-height:30px;">
          Button not working for you? Copy the url below into your browser.
        </p>
        <a href="${process.env.NODE_ENV === 'production'
			? 'http://www.glow-leds.com'
			: 'http://localhost:3000'}/account/resetpassword/${props._id}" alt="discount image"
          style="color:#3eb8ff; text-decoration: none;     word-break: break-all;">
          <p className="margin: 20px;">${process.env.NODE_ENV === 'production'
				? 'http://www.glow-leds.com'
				: 'http://localhost:3000'}/account/resetpassword/${props._id}</p>
        </a>

        <p style="
              font-family:helvetica;overflow-x:auto;word-wrap:break-word;max-width:600px;width:100%;margin:0px
              auto;color:white;font-size:16px;line-height:30px;">
          Thank you,
        </p>
        <p style="
              font-family:helvetica;overflow-x:auto;word-wrap:break-word;max-width:600px;width:100%;margin:0px
              auto;color:white;font-size:16px;line-height:30px;">
          The Glow LEDs Team
        </p>
      </td>
    </tr>
  </tbody>
</table>`;
};
