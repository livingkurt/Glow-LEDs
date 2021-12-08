export default (props: any) => {
	return `

<table style="border-spacing:0;width:100%; padding: 20px; max-width: 600px; width: 100%; margin: auto;">
  <tbody>
    <tr style="font-size:16px">
      <td>
        <p
          style=" font-family:helvetica;overflow-x:auto;word-wrap:break-word;max-width:600px;width:100%;margin:0px auto;color:white;font-size:16px;line-height:30px; margin-bottom: 20px;">
          Hello ${props.first_name},
        </p>
        <p
          style=" font-family:helvetica;overflow-x:auto;word-wrap:break-word;max-width:600px;width:100%;margin:0px auto;color:white;font-size:16px;line-height:30px; ">
          You have successfully changed your Epic Games account password. If you did not make this request, please reset the passwords of your email address and Glow LEDs account.
        </p>
    
        <p style="
              font-family:helvetica;overflow-x:auto;word-wrap:break-word;max-width:600px;width:100%;margin:0px
              auto;color:white;font-size:16px;line-height:30px; margin-top:20px;">
          Thank you,
        </p>
        <p style="
              font-family:helvetica;overflow-x:auto;word-wrap:break-word;max-width:600px;width:100%;margin:0px
              auto;color:white;font-size:16px;line-height:30px;">
          The Glow LEDs Team
        </p>
      </td>
    </tr>
  </tbody>
</table>`;
};
