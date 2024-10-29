import { format_date } from "../../utils/util.js";

export default ({ first_name, amount, stripe_connect_id, paid_at }) => {
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
									Hi ${first_name}! </h1>
								<h4
									style="text-align:center;font-family:helvetica;color:#333333;font-size:30px;margin-top:0px;margin-bottom:10px;">
									Your earnings are on the way!</h4>
							</td>

						</tr>
					</tbody>
				</table>
				<table style="border-spacing:0;margin:auto">
					<tbody>
					<tr>
					<h4 style="margin-bottom: 10px; color: #333333;">Your earnings will begin the process of transferring to your bank account the next business day, and you will see it refected in your bank account within the next week.</h4>
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
										<h4 style="margin-bottom: 10px;font-size:20px;">Issue Date: ${format_date(paid_at)}</h4>
									</td>
								</tr>
								<tr>
									<td style="font-size:30px;height:30px;  width: 50%; text-align: center;">
										<h4 style="margin-bottom: 10px;">Stripe ID: </h4>
									</td>
									<td style="font-size:30px;height:30px;  width: 50%;text-align: center;">
										<h4 style="margin-bottom: 10px;">Earnings:</h4>
									</td>
								</tr>
								<tr>
                <td style="font-size:16px;height:30px; width: 50%;text-align: center;">${stripe_connect_id}</td>
                <td style="font-size:30px;height:30px;width: 50%; text-align: center;">$${amount?.toFixed(2)}</td>
								</tr>


							</tbody>
						</table>

			</td>
		</tr>
	</tbody>
</table>`;
};
