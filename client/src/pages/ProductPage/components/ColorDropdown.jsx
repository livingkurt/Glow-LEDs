import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const ColorDropdown = ({ label, color_code, onChange, value, options, defaultValue }) => {
  return (
    <div className="ai-c h-25px mb-25px">
      <InputLabel className="mv-0px mr-10px title_font">{label}</InputLabel>
      <div className="ai-c">
        {color_code && <canvas className="mh-1rem w-60px h-20px br-7px" style={{ backgroundColor: color_code }} />}
        <FormControl style={{ flexGrow: 1 }}>
          <Select
            onChange={onChange}
            value={value}
            defaultValue={defaultValue}
            className="w-100per"
            style={{ backgroundColor: "white" }}
          >
            {options
              .filter(item => item.filament && item.filament.active)
              .map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option.color}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default ColorDropdown;
