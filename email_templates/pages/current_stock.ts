import { format_date } from "../../util";

export default (products: any) => {
  const date = new Date();
  return `<table style="width:100%;border-spacing:0;padding:10px">
	<tr style="font-size:16px">
	<td>
		<table style="border-spacing:0;margin:auto">
			<tbody>
				<tr style="font-family:helvetica;border-radius:4px">
					<td>
						<h1
							style="text-align:center;font-family:helvetica;color:#333333;font-size:50px;margin-top:0px;margin-bottom:10px;">
							Current Stock Report </h1>
						<h4
							style="text-align:center;font-family:helvetica;color:#333333;font-size:30px;margin-top:0px;margin-bottom:10px;">
							As of ${format_date(date.toISOString())}</h4>
					</td>
				</tr>
			</tbody>
		</table>
	</td>
</tr>
  <tr>
    <td style="font-family:helvetica;border:0">
      <center>
        <table style="max-width:560px;width:100%;text-align:left;border-spacing:0;margin:0 auto;   background-color: #585858; border-radius: 20px; padding:15px;">
          <tbody>
            <tr>
              <td style="font-family:helvetica">

                <table
                  style="max-width:800px;width:100%;text-align:left;border-spacing:0;margin:0 auto;   background-color: #585858; border-radius: 20px; padding:15px; margin: 10px auto;">
                  <tbody>

									<td style="width: 50%;" colspan="2">
									<h2 style="text-align: center;">Current Supremes V2 Stock</h2>
								</td>
                    ${products
                      ?.filter((row: any) => (row.subcategory === "gloves" || row.category === "gloves") && row.name.includes("V2"))
                      .map((product: any) => {
                        return `
                    <tr>
                      <td style="width: 50%;">
                        <h2 style="margin-bottom: 10px;font-size:20px;">${product.name}</h2>
                      </td>
                      <td style="font-size:18px;width: 100%;text-align: left; margin-left: 100%;"><h2 style="margin-bottom: 10px;font-size:20px;">${product.count_in_stock} Gloves</h2> </td>
                    </tr>
                    `;
                      })
                      .join("")}

                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <table style="max-width:560px;width:100%;text-align:left;border-spacing:0;padding:10px;margin:10px auto;  background-color: #585858; border-radius: 20px;">
          <tbody>
            <tr>
              <td style="font-family:helvetica">
                <table
                  style="max-width:575px;width:100%;text-align:left;border-spacing:0;margin:0 auto;   background-color: #585858; border-radius: 20px; padding:15px; margin: 10px auto;">
                  <tbody>
									<td style="width: 50%;" colspan="2">
									<h2 style="text-align: center;">Current Supremes V1 Stock</h2>
								</td>
                    ${products
                      ?.filter((row: any) => (row.subcategory === "gloves" || row.category === "gloves") && !row.name.includes("V2"))
                      .map((product: any) => {
                        return `
                    <tr>
                      <td style="width: 50%;">
                        <h2 style="margin-bottom: 10px;font-size:20px;">${product.name}</h2>
                      </td>
                      <td style="font-size:18px;width: 100%;text-align: left; margin-left: 100%;"><h2 style="margin-bottom: 10px;font-size:20px;">${product.count_in_stock} Gloves</h2> </td>
                    </tr>
                    `;
                      })
                      .join("")}

                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <table style="max-width:560px;width:100%;text-align:left;border-spacing:0;padding:10px;margin:10px auto;  background-color: #585858; border-radius: 20px;">
          <tbody>
            <tr>
              <td style="font-family:helvetica">
                <table
                  style="max-width:575px;width:100%;text-align:left;border-spacing:0;margin:0 auto;   background-color: #585858; border-radius: 20px; padding:15px; margin: 10px auto;">
                  <tbody>
									<tr>
									<td style="width: 50%;" colspan="2">
										<h2 style="text-align: center;">Current Battery Stock</h2>
									</td>
									${products
                    ?.filter((row: any) => row.category === "batteries")
                    .map((product: any) => {
                      return `
									<tr>
										<td style="width: 50%;">
											<h2 style="margin-bottom: 10px;font-size:20px;">${product.name}</h2>
										</td>
										<td style="font-size:18px;width: 100%;text-align: left; margin-left: 100%;"><h2 style="margin-bottom: 10px;font-size:20px;">${product.count_in_stock} Batteries</h2> </td>
									</tr>
									`;
                    })
                    .join("")}

                </table>
              </td>
            </tr>
          </tbody>
        </table>

      </center>
    </td>
  </tr>
</table>`;
};
