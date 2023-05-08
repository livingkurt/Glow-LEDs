import { UnsubscribeFooter, Footer, Header } from "./components";
import NoReply from "./components/NoReply";

export default ({ body, background_color, unsubscribe, header_footer_color }: any) => {
  return `<body style="background:unset;color:white;padding:0;margin:0;font-size:16px">
  <table style="width:100%;border-spacing:0;color:white;margin:auto;font-size:16px;background-color:${
    background_color ? background_color : `#7d7c7c`
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
</body>`;
};
