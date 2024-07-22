export default ({ categories, promo_code }) => {
  return `<div style="background-color:#7d7c7c;padding:10px">



  <table style="border-spacing:0;width:100%;">
    <tbody>
      <tr style="font-size:16px">
        <td>

          <h1
            style="text-align:center;font-family:helvetica;width:100%;margin:0; margin-top: 10px;line-height:50px;color:#333333;font-size: 30px;">
            Thank you for Signing Up!</h1>

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
        style="font-family:helvetica; font-weight: 800;  text-align: center;overflow-x:auto;white-space:-o-pre-wrap;word-wrap:break-word;max-width:800px;width:100%;margin: auto; color:#333333;font-size:25px;line-height:50px">
        Check out what we have to offer!
    </td>
  </tr>
</tbody>
</table>
<table style="border-spacing:0;width:100%;">
    <tbody>
      <tr style="font-size:16px">
        <td>

          <h1
            style="text-align:center;font-family:helvetica;width:100%;margin:0; margin-bottom: 10px;line-height:50px;color:#333333;font-size:30px;">
            ⬇️ Scroll Down for Promo Code ⬇️ </h1>
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
                <tr>
                  <td style="font-family:helvetica">

                    <table style="width:100%;border-spacing:0">
                      <tbody>
                        <tr>
                          ${
                            categories[0]
                              ? `<td style="font-family:helvetica;width:50%">
                            <table width="100%" style="max-width:800px">
                              <tr>
                                <td style="position: relative;">

                                  <a href=${categories[0].link} target="_blank" rel="noopener noreferrer"><img
                                      src=${categories[0].image.link} alt="Glow LEDs" title="Email Image"
                                      style="text-decoration: none; text-align:center;width:100%;border-radius:20px; " />
                                    <h3
                                      style="color: white; font-size: 25px; width: 100%; text-align: center;  position: absolute; top: 10%; left: 50%; transform: translate(-50%, -50%);">
                                      ${categories[0].label}</h3>
                                  </a>
                                </td>
                              </tr>
                            </table>
                          </td>`
                              : ""
                          }
                          ${
                            categories[1]
                              ? `<td style="font-family:helvetica;width:50%">
                            <table width="100%" style="max-width:800px">
                              <tr>
                                <td style="position: relative;">

                                  <a href=${categories[1].link} target="_blank" rel="noopener noreferrer"><img
                                      src=${categories[1].image.link} alt="Glow LEDs" title="Email Image"
                                      style="text-decoration: none; text-align:center;width:100%;border-radius:20px; " />
                                    <h3
                                      style="color: white; font-size: 25px; width: 100%; text-align: center; margin-left: auto; position: absolute; top: 10%; left: 50%; transform: translate(-50%, -50%);">
                                      ${categories[1].label}</h3>
                                  </a>
                                </td>
                              </tr>
                            </table>
                          </td>`
                              : ""
                          }

                        </tr>
                      </tbody>
                    </table>
                    <table style="width:100%;border-spacing:0">
                      <tbody>
                        <tr>
                          ${
                            categories[2]
                              ? `<td style="font-family:helvetica;width:50%">
                            <table width="100%" style="max-width:800px">
                              <tr>
                                <td style="position: relative;">

                                  <a href=${categories[2].link} target="_blank" rel="noopener noreferrer"><img
                                      src=${categories[2].image.link} alt="Glow LEDs" title="Email Image"
                                      style="text-decoration: none; text-align:center;width:100%;border-radius:20px; " />
                                    <h3
                                      style="color: white; font-size: 25px; width: 100%; text-align: center;  position: absolute; top: 10%; left: 50%; transform: translate(-50%, -50%);">
                                      ${categories[2].label}</h3>
                                  </a>
                                </td>
                              </tr>
                            </table>
                          </td>`
                              : ""
                          }
                          ${
                            categories[3]
                              ? `<td style="font-family:helvetica;width:50%">
                            <table width="100%" style="max-width:800px">
                              <tr>
                                <td style="position: relative;">

                                  <a href=${categories[3].link} target="_blank" rel="noopener noreferrer"><img
                                      src=${categories[3].image.link} alt="Glow LEDs" title="Email Image"
                                      style="text-decoration: none; text-align:center;width:100%;border-radius:20px; " />
                                    <h3
                                      style="color: white; font-size: 25px; width: 100%; text-align: center; margin-left: auto; position: absolute; top: 10%; left: 50%; transform: translate(-50%, -50%);">
                                      ${categories[3].label}</h3>
                                  </a>
                                </td>
                              </tr>
                            </table>
                          </td>`
                              : ""
                          }

                        </tr>
                      </tbody>
                    </table>
                    <table style="width:100%;border-spacing:0">
                      <tbody>
                        <tr>
                          ${
                            categories[4]
                              ? `<td style="font-family:helvetica;width:50%">
                            <table width="100%" style="max-width:800px">
                              <tr>
                                <td style="position: relative;">

                                  <a href=${categories[4].link} target="_blank" rel="noopener noreferrer"><img
                                      src=${categories[4].image.link} alt="Glow LEDs" title="Email Image"
                                      style="text-decoration: none; text-align:center;width:100%;border-radius:20px; " />
                                    <h3
                                      style="color: white; font-size: 25px; width: 100%; text-align: center;  position: absolute; top: 10%; left: 50%; transform: translate(-50%, -50%);">
                                      ${categories[4].label}</h3>
                                  </a>
                                </td>
                              </tr>
                            </table>
                          </td>`
                              : ""
                          }
                          ${
                            categories[5]
                              ? `<td style="font-family:helvetica;width:50%">
                            <table width="100%" style="max-width:800px">
                              <tr>
                                <td style="position: relative;">

                                  <a href=${categories[5].link} target="_blank" rel="noopener noreferrer"><img
                                      src=${categories[5].image.link} alt="Glow LEDs" title="Email Image"
                                      style="text-decoration: none; text-align:center;width:100%;border-radius:20px; " />
                                    <h3
                                      style="color: white; font-size: 25px; width: 100%; text-align: center; margin-left: auto; position: absolute; top: 10%; left: 50%; transform: translate(-50%, -50%);">
                                      ${categories[5].label}</h3>
                                  </a>
                                </td>
                              </tr>
                            </table>
                          </td>`
                              : ""
                          }

                        </tr>
                      </tbody>
                    </table>
                    <table style="width:100%;border-spacing:0">
                      <tbody>
                        <tr>
                          ${
                            categories[6]
                              ? `<td style="font-family:helvetica;width:50%">
                            <table width="100%" style="max-width:800px">
                              <tr>
                                <td style="position: relative;">

                                  <a href=${categories[6].link} target="_blank" rel="noopener noreferrer"><img
                                      src=${categories[6].image.link} alt="Glow LEDs" title="Email Image"
                                      style="text-decoration: none; text-align:center;width:100%;border-radius:20px; " />
                                    <h3
                                      style="color: white; font-size: 25px; width: 100%; text-align: center;  position: absolute; top: 10%; left: 50%; transform: translate(-50%, -50%);">
                                      ${categories[6].label}</h3>
                                  </a>
                                </td>
                              </tr>
                            </table>
                          </td>`
                              : ""
                          }
                          ${
                            categories[7]
                              ? `<td style="font-family:helvetica;width:50%">
                            <table width="100%" style="max-width:800px">
                              <tr>
                                <td style="position: relative;">

                                  <a href=${categories[7].link} target="_blank" rel="noopener noreferrer"><img
                                      src=${categories[7].image.link} alt="Glow LEDs" title="Email Image"
                                      style="text-decoration: none; text-align:center;width:100%;border-radius:20px; " />
                                    <h3
                                      style="color: white; font-size: 25px; width: 100%; text-align: center; margin-left: auto; position: absolute; top: 10%; left: 50%; transform: translate(-50%, -50%);">
                                      ${categories[7].label}</h3>
                                  </a>
                                </td>
                              </tr>
                            </table>
                          </td>`
                              : ""
                          }

                        </tr>
                      </tbody>
                    </table>
                    <table style="width:100%;border-spacing:0">
                      <tbody>
                        <tr>
                          ${
                            categories[8]
                              ? `<td style="font-family:helvetica;width:50%">
                            <table width="100%" style="max-width:800px">
                              <tr>
                                <td style="position: relative;">

                                  <a href=${categories[8].link} target="_blank" rel="noopener noreferrer"><img
                                      src=${categories[8].image.link} alt="Glow LEDs" title="Email Image"
                                      style="text-decoration: none; text-align:center;width:100%;border-radius:20px; " />
                                    <h3
                                      style="color: white; font-size: 25px; width: 100%; text-align: center;  position: absolute; top: 10%; left: 50%; transform: translate(-50%, -50%);">
                                      ${categories[8].label}</h3>
                                  </a>
                                </td>
                              </tr>
                            </table>
                          </td>`
                              : ""
                          }
                          ${
                            categories[9]
                              ? `<td style="font-family:helvetica;width:50%">
                            <table width="100%" style="max-width:800px">
                              <tr>
                                <td style="position: relative;">

                                  <a href=${categories[9].link} target="_blank" rel="noopener noreferrer"><img
                                      src=${categories[9].image.link} alt="Glow LEDs" title="Email Image"
                                      style="text-decoration: none; text-align:center;width:100%;border-radius:20px; " />
                                    <h3
                                      style="color: white; font-size: 25px; width: 100%; text-align: center; margin-left: auto; position: absolute; top: 10%; left: 50%; transform: translate(-50%, -50%);">
                                      ${categories[9].label}</h3>
                                  </a>
                                </td>
                              </tr>
                            </table>
                          </td>`
                              : ""
                          }

                        </tr>
                      </tbody>
                    </table>
                    <table style="width:100%;border-spacing:0">
                      <tbody>
                        <tr>
                          ${
                            categories[10]
                              ? `<td style="font-family:helvetica;width:50%">
                            <table width="100%" style="max-width:800px">
                              <tr>
                                <td style="position: relative;">

                                  <a href=${categories[10].link} target="_blank" rel="noopener noreferrer"><img
                                      src=${categories[10].image.link} alt="Glow LEDs" title="Email Image"
                                      style="text-decoration: none; text-align:center;width:100%;border-radius:20px; " />
                                    <h3
                                      style="color: white; font-size: 25px; width: 100%; text-align: center;  position: absolute; top: 10%; left: 50%; transform: translate(-50%, -50%);">
                                      ${categories[10].label}</h3>
                                  </a>
                                </td>
                              </tr>
                            </table>
                          </td>`
                              : ""
                          }
                          ${
                            categories[11]
                              ? `<td style="font-family:helvetica;width:50%">
                            <table width="100%" style="max-width:800px">
                              <tr>
                                <td style="position: relative;">

                                  <a href=${categories[11].link} target="_blank" rel="noopener noreferrer"><img
                                      src=${categories[11].image.link} alt="Glow LEDs" title="Email Image"
                                      style="text-decoration: none; text-align:center;width:100%;border-radius:20px; " />
                                    <h3
                                      style="color: white; font-size: 25px; width: 100%; text-align: center; margin-left: auto; position: absolute; top: 10%; left: 50%; transform: translate(-50%, -50%);">
                                      ${categories[11].label}</h3>
                                  </a>
                                </td>
                              </tr>
                            </table>
                          </td>`
                              : ""
                          }

                        </tr>
                      </tbody>
                    </table>

                  </td>
                </tr>
              </tbody>
            </table>
          </center>
        </td>
      </tr>
    </tbody>
  </table>
  ${
    promo_code
      ? `
  <table style="border-spacing:0;width:100%;padding:10px">
    <tbody>
      <tr style="font-size:16px">
        <td>
          <p
            style="font-family:helvetica; font-weight: 800;  text-align: center;overflow-x:auto;white-space:-o-pre-wrap;word-wrap:break-word;max-width:800px;width:100%;margin:0px auto;color:#333333;font-size:30px;line-height:50px">
            Promo Code: ${promo_code.toUpperCase()}</p>
        </td>
      </tr>
    </tbody>
  </table>
  <table style="border-spacing:0;margin:auto">
    <tbody>
      <tr style="font-family:helvetica;border-radius:4px">
        <td>
          <h2 style="text-align:center;font-family:helvetica;color:#333333;font-size:20px;margin-bottom:10px">
            Enter this code at checkout for 10% off</h2>
        </td>
      </tr>
    </tbody>
  </table>
  <table width="100%" style="max-width:800px;margin:auto;">
    <tr>
      <div style="display:flex;justify-content:center;margin:10px 0"><a href="https://www.glow-leds.com/"
          style="background-color:#4c4f60;color:white;border-radius:10px;border:0;padding:15px;text-decoration:none"
          target="_blank">
          <h4 style="font-family:helvetica;margin:0;font-size:20px;text-align:center">Explore Today</h4>
        </a></div>
    </tr>
  </table>`
      : ""
  }
</div>`;
};
