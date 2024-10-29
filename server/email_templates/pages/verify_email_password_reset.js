import config from "../../config.js";
import { domain } from "../email_template_helpers.js";

export default ({ email, url }) => {
  return `<table style="border-spacing:0;width:100%; padding: 10px; max-width: 600px; width: 100%; margin: auto;">
  <tbody>
    <tr style="font-size:16px">
      <td>
        <h2
          style=" font-family:helvetica;overflow-x:auto;word-wrap:break-word;max-width:600px;width:100%;margin:0px auto;color:#333333;font-size:20px;line-height:30px; margin-bottom: 20px;">
          Hello ${email},
        </h2>
        <table
            style="max-width:800px;width:100%;text-align:left;border-spacing:0;margin:0 auto;   background-color: #585858; border-radius: 20px; padding:15px; margin: 10px auto;">
            <tbody>
              <tr>
                <td style="font-family:helvetica">
        <p
          style=" font-family:helvetica;overflow-x:auto;word-wrap:break-word;max-width:600px;width:100%;margin:0px auto;color:white;font-size:16px;line-height:30px; ">
          Click the button to reset your password for your Glow LEDs account.
        </p>
        <div style="display:flex;justify-content:center;margin:10px 0"><a href="${url}" alt="discount image"
            style="background-color:#4c4f60;color:white;border-radius:10px;border:0;padding:15px; width: 100%;     text-decoration: none;">
            <h4 style="font-family:helvetica;margin:0;font-size:1.2em;text-align:center; " target="_blank">Reset Password</h4>
          </a></div>

        <p
          style=" font-family:helvetica;overflow-x:auto;word-wrap:break-word;max-width:600px;width:100%;margin:0px auto;color:white;font-size:16px;line-height:30px;">
          Button not working for you? Copy the url below into your browser.
        </p>
        <a href="${url}" alt="discount image"
          style="color:#3eb8ff; text-decoration: none;     word-break: break-all;">
          <p className="margin: 20px;">${url}</p>
        </a>
        </td>
        </tr>
      </tbody>
    </table>

      </td>
    </tr>
  </tbody>
</table>`;
};
