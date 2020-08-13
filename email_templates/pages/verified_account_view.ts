export default (props: { first_name: string }) => {
	return `
  <div class="placeorder" style="display: flex;flex-wrap: wrap;justify-content: space-between;color: white;">
      <div class="placeorder-info" style="box-sizing: border-box;flex: 3 1 60rem;">
        <div style="box-sizing: border-box;border-radius: 1rem;background-color: #8a8a8a;padding: 1rem;">
          <div style="display: flex;justify-content: center;margin: 0px auto;box-sizing: border-box;">
            <h1 class="h1_title"
              style="display: flex;     font-size: 26px;text-align: center;box-sizing: border-box;font-family: Helvetica;">
              Welcome ${props.first_name}, to Glow LEDs</h1>
          </div>
          <div style="box-sizing: border-box;border-radius: 1rem;background-color: #8a8a8a;margin: 1rem;">
            <div class="title" style="display: flex;justify-content: center;box-sizing: border-box;">
              <p style="text-align: center; font-size: 18px;max-width: 654px;box-sizing: border-box; color: white;"> Here at Glow-LEDs.com we strive to
                bring
                as much light in to as many lives as possible. All items are
                handmade at my home in Austin, TX and all ideas came from my own brain. Our items were dreamt up with
                the intention of turning your home into a glowing rainbow dreamland with infinite hours of
                entertainment. You don’t need a party to enjoy our products (although parties are definitely
                encouraged).
                The beautiful colors have the ability to turn your home into the next best festival or into a relaxing
                retreat, you decide.</p>
            </div>
          </div>
          <div class="placeorder-action"
            style="box-sizing: border-box;flex: 1 1 20rem;border-radius: 1rem;background-color: #8a8a8a;margin: 1rem;margin-bottom: 10px;">
            <div style="display: flex;justify-content: center;margin-top: 10px;box-sizing: border-box;">
              <button
                style="border-radius: 5px;background-color: #676767;font-weight: bold;border: 0px;color: white;text-decoration: none;padding: 20px;box-sizing: border-box;font-size: 1.6rem;">
                <a style="font-size: 25px;color: white;text-decoration: none;box-sizing: border-box;" href="${process
					.env.NODE_ENV === 'production'
					? 'http://www.glow-leds.com'
					: 'http://localhost:3000'}">Shop with Glow LEDs Today!</a></button>
            </div>
          </div>
        </div>
	`;
};
