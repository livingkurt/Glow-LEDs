export default ({ categories, promo_code }) => {
  return `
<table style="border-spacing:0;width:100%;">
  <tbody>
    <tr style="font-size:16px">
      <td>
        <p
          style="font-family:helvetica; font-weight: 800;  text-align: center;overflow-x:auto;white-space:-o-pre-wrap;word-wrap:break-word;max-width:800px;width:100%;margin: auto; margin-top: 20px;color:white;font-size:25px;line-height:50px">
          Thank you for Signing Up!
      </td>
    </tr>
  </tbody>
</table>
<table style="border-spacing:0;width:100%;">
  <tbody>
    <tr style="font-size:16px">
      <td>
        <p
          style="font-family:helvetica; font-weight: 800;  text-align: center;overflow-x:auto;white-space:-o-pre-wrap;word-wrap:break-word;max-width:800px;width:100%;margin: auto; color:white;font-size:30px;line-height:50px">
          ⬇️ Scroll Down for Promo Code ⬇️</p>
      </td>
    </tr>
  </tbody>
</table>


<table style="border-spacing:0;width:100%;">
  <tbody>
    <tr style="font-size:16px">
      <td>
        <p
          style="font-family:helvetica; font-weight: 800;  text-align: center;overflow-x:auto;white-space:-o-pre-wrap;word-wrap:break-word;max-width:800px;width:100%;margin: auto; color:white;font-size:25px;line-height:50px">
          Check Out What We Offer!
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
                    ${categories.reduce((acc, category, index) => {
                      if (index % 2 === 0) {
                        acc += '<table style="width:100%;border-spacing:0"><tbody><tr>';
                      }

                      acc += `
                        <td style="font-family:helvetica;width:50%;padding:5px;">
                          <table width="100%" style="max-width:800px">
                            <tr>
                              <td style="position: relative; width: 100%; padding-top: 100%; overflow: hidden; border-radius:20px;">
                                <a href=${category.link} target="_blank" rel="noopener noreferrer" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
                                  <img src=${category.image?.link} alt="Glow LEDs" title="Email Image"
                                    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;" />
                                  <h3 style="color: white; font-size: 25px; width: 100%; text-align: center; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); margin: 0; padding: 10px; background-color: rgba(0,0,0,0.5);">
                                    ${category.label}
                                  </h3>
                                </a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      `;

                      if (index % 2 === 1 || index === categories.length - 1) {
                        acc += "</tr></tbody></table>";
                      }

                      return acc;
                    }, "")}
                  </td>
                </tr>
              </tbody>
            </table>
          </center>
        </td>
      </tr>
    </tbody>
  </table>
<table width="100%" style="max-width:800px;margin:auto;">
  <tr>
    <table style="border-spacing:0;margin:auto">
      <tbody>
        <tr style="font-family:helvetica;border-radius:4px">
          <td>
            <h2 style="text-align:center;font-family:helvetica;color:white;font-size:20px;margin-bottom:0">
              Let your light glow as bright ever!</h2>
          </td>
        </tr>
      </tbody>
    </table>
    <table style="border-spacing:0;width:100%;padding:10px">
      <tbody>
        <tr style="font-size:16px">
          <td>
            <p
              style="font-family:helvetica; font-weight: 800;  text-align: center;overflow-x:auto;white-space:-o-pre-wrap;word-wrap:break-word;max-width:800px;width:100%;margin:20px auto;color:white;font-size:30px;line-height:50px">
              Promo Code: ${promo_code.toUpperCase()}</p>
          </td>
        </tr>
      </tbody>
    </table>
    <table style="border-spacing:0;margin:auto">
      <tbody>
        <tr style="font-family:helvetica;border-radius:4px">
          <td>
            <h2 style="text-align:center;font-family:helvetica;color:white;font-size:20px;margin-bottom:10px">
              Enter this Code at Checkout</h2>
          </td>
        </tr>
      </tbody>
    </table>

    <div style="display:flex;justify-content:center;margin:10px 0"><a
        href="/products/code/${promo_code.toUpperCase()}"
        style="background-color:#4c4f60;color:white;border-radius:10px;border:0;padding:15px;text-decoration:none" target="_blank">
        <h4 style="font-family:helvetica;margin:0;font-size:20px;text-align:center">Make it Glow with Glow LEDs</h4>
      </a></div>
  </tr>
</table>`;
};
