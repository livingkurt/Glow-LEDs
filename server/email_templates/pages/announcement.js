export default ({ h1, h2, images, p, button, link, module_color, button_color, text_color, title_color }) => {
  return `<table style="border-spacing:0;width:100%; padding: 10px; max-width: 800px; width: 100%; margin: auto;">
  <tbody>
    <tr style="font-size:16px">
      <td>
        <table style="max-width:800px;width:100%;text-align:left;border-spacing:0;margin:0 auto;">
          <tr>
            <td style="font-family:helvetica;">
              ${
                h1
                  ? `<h1
                style="text-align:center;font-family:helvetica;width:100%;margin:10px auto;line-height:50px;color:${title_color};font-size:50px; padding-bottom: 7px;">
                ${h1}
              </h1>`
                  : ""
              }
            </td>
          </tr>
        </table>
        <table
          style="max-width:800px;width:100%;text-align:left;border-spacing:0;margin:0 auto;   background-color: ${module_color}; border-radius: 20px; padding:15px; margin: 10px auto;">
          <tbody>
            <tr>
              <td style="font-family:helvetica">

                <table style="width:100%;border-spacing:0">
                  <tbody>
                    <tr>
                      <h2
                        style="text-align:center;font-family:helvetica;margin-top:10px;margin-bottom:10px;">
                        ${h2}</h2>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <a href=${link} style="text-decoration:none;" target="_blank">
          <table
            style="max-width:800px;width:100%;text-align:left;border-spacing:0;margin:0 auto;   background-color: ${module_color}; border-radius: 20px; padding:15px;">
            <tbody>
              <tr>
                <td style="font-family:helvetica">
                  <table style="width:100%;border-spacing:0">
                    <tbody>
                      <tr>
                        ${
                          images[0]?.link
                            ? ` <td style="font-family:helvetica;width:50%">
                          <table width="100%" style="max-width:800px">
                            <tr>
                              <td><img src=${images[0]?.link}?t=${Date.now()}" alt="Glow LEDs" title="Email Image"
                                  style="text-align:center;width:100%;border-radius:20px" />
                              </td>
                            </tr>
                          </table>
                        </td>`
                            : ""
                        }
                        ${
                          images[1]?.link
                            ? ` <td style="font-family:helvetica;width:50%">
                          <table width="100%" style="max-width:800px">
                            <tr>
                              <td><img src=${images[1]?.link}?t=${Date.now()}" alt="Glow LEDs" title="Email Image"
                                  style="text-align:center;width:100%;border-radius:20px" />
                              </td>
                            </tr>
                          </table>
                        </td>`
                            : ""
                        }
                      </tr>
                    </tbody>
                  </table>
                  <table style="width:100%;border-spacing:0">
                    <tbody>
                      <tr>
                        ${
                          images[2]?.link
                            ? ` <td style="font-family:helvetica;width:50%">
                          <table width="100%" style="max-width:800px">
                            <tr>
                              <td><img src=${images[2]?.link}?t=${Date.now()}" alt="Glow LEDs" title="Email Image"
                                  style="text-align:center;width:100%;border-radius:20px" />
                              </td>
                            </tr>
                          </table>
                        </td>`
                            : ""
                        }
                        ${
                          images[3]?.link
                            ? ` <td style="font-family:helvetica;width:50%">
                          <table width="100%" style="max-width:800px">
                            <tr>
                              <td><img src=${images[3]?.link}?t=${Date.now()}" alt="Glow LEDs" title="Email Image"
                                  style="text-align:center;width:100%;border-radius:20px" />
                              </td>
                            </tr>
                          </table>
                        </td>`
                            : ""
                        }

                      </tr>
                    </tbody>
                    <table style="width:100%;border-spacing:0">
                      <tbody>
                        <tr>
                          ${
                            images[4]?.link
                              ? ` <td style="font-family:helvetica;width:50%">
                            <table width="100%" style="max-width:800px">
                              <tr>
                                <td><img src=${images[4]?.link}?t=${Date.now()}" alt="Glow LEDs" title="Email Image"
                                    style="text-align:center;width:100%;border-radius:20px" />
                                </td>
                              </tr>
                            </table>
                          </td>`
                              : ""
                          }
                          ${
                            images[5]?.link
                              ? ` <td style="font-family:helvetica;width:50%">
                            <table width="100%" style="max-width:800px">
                              <tr>
                                <td><img src=${images[5]?.link}?t=${Date.now()}" alt="Glow LEDs" title="Email Image"
                                    style="text-align:center;width:100%;border-radius:20px" />
                                </td>
                              </tr>
                            </table>
                          </td>`
                              : ""
                          }

                        </tr>
                      </tbody>
                    </table>
                    <table style="width:100%;border-spacing:0">
                      <tbody>
                        <tr>
                          ${
                            images[6]?.link
                              ? ` <td style="font-family:helvetica;width:50%">
                            <table width="100%" style="max-width:800px">
                              <tr>
                                <td><img src=${images[6]?.link}?t=${Date.now()}" alt="Glow LEDs" title="Email Image"
                                    style="text-align:center;width:100%;border-radius:20px" />
                                </td>
                              </tr>
                            </table>
                          </td>`
                              : ""
                          }
                          ${
                            images[7]?.link
                              ? ` <td style="font-family:helvetica;width:50%">
                            <table width="100%" style="max-width:800px">
                              <tr>
                                <td><img src=${images[7]?.link}?t=${Date.now()}" alt="Glow LEDs" title="Email Image"
                                    style="text-align:center;width:100%;border-radius:20px" />
                                </td>
                              </tr>
                            </table>
                          </td>`
                              : ""
                          }

                        </tr>
                      </tbody>
                    </table>
                </td>
              </tr>
            </tbody>
          </table>
        </a>
        <table
          style="max-width:800px;width:100%;text-align:left;border-spacing:0;margin:0 auto;   background-color: ${module_color}; border-radius: 20px; padding:15px; margin: 10px auto;">
          <tbody>
            <tr>
              <td style="font-family:helvetica">

                <table style="width:100%;border-spacing:0">
                  <tbody>
                    <tr>

                      ${
                        p
                          ? `
                      <pre
                        style="max-width: 800px; text-align:left; font-family:helvetica;overflow-x:auto;white-space: pre-wrap;word-wrap:break-word;max-width:800px;width:100%;margin:0px;color:${text_color};font-size:16px;line-height:20px">${p}</pre>
                      `
                          : ""
                      }

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
                <div style="display:flex;justify-content:center;margin:10px 0"><a href=${link}
                    style="background-color:${button_color};color:white;border-radius:10px;border:0;padding:15px;text-decoration:none">
                    <h4 style="font-family:helvetica;margin:0;font-size:20px;text-align:center">${button}
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
