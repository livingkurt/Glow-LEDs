export default (props: any) => {
  return `

<table style="border-spacing:0;width:100%; padding: 10px; max-width: 600px; width: 100%; margin: auto;">
  <tbody>
    <tr style="font-size:16px">
      <td>
      <h2
      style=" font-family:helvetica;overflow-x:auto;word-wrap:break-word;max-width:600px;width:100%;margin:0px auto;color:#333333;font-size:20px;line-height:30px; margin-bottom: 20px;">
      Hello ${props.first_name},
    </h2>
        <table
            style="max-width:800px;width:100%;text-align:left;border-spacing:0;margin:0 auto;   background-color: #585858; border-radius: 20px; padding:15px; ">
            <tbody>
              <tr>
                <td style="font-family:helvetica">
        <p
          style=" font-family:helvetica;overflow-x:auto;word-wrap:break-word;max-width:600px;width:100%;margin:0px auto;color:white;font-size:16px;line-height:30px; ">
          You have successfully changed your Glow LEDs account password. If you did not make this request, please reset the passwords of your email address and Glow LEDs account.
        </p>
        </td>
        </tr>
      </tbody>
    </table>
      
      </td>
    </tr>
  </tbody>
</table>`;
};
