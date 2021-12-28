export default (props: any) => {
	return `"
<body style="background:unset;color:white;padding:0;margin:0;font-size:16px">
  <table style="width:100%;border-spacing:0;color:white;margin:auto;font-size:16px;background-color:#5f5f5f">
    <tr>
      <td style="font-family:helvetica;color:white">
        <table style="width:100%;border-spacing:0;color:white;background:#333333;padding:20px;height:100%">
          <tr>
            <td style="font-family:helvetica;color:white">
              <center>
                <table style="max-width:800px;text-align:left;border-spacing:0;margin:0 auto;color:white">
                  <tr>
                    <td style="font-family:helvetica;color:white">
                      <table style="width:100%;border-spacing:0;color:white">
                        <tr>
                          <td style="font-family:helvetica;color:white;padding:10px"><img
                              src="https://images2.imgbox.com/63/e7/BPGMUlpc_o.png" alt="Glow LEDs Logo"
                              title="Glow LEDs Logo" style="width:100%;margin-left:-15px" /></td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                <table style="max-width:800px;width:100%;text-align:left;border-spacing:0;margin:0 auto;color:white">
                  <tr>
                    <td style="font-family:helvetica;color:white">
                      <h1
                        style="text-align:center;font-family:helvetica;width:100%;margin:0 auto;line-height:50px;color:white;font-size:2em">
                        ${props.title}</h1>
                    </td>
                  </tr>
                </table>
              </center>
            </td>
          </tr>
        </table>
       ${props.body}
        <table style="width:100%;border-spacing:0;background-color:#333333">
          <tbody>
            <tr>
              <td style="font-family:helvetica;padding-bottom:35px 0">
                <center>
                  <table style="max-width:400px;text-align:center;border-spacing:0px;margin:10px auto;width:100%">
                    <tbody>
                      <tr>
                        <td style="font-family:helvetica;font-size:30px;color:white"><a
                            href="https://www.facebook.com/Glow-LEDscom-100365571740684" target="_blank"
                            rel="noopener noreferrer"><img src="https://images2.imgbox.com/9b/a0/XAC4qmRL_o.png"
                              style="height:25px" alt="Facebook" title="Facebook Logo" /></a></td>
                        <td style="font-family:helvetica;font-size:30px;color:white"><a
                            href="https://www.instagram.com/glow_leds/" target="_blank" rel="noopener noreferrer"><img
                              src="https://images2.imgbox.com/d2/77/vuk6FOeW_o.png" style="height:25px" alt="Instagram"
                              title="Instagram Logo" /></a></td>
                        <td style="font-family:helvetica;font-size:30px;color:white"><a
                            href="https://www.tiktok.com/@glow_leds?lang=en" target="_blank"
                            rel="noopener noreferrer"><img src="https://images2.imgbox.com/c1/ea/6hNkTIwU_o.png"
                              style="height:22px" alt="Tiktok" title="Tiktok Logo" /></a></td>
                        <td style="font-family:helvetica;font-size:30px;color:white"><a
                            href="https://www.youtube.com/channel/UCm_gDyTIy7d0oR9LeowPkYw?sub_confirmation=1"
                            target="_blank" rel="noopener noreferrer"><img
                              src="https://images2.imgbox.com/c9/83/3Z0OwK1r_o.png" style="height:22px" alt="Youtube"
                              title="Youtube Logo" /></a></td>
                      </tr>
                    </tbody>
                  </table>
                  <table
                    style="max-width:600px;width:100%;text-align:left;border-spacing:0;margin:15px auto;color:white">
                    <tr>
                      <td style="font-family:helvetica;color:white">
                        <div style="border-bottom:1px white solid"></div>
                      </td>
                    </tr>
                  </table>
                  <table
                    style="max-width:800px;width:100%;text-align:left;border-spacing:0;margin:0 auto;color:white;margin-bottom:10px">
                    <tr>
                      <td style="font-family:helvetica;color:white">
                        <p style="text-align:center;font-size:14px;color:white">Our mailing address is: <br />404
                          Kenniston Dr Apt D, Austin, TX 78752 </p>
                        <p style="text-align:center;font-size:14px;color:white">Want to change how you receive these
                          emails? <br /> You can <a
                            href="https://www.glow-leds.com/account/login?redirect=/secure/account/editprofile"
                            target="_blank" rel="noopener noreferrer"
                            style="text-decoration:underline;color:white">update your preferences</a> or <a
                            href="https://www.glow-leds.com/account/login?redirect=/secure/account/editprofile"
                            target="_blank" rel="noopener noreferrer"
                            style="text-decoration:underline;color:white">unsubscribe </a>from this list.</p>
                      </td>
                    </tr>
                  </table>
                </center>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </table>
</body>"


`;
};
