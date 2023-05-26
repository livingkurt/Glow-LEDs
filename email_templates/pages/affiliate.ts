export default (props: any): string => {
  const { affiliate } = props;
  return `<table
	style="border-spacing:0;width:100%; padding: 10px; max-width: 600px; width: 100%; margin: auto; padding-bottom: 10px;">
	<tbody>
		<tr style="font-size:16px">
			<td>
				<table style="border-spacing:0;margin:auto">
					<tbody>
						<tr style="font-family:helvetica;border-radius:4px">
							<td>
								<h4
									style="text-align:center;font-family:helvetica;color:#333333;font-size:25px;margin-top:0px;margin-bottom:10px;">
									Thank you for signing up to be a part of the Glow LEDs Affiliate Team!</h4>
							</td>
						</tr>
					</tbody>
				</table>
				<table width="100%" style="max-width:800px;margin:auto;">
					<tr>
						<td><img src="https://thumbs2.imgbox.com/b1/08/2Dnle6TI_t.jpeg" alt="Glow LEDs" title="Email Image"
								style="text-align:center;width:100%;border-radius:20px" /></td>
					</tr>
					<tr>

						<table
							style="max-width:800px;width:100%;text-align:left;border-spacing:0;margin:0 auto;   background-color: #585858; border-radius: 20px; padding:15px; margin: 10px auto;">
							<tbody>
								<tr>
									<td style="font-family:helvetica">
										<p
											style="font-size:16px;line-height:30px;max-width:800px;text-align:center;width:100%;color:white;margin:auto">
											We really appreciate you taking the time to sign up. We are super excited to have on our team!
											Please contact us after you finish signing up.
											If you need to edit any of the information you can do so from your User Profile Page. Note: You
											might have to logout and log back in for the Edit Affiliate Button to show in your profile.

										</p>

									</td>
								</tr>
							</tbody>
							<table
								style="max-width:800px;width:100%;text-align:left;border-spacing:0;margin:0 auto;   background-color: #585858; border-radius: 20px; padding:15px; margin: 10px auto;">
								<tbody>
									<tr>
										<td style="font-size:20px;text-align:center">
											<h4 style="margin: 0px;">Affiliate Info</h4>
										</td>
									</tr>
									<tr>
										<td style="font-size:16px;height:30px">Affiliate Name: ${affiliate.artist_name}</td>
									</tr>
									<tr>
										<td style="font-size:16px;height:30px">Email: ${affiliate.email}</td>
									</tr>
									<tr>
										<td style="font-size:16px;height:30px">Category: ${affiliate.category}</td>
									</tr>
									${
                    affiliate.instagram_handle
                      ? `<tr>
										<td style="font-size:16px;height:30px">Instagram: ${affiliate.instagram_handle}</td>
									</tr>`
                      : ""
                  }
									${
                    affiliate.facebook_name
                      ? `<tr>
										<td style="font-size:16px;height:30px">Facebook: ${affiliate.facebook_name}</td>
									</tr>`
                      : ""
                  }
									${
                    affiliate.tiktok
                      ? `<tr>
										<td style="font-size:16px;height:30px">Tiktok: ${affiliate.tiktok}</td>
									</tr>`
                      : ""
                  }
									${
                    affiliate.bio
                      ? `<tr>
										<td style="font-size:16px;height:30px">Bio: ${affiliate.bio}</td>
									</tr>`
                      : ""
                  }
								</tbody>
							</table>
							<table
								style="max-width:800px;width:100%;text-align:left;border-spacing:0;margin:0 auto;   background-color: #585858; border-radius: 20px; padding:15px; margin: 10px auto;">
								<tbody>
									<tr>
										<td style="font-size:20px;text-align:center;margin-top:10px">
											<h4 style="margin: 0px;">Promo Codes</h4>
										</td>
									</tr>
									<tr>
										<td style="font-size:16px;height:30px">
											<div>Public Code: ${affiliate.public_code.promo_code.toUpperCase()}</div>
										</td>
									</tr>
									<tr>
									<td style="font-size:16px;height:30px">
										<div>Private Code: ${affiliate.private_code.promo_code.toUpperCase()} - DO NOT SHARE PRIVATE CODE
										</div>
									</td>
								</tr>
									<tr>
										<td style="font-size:16px;height:30px">
											<p style="text-align: left;">Public Link: Use Link Below to give to friends to automatically use your public promo code during checkout</p>
										</td>
									</tr>
									<tr>
										<td style="font-size:16px; line-height: 20px; height: 50px; text-align:center;">
											<a href="https://www.glow-leds.com/collections/all/products/code/${affiliate.public_code.promo_code.toUpperCase()}" alt="discount image"
													style="background-color:#4c4f60;color:white;border-radius:10px;border:0;padding:15px; width: 100%; text-decoration: none;" target="_blank">
												Link
												</a>
										</td>
									</tr>


								</tbody>
							</table>
							<table
								style="max-width:800px;width:100%;text-align:left;border-spacing:0;  background-color: #585858; border-radius: 20px; padding:15px; margin-top: 10px;">
								<tbody>
									<tr>
										<td style="font-size:20px;text-align:center;margin-top:10px">
											<h4 style="margin: 0px;">Questions</h4>
										</td>
									</tr>
									<tr>
										<td style="font-size:16px">
											<p><strong>Question 1: </strong><br /><br />How did you hear about Glow LEDs?</p>
										</td>
									</tr>
									<tr>
										<td style="font-size:16px"><strong>Answer 1:</strong><br /><br />
											<div>${affiliate && affiliate.answers ? affiliate.answers[0] : ""}</div>
										</td>
									</tr>
									<tr>
										<td style="font-size:16px">
											<p><strong>Question 2: </strong><br /><br />What is your favorite Glow LEDs Product?</p>
										</td>
									</tr>
									<tr>
										<td style="font-size:16px"><strong>Answer 2:</strong><br /><br />
											<div> ${affiliate && affiliate.answers ? affiliate.answers[1] : ""}</div>
										</td>
									</tr>
									<tr>
										<td style="font-size:16px">
											<p><strong>Question 3: </strong><br /><br />Why do you want to be a Glow LEDs Affiliate?</p>
										</td>
									</tr>
									<tr>
										<td style="font-size:16px"><strong>Answer 3:</strong><br /><br />
											<div>${affiliate && affiliate.answers ? affiliate.answers[2] : ""}</div>
										</td>
									</tr>

								</tbody>
							</table>

			</td>
		</tr>
	</tbody>
</table>`;
};

