export default (props: any) => {
	return `<table style="width:100%;border-spacing:0">
  <tbody>
    <tr>
      <td style="font-family:helvetica">
        <center>
          <table style="max-width:800px;padding:20px;width:100%;text-align:left;border-spacing:0;margin:0 auto">
            <tbody>
              <tr>
                <td style="font-family:helvetica">
                  <table style="width:100%;border-spacing:0">
                    <tbody>
                      <tr>
                      ${props.images[0]
							? ` <td style="font-family:helvetica;width:50%">
                                    <table width="100%" style="max-width:800px">
                                      <tr>
                                        <td><img src=${props.images[0]} alt="Glow LEDs"
                                            title="Email Image" style="text-align:center;width:100%;border-radius:20px" />
                                        </td>
                                      </tr>
                                    </table>
                                  </td>`
							: ''}
                                ${props.images[1]
									? ` <td style="font-family:helvetica;width:50%">
                                    <table width="100%" style="max-width:800px">
                                      <tr>
                                        <td><img src=${props.images[1]} alt="Glow LEDs"
                                            title="Email Image" style="text-align:center;width:100%;border-radius:20px" />
                                        </td>
                                      </tr>
                                    </table>
                                  </td>`
									: ''}
                      </tr>
                    </tbody>
                  </table>
                  <table style="width:100%;border-spacing:0">
                    <tbody>
                      <tr>
                      ${props.images[2]
							? ` <td style="font-family:helvetica;width:50%">
                          <table width="100%" style="max-width:800px">
                            <tr>
                              <td><img src=${props.images[2]} alt="Glow LEDs"
                                  title="Email Image" style="text-align:center;width:100%;border-radius:20px" />
                              </td>
                            </tr>
                          </table>
                        </td>`
							: ''}
                      ${props.images[3]
							? ` <td style="font-family:helvetica;width:50%">
                          <table width="100%" style="max-width:800px">
                            <tr>
                              <td><img src=${props.images[3]} alt="Glow LEDs"
                                  title="Email Image" style="text-align:center;width:100%;border-radius:20px" />
                              </td>
                            </tr>
                          </table>
                        </td>`
							: ''}
                       
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </center>
      </td>
    </tr>
  </tbody>
</table>
<table width="100%" style="max-width:800px;margin:auto;padding:20px">
  <tr>
  ${props.h2
		? `<table style="border-spacing:0;margin:auto">
      <tbody>
        <tr style="font-family:helvetica;border-radius:4px">
          <td>
            <h2
              style="text-align:center;font-family:helvetica;color:white;font-size:20px;margin-top:20px;margin-bottom:0">
              ${props.h2}</h2>
          </td>
        </tr>
      </tbody>
    </table>`
		: ''}
    ${props.p
		? `<table style="border-spacing:0;margin-top:19px;width:100%;padding:10px">
      <tbody>
        <tr style="font-size:16px">
          <td>
            <pre
              style="max-width: 800px; font-family:helvetica;overflow-x:auto;white-space: pre-wrap;word-wrap:break-word;max-width:800px;width:100%;margin:20px auto;color:white;font-size:16px;line-height:30px">With a couple of diffusers that can never be unseen 🤯
              ${props.p}</pre>
          </td>
        </tr>
      </tbody>
    </table>`
		: ''}
    <div style="display:flex;justify-content:center;margin:10px 0"><a href=${props.link}
        style="background-color:#4c4f60;color:white;border-radius:10px;border:0;padding:15px;text-decoration:none">
        <h4 style="font-family:helvetica;margin:0;font-size:20px;text-align:center">${props.button}</h4>
      </a></div>
  </tr>
</table>
`;
};
