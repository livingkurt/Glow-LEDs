export default ({ title, url, user }: any): string => {
  return `
<table style="border-spacing:0;width:100%; padding: 10px; max-width: 600px; width: 100%; margin: auto;">
  <tbody>
    <tr style="font-size:16px">
      <td>
      <table style="max-width:800px;width:100%;text-align:left;border-spacing:0;margin:0 auto;color:white">
          <tr>
            <td style="font-family:helvetica;color:white">
              <h1
                style="text-align:center;font-family:helvetica;width:100%;margin:10px auto;line-height:50px;color:#333333;font-size:50px; padding-bottom: 7px;">
                ${title} </h1>

            </td>
          </tr>
        </table>

        <table
            style="max-width:800px;width:100%;text-align:left;border-spacing:0;margin:0 auto; background-color: #585858; border-radius: 20px; padding:15px; ">
            <tbody>
              <tr>
                <td style="font-family:helvetica">
                <h2
        style=" font-family:helvetica;overflow-x:auto;word-wrap:break-word;max-width:600px;width:100%;margin:0px auto;color:white;font-size:20px;line-height:30px; margin-bottom: 20px;">
        Hello ${user.first_name},
      </h2>
                    <p
                      style=" font-family:helvetica;overflow-x:auto;word-wrap:break-word;max-width:600px;width:100%;margin:0px auto;color:white;font-size:16px;line-height:30px; ">
                      Thank you for registering with Glow LEDs. To complete your account setup, please verify your email by clicking on the link below.
                    </p>

                    <table style="width:100%;border-spacing:0">
                      <tbody>
                        <tr>
                          <td>
                            <div style="display:flex;justify-content:center;margin:10px 0"><a href=${url}
                                style="background-color:#4c4f60;color:white;border-radius:10px;border:0;padding:15px;text-decoration:none">
                                <h4 style="font-family:helvetica;margin:0;font-size:20px;text-align:center">Verify Email
                                </h4>
                              </a></div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table style="width:100%;border-spacing:0">
                      <tbody>
                        <tr>
                        <p
                        style=" font-family:helvetica;overflow-x:auto;word-wrap:break-word;max-width:600px;width:100%;margin:0px auto;color:white;font-size:16px;line-height:30px;">
                        Button not working for you? Copy the url below into your browser.
                      </p>
                      <a href="${url}" alt="discount image"
                        style="color:#3eb8ff; text-decoration: none; word-break: break-all;">
                        <p className="margin: 20px;">${url}</p>
                      </a>
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
</table>`;
};
