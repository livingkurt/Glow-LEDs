export default (props: { username: string; _id: string }) => {
	return `
  <div class="main_container" style="padding: 20px;">
  <div style="display: flex; justify-content: center; margin: 0px auto;">
    <h1 class="h1_title" style="display: flex; font-size: 40px; margin-bottom: 1vh; text-align: center;">
      Reset Your Password</h1>
  </div>
  <div class="title" style="display:  flex; justify-content: center;">

  </div>
  <div style="display: flex; justify-content: center; margin: 0px auto;">
    <h1 class="h2_title" style="display: flex; font-size: 25px; text-align: center;">Hello, ${props.username}
    </h1>
  </div>
  <p style=" text-align: center; "> Someone has requested a link to change your password. You
    can do this through the link below.</p>

  <div style="display:flex; justify-content: center; margin-top: 10px;">
    <button
      style=" border-radius: 5px; background-color:#73737300;  font-weight: bold; border: 0px; color: white; text-decoration: none; box-shadow:0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); padding: 15px; ">
      <a style="font-size: 20px; color: white; text-decoration: none;"
        href="${process.env.NODE_ENV === 'production'
			? 'http://www.glow-leds.com'
			: 'http://localhost:3000'}/resetpassword/${props._id}">Change your Password</a></button>
  </div>
  <p style=" text-align: center;">If you didn’t request this, please ignore this email. Your
    password won’t change until you access the link above and create a new one.
  </p>
	`;
};
