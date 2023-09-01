import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const GLSelect = ({ label, color_code, onChange, width, value, options }) => {
  return (
    <div className={`ai-c h-25px mb-25px ${width < 1150 ? "jc-b" : ""}`}>
      <InputLabel className="mv-0px mr-10px title_font">{label}</InputLabel>
      <div className="ai-c">
        {color_code && <canvas className="mh-1rem w-60px h-20px br-7px" style={{ backgroundColor: color_code }} />}
        <FormControl className="custom-select">
          <Select className="qty_select_dropdown w-100per" onChange={onChange} value={value}>
            {options
              .filter(item => item.filament && item.filament.active)
              .map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default GLSelect;
