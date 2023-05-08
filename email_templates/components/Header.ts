export default (header_footer_color: string) => {
  return `<table style="width:100%;border-spacing:0;color:white;background:${
    header_footer_color ? header_footer_color : `#333333`
  };padding:20px;height:100%">
  <tr>
    <td style="font-family:helvetica;color:white">
      <table style="max-width:800px;text-align:left;border-spacing:0;margin:0 auto;color:white">
        <tr>
          <td style="font-family:helvetica;color:white">
            <table style="width:100%;border-spacing:0;color:white">
              <tr>
                <td style="font-family:helvetica;color:white;padding:10px">
                  <a href="https://www.glow-leds.com/" target="_blank" rel="noopener noreferrer"> <img
                      src="https://images2.imgbox.com/63/e7/BPGMUlpc_o.png" alt="Glow LEDs Logo" title="Glow LEDs Logo"
                      style="width:100%;margin-left:-15px" /></a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
};
