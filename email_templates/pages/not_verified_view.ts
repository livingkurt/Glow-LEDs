export default (props: { first_name: string; _id: string }) => {
	return `

  <div class="placeorder" style="display: flex;flex-wrap: wrap;justify-content: space-between;color: white;">
      <div class="placeorder-info" style="box-sizing: border-box;flex: 3 1 60rem;">
        <div style="box-sizing: border-box;border-radius: 1rem;background-color: #8a8a8a;padding: 1rem;margin: 1rem;">
          <div
            style="background-color: #8a8a8a;display: flex;justify-content: center;margin: 0px auto;box-sizing: border-box;">
            <h1 class="h1_title"
              style="background-color: #8a8a8a;display: flex;font-size: 40px;margin-bottom: 1vh;text-align: center;box-sizing: border-box;font-family: Helvetica;">
              Having trouble verifying your account?</h1>
          </div>

          <p style="background-color: #8a8a8a;text-align: center;box-sizing: border-box; font-size: 18px;"> We
            noticed that you created an account but have yet to verifiy it. Could you let us know if there is
            anything we can do to help?</p>

          <p style="background-color: #8a8a8a;text-align: center;box-sizing: border-box; font-size: 18px;"> Is there
            something wrong with the verification process? Does the process not make sense or work properly? </p>
          <p style="background-color: #8a8a8a;text-align: center;box-sizing: border-box; font-size: 18px;"> Please do
            not hesitate to reach out to the Glow LEDs team for help. We are happy to assist you in anyway we can.</p>
          <div style=" width: 100%; display: flex; justify-content: center;">
            <button
              style="background-color: #8a8a8a;border-radius: 5px;background-color: #676767;margin: 0 auto; margin-bottom: 10px;font-weight: bold;border: 0px;color: white;text-decoration: none;padding: 15px;box-sizing: border-box;font-size: 1.6rem;"><a
                style="font-size: 20px;color: white;text-decoration: none;box-sizing: border-box;" href="${process.env
					.NODE_ENV === 'production'
					? 'http://www.glow-leds.com'
					: 'http://localhost:3000'}/pages/pages/contact/order_issues">Contact</a></button>
          </div>
        </div>
        <div style="box-sizing: border-box;border-radius: 1rem;background-color: #8a8a8a;padding: 1rem; margin: 1rem;">
          <div
            style="background-color: #8a8a8a;display: flex;justify-content: center;flex-direction: column;margin-top: 10px;box-sizing: border-box;">
            <p style="background-color: #8a8a8a;text-align: center;box-sizing: border-box; font-size: 18px;"> Please try
              again to verify your email with the button or link provided below</p>
            <button
              style="background-color: #8a8a8a;border-radius: 5px;background-color: #676767;width: 155px;margin: 0 auto;font-weight: bold;border: 0px;color: white;text-decoration: none;padding: 15px;box-sizing: border-box;font-size: 1.6rem;">
              <a style="font-size: 20px;color: white;text-decoration: none;box-sizing: border-box;" href="${process.env
					.NODE_ENV === 'production'
					? 'http://www.glow-leds.com'
					: 'http://localhost:3000'}/account/verified/${props._id}">Verify
                Email</a></button>
            <p style="background-color: #8a8a8a; font-size: 18px;text-align: center;box-sizing: border-box;">If the
              "Verifiy Email"
              button
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
        </div>
        <div class="placeorder-action"
          style="box-sizing: border-box;flex: 1 1 20rem;border-radius: 1rem;background-color: #8a8a8a;padding: 1rem; margin: 1rem;margin-bottom: 10px;">
          <p style="background-color: #8a8a8a;text-align: center;box-sizing: border-box; font-size: 18px;"> If you are
            still unable to verify your account, please reach out and we will be able to manually verify you.</p>
          <p style="background-color: #8a8a8a;text-align: center;box-sizing: border-box; font-size: 18px;">If you are
            recieving this and already have access to your account
            please
            ignore this email.
          </p>
        </div>
      </div>
	`;
};