// export default (props: any) => {
//   const { affiliate } = props;
// return `<table width="100%" style="max-width:800px;margin:auto;padding:20px">
//         <tr>
//           <td><img src="https://thumbs2.imgbox.com/b1/08/2Dnle6TI_t.jpeg" alt="Glow LEDs" title="Email Image"
//               style="text-align:center;width:100%;border-radius:20px" /></td>
//         </tr>
//         <tr>
//           <table style="border-spacing:0;margin:auto">
//             <tbody>
//               <tr style="font-family:helvetica;border-radius:4px">
//                 <td>
//                   <h4
//                     style="text-align:center;font-family:helvetica;color:white;font-size:20px;margin-top:20px;margin-bottom:0">
//                     Thank you for signing up to be a part of the Glow LEDs Family!</h4>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
// <table style="border-spacing:0;width:100%;padding:10px">
//   <tbody>
//     <tr style="font-size:16px">
//       <td>
//         <p
//           style="font-size:16px;line-height:30px;max-width:800px;text-align:center;width:100%;color:white;margin:auto">
//           We really appreciate you taking the time to sign up. We are super excited to have on our team!
//           Please contact use after you finish signing up!
//           If you need to edit any of the information you can do so from your User Profile Page. Note: You
//           might have to logout and log back in for the Edit Affiliate Button to show in your profile.

