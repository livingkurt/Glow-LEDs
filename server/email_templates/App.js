import { UnsubscribeFooter, Footer, Header } from "./components/index.js";
import NoReply from "./components/NoReply.js";

export default ({ body, background_color, unsubscribe, header_footer_color }) => {
  return `
   <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <!-- Add preview text that shows in email clients -->
      <title>Your Glow LEDs Email</title>
    </head>
  <body style="background:unset;color:white;padding:0;margin:0;font-size:16px">
  <table style="width:100%;border-spacing:0;color:white;margin:auto;font-size:16px;background-color:${
    background_color || `#7d7c7c`
  }">
    <tr>
      <td style="font-family:helvetica;color:white">
        ${Header(header_footer_color)}
        ${body}
        ${NoReply(background_color)}
        ${unsubscribe ? UnsubscribeFooter(header_footer_color) : Footer(header_footer_color)}
      </td>
    </tr>
  </table>
</body>
</html>`;
};
