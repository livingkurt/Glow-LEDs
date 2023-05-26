import config from "../../config";

export default (background_color: string): string => {
  return `<table style="width:100%;border-spacing:0;color:white;background:${
    background_color ? background_color : `#7d7c7c`
  };padding:20px;">
  <tr>
    <td style="font-family:helvetica;color:white">
    <table
    style="text-align:left;border-spacing:0;margin:0 auto; margin-bottom: 10px;max-width:560px;width:100%; padding:10px;">
    <tbody>
      <tr>
        <td style="font-family:helvetica">

          <p style="font-size:16px;text-decoration:none;display:block;color:white;padding: 10px; line-height: 25px;background-color:#333333;border:none; border-radius: 14px;  margin: 0px; text-align: center;"
            href="">
            Please DO NOT reply to this email.
            <br>
            For any questions email <a href="mailto:${config.CONTACT_EMAIL}"
              style="font-size:16px;text-decoration:none;color:#009eff;">${config.CONTACT_EMAIL}
          </p>
        </td>
      </tr>
    </tbody>
  </table>
    </td>
  </tr>
</table>`;
};
