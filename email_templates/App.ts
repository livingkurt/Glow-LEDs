import { UnsubscribeFooter, Footer, Header } from "./components";

// interface Announcment {
//   body: object;
//   background_color: string;
//   unsubscribe: boolean;
// }

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default ({
  body,
  background_color,
  unsubscribe,
  header_footer_color,
}: any) => {
  return `
<body style="background:unset;color:white;padding:0;margin:0;font-size:16px">
  <table style="width:100%;border-spacing:0;color:white;margin:auto;font-size:16px;background-color:${background_color
    ? background_color
    : `#7d7c7c`}">
    <tr>
      <td style="font-family:helvetica;color:white">
       ${Header(header_footer_color)}
       ${body}
       <table
						style="text-align:left;border-spacing:0;margin:0 auto; margin-bottom: 10px;max-width:560px;width:100%; padding:10px;">
						<tbody>
							<tr>
								<td style="font-family:helvetica">

									<p style="font-size:16px;text-decoration:none;display:block;color:white;padding: 10px; line-height: 25px;background-color:#333333;border:none; border-radius: 14px;  margin: 0px; text-align: center;"
										href="">
										Please DO NOT reply to this email.
										<br>
										For any questions email <a href="mailto:${process.env.CONTACT_EMAIL}"
											style="font-size:16px;text-decoration:none;color:#009eff;">${process
                        .env.CONTACT_EMAIL}
									</p>
								</td>
							</tr>
						</tbody>
					</table>
       ${unsubscribe
         ? UnsubscribeFooter(header_footer_color)
         : Footer(header_footer_color)}
      </td>
    </tr>
  </table>
</body>
`;
};
