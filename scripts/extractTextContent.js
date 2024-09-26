const { JSDOM } = require("jsdom");

// const html = `<table
// style=3D"max-width:560px;padding:10px;text-align:left;border-spac=
// ing:0;margin:0 auto;width:100%; ">
// <tr>
//   <td =
// style=3D"font-family:helvetica">
//     <table =
// style=3D"width:100%;border-spacing:0;">
//       <tbody>
//         <tr>
//           <td style=3D'font-family: helvetica;'>
//             <table style=3D'
//                     width: 100%;
//                     border-spacing: 0;
//                     border-bottom: =
// 1px white solid;'>
//               <tbody>
//                 <tr =
// style=3D'width: 100%'>
//                   <td style=3D'font-family: =
// helvetica'>
//                     <table style=3D'border-spacing: 0px; width:=
// 100%; margin: 10px auto;'>
//                       <tbody>
//                         <tr>
//                           <td style=3D'font-family:=
// helvetica;'>
//                             <div style=3D'margin-bottom: 10px; =
// margin-right: 10px;'>
//                               <img src=3Dhttps://thumbs2.=
// imgbox.com/10/ec/IZYEd3it_t.jpg alt=3DOPYN Batman Decals width=3D"60"
//                                 height=3D"60" style=3D'border-radius:8px;' =
// title=3D"Product Image" />
//                             =09
//                               <div />
//                             </div>
//                           </td>
//                           <td =
// style=3D'font-family:helvetica;width:100%;'>
//                             <span
//                               style=3D'font-size:16px;font-weight:600;line-heigh=
// t:1.4;color:white;'>
//                               <div>
// OPYN Batman Decals=20
// =20
// - OPYN Nanoskinz V2=20
// </div>
//                             </span>
//                             <br />
//                           </td>
//                           <td =
// style=3D'font-family:helvetica;width:100%;white-space:nowrap;'>
//                             <p style=3D'color:white;line-height:150%;font-size:=
// 16px;font-weight:600;margin:0 0 0 15px;'
//                               =
// align=3D"right">
//                               <label>
// $7.99
// </label>
//                             </p>
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </td>
//         </tr><tr>
//           <td =
// style=3D'font-family: helvetica;'>
//             <table style=3D'
//                     width: 100%;
//                     border-spacing: 0;
//                     border-bottom: 1px white solid;'>
//               <tbody>
//                 <tr style=3D'width: 100%'>
//                   <td style=3D'font-family: helvetica'>
//                     <table style=3D'border-spacing: 0px; width: 100%; =
// margin: 10px auto;'>
//                       <tbody>
//                         =
// <tr>
//                           <td style=3D'font-family: helvetica;'>
//                             <div style=3D'margin-bottom: 10px; margin-right: =
// 10px;'>
//                               <img src=3Dhttps://thumbs2.imgbox.=
// com/72/18/yHpXwBIq_b.jpg alt=3DMini Flashtip Diffusers width=3D"60"
//                                 height=3D"60" style=3D'border-radius:8px;' =
// title=3D"Product Image" />
//                             =09
//                               <div />
//                             </div>
//                           </td>
//                           <td =
// style=3D'font-family:helvetica;width:100%;'>
//                             <span
//                               style=3D'font-size:16px;font-weight:600;line-heigh=
// t:1.4;color:white;'>
//                               <div>
// Frosted  Mini Flashtip Diffusers  - Classic
// Style
// =20
// </div>
//                             </span>
//                             <br />
//                           </td>
//                           <td =
// style=3D'font-family:helvetica;width:100%;white-space:nowrap;'>
//                             <p style=3D'color:white;line-height:150%;font-size:=
// 16px;font-weight:600;margin:0 0 0 15px;'
//                               =
// align=3D"right">
//                               <label>
// $11.99
// </label>
//                             </p>
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </td>
//         </tr><tr>
//           <td =
// style=3D'font-family: helvetica;'>
//             <table style=3D'
//                     width: 100%;
//                     border-spacing: 0;
//                     border-bottom: 1px white solid;'>
//               <tbody>
//                 <tr style=3D'width: 100%'>
//                   <td style=3D'font-family: helvetica'>
//                     <table style=3D'border-spacing: 0px; width: 100%; =
// margin: 10px auto;'>
//                       <tbody>
//                         =
// <tr>
//                           <td style=3D'font-family: helvetica;'>
//                             <div style=3D'margin-bottom: 10px; margin-right: =
// 10px;'>
//                               <img src=3Dhttps://images2.imgbox.=
// com/65/6d/7XQ4sCYh_o.jpeg alt=3DSupreme V2 Refresh Pack (6 Pairs Supreme =
// Gloves V2 + 120 Batteries) width=3D"60"
//                                 =
// height=3D"60" style=3D'border-radius:8px;' title=3D"Product Image" />
//                             =09
//                               <div />
//                             </div>
//                           </td>
//                           <td style=3D'font-family:helvetica;width:100%;'>
//                             <span
//                               =
// style=3D'font-size:16px;font-weight:600;line-height:1.4;color:white;'>
//                               <div>
// Red  Supreme V2 Refresh Pack (6 Pairs=
// Supreme Gloves V2 + 120 Batteries)  - L
// =20
// - CR1620=20
// </div>
//                             </span>
//                             <br />
//                           </td>
//                           <td =
// style=3D'font-family:helvetica;width:100%;white-space:nowrap;'>
//                             <p style=3D'color:white;line-height:150%;font-size:=
// 16px;font-weight:600;margin:0 0 0 15px;'
//                               =
// align=3D"right">
//                               <label>
// $34.99
// </label>
//                             </p>
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </td>
//         </tr>
//       </tbody>
//     </table>`;
const html = `								<table
										style=3D"max-width:560px;padding:10px;text-align:left;border-spac=
ing:0;margin:0 auto;width:100%; ">
										<tr>
											<td =
style=3D"font-family:helvetica">
												<table =
style=3D"width:100%;border-spacing:0;">
													<tbody>
														<tr>
																			<td style=3D'font-family: =
helvetica;'>
																				<table style=3D'width: 100%; =
border-spacing: 0; border-bottom: 1px white solid;'>
																					<tbody>
																						<tr style=3D'width: =
100%'>
																							<td style=3D'font-family: helvetica'>
																								<table style=3D'border-spacing: 0px; width: 100%; =
margin: 10px auto;'>
																									<tbody>
																										<tr>
																											<td =
style=3D'font-family: helvetica;'>
																												<div =
style=3D'margin-bottom: 10px; margin-right: 10px;'>
																													<img src=3Dhttps://thumbs2.imgbox.=
com/39/50/LkEvk42D_t.jpg alt=3DUniversal Battery Dispenser width=3D"70"
																														height=3D"70" style=3D'border-radius: 8px; =
object-fit: cover;' title=3D"Product Image" />
																												=
</div>
																											</td>
																											<td =
style=3D'font-family:helvetica;width:100%;'>
																												=
<span style=3D'font-size:16px;font-weight:600;line-height:1.=
4;color:white;'>
																													Universal Battery Dispenser
																												</span>
																												<br />

																												 <div style=3D"font-size:25px;font-weight:600;c=
olor:black">
																												=09
																														=
			<span style=3D'
																															display: inline-block;
																															padding: 4px 8px;
																										=
					margin: 2px;
																															border-radius: 16px;
																															font-size: 12px;
																											=
				font-weight: 500;
																															background-color: =
white;
																															color: black;
																														'>
																															Color: =
Orange
																														</span>
																														=
		=09
																													</div>
																											</td>
																											<td style=3D'font-family:helvetica;width:100%;wh=
ite-space:nowrap;'>
																												<p style=3D'color:white;lin=
e-height:150%;font-size:16px;font-weight:600;margin:0 0 0 15px;'
																													align=3D"right">
																													=
 <label>
				 $19.99
			</label>
																												</p>
																											</td>
																										</tr>
																									</tbody>
																								</table>
																							</td>
																						</tr>
																					</tbody>
																				</table>
																			</td>
																		</tr><tr>
																			<td style=3D'font-family: helvetica;'>
																				<table style=3D'width: 100%; border-spacing: 0; =
border-bottom: 1px white solid;'>
																					<tbody>
																						<tr style=3D'width: 100%'>
																							<td=
 style=3D'font-family: helvetica'>
																								<table =
style=3D'border-spacing: 0px; width: 100%; margin: 10px auto;'>
																									<tbody>
																										<tr>
																											<td style=3D'font-family: helvetica;'>
																												<div style=3D'margin-bottom: 10px; =
margin-right: 10px;'>
																													<img =
src=3Dhttps://thumbs2.imgbox.com/22/d8/yuqtK5sg_t.jpg alt=3DCLOZD Duoskinz =
width=3D"70"
																														height=3D"70" =
style=3D'border-radius: 8px; object-fit: cover;' title=3D"Product Image" />
																												</div>
																											</td>
																											<td style=3D'font-family:helvetica;width:100%;'>
																												<span style=3D'font-size:16px;font-weight:600;l=
ine-height:1.4;color:white;'>
																													CLOZD Duoskinz
																												</span>
																												<br />

																												 <div style=3D"font-size:25px;font-weight:600;c=
olor:black">
																												=09
																														=
			<span style=3D'
																															display: inline-block;
																															padding: 4px 8px;
																										=
					margin: 2px;
																															border-radius: 16px;
																															font-size: 12px;
																											=
				font-weight: 500;
																															background-color: =
white;
																															color: black;
																														'>
																															Skin Color:=
 Clear
																														</span>
																														=
		=09
																																	<span style=3D'
																															display: inline-block;
																															padding: 4px 8px;
																										=
					margin: 2px;
																															border-radius: 16px;
																															font-size: 12px;
																											=
				font-weight: 500;
																															background-color: =
white;
																															color: black;
																														'>
																															Sled Color:=
 Orange
																														</span>
																													=
			=09
																																	<span style=3D'
																															display: inline-block;
																															padding: 4px 8px;
																										=
					margin: 2px;
																															border-radius: 16px;
																															font-size: 12px;
																											=
				font-weight: 500;
																															background-color: =
white;
																															color: black;
																														'>
																															Set of: 10
																														</span>
																																=09
																													</div>
																											</td>
																											<td style=3D'font-family:helvetica;width:100%;wh=
ite-space:nowrap;'>
																												<p style=3D'color:white;lin=
e-height:150%;font-size:16px;font-weight:600;margin:0 0 0 15px;'
																													align=3D"right">
																													=
 <label>
				 $19.99
			</label>
																												</p>
																											</td>
																										</tr>
																									</tbody>
																								</table>
																							</td>
																						</tr>
																					</tbody>
																				</table>
																			</td>
																		</tr><tr>
																			<td style=3D'font-family: helvetica;'>
																				<table style=3D'width: 100%; border-spacing: 0; =
border-bottom: 1px white solid;'>
																					<tbody>
																						<tr style=3D'width: 100%'>
																							<td=
 style=3D'font-family: helvetica'>
																								<table =
style=3D'border-spacing: 0px; width: 100%; margin: 10px auto;'>
																									<tbody>
																										<tr>
																											<td style=3D'font-family: helvetica;'>
																												<div style=3D'margin-bottom: 10px; =
margin-right: 10px;'>
																													<img =
src=3Dhttps://thumbs2.imgbox.com/03/b1/3K89qakz_t.jpg alt=3DCLOZD Omniskinz=
 width=3D"70"
																														height=3D"70" =
style=3D'border-radius: 8px; object-fit: cover;' title=3D"Product Image" />
																												</div>
																											</td>
																											<td style=3D'font-family:helvetica;width:100%;'>
																												<span style=3D'font-size:16px;font-weight:600;l=
ine-height:1.4;color:white;'>
																													CLOZD Omniskinz
																												</span>
																												<br />

																												 <div style=3D"font-size:25px;font-weight:600;c=
olor:black">
																												=09
																														=
			<span style=3D'
																															display: inline-block;
																															padding: 4px 8px;
																										=
					margin: 2px;
																															border-radius: 16px;
																															font-size: 12px;
																											=
				font-weight: 500;
																															background-color: =
white;
																															color: black;
																														'>
																															Sled =
Design: Coffin Sleds
																														</span>
																																=09
																																	<span =
style=3D'
																															display: inline-block;
																															padding: 4px 8px;
																										=
					margin: 2px;
																															border-radius: 16px;
																															font-size: 12px;
																											=
				font-weight: 500;
																															background-color: =
white;
																															color: black;
																														'>
																															Skin Color:=
 Orange
																														</span>
																													=
			=09
																																	<span style=3D'
																															display: inline-block;
																															padding: 4px 8px;
																										=
					margin: 2px;
																															border-radius: 16px;
																															font-size: 12px;
																											=
				font-weight: 500;
																															background-color: =
white;
																															color: black;
																														'>
																															Sled Color:=
 Yellow
																														</span>
																													=
			=09
																																	<span style=3D'
																															display: inline-block;
																															padding: 4px 8px;
																										=
					margin: 2px;
																															border-radius: 16px;
																															font-size: 12px;
																											=
				font-weight: 500;
																															background-color: =
white;
																															color: black;
																														'>
																															Set of: 10
																														</span>
																																=09
																													</div>
																											</td>
																											<td style=3D'font-family:helvetica;width:100%;wh=
ite-space:nowrap;'>
																												<p style=3D'color:white;lin=
e-height:150%;font-size:16px;font-weight:600;margin:0 0 0 15px;'
																													align=3D"right">
																													=
 <label>
				 $26.99
			</label>
																												</p>
																											</td>
																										</tr>
																									</tbody>
																								</table>
																							</td>
																						</tr>
																					</tbody>
																				</table>
																			</td>
																		</tr><tr>
																			<td style=3D'font-family: helvetica;'>
																				<table style=3D'width: 100%; border-spacing: 0; =
border-bottom: 1px white solid;'>
																					<tbody>
																						<tr style=3D'width: 100%'>
																							<td=
 style=3D'font-family: helvetica'>
																								<table =
style=3D'border-spacing: 0px; width: 100%; margin: 10px auto;'>
																									<tbody>
																										<tr>
																											<td style=3D'font-family: helvetica;'>
																												<div style=3D'margin-bottom: 10px; =
margin-right: 10px;'>
																													<img =
src=3Dhttps://thumbs2.imgbox.com/03/b1/3K89qakz_t.jpg alt=3DCLOZD Omniskinz=
 width=3D"70"
																														height=3D"70" =
style=3D'border-radius: 8px; object-fit: cover;' title=3D"Product Image" />
																												</div>
																											</td>
																											<td style=3D'font-family:helvetica;width:100%;'>
																												<span style=3D'font-size:16px;font-weight:600;l=
ine-height:1.4;color:white;'>
																													CLOZD Omniskinz
																												</span>
																												<br />

																												 <div style=3D"font-size:25px;font-weight:600;c=
olor:black">
																												=09
																														=
			<span style=3D'
																															display: inline-block;
																															padding: 4px 8px;
																										=
					margin: 2px;
																															border-radius: 16px;
																															font-size: 12px;
																											=
				font-weight: 500;
																															background-color: =
white;
																															color: black;
																														'>
																															Sled =
Design: Coffin Sleds
																														</span>
																																=09
																																	<span =
style=3D'
																															display: inline-block;
																															padding: 4px 8px;
																										=
					margin: 2px;
																															border-radius: 16px;
																															font-size: 12px;
																											=
				font-weight: 500;
																															background-color: =
white;
																															color: black;
																														'>
																															Skin Color:=
 Clear
																														</span>
																														=
		=09
																																	<span style=3D'
																															display: inline-block;
																															padding: 4px 8px;
																										=
					margin: 2px;
																															border-radius: 16px;
																															font-size: 12px;
																											=
				font-weight: 500;
																															background-color: =
#4b4b4b;
																															color: white;
																														'>
																															Sled Color:=
 Clear
																														</span>
																														=
		=09
																																	<span style=3D'
																															display: inline-block;
																															padding: 4px 8px;
																										=
					margin: 2px;
																															border-radius: 16px;
																															font-size: 12px;
																											=
				font-weight: 500;
																															background-color: =
white;
																															color: black;
																														'>
																															Set of: 10
																														</span>
																																=09
																													</div>
																											</td>
																											<td style=3D'font-family:helvetica;width:100%;wh=
ite-space:nowrap;'>
																												<p style=3D'color:white;lin=
e-height:150%;font-size:16px;font-weight:600;margin:0 0 0 15px;'
																													align=3D"right">
																													=
 <label>
				 $26.99
			</label>
																												</p>
																											</td>
																										</tr>
																									</tbody>
																								</table>
																							</td>
																						</tr>
																					</tbody>
																				</table>
																			</td>
																		</tr><tr>
																			<td style=3D'font-family: helvetica;'>
																				<table style=3D'width: 100%; border-spacing: 0; =
border-bottom: 1px white solid;'>
																					<tbody>
																						<tr style=3D'width: 100%'>
																							<td=
 style=3D'font-family: helvetica'>
																								<table =
style=3D'border-spacing: 0px; width: 100%; margin: 10px auto;'>
																									<tbody>
																										<tr>
																											<td style=3D'font-family: helvetica;'>
																												<div style=3D'margin-bottom: 10px; =
margin-right: 10px;'>
																													<img =
src=3Dhttps://thumbs2.imgbox.com/03/b1/3K89qakz_t.jpg alt=3DCLOZD Omniskinz=
 width=3D"70"
																														height=3D"70" =
style=3D'border-radius: 8px; object-fit: cover;' title=3D"Product Image" />
																												</div>
																											</td>
																											<td style=3D'font-family:helvetica;width:100%;'>
																												<span style=3D'font-size:16px;font-weight:600;l=
ine-height:1.4;color:white;'>
																													CLOZD Omniskinz
																												</span>
																												<br />

																												 <div style=3D"font-size:25px;font-weight:600;c=
olor:black">
																												=09
																														=
			<span style=3D'
																															display: inline-block;
																															padding: 4px 8px;
																										=
					margin: 2px;
																															border-radius: 16px;
																															font-size: 12px;
																											=
				font-weight: 500;
																															background-color: =
white;
																															color: black;
																														'>
																															Sled =
Design: Coin Sleds
																														</span>
																																=09
																																	<span =
style=3D'
																															display: inline-block;
																															padding: 4px 8px;
																										=
					margin: 2px;
																															border-radius: 16px;
																															font-size: 12px;
																											=
				font-weight: 500;
																															background-color: =
#543abb;
																															color: white;
																														'>
																															Skin Color:=
 Violet
																														</span>
																													=
			=09
																																	<span style=3D'
																															display: inline-block;
																															padding: 4px 8px;
																										=
					margin: 2px;
																															border-radius: 16px;
																															font-size: 12px;
																											=
				font-weight: 500;
																															background-color: =
#0014ff;
																															color: white;
																														'>
																															Sled Color:=
 Blue
																														</span>
																															=
	=09
																																	<span style=3D'
																															display: inline-block;
																															padding: 4px 8px;
																										=
					margin: 2px;
																															border-radius: 16px;
																															font-size: 12px;
																											=
				font-weight: 500;
																															background-color: =
white;
																															color: black;
																														'>
																															Set of: 10
																														</span>
																																=09
																													</div>
																											</td>
																											<td style=3D'font-family:helvetica;width:100%;wh=
ite-space:nowrap;'>
																												<p style=3D'color:white;lin=
e-height:150%;font-size:16px;font-weight:600;margin:0 0 0 15px;'
																													align=3D"right">
																													=
 <label>
				 $26.99
			</label>
																												</p>
																											</td>
																										</tr>
																									</tbody>
																								</table>
																							</td>
																						</tr>
																					</tbody>
																				</table>
																			</td>
																		</tr>
													</tbody>
												</table>
												<table style=3D"width:100%;border-spacing:=`;

