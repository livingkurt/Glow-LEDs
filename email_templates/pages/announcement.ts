export default (props: any) => {
  return `<table style="border-spacing:0;width:100%; padding: 20px; max-width: 800px; width: 100%; margin: auto;">
  <tbody>
    <tr style="font-size:16px">
      <td>
      <table style="max-width:800px;width:100%;text-align:left;border-spacing:0;margin:0 auto;color:white">
      <tr>
        <td style="font-family:helvetica;color:white">
          ${props.h1
            ? `<h1
            style="text-align:center;font-family:helvetica;width:100%;margin:10px auto;line-height:50px;color:#333333;font-size:50px; padding-bottom: 7px;">
            ${props.h1}
          </h1>`
            : ""}
        </td>
      </tr>
    </table>
    <table
    style="max-width:800px;width:100%;text-align:left;border-spacing:0;margin:0 auto;   background-color: #585858; border-radius: 20px; padding:15px; margin: 10px auto;">
    <tbody>
      <tr>
        <td style="font-family:helvetica">

          <table style="width:100%;border-spacing:0">
            <tbody>
              <tr>
                <p
                  style="text-align:center;font-family:helvetica;color:;font-size:16px;margin-top:10px;margin-bottom:10px;">
                  ${props.h2}</p>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
  <table
            style="max-width:800px;width:100%;text-align:left;border-spacing:0;margin:0 auto;   background-color: #585858; border-radius: 20px; padding:15px;">
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
                              <td><img src=${props
                                .images[0]} alt="Glow LEDs" title="Email Image"
                                  style="text-align:center;width:100%;border-radius:20px" />
                              </td>
                            </tr>
                          </table>
                        </td>`
                          : ""}
                        ${props.images[1]
                          ? ` <td style="font-family:helvetica;width:50%">
                          <table width="100%" style="max-width:800px">
                            <tr>
                              <td><img src=${props
                                .images[1]} alt="Glow LEDs" title="Email Image"
                                  style="text-align:center;width:100%;border-radius:20px" />
                              </td>
                            </tr>
                          </table>
                        </td>`
                          : ""}
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
                              <td><img src=${props
                                .images[2]} alt="Glow LEDs" title="Email Image"
                                  style="text-align:center;width:100%;border-radius:20px" />
                              </td>
                            </tr>
                          </table>
                        </td>`
                          : ""}
                        ${props.images[3]
                          ? ` <td style="font-family:helvetica;width:50%">
                          <table width="100%" style="max-width:800px">
                            <tr>
                              <td><img src=${props
                                .images[3]} alt="Glow LEDs" title="Email Image"
                                  style="text-align:center;width:100%;border-radius:20px" />
                              </td>
                            </tr>
                          </table>
                        </td>`
                          : ""}

                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table
            style="max-width:800px;width:100%;text-align:left;border-spacing:0;margin:0 auto;   background-color: #585858; border-radius: 20px; padding:15px; margin: 10px auto;">
            <tbody>
              <tr>
                <td style="font-family:helvetica">

                  <table style="width:100%;border-spacing:0">
                    <tbody>
                      <tr>

                      ${props.p
                        ? `<pre
                                style="max-width: 800px; font-family:helvetica;overflow-x:auto;white-space: pre-wrap;word-wrap:break-word;max-width:800px;width:100%;margin:0px;color:white;font-size:16px;line-height:30px">${props.p}</pre>
                           `
                        : ""}

                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table style="width:100%;border-spacing:0">
          <tbody>
            <tr>
              <td>
              <div style="display:flex;justify-content:center;margin:10px 0"><a href=${props.link}
                  style="background-color:#4c4f60;color:white;border-radius:10px;border:0;padding:15px;text-decoration:none">
                  <h4 style="font-family:helvetica;margin:0;font-size:20px;text-align:center">${props.button}
                  </h4>
                </a></div>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
};
