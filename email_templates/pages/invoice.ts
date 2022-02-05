import { format_date, email_sale_price_switch, determine_product_name, determin_card_logo_images } from '../../util';

export default (props: any) => {
	const { email, order } = props;
	return `<body id="invoice" style="background-color:transparent;zoom:60%">
  <div
    style="display:flex;flex-direction:column;margin:40px;margin-top:75px;font-size:25px;line-height:35px;font-family:&#x27;Helvetica Neue&#x27;, &#x27;Helvetica&#x27;, Helvetica, Arial, sans-serif;color:black;background-color:white">
    <table cellpadding="0" cellspacing="0" style="width:100%;line-height:inherit;text-align:left;font-size:25px"
      width="100%" align="left">
      <tbody>
        <tr>
          <td colspan="2" style="padding:0" valign="top">
            <table style="width:100%;line-height:inherit;text-align:left" width="100%" align="left">
              <tr>
                <td style="color:#333" valign="top"><img alt="Logo"
                    src="https://images2.imgbox.com/cd/00/K5HGEKDJ_o.png" style="width:500px;margin-left:-5px" /></td>
                <td style="text-align:right;font-size:25px" valign="top" align="right"><strong>Invoice #:</strong>
                  61ef74b018e233b38fb278b6<br /><strong>Created:</strong> 01/25/2022</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td colspan="2" valign="top">
            <table style="width:100%;line-height:inherit;text-align:left;font-size:25px" width="100%" align="left">
              <tr>
                <td valign="top">Glow LEDs<br />230 Hackberry St<br />Baytown, TX 77520<br />info.glowleds@gmail.com
                </td>
                <td style="text-align:right" valign="top" align="right">Mckinnley Riojas<br />2104 Collington Drive
                  <br />Roanoke, TX 76262<br />starstreamtut@gmail.com
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <table cellpadding="0" cellspacing="0" style="width:100%;line-height:inherit;text-align:left;font-size:25px"
      width="100%" align="left">
      <tbody>
        <tr>
          <td style="padding:5px;vertical-align:top;background:#eee;border-bottom:1px solid black;font-weight:bold"
            valign="top">Payment Method</td>
          <td
            style="padding:5px;vertical-align:top;text-align:right;background:#eee;border-bottom:1px solid black;font-weight:bold"
            valign="top" align="right">Last 4</td>
        </tr>
        <tr>
          <td style="padding:5px;display:flex;vertical-align:top;border-bottom:1px solid black;align-items:center"
            valign="top"><img src="https://images2.imgbox.com/73/a0/efpzYR25_o.png" alt="visa" title="Card Type Image"
              style="width:50px;margin-right:0.5rem" />
            <div>visa</div>
          </td>
          <td style="padding:5px;vertical-align:top;text-align:right;border-bottom:1px solid black" valign="top"
            align="right">4242</td>
        </tr>
      </tbody>
    </table>
    <table cellpadding="0" cellspacing="0" style="width:100%;line-height:inherit;text-align:left;font-size:25px"
      width="100%" align="left">
      <tbody>
        <tr>
          <td style="padding:5px;vertical-align:top;background:#eee;border-bottom:1px solid black;font-weight:bold"
            valign="top">Item</td>
          <td
            style="padding:5px;vertical-align:top;text-align:right;background:#eee;border-bottom:1px solid black;font-weight:bold"
            valign="top" align="right">Price</td>
        </tr>
        <tr>
          <td style="padding:5px;vertical-align:top;border-bottom:1px solid black" valign="top">
            <div> Glow Strings V2 50 LED / 3.5m</div>
          </td>
          <td style="padding:5px;vertical-align:top;text-align:right;border-bottom:1px solid black" valign="top"
            align="right"><label> $59.99</label></td>
        </tr>
        <tr>
          <td style="padding:5px;vertical-align:top;border-bottom:1px solid black" valign="top">
            <div>3x White Supremes - L </div>
          </td>
          <td style="padding:5px;vertical-align:top;text-align:right;border-bottom:1px solid black" valign="top"
            align="right"><label> $11.85</label></td>
        </tr>
        <tr>
          <td style="padding:5px;vertical-align:top;border-bottom:1px solid black" valign="top">
            <div> White Supremes - XL </div>
          </td>
          <td style="padding:5px;vertical-align:top;text-align:right;border-bottom:1px solid black" valign="top"
            align="right"><label> $3.95</label></td>
        </tr>
        <tr>
          <td style="padding:5px;vertical-align:top;border-bottom:1px solid black" valign="top">
            <div> Clear Nano Glow Casings - Bubble Button (Atoms) - 10</div>
          </td>
          <td style="padding:5px;vertical-align:top;text-align:right;border-bottom:1px solid black" valign="top"
            align="right"><label> $15.99</label></td>
        </tr>
        <tr>
          <td style="padding:5px;vertical-align:top;border-bottom:1px solid black" valign="top">
            <div> Clear Coin Glow Casings - 10 </div>
          </td>
          <td style="padding:5px;vertical-align:top;text-align:right;border-bottom:1px solid black" valign="top"
            align="right"><label> $15.99</label></td>
        </tr>
        <tr>
          <td style="padding:5px;vertical-align:top;border-bottom:1px solid black" valign="top">
            <div> Bulk CR1225 Batteries - 200 </div>
          </td>
          <td style="padding:5px;vertical-align:top;text-align:right;border-bottom:1px solid black" valign="top"
            align="right"><label> $24.99</label></td>
        </tr>
        <tr>
          <td style="padding:5px;vertical-align:top;border-bottom:1px solid black" valign="top">
            <div> Dodecahedron EXO Diffusers (Black Skeleton &amp; Frosted Plug) </div>
          </td>
          <td style="padding:5px;vertical-align:top;text-align:right;border-bottom:1px solid black" valign="top"
            align="right"><label> $15.99</label></td>
        </tr>
      </tbody>
    </table>

    <table cellpadding="0" cellspacing="0" style="width:100%;line-height:inherit;text-align:left;font-size:25px"
      width="100%" align="left">
      <tbody>
        <tr>
          <td colspan="2" valign="top">
            <table style="width:100%;line-height:inherit;text-align:left;font-size:25px" width="100%" align="left">
              <tr>
                <td valign="top" style="width:50%;">
                  <div style="padding:5px;vertical-align:top;text-align:left;display:flex" valign="top" align="right">
                    <strong style="margin-right:3px">Promo Code: </strong>
                  </div>
                  <div style="padding:5px;vertical-align:top;text-align:left" valign="top" align="right"><strong
                      style="margin-right:3px">Order Note: </strong> </div>
                </td>
                <td style="text-align:right; width:50%" valign="top" align="right">
                  <table cellpadding="0" cellspacing="0"
                    style="width:100%;line-height:inherit;text-align:left;font-size:25px" width="100%" align="left">
                    <tbody>
                      <tr>
                        <td colspan="2" valign="top">
                          <table style="width:100%;line-height:inherit;text-align:left;font-size:25px" width="100%"
                            align="left">
                            <tr>
                              <td valign="top">
                                <del style="color:red">
                                  <div style="padding:5px;vertical-align:top;text-align:left;display:flex;color:black"
                                    valign="top" align="right">Subtotal:</div>
                                </del>

                              </td>
                              <td style="text-align:right; margin-right:3px;" valign="top" align="right">
                                <del style="color:red">
                                  <div style="padding:5px;vertical-align:top;text-align:right;color:black" valign="top"
                                    align="right">$148.75
                                  </div>
                                </del>
                              </td>
                            </tr>
                            <tr>
                              <td valign="top">
                                <div
                                  style="padding:5px;vertical-align:top;text-align:left;display:flex; margin-right:3px;"
                                  valign="top" align="right">Discount:</div>

                              </td>
                              <td style="text-align:right; margin-right:3px;" valign="top" align="right">
                                <div style="padding:5px;vertical-align:top;text-align:right" valign="top" align="right">
                                  <div>-$37.19</div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td valign="top">
                                <div style="padding:5px;vertical-align:top;text-align:left" valign="top" align="right">
                                  New Subtotal: </div>

                              </td>
                              <td style="text-align:right; margin-right:3px;" valign="top" align="right">
                                <div style="padding:5px;vertical-align:top;text-align:right" valign="top" align="right">
                                  <div>$111.56</div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td valign="top">
                                <div style="padding:5px;vertical-align:top;text-align:left" valign="top" align="right">
                                  Tax: </div>

                              </td>
                              <td style="text-align:right; margin-right:3px;" valign="top" align="right">
                                <div style="padding:5px;vertical-align:top;text-align:right" valign="top" align="right">
                                  $6.97</div>
                              </td>
                            </tr>
                            <tr>
                              <td valign="top">
                                <div style="padding:5px;vertical-align:top;text-align:left" valign="top" align="right">
                                  Shipping: </div>

                              </td>
                              <td style="text-align:right; margin-right:3px;" valign="top" align="right">
                                <div style="padding:5px;vertical-align:top;text-align:right" valign="top" align="right">
                                  $9.90</div>
                              </td>
                            </tr>
                      </tr>
                    </tbody>
                  </table>
                  <table cellpadding="0" cellspacing="0"
                    style="width:100%;line-height:inherit;text-align:left;font-size:25px" width="100%" align="left">
                    <tbody>
                      <tr>
                        <td colspan="2" valign="top">
                          <table style="width:100%;line-height:inherit;text-align:left;font-size:25px" width="100%"
                            align="left">
                            <tr>

                              <td>
                                <div style="vertical-align:top;width:100%;margin-left:auto;border-top:1px solid black"
                                  valign="top"></div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table cellpadding="0" cellspacing="0"
                    style="width:100%;line-height:inherit;text-align:left;font-size:25px" width="100%" align="left">
                    <tbody>
                      <tr>
                        <td colspan="2" valign="top">
                          <table style="width:100%;line-height:inherit;text-align:left;font-size:25px" width="100%"
                            align="left">
                            <tr>
                              <td valign="top">
                                <div style="padding:5px;vertical-align:top;text-align:left; font-weight:bold"
                                  valign="top" align="right">
                                  Total: </div>

                              </td>
                              <td style="text-align:right; margin-right:3px;" valign="top" align="right">
                                <div style="padding:5px;vertical-align:top;text-align:right; font-weight:bold;"
                                  valign="top" align="right">
                                  $128.44</div>
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
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      <h3 style="text-align:center">Welcome to the Glow LEDs family!</h3>
      <div style="text-align:center">We are so happy to share our art with you.</div>
      <div style="text-align:center">The code below will take you to our <strong>FAQ page</strong> for all kinds of
        helpful information.</div>
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div style="text-align:center;width:182px">
          <div style="text-align:center"><strong>Facebook</strong></div>
          <div style="text-align:center">@glowledsofficial</div>
          <div style="text-align:center"><strong>Instagram</strong></div>
          <div style="text-align:center">@glow_leds</div>
        </div><img alt="QR Code" src="https://thumbs2.imgbox.com/3d/d5/H6vg7spK_t.png"
          style="width:250px;text-align:center" />
        <div style="text-align:center;width:200px">
          <div style="text-align:center"><strong>Tiktok</strong></div>
          <div style="text-align:center">@glow_leds</div>
          <div style="text-align:center"><strong>YouTube</strong></div>
          <div style="text-align:center">Glow LEDs</div>
        </div>
      </div>
      <div style="text-align:center"><strong>Tag us in your videos and pictures!</strong></div>
      <div style="text-align:center">We want to feature you!</div>
      <div style="text-align:center">We are figuring this out as we go so any feedback is welcome.</div>
      <div style="text-align:center">We appreciate you more than you know.</div>
      <div style="text-align:center"><strong>Questions or concerns?:</strong> info.glowleds@gmail.com</div>
    </div>
  </div>
</body>`;
};
