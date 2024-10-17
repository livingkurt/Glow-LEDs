const { JSDOM } = require("jsdom");
const parseAddress = require("parse-address");
const he = require("he");
const cheerio = require("cheerio");

const html = `
Return-Path: <info.glowleds@gmail.com>
Received: from [127.0.0.1] (ec2-34-204-42-124.compute-1.amazonaws.com.
 [34.204.42.124]) by smtp.gmail.com with ESMTPSA id
 6a1803df08f44-6c75e586cfasm18756666d6.139.2024.09.20.08.26.24 for
 <dthibodeauj@gmail.con> (version=TLS1_3 cipher=TLS_AES_256_GCM_SHA384
 bits=256/256); Fri, 20 Sep 2024 08:26:25 -0700 (PDT)
From: "' Glow LEDs '" <info.glowleds@gmail.com>
To: dthibodeauj@gmail.con
Subject: Thank you for your Glow LEDs Order
Message-ID: <14a43b70-c310-03a7-9361-5bf28a23e463@gmail.com>
Content-Transfer-Encoding: quoted-printable
Date: Fri, 20 Sep 2024 15:26:24 +0000
MIME-Version: 1.0
Content-Type: text/html; charset=utf-8

<body style=3D"background:unset;color:white;padding:0;margin:0;font-size:16=
px">
  <table style=3D"width:100%;border-spacing:0;color:white;margin:auto;=
font-size:16px;background-color:#7d7c7c">
    <tr>
      <td =
style=3D"font-family:helvetica;color:white">
        <table =
style=3D"width:100%;border-spacing:0;color:white;background:#333333;padding=
:20px;height:100%">
  <tr>
    <td style=3D"font-family:helvetica;color:whi=
te">
      <table style=3D"max-width:800px;text-align:left;border-spacing:0=
;margin:0 auto;color:white">
        <tr>
          <td =
style=3D"font-family:helvetica;color:white">
            <table =
style=3D"width:100%;border-spacing:0;color:white">
              <tr>
                <td style=3D"font-family:helvetica;color:white;padding:10px=
">
                  <a href=3D"https://www.glow-leds.com/" =
target=3D"_blank" rel=3D"noopener noreferrer"> <img
                      src=3D"https://images2.imgbox.com/63/e7/BPGMUlpc_o.=
png" alt=3D"Glow LEDs Logo" title=3D"Glow LEDs Logo"
                      style=3D"width:100%;margin-left:-15px" /></a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
        <table style=3D"width:100%;border-spacing:0; padding: 10px;">
	<tr>
		<td style=3D"font-family:helvetica;border:0">
			<center>
				<table style=3D"max-width:800px;width:100%;text-align:left;border-spaci=
ng:0;margin:0 auto;color:white">
					<tr>
						<td =
style=3D"font-family:helvetica;color:white">
							<h1
								style=3D"text-align:center;font-family:helvetica;width:100%;margin:=
10px auto;line-height:50px;color:#333333;font-size:50px; padding-bottom: =
7px;">
								DANIEL, </h1>
							<h1
								style=3D"text-align:center;=
font-family:helvetica;width:100%;margin:0px;line-height:50px;color:#333333;=
font-size:30px; padding-bottom: 7px;">
								YOUR ORDER HAS BEEN PLACED! =
=F0=9F=8E=89</h1>
						</td>

					</tr>
				</table>
				<table style=3D"max-width:560px;width:100%;text-align:left;border-spaci=
ng:0; padding: 10px;">
					<tbody>
						<tr>
							<td =
style=3D"font-family:helvetica">
								<table style=3D"width:100%;line-he=
ight:inherit;text-align:center" width=3D"100%" align=3D"left">
									<tbody>
										<tr>
											<td style=3D"vertical-align:top;=
color:#333333;font-size:20px" valign=3D"top" align=3D"center">
												<strong>Order #:</strong>
												66ed941c78f152155a85e968<=
br /><strong>
											</td>
										</tr>
									</tbody>
								</table>
							</td>
						</tr>
					</tbody>
				</table>
				<table style=3D"max-width:560px;width:100%;text-align:left;border-spaci=
ng:0;margin:0 auto; ">
					<tbody>
						<tr>
							<td =
style=3D"font-family:helvetica">
								<div
			style=3D'display: =
flex;justify-content: space-between;max-width: 58rem;width: 100%;margin: =
1rem auto;'
		>
			<div
				style=3D'width:100%; display:flex; =
justify-content: center; border-top: .3rem white solid; color: white;flex: =
1 1;padding-top: 1rem; text-align: center; '
			>
				<div =
style=3D'font-size: 16px;'>Placed</div>
			</div>

			<div
				style=3D'width:100%; display:flex; justify-content: center; 	=
border-top: .3rem #c0c0c0 solid;color: white;flex: 1 1;padding-top: =
1rem;text-align: center;'
			>
				<div style=3D'font-size: =
16px;'>Crafted</div>
			</div>
			<div
				style=3D'width:100%; =
display:flex; justify-content: center; 	border-top: .3rem #c0c0c0 =
solid;color: white;flex: 1 1;padding-top: 1rem;text-align: center;'
			>
				<div style=3D'font-size: 16px;'>Packaged</div>
			</div>
			<div
				style=3D'width:100%; display:flex; justify-content: center; 	=
border-top: .3rem #c0c0c0 solid;color: white;flex: 1 1;padding-top: =
1rem;text-align: center;'
			>
				<div style=3D'font-size: =
16px;'>Shipped</div>
			</div>
		</div>
							</td>
						</tr>
					</tbody>
				</table>

				<table
					style=3D"max-width:560px;width:=
100%;text-align:left;border-spacing:0;margin:0 auto; background-color: =
#585858; border-radius: 20px; padding:15px;">
					<tbody>
						<td style=3D"font-family:helvetica">
							<table =
style=3D"width:100%;border-spacing:0;margin-top:20px">
								<tbody>
									<tr style=3D"font-family:helvetica">
										<p =
style=3D'font-size: 16px; line-height: 30px;'>
											Hi Daniel,=20
											We are starting production on your order! We will notify your as=
 your order progresses.
										</p>
									</tr>
									<tr style=3D"font-family:helvetica">
										<h2
											style=3D"text-align:center;font-family:helvetica; font-size: =
25px; width:100%;margin:0px;line-height:50px;color:white; padding-bottom: =
7px;">
											What to Expect </h2>
									</tr>
									<tr style=3D"font-family:helvetica">
										<p =
style=3D"font-size: 16px; line-height: 30px;">
											Since everything =
is made to order... </p>
									</tr>
									<tr =
style=3D"font-family:helvetica">

										<p style=3D"font-size: 16px; =
line-height: 30px;">
											You will receive your hand crafted items =
within 1 - 3 weeks of placing your order
											domestically.</p>

									</tr>
									<tr style=3D"font-family:helvetica">
										<p style=3D"font-size: 16px; line-height: 30px;">
											Expect a three to six week delivery window for international =
orders.</p>
									</tr>
									<tr style=3D"font-family:helvetica">
										<p style=3D"font-size: 16px; line-height: 30px;">Keep in
											mind, items may ship out at different times on the Glow LEDs =
product journey.</p>
									</tr>
									<tr style=3D"font-family:helve=
tica">
										<p style=3D"font-size: 16px; line-height: 30px;">For more
											information about how we create our products and shipping times,=
 refer to our FAQs.</p>
									</tr>
										<tr =
style=3D"font-family:helvetica;line-height:0em">
										<td =
style=3D"font-family:helvetica;line-height:0em">
										</td>
									</tr>

									<tr>
										<td style=3D"font-family:helvetica"=
>


										<td style=3D"font-family:helvetica;border-radius:10px" =
align=3D"center" bgcolor=3D"#6a6c80" ;
											margin-left:10px; =
border-spacing: 2px;><a
												style=3D"font-size:16px;text-decoration=
:none;display:block;color:white; padding: 15px 0px;border:none; =
font-weight: 800;"
												target=3D"_blank"
												=
href=3D"https://www.glow-leds.com/secure/account/order/66ed941c78f152155a85=
e968">VIEW
												ORDER</a></td>

										<td =
style=3D"font-family:helvetica;border-radius:4px; padding: 3px;" =
align=3D"center"></td>


										<td style=3D"font-family:helvetica;borde=
r-radius:10px; margin-right:10px; border-spacing: 2px;"
											align=3D"center" bgcolor=3D"#4c4f60"><a
												=
style=3D"font-size:16px;text-decoration:none;display:block;color:white; =
padding: 15px 0px;border:none; font-family:helvetica; font-weight: 800;"
												target=3D"_blank" href=3D"https://www.glow-leds.=
com/">WEBSITE</a></td>

									</tr>
								</tbody>
							</table>
						</td>
	</tr>
	</tbody>

	<table style=3D"width:100%;border-spacing:0;=
 ">
		<tr>
			<td style=3D"font-family:helvetica;">
				<center>
					<table
						style=3D"max-width:560px;width:100%;text-align:left;borde=
r-spacing:0;padding:10px;margin:10px auto;  background-color: #585858; =
border-radius: 20px;">
						<tbody>
							<tr>
								<td =
style=3D"font-family:helvetica">
									<table
										=
style=3D"max-width:560px;width:100%;text-align:left;border-spacing:0;paddin=
g:10px;margin:0 auto; ">
										<tbody>
											<tr>
												<td style=3D"font-family:helvetica">
													<h3 =
style=3D"font-weight:normal;font-size:25px; margin: 0;"><strong>Your =
Order:</strong>
													</h3>
												</td>
											</tr>
										</tbody>
									</table>
									<table
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
																													<img src=3Dhttps://i.imgur.com/lEOCPFV.jpeg =
alt=3DSpace City Gloving Competition - Competitor Experience Pass =
width=3D"70"
																														height=3D"70" =
style=3D'border-radius: 8px; object-fit: cover;' title=3D"Product Image" />
																												</div>
																											</td>
																											<td style=3D'font-family:helvetica;width:100%;'>
																												<span style=3D'font-size:16px;font-weight:600;l=
ine-height:1.4;color:white;'>
																													Space City =
Gloving Competition - Competitor Experience Pass
																										=
		</span>
																												<br />

																												 =
<div style=3D"font-size:25px;font-weight:600;color:black">
																												=09
																													</div>
																											</td>
																											<td =
style=3D'font-family:helvetica;width:100%;white-space:nowrap;'>
																												<p style=3D'color:white;line-height:150%;font-s=
ize:16px;font-weight:600;margin:0 0 0 15px;'
																													=
align=3D"right">
																													 <label>
				 $45.00
			</label>
																												</p>
																											=
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
												<table style=3D"width:100%;border-spacing:0">
													<tbody>
														<tr>
															<td =
style=3D"font-family:helvetica;width:30%"></td>
															<td =
style=3D"font-family:helvetica">
																<table =
style=3D"width:100%;border-spacing:0;margin-top:20px">
																	<tbody>
																		<tr>
																		=09
																		<td style=3D"font-family:helvetica;padding:5px 0">
																			<del style=3D"color:red">
																				<p =
style=3D"color:white;line-height:1.2em;font-size:16px;margin:0"><span
																						style=3D"font-size:16px">Subtotal</span></p>
																			</del>
																		</td>
																		<td =
style=3D"font-family:helvetica;padding:5px 0;text-align:right" =
align=3D"righ=3Dt">
																			<del style=3D"color:red">
																				<strong style=3D"font-size:16px;color:white">$45.=
00</strong></del>
																		</td>
														</tr>
														<tr>
															<td style=3D"font-family:helvetica;paddin=
g:5px 0;width:100%">
																<p style=3D"color:white;line-height:1.=
2em;font-size:16px;margin:0"><span
																		=
style=3D"font-size:16px">Discount</span><span
																		=
style=3D"font-size:16px;margin-left:5px"><img
																			=
src=3D"https://images2.imgbox.com/a1/63/ptqm33q2_o.png"
																			style=3D"height:16px;margin-right:10px" alt=3D"tag_logo"=
 /><span
																			style=3D"font-size:14px;line-height:1.=
1;margin-left:-4px">STARSTREAM</span></span>
																</p>
															</td>
															<td style=3D"font-family:helvetica;padd=
ing:5px 0;text-align:right" align=3D"righ=3Dt">
															<strong =
style=3D"font-size:16px;color:white">&minus;&nbsp;$4.50</strong>

															</td>
														</tr>
														<tr>
															<td style=3D"font-family:helvetica;padding:5px 0">
																<p style=3D"color:white;line-height:1.=
2em;font-size:16px;margin:0"><span
																		=
style=3D"font-size:16px">New Subtotal</span></p>
															</td>
															<td style=3D"font-family:helvetica;padding:5px =
0;text-align:right" align=3D"righ=3Dt">
																<strong =
style=3D"font-size:16px;color:white">$40.50</strong>
															</td>
														</tr>
														<tr>
															<td =
style=3D"font-family:helvetica;padding:5px 0">
																<p =
style=3D"color:white;line-height:1.2em;font-size:16px;margin:0"><span
																		style=3D"font-size:16px">Taxes</span></p>
															</td>
															<td style=3D"font-family:helvetica;padd=
ing:5px 0;text-align:right" align=3D"righ=3Dt">
																<strong =
style=3D"font-size:16px;color:white">$2.43</strong>
															</td>
														</tr>
														<tr>
															<td =
style=3D"font-family:helvetica;padding:5px 0">
																<p =
style=3D"color:white;line-height:1.2em;font-size:16px;margin:0"><span
																		style=3D"font-size:16px">Shipping</span></p>
															</td>
															<td style=3D"font-family:helvetica;padd=
ing:5px 0;text-align:right" align=3D"righ=3Dt">
																<strong =
style=3D"font-size:16px;color:white">$0.00</strong>
															</td>
														</tr>
														 =20
																		<tr>
																			<td style=3D"font-family:helvetica;padding:5px 0">
																				<p style=3D"color:white;line-height:1.=
2em;font-size:16px;margin:0">
																					<span =
style=3D"font-size:16px">Service Fee (10% for tickets)</span>
																				</p>
																			</td>
																			<td =
style=3D"font-family:helvetica;padding:5px 0;text-align:right" =
align=3D"right">
																				<strong style=3D"font-size:16px;color:=
white">$4.50</strong>
																			</td>
																		</tr>
																	=09
													=09
													</tbody>
												</table>
												<table
													=
style=3D"width:100%;border-spacing:0;margin-top:20px;border-top-width:2px;b=
order-top-color:white;border-top-style:solid">
													<tbody>
														<tr>
															<td style=3D"font-family:helvetica;paddin=
g:20px 0 0">
																<p style=3D"color:white;line-height:1.=
2em;font-size:16px;margin:0"><span
																		=
style=3D"font-size:16px">Total</span></p>
															</td>
															<td style=3D"font-family:helvetica;padding:20px 0 0" =
align=3D"right"><strong
																	style=3D"font-size:24px;color:whit=
e">$ 42.93</strong></td>
														</tr>
													</tbody>
												</table>
											=09
											=09
											</td>
										</tr>
						</tbody>
					</table>
			</td>
		</tr>
	</table>

=09



	<table style=3D"width:100%;border-spacing:0; margin-bottom: 10px; =
">
		<tbody>
			<tr>
				<td style=3D"font-family:helvetica;">
					<center>
						<table
							style=3D"max-width:560px;width:100%;text-=
align:left;border-spacing:0;margin:0 auto; background-color: #585858; =
border-radius: 20px; padding:15px; margin-bottom: 10px;">
							<tbody>
								<tr>
									<td style=3D"font-family:helvetica">
										<h4 style=3D"font-weight:normal;font-size:25px;margin:0; =
margin-bottom: 5px; text-align: left;">
											<strong>Shipping:</stron=
g>
										</h4>
									</td>
									<td style=3D"font-family:helveti=
ca;width:50%;">
										<p style=3D"color:white;line-height:150%;font-siz=
e:16px;margin:0;">Daniel=20
											Thibodeau
											<br>
											3416 Palm Crossing Dr=20
											104
											<br>
											Tampa,=20
											FL=20
											33613 US
										</p>
										<p style=3D"color:white;line-height:150%;font-size:16px;margin:0"=
><strong> Shipping</strong></p>
									</td>
								</tr>
							</tbody>
						</table>
						<table
							style=3D"max-width:560px=
;width:100%;text-align:left;border-spacing:0;margin:0 auto; =
background-color: #585858; border-radius: 20px; padding:15px;">
							<tbody>
								<tr>
									<td style=3D"font-family:helvetica">
										<h4 style=3D"font-weight:normal;font-size:25px;margin:0; =
margin-bottom: 5px; text-align: left;">
											<strong>Payment:</strong=
>
										</h4>
									</td>

									<td style=3D"font-family:helveti=
ca;width:50%">

										<p style=3D"color:white;line-height:150%;font-siz=
e:16px;margin:0;text-align:left;">
											<img src=3Dhttps://images2.=
imgbox.com/18/a3/wHEnyn5x_o.png
												style=3D"height:24px;display:in=
line-block;margin-right:5px;margin-top:5px;margin-bottom:-6px"
												alt=3D"card_logo"> <span style=3D"font-size:16px">ending with =
1495</span></p>
									</td>
								</tr>
							</tbody>
						</table>
					</center>
				</td>
			</tr>
		</tbody>
	</table>
</table>
</center>
</td>
</tr>
</table>
</td>
</tr>
</table>
        <table =
style=3D"width:100%;border-spacing:0;color:white;background:#7d7c7c;padding=
:20px;">
  <tr>
    <td style=3D"font-family:helvetica;color:white">
    <table
    style=3D"text-align:left;border-spacing:0;margin:0 auto; =
margin-bottom: 10px;max-width:560px;width:100%; padding:10px;">
    <tbody>
      <tr>
        <td style=3D"font-family:helvetica">

          <p style=3D"font-size:16px;text-decoration:none;display:block;col=
or:white;padding: 10px; line-height: 25px;background-color:#333333;border:n=
one; border-radius: 14px;  margin: 0px; text-align: center;"
            href=3D"">
            Please DO NOT reply to this email.
            <br>
            For any questions email <a =
href=3D"mailto:contact.glowleds@gmail.com"
              =
style=3D"font-size:16px;text-decoration:none;color:#009eff;">contact.=
glowleds@gmail.com
          </p>
        </td>
      </tr>
    </tbody>
  </table>
    </td>
  </tr>
</table>
        <table =
style=3D"width:100%;border-spacing:0;background-color:#333333">
  <tbody>
    <tr>
      <td style=3D"font-family:helvetica;padding-bottom:35px 0">
        <table style=3D"max-width:400px;text-align:center;border-spacing:0p=
x;margin:10px auto;">
  <tbody>
    <tr>
      <td style=3D"font-family:hel=
vetica;font-size:30px;color:white;text-align:center;width:100px;"><a =
href=3D"https://www.facebook.com/Glow-LEDscom-100365571740684" =
target=3D"_blank" rel=3D"noopener noreferrer"><img src=3D"https://images2.=
imgbox.com/9b/a0/XAC4qmRL_o.png" style=3D"height:25px;display:block;margin:=
0 auto;" alt=3D"Facebook" title=3D"Facebook Logo" /></a></td>
      <td style=3D"font-family:helvetica;font-size:30px;color:white;text-al=
ign:center;width:100px;"><a href=3D"https://www.instagram.com/glow_leds/" =
target=3D"_blank" rel=3D"noopener noreferrer"><img src=3D"https://images2.=
imgbox.com/d2/77/vuk6FOeW_o.png" style=3D"height:25px;display:block;margin:=
0 auto;" alt=3D"Instagram" title=3D"Instagram Logo" /></a></td>
      <td style=3D"font-family:helvetica;font-size:30px;color:white;text-al=
ign:center;width:100px;"><a href=3D"https://www.tiktok.com/@glow_leds?=
lang=3Den" target=3D"_blank" rel=3D"noopener noreferrer"><img =
src=3D"https://images2.imgbox.com/c1/ea/6hNkTIwU_o.png" =
style=3D"height:22px;display:block;margin:0 auto;" alt=3D"Tiktok" =
title=3D"Tiktok Logo" /></a></td>
      <td style=3D"font-family:helvetica;=
font-size:30px;color:white;text-align:center;width:100px;"><a =
href=3D"https://www.youtube.com/channel/UCm_gDyTIy7d0oR9LeowPkYw?=
sub_confirmation=3D1" target=3D"_blank" rel=3D"noopener noreferrer"><img =
src=3D"https://images2.imgbox.com/c9/83/3Z0OwK1r_o.png" =
style=3D"height:22px;display:block;margin:0 auto;" alt=3D"Youtube" =
title=3D"Youtube Logo" /></a></td>
    </tr>
  </tbody>
</table>
        <table style=3D"max-width:560px;width:100%;text-align:left;border-s=
pacing:0;margin:15px auto;color:white">
          <tr>
            <td style=3D"font-family:helvetica;color:white">
              <div style=3D"border-bottom:1px white solid"></div>
            </td>
          </tr>
        </table>
        <table
          style=3D"max-width:800px;width:100%;text-align:left;border-spacin=
g:0;margin:0 auto;color:white;margin-bottom:10px">
          <tr>
            <td style=3D"font-family:helvetica;color:white">
              <p style=3D"text-align:center;font-size:16px;color:white"><st=
rong>Glow LEDs</strong> <br /><br />1086 Old Farm Rd <br />Lexington, VA =
24450 </p>
              <p style=3D"text-align:center;font-size:16px;color=
:white">Copyright =C2=A9 2022</p>
            </td>
          </tr>
        </table>
        <table
          style=3D"max-width:800px;width:10=
0%;text-align:left;border-spacing:0;margin:0 auto;color:white;margin-bottom=
:10px">
          <tr>
            <td style=3D"font-family:helvetica;color=
:white; width: 100%;margin: auto;text-align: center;">
              <img src=3D"https://images2.imgbox.com/78/52/dfNQTgC3_o.png" =
alt=3D"logo" style=3D"width:143px;">
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </tbody>
</table>
      </td>
    </tr>
  </table>
</body>


`;

