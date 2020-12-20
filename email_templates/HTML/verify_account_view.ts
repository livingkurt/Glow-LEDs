export default (props: { first_name: string; _id: string }) => {
	return `

  <div class="main_container" style="padding: 20px;background-color: #8a8a8a;height: 100%;box-sizing: border-box;">
  <div
    style="background-color: #8a8a8a;display: flex;justify-content: center;margin: 0px auto;box-sizing: border-box;">
    <h1 class="h1_title"
      style="background-color: #8a8a8a;display: flex;font-size: 40px;margin-bottom: 1vh;text-align: center;box-sizing: border-box;font-family: Helvetica;">
      Verify Your Email Address</h1>
  </div>
  <div
    style="background-color: #8a8a8a;display: flex;justify-content: center;margin: 0px auto;box-sizing: border-box;">
    <h1 class="h2_title"
      style="background-color: #8a8a8a;display: flex;font-size: 25px;text-align: center;box-sizing: border-box;font-family: Helvetica;">
      Hello, ${props.first_name}
    </h1>
  </div>
  <p style="background-color: #8a8a8a;text-align: center;box-sizing: border-box;"> Thank you for registering with
    Glow LEDs. Please verify
    your email address
    by clicking below.</p>

  <div
    style="background-color: #8a8a8a;display: flex;justify-content: center;flex-direction: column;margin-top: 10px;box-sizing: border-box;">
    <button
      style="background-color: #8a8a8a;border-radius: 5px;background-color: #676767;width: 155px;margin: 0 auto;font-weight: bold;border: 0px;color: white;text-decoration: none;padding: 15px;box-sizing: border-box;font-size: 1.6rem;">
      <a style="font-size: 20px;color: white;text-decoration: none;box-sizing: border-box;"
        href="${process.env.NODE_ENV === 'production'
			? 'http://www.glow-leds.com'
			: 'http://localhost:3000'}/account/verified/${props._id}">Verify
        Email</a></button>
    <p style="background-color: #8a8a8a;text-align: center;box-sizing: border-box;">If the "Verifiy Email" button
      doesn't work click
      or
      copy and paste this link
      <a style="background-color: #8a8a8a;color: #8ce4ff;text-decoration: underline;box-sizing: border-box;"
        href=" ${process.env.NODE_ENV === 'production'
			? 'http://www.glow-leds.com'
			: 'http://localhost:3000'}/account/verified/${props._id}">${process.env.NODE_ENV === 'production'
		? 'http://www.glow-leds.com'
		: 'http://localhost:3000'}/account/verified/${props._id}</a>
      into
      your browser to verify account
    </p>
  </div>
  <p style="background-color: #8a8a8a;text-align: center;box-sizing: border-box;">If you didn’t request this, please
    ignore this email.
    Your
    email won’t be verified until you access the link above.
  </p>
</div>
</div>
	`;
};
