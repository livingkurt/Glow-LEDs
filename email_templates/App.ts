import { UnsubscribeFooter, Footer, Header } from "./components";

export default (props: any) => {
  return `
<body style="background:unset;color:white;padding:0;margin:0;font-size:16px">
  <table style="width:100%;border-spacing:0;color:white;margin:auto;font-size:16px;background-color:#7d7c7c">
    <tr>
      <td style="font-family:helvetica;color:white">
       ${Header()}
       ${props.body}
       ${props.unsubscribe ? UnsubscribeFooter() : Footer()}
      </td>
    </tr>
  </table>
</body>
`;
};
