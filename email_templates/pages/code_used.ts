import { format_date, months } from "../../util";

export default (props: any) => {
  const { affiliate, number_of_uses, earnings } = props;
  const date = new Date();
  return `<table
	style="border-spacing:0;width:100%; padding: 10px; max-width: 600px; width: 100%; margin: auto; padding-bottom: 10px;">
	<tbody>
		<tr style="font-size:16px">
			<td>
				<table style="border-spacing:0;margin:auto">
					<tbody>
						<tr style="font-family:helvetica;border-radius:4px">
							<td>
								<h1
									style="text-align:center;font-family:helvetica;color:#333333;font-size:50px;margin-top:0px;margin-bottom:10px;">
									Congrats ${affiliate.artist_name}! </h1>
								<h4
									style="text-align:center;font-family:helvetica;color:#333333;font-size:30px;margin-top:0px;margin-bottom:10px;">
									Your affiliate code, "${affiliate.public_code.promo_code.toUpperCase()}" was just used in an order!</h4>
							</td>
						</tr>
					</tbody>
				</table>
				<table width="100%" style="max-width:800px;margin:auto;">
					<tr>
							<table
								style="max-width:800px;width:100%;text-align:left;border-spacing:0;margin:0 auto;   background-color: #585858; border-radius: 20px; padding:15px; margin: 10px auto;">
								<tbody>
									<tr>
										<td colspan="2" style="text-align:center">
											<h2 style="margin-bottom: 10px;font-size:40px;">${months[date.getMonth()]} Affiliate Stats:</h2>
										</td>
									</tr>
									<tr>
										<td colspan="2" style="text-align:center">
											<h4 style="margin-bottom: 10px;font-size:20px;">As of ${format_date(date.toISOString())}</h4>
										</td>
									</tr>
									<tr>
										<td style="font-size:30px;height:30px;  width: 50%; text-align: center;"><h4 style="margin-bottom: 10px;" >Code Uses: </h4></td>
										<td style="font-size:30px;height:30px;  width: 50%;text-align: center;"><h4 style="margin-bottom: 10px;">Earnings:</h4></td>
									</tr>
									<tr>
									<td style="font-size:30px;height:30px;width: 50%; text-align: center;">${number_of_uses}</td>
									<td style="font-size:30px;height:30px; width: 50%;text-align: center;">${earnings}</td>
									</tr>
								
								</tbody>
							</table>

			</td>
		</tr>
	</tbody>
</table>`;
};
