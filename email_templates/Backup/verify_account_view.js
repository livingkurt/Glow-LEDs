module.exports = (props) => {
  return `
  <div class="content"
  style="background:linear-gradient(180deg, rgba(138, 138, 138, 1) 0%, rgba(39, 39, 39, 1) 100%); background-color:#737373; border-radius:20px; box-shadow:0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); grid-area:main; margin:20px auto; padding:2rem; width: 50%;"
  bgcolor="#737373">
  <div style="display: flex; justify-content: center; ">
    <div class="title"
      style='display:flex; text-align: center; flex-direction: column;font-family:"heading_font"; margin:0'>
      <h1 style="font-size: 40px; margin: 17px 0px 10px; width: 100%;">Welcome ${props.name},
      </h1>
      <h1 style="font-size: 30px; margin: 17px 0px 10px; width: 100%;">Thanks for making an Account with Glow LEDs
      </h1>
      <div>
        Please verify your email below to get started:
      </div>
      <div style="display:flex; justify-content: center; margin-top: 10px;">
        <button
          style=" border-radius: 5px; background-color:#737373;  font-weight: bold; border: 0px; color: white; text-decoration: none; box-shadow:0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); padding: 20px; width: 200px;">
          <a style="font-size: 25px; color: white; text-decoration: none;"
            href="http://www.glow-leds.com/activate/${props._id}">Verify</a></button>
      </div>

    </div>
  </div>
</div>
	`;
}