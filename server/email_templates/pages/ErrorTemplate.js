export default ({ error, file, status, path }) => {
  return `

      <div style="background-color:#5f5f5f;padding:20px">
        <h4 style="text-align:center;font-family:helvetica;color:white;font-size:1.5em;margin-top:20px;margin-bottom:0">
        Error: ${error.code}</h4>
        <p
          style="font-size:16px;line-height:30px;max-width:800px;text-align:center;width:100%;margin:20px auto;color:white">
          File: ${file}</p>
        <p
          style="font-size:16px;line-height:30px;max-width:800px;text-align:center;width:100%;margin:20px auto;color:white">
          Status: ${status}</p>
          <p
          style="font-size:16px;line-height:30px;max-width:800px;text-align:center;width:100%;margin:20px auto;color:white">
          Path: ${path}</p>
      </div>


	`;
};
