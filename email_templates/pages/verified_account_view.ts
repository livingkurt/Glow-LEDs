export default (props: { name: string }) => {
	return `
  <div class="main_container" style="padding: 20px;">
          <div style="display: flex; justify-content: center; margin: 0px auto;">
            <h1 class="h1_title" style="display: flex; font-size: 50px; margin-bottom: 3vh; text-align: center;">
              Welcome ${props.name}, to Glow LEDs</h1>
          </div>
          <div class="title" style="display:  flex; justify-content: center;">
            <p style=" text-align: center; max-width: 654px;"> Here at Glow-LEDs.com, we strive to bring as much light in to as many lives as possible. All items are
            handmade in my apartment in Austin, TX, spanning a wide variety of flow arts, including Infinity
            Mirrors, String Lights, and Gloving Accessories. We pride ourselves on more than just the quality of our
            EDM products; Glow-LEDs.com is here to make your viby dreams happen..</p>
          </div>
          <div style="display:flex; justify-content: center; margin-top: 10px;">
            <button
              style=" border-radius: 5px; background-color:#73737300;  font-weight: bold; border: 0px; color: white; text-decoration: none; box-shadow:0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); padding: 20px; width: 403px;     margin: 20px;     padding: 20px;">
              <a style="font-size: 25px; color: white; text-decoration: none;"
                href="${process.env.NODE_ENV === 'production'
					? 'http://www.glow-leds.com'
					: 'http://localhost:3000'}">Shop with Glow LEDs Today!</a></button>
          </div>
        </div>
	`;
};
