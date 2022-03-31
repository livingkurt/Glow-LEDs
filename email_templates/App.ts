import { UnsubscribeFooter, Footer, Header } from "./components";

export default (props: any) => {
  return `
<body style="background:unset;color:white;padding:0;margin:0;font-size:16px">
  <table style="width:100%;border-spacing:0;color:white;margin:auto;font-size:16px;background-color:#7d7c7c">
    <tr>
      <td style="font-family:helvetica;color:white">
       ${Header()}
       ${props.body}
       <table
						style="text-align:left;border-spacing:0;margin:0 auto; margin-bottom: 10px;max-width:560px;width:100%; ">
						<tbody>
							<tr>
								<td style="font-family:helvetica">

									<p style="font-size:16px;text-decoration:none;display:block;color:white;padding: 10px; line-height: 25px;background-color:#333333;border:none; border-radius: 14px;  margin: 0px; text-align: center;"
										href="">
										Please DO NOT reply to this email.
										<br>
										For any questions email <a href="mailto:info.glowleds@gmail.com"
											style="font-size:16px;text-decoration:none;color:#009eff;">info.glowleds@gmail.com
									</p>
								</td>
							</tr>
						</tbody>
					</table>
       ${props.unsubscribe ? UnsubscribeFooter() : Footer()}
      </td>
    </tr>
  </table>
</body>
`;
};
