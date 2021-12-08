export default (props: any) => {
	return `"
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
                      src="https://images2.imgbox.com/63/e7/BPGMUlpc_o.png" alt="Glow LEDs Logo" title="Glow LEDs Logo"
                      style="width:100%;margin-left:-15px" /></td>
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
"`;
};
