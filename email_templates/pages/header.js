module.exports = function (props) {
  return `
  <header class="header"
        style=" background-color:#333; box-shadow:0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); color:#fff; display:flex; grid-area:header;list-style-type:none; padding:15px; display:flex; flex-direction: column; "
        bgcolor="#333333">
        <div class="brand"><a href="https://glow-leds.herokuapp.com/"
            style="color:#fff; text-decoration:none; font-size:3rem; font-weight:bold; display: flex; justify-content: center;"><img
              class="zoom logo" height="150px" src="https://glow-leds.herokuapp.com/images/Glow_Logo.png"
              alt="Glow LEDs" style=" transition:all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)"></a>
        </div>
        <div style="display: flex; justify-content: center; margin: 0px auto; flex-direction: column;">
          <a href="https://glow-leds.herokuapp.com/" style="color:white; text-decoration:none">
            <div class="title" style='display:flex; font-family:"heading_font"; margin:0'>
              <h1 style="font-size: 67px; margin: 17px 0px 10px; text-align: center; width: 100%;">Glow LEDs</h1>
            </div>
          </a>
        </div>
      </header>
`;
}