const extractShippingAddress = html => {
  const cheer = cheerio.load(html);

  const shippingDetailsHtml = cheer('h4:contains("Shipping:")').parent().next().find("p").first().html();
  // Decode HTML entities
  const decodedHtml = he.decode(shippingDetailsHtml);

  // Remove any soft line breaks and encoded spaces
  const cleanHtml = decodedHtml
    .replace(/=\r\n/g, "")
    .replace(/=\n/g, "")
    .replace(/=20/g, " ")
    .replace(/=09/g, " ")
    .replace(/=/g, "")
    .replace(/[\s]+/g, " ");

  // Load the clean HTML into cheerio
  const $ = cheerio.load(cleanHtml);

  // Extract text content and remove extra spaces
  const textContent = $.text().replace(/\s+/g, " ").trim();

  // Find the index of the first digit (assuming address starts with a number)
  const firstDigitIndex = textContent.search(/\d/);

  // Extract name and address
  const name = textContent.substring(0, firstDigitIndex).trim();
  const addressText = textContent.substring(firstDigitIndex).trim();

  // Parse the address using parse-address
  const parsedAddress = parseAddress.parseLocation(addressText);

  // Extract first name and last name
  const nameParts = name.split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ");

  return {
    shippingFirstName: firstName || "",
    shippingLastName: lastName || "",
    address1: `${parsedAddress.number || ""} ${parsedAddress.street || ""} ${parsedAddress.type || ""}`.trim(),
    address2: parsedAddress.sec_unit_type ? `${parsedAddress.sec_unit_type} ${parsedAddress.sec_unit_num}` : "",
    city: parsedAddress.city || "",
    state: parsedAddress.state || "",
    postalCode: parsedAddress.zip || "",
    country: parsedAddress.country || "US", // Default to US if not specified
    address_string: textContent,
  };
};

// Extract product information from the HTML
const shipping = extractShippingAddress(html);

// Create the final structure
const result = { shipping };

// Output the result
