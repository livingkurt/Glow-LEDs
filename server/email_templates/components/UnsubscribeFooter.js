import config from "../../config";
import SocialMediaIcons from "./SocialMediaIcons";

export default header_footer_color => {
  return `<table style="width:100%;border-spacing:0;background-color:${
    header_footer_color ? header_footer_color : `#333333`
  }">
  <tbody>
    <tr>
      <td style="font-family:helvetica;padding-bottom:35px 0">
        <center>
        ${SocialMediaIcons()}
          <table style="max-width:560px;width:100%;text-align:left;border-spacing:0;margin:15px auto;color:white">
            <tr>
              <td style="font-family:helvetica;color:white">
                <div style="border-bottom:1px white solid"></div>
              </td>
            </tr>
          </table>
          <table
            style="max-width:800px;width:100%;text-align:left;border-spacing:0;margin:0 auto;color:white;margin-bottom:10px">
            <tr>
              <td style="font-family:helvetica;color:white">
                <p style="text-align:center;font-size:14px;color:white">Want to change how you receive these
                  emails? <br /> You can <a
                    href="https://www.glow-leds.com/secure/account/editprofile" target="_blank"
                    rel="noopener noreferrer" style="text-decoration:underline;color:white">update your preferences</a>
                  or <a href="https://www.glow-leds.com/secure/account/editprofile"
                    target="_blank" rel="noopener noreferrer" style="text-decoration:underline;color:white">unsubscribe
                  </a>from this list.</p>
              </td>
            </tr>
          </table>
          <table style="max-width:560px;width:100%;text-align:left;border-spacing:0;margin:15px auto;color:white">
            <tr>
              <td style="font-family:helvetica;color:white">
                <div style="border-bottom:1px white solid"></div>
              </td>
            </tr>
          </table>
          <table
            style="max-width:800px;width:100%;text-align:left;border-spacing:0;margin:0 auto;color:white;margin-bottom:10px">
            <tr>
              <td style="font-family:helvetica;color:white">
                <p style="text-align:center;font-size:16px;color:white"><strong>Glow LEDs</strong> <br /><br />${
                  config.PRODUCTION_ADDRESS
                } <br />${config.PRODUCTION_CITY}, ${config.PRODUCTION_STATE} ${config.PRODUCTION_POSTAL_CODE} </p>
                <p style="text-align:center;font-size:16px;color:white">Copyright © 2022</p>
              </td>
            </tr>
          </table>
          <table
            style="max-width:800px;width:100%;text-align:left;border-spacing:0;margin:0 auto;color:white;margin-bottom:10px">
            <tr>
              <td style="font-family:helvetica;color:white; width: 100%;margin: auto;text-align: center;">
                <img src="https://images2.imgbox.com/78/52/dfNQTgC3_o.png" alt="logo" style="width:143px;">
              </td>
            </tr>
          </table>
        </center>
      </td>
    </tr>
  </tbody>
</table>`;
};