//         </p>
//       </td>
//     </tr>
//   </tbody>
// </table>
// 	          <table style="max-width:800px;width:100%;text-align:left;border-spacing:0;margin:15px auto;color:white">
// 	            <tr>
// 	              <td style="font-family:helvetica;color:white">
// 	                <div style="border-bottom:1px white solid"></div>
// 	              </td>
// 	            </tr>
// 	          </table>
// 	          <table style="border-spacing:0;width:100%;max-width:800px;margin:auto;padding:10px">
// 	            <tbody>
// <tr>
//   <td style="font-size:20px;text-align:center">
//     <h4>Artist Info</h4>
//   </td>
// </tr>
// <tr>
//   <td style="font-size:16px;height:30px">Artist Name: ${affiliate.artist_name}</td>
// </tr>
// <tr>
//   <td style="font-size:16px;height:30px">Email: ${affiliate.email}</td>
// </tr>
// <tr>
//   <td style="font-size:16px;height:30px">Category: ${affiliate.category}</td>
// </tr>
// ${affiliate.instagram_handle
//   ? `<tr>
//   <td style="font-size:16px;height:30px">Instagram: ${affiliate.instagram_handle}</td>
// </tr>`
//   : ""}
// ${affiliate.facebook_name
//   ? `<tr>
//   <td style="font-size:16px;height:30px">Facebook: ${affiliate.facebook_name}</td>
// </tr>`
//   : ""}
// ${affiliate.tiktok
//   ? `<tr>
//   <td style="font-size:16px;height:30px">Tiktok: ${affiliate.tiktok}</td>
// </tr>`
//   : ""}
// ${affiliate.bio
//   ? `<tr>
//   <td style="font-size:16px;height:30px">Bio: ${affiliate.bio}</td>
// </tr>`
//   : ""}
// <tr>
//   <td style="font-family:helvetica;color:white">
//     <div style="border-bottom:1px white solid;margin-bottom:20px"></div>
//   </td>
// </tr>
// 	              <tr>
// 	                <td style="font-size:20px;text-align:center;margin-top:10px">
// 	                  <h4>Promo Codes</h4>
// 	                </td>
// 	              </tr>
// 	              <tr>
// 	                <td style="font-size:16px;height:30px">
// 	                  <div>Public Code: ${affiliate.public_code.promo_code.toUpperCase()}</div>
// 	                </td>
// 	              </tr>
// 	              <tr>
// 	                <td style="font-size:16px;height:30px">
// 	                  <div>Auto Input Code Link: https://www.glow-leds.com/collections/all/products/code/${affiliate.public_code.promo_code.toUpperCase()}</div>
// 	                </td>
// 	              </tr>
// 	              <tr>
// 	                <td style="font-size:16px;height:30px">
// 	                  <div>Private Code: ${affiliate.private_code.promo_code.toUpperCase()} - DO NOT SHARE PRIVATE CODE</div>
// 	                </td>
// 	              </tr>
// 	              <tr>
// 	                <td style="font-family:helvetica;color:white">
// 	                  <div style="border-bottom:1px white solid;margin-bottom:20px"></div>
// 	                </td>
// 	              </tr>
// <tr>
//   <td style="font-size:20px;text-align:center;margin-top:10px">
//     <h4>Questions</h4>
//   </td>
// </tr>
// <tr>
//   <td style="font-size:16px">
//     <p><strong>Question 1: </strong><br /><br />How did you hear about Glow LEDs?</p>
//   </td>
// </tr>
// <tr>
//   <td style="font-size:16px"><strong>Answer 1:</strong><br /><br />
//     <div>${affiliate && affiliate.answers
//       ? affiliate.answers[0]
//       : ""}</div>
//   </td>
// </tr>
// <tr>
//   <td style="font-size:16px">
//     <p><strong>Question 2: </strong><br /><br />What is your favorite Glow LEDs Product?</p>
//   </td>
// </tr>
// <tr>
//   <td style="font-size:16px"><strong>Answer 2:</strong><br /><br />
//     <div>	${affiliate && affiliate.answers
//       ? affiliate.answers[1]
//       : ""}</div>
//   </td>
// </tr>
// <tr>
//   <td style="font-size:16px">
//     <p><strong>Question 3: </strong><br /><br />Why do you want to be a Glow LEDs Affiliate?</p>
//   </td>
// </tr>
// <tr>
//   <td style="font-size:16px"><strong>Answer 3:</strong><br /><br />
//     <div>${affiliate && affiliate.answers
//       ? affiliate.answers[2]
//       : ""}</div>
//   </td>
// </tr>
// 	            </tbody>
// 	          </table>
// 	          <table style="text-align:center;border-spacing:0px;margin:10px auto;width:100%">
// 	            <tbody>
// 	              <tr>
// 	                <td>
// 	                  <div style="display:flex;justify-content:center"><a
// 	                      href="https://docs.google.com/document/d/1j3Bcv2__QGiTlVf--R-BNVpvGRN_RzWvuvMFCPodqS4/edit?usp=sharing"
// 	                      style="background-color:#4c4f60;color:white;border-radius:10px;border:0;padding:15px;margin:20px;width:100%;max-width:600px;text-decoration:none"
// 	                      target="_blank" rel="noopener noreferrer">
// 	                      <h4 style="font-family:helvetica;margin:0;font-size:20px;text-align:center">View Promoter Terms
// 	                      </h4>
// 	                    </a></div>
// 	                  <div style="display:flex;justify-content:center"><a
// 	                      href="https://docs.google.com/document/d/1hiquje1Bw-SWlYEO2Lp8NMfVZhvMRNNrwNog4Ltr5Ac/edit"
// 	                      target="_blank" rel="noopener noreferrer"
// 	                      style="background-color:#4c4f60;color:white;border-radius:10px;border:0;padding:15px;margin:20px;width:100%;max-width:600px;text-decoration:none">
// 	                      <h4 style="font-family:helvetica;margin:0;font-size:20px;text-align:center">View Affiliate
// 	                        Learnings</h4>
// 	                    </a></div>
// 	                </td>
// 	              </tr>
// 	            </tbody>
// 	          </table>
// 	        </tr>
// 	      </table>`;
// };