const extractProductInfo = html => {
  const dom = new JSDOM(html);
  const document = dom.window.document;

  const products = [];
  const productRows = document.querySelectorAll(
    'table[style*="max-width:560px"] > tbody > tr > td > table > tbody > tr'
  );

  productRows.forEach(row => {
    const nameElement = row.querySelector('span[style*="font-size:16px"]');
    const priceElement = row.querySelector("label");

    if (nameElement && priceElement) {
      const name = nameElement.textContent.trim().replace(/=20/g, "").replace(/\s+/g, " ");
      const price = parseFloat(priceElement.textContent.trim().replace("$", ""));

      const optionsElements = row.querySelectorAll('span[style*="display: inline-block"]');
      const selectedOptions = Array.from(optionsElements).map(opt => opt.textContent.trim());

      products.push({
        quantity: 1,
        name: name,
        selectedOptions: selectedOptions,
        price: price,
      });
    }
  });

  return products;
};

const removeDuplicatesAndCombineQuantities = products => {
  const productMap = new Map();

  products.forEach(product => {
    const key = `${product.name}-${product.price}-${product.selectedOptions.join(",")}`;
    if (!productMap.has(key)) {
      productMap.set(key, { ...product });
    }
  });

  return Array.from(productMap.values());
};

// Extract product information from the HTML
let orderItems = extractProductInfo(html);

// Remove duplicates and combine quantities
orderItems = removeDuplicatesAndCombineQuantities(orderItems);

// Create the final structure
const result = { orderItems };

// Output the result
console.log(JSON.stringify(result, null, 2));
