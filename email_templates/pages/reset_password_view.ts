export default (props: { first_name: string; _id: string }) => {
	return `

        <div class="placeorder" style="display: flex;flex-wrap: wrap;justify-content: space-between;color: white;">
        <div class="placeorder-info" style="box-sizing: border-box;flex: 3 1 60rem;">
          <div style="box-sizing: border-box;border-radius: 1rem;background-color: #8a8a8a;padding: 1rem;">
          <div style="display: flex;justify-content: center;margin: 0px auto;box-sizing: border-box;">
          <h1 class="h1_title" style="display: flex;font-size: 28px;margin-bottom: 1vh;text-align: center;box-sizing: border-box;font-family: Helvetica;">
            Reset Your Password</h1>
        </div>
            <div style="box-sizing: border-box;border-radius: 1rem;background-color: #8a8a8a;margin: 1rem;">
            <div style="display: flex;justify-content: center;margin: 0px auto;box-sizing: border-box;">
            <h1 class="h2_title" style="display: flex;font-size: 25px;text-align: center;box-sizing: border-box;font-family: Helvetica;">Hello, ${props.first_name}
            </h1>
          </div>
            </div>
            <div class="placeorder-action"
              style="box-sizing: border-box;flex: 1 1 20rem;border-radius: 1rem;background-color: #8a8a8a;margin: 1rem;margin-bottom: 10px;">
              <p style="text-align: center;box-sizing: border-box;"> Someone has requested a link to change your password. You
              can do this through the link below.</p>
          
            <div style="display: flex;justify-content: center;margin-top: 10px;box-sizing: border-box;">
              <button style=" background-color: #676767;border-radius: 5px;font-weight: bold;border: 0px;color: white;text-decoration: none;padding: 15px;box-sizing: border-box;font-size: 1.6rem;">
                <a style="font-size: 20px;color: white;text-decoration: none;box-sizing: border-box;" href="${process
					.env.NODE_ENV === 'production'
					? 'http://www.glow-leds.com'
					: 'http://localhost:3000'}/account/resetpassword/${props._id}">Change your Password</a></button>
            </div>
            <p style="text-align: center;box-sizing: border-box;">If you didn’t request this, please ignore this email. Your
              password won’t change until you access the link above and create a new one.
            </p>
            </div>
          </div>
	`;
};
