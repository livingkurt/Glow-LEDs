export default ({ user, categories }) => {
  return `<div style="background-color:#7d7c7c;padding:10px">



  <table style="border-spacing:0;width:100%;">
    <tbody>
      <tr style="font-size:16px">
        <td>
          <h1
            style="text-align:center;font-family:helvetica;width:100%;margin:0; margin-top: 10px;line-height:50px;color:#333333;font-size:50px;">
             ${user.first_name.toUpperCase()}, </h1>
          <h1
            style="text-align:center;font-family:helvetica;width:100%;margin:0; margin-top: 10px;line-height:50px;color:#333333;font-size:40px;">
             WELCOME TO GLOW LEDS!</h1>
        </td>
      </tr>

    </tbody>
  </table>

        <table
          style="max-width:800px;width:100%;text-align:left;border-spacing:0;margin:0 auto;   background-color: #585858; border-radius: 20px; padding:15px; margin: 10px auto;">
          <tbody>
            <tr style="font-size:16px">
              <td>
                <p
                  style="font-size:16px;line-height:30px;max-width:800px;width:100%;margin:0px;color:white; text-align: center;">
                  Here at
                  Glow LEDs
                  we aim to be the biggest innovators in the gloving industry.</p>
                <table
                style="max-width:560px;width:100%;text-align:left;border-spacing:0;margin:15px auto;color:white">
                <tr>
                  <td style="font-family:helvetica;color:white">
                    <div style="border-bottom:1px white solid"></div>
                  </td>
                </tr>
              </table>
                <p
                  style="font-size:16px;line-height:30px;max-width:800px;width:100%;margin:0px;color:white; text-align: center;">
                  Some of our most popular inventions include EXO
                  Diffusers, Decals, Diffuser Caps and Glowskinz! We've even put our own spin on
                  gloves and batteries! Plus we're one of the few places where you can order Custom gloving accessories.
                </p>
                <table
                style="max-width:560px;width:100%;text-align:left;border-spacing:0;margin:15px auto;color:white">
                <tr>
                  <td style="font-family:helvetica;color:white">
                    <div style="border-bottom:1px white solid"></div>
                  </td>
                </tr>
              </table>
                <p
                  style="font-size:16px;line-height:30px;max-width:800px;width:100%;margin:0px;color:white; text-align: center;">

                  We are ran by a very
                  small team of people who are dedicated to listening to the community and creating what's most wanted.
                  Our products are made by hand to order, so every order is made with love.
                  </p>
              </td>
            </tr>
          </tbody>
        </table>

  <table style="border-spacing:0;width:100%;">
    <tbody>
      <tr style="font-size:16px">
        <td>
          <p
            style="font-family:helvetica; font-weight: 800;  text-align: center;overflow-x:auto;white-space:-o-pre-wrap;word-wrap:break-word;max-width:800px;width:100%;margin: auto; color:#333333;font-size:20px;line-height:50px">
            Check out what we have to offer!
        </td>
      </tr>
    </tbody>
  </table>
    <table style="width:100%;border-spacing:0">
    <tbody>
      <tr>
        <td style="font-family:helvetica">
          <center>
            <table style="max-width:800px;padding:0px;width:100%;text-align:left;border-spacing:0;margin:0 auto">
              <tbody>
                ${categories
                  .map(
                    category => `
                  <tr>
                    <td style="font-family:helvetica;width:100%;padding:5px;">
                      <table width="100%" style="max-width:800px">
                        <tr>
                          <td style="position: relative; width: 100%; padding-top: 100%; overflow: hidden; border-radius:20px;">
                            <a href=${category.link} target="_blank" rel="noopener noreferrer" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
                              <img src=${category.image?.link} alt="Glow LEDs" title="Email Image"
                                style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;" />
                              <h2 style="color: white; font-size: 40px; width: 100%; text-align: center; position: absolute; top: 10%; left: 50%; transform: translate(-50%, -50%); margin: 0; padding: 10px; ">
                                ${category.label}
                              </h2>
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>
          </center>
        </td>
      </tr>
    </tbody>
  </table>

  <table width="100%" style="max-width:800px;margin:auto;">
    <tr>
      <div style="display:flex;justify-content:center;margin:10px 0"><a href="/products"
          style="background-color:#4c4f60;color:white;border-radius:10px;border:0;padding:15px;text-decoration:none"
          target="_blank">
          <h4 style="font-family:helvetica;margin:0;font-size:20px;text-align:center">Explore Today</h4>
        </a></div>
    </tr>
  </table>




</div>`;
};
