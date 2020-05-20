module.exports = function (props) {
  const format_date_display = unformatted_date => {
    const date = new Date(unformatted_date)
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formatted_date = `${month}/${day}/${year}`
    return formatted_date;
  }
  return `
  <div class="content"
        style="background:linear-gradient(180deg, rgba(138, 138, 138, 1) 0%, rgba(39, 39, 39, 1) 100%); background-color:#737373; border-radius:20px; box-shadow:0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); grid-area:main; margin:20px auto; padding:2rem; width:75%; height: 60vh;"
        bgcolor="#737373" width="75%">
  <div class="block_container" style="padding: 20px;">
          <div style="display: flex; justify-content: center; margin: 0px auto;">
            <div class="title">
              <h1 style="font-size: 50px; margin-bottom: 3vh;">Welcome ${props.name}, to Glow LEDs</h1>
            </div>
          </div>
          <div style="display: flex; justify-content: center; margin: 0px auto;">
            <div class="title">
              <h1 style="font-size: 30px;">Introducting Diffuser Caps</h1>
            </div>
          </div>
          <p style="text-align: center;">Custom 3D Printed Caps that go over the Diffuser and Glove to bring your light
            shows to another dimmension</p>
          <div style="display:flex; justify-content: center; margin-top: 10px;">
            <button
              style=" border-radius: 5px; background-color:#73737300;  font-weight: bold; border: 0px; color: white; text-decoration: none; box-shadow:0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); padding: 20px; width: 403px;     margin: 20px;     padding: 20px;">
              <a style="font-size: 25px; color: white; text-decoration: none;"
                href="https://glow-leds.herokuapp.com/category/Caps">Shop Diffuser Caps Today!</a></button>
          </div>
          <div style="display: flex; justify-content: space-between; flex-wrap: wrap;">
            <a href="https://glow-leds.herokuapp.com/category/Caps"
              style="color:white; text-decoration:none; margin-bottom:16px">
              <div
                style="display: flex; justify-content: center; margin: 0px auto 10px; flex-direction: column; text-align: center; box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px 0px, rgba(0, 0, 0, 0.19) 0px 6px 20px 0px; border-radius: 20px; padding: 10px;">
                <div class="title">
                  <h1 style="font-size: 30px; justify-content: center; margin: 20px auto;">Diffuser Caps</h1>
                </div>
                <img class="home_page_img"
                  src="https://glow-leds.herokuapp.com//images/product_images/Caps/IMG_9322.JPG" alt="diffuser_caps"
                  style="border-radius:15px; height:auto; margin:10px; max-height:300px; max-width:300px; object-fit:cover; object-position:50% 50%"
                  height="auto">
              </div>
            </a><a href="https://glow-leds.herokuapp.com/category/Diffusers"
              style="color:white; text-decoration:none; margin-bottom:16px">
              <div
                style="display: flex; justify-content: center; margin: 0px auto 10px; flex-direction: column; text-align: center; box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px 0px, rgba(0, 0, 0, 0.19) 0px 6px 20px 0px; border-radius: 20px; padding: 10px;">
                <div class="title">
                  <h1 style="font-size: 30px; justify-content: center; margin: 20px auto;">Diffusers</h1>
                </div>
                <img class="home_page_img"
                  src="https://glow-leds.herokuapp.com//images/product_images/15mm_Frosted_Dome_Diffusers/IMG_9301.JPG"
                  alt="diffusers"
                  style="border-radius:15px; height:auto; margin:10px; max-height:300px; max-width:300px; object-fit:cover; object-position:50% 50%"
                  height="auto">
              </div>
            </a><a href="https://glow-leds.herokuapp.com/category/Accessories"
              style="color:white; text-decoration:none; margin-bottom:16px">
              <div
                style="display: flex; justify-content: center; margin: 0px auto 10px; flex-direction: column; text-align: center; box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px 0px, rgba(0, 0, 0, 0.19) 0px 6px 20px 0px; border-radius: 20px; padding: 10px;">
                <div class="title">
                  <h1 style="font-size: 30px; justify-content: center; margin: 20px auto;">LED Accessories</h1>
                </div>
                <img class="home_page_img"
                  src="https://glow-leds.herokuapp.com/images/product_images/Coin_Battery_Storage/IMG_9318.JPG"
                  alt="accessories"
                  style="border-radius:15px; height:auto; margin:10px; max-height:300px; max-width:300px; object-fit:cover; object-position:50% 50%"
                  height="auto">
              </div>
            </a>
          </div>
        </div>
        </div>
	`;
}