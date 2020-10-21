export default (props) => {
	return `
  <body style="padding:0;margin:0">
  <div>
  <div style="font-family:helvetica;margin:0px;padding:0px;width:100%;border-radius:20px">
    <div style="background-color:#333333;padding:20px">
      <div style="display:flex;justify-content:center">
        <table width="100%" style="max-width:500px">
          <tr>
            <td><img src="https://images2.imgbox.com/63/e7/BPGMUlpc_o.png" alt="Glow LEDs"
                style="text-align:center;width:100%;margin-right:20px" /></td>
          </tr>
        </table>
      </div>
      <h4
      style="text-align:center;font-family:helvetica;width:100%;margin:0 auto;line-height:50px;color:white;font-size:2em">
      Log Error: ${props.title}</h4>
  </div>
  ${props.body}
  </div>
  </div>
</div>
</body>
	`;
};
