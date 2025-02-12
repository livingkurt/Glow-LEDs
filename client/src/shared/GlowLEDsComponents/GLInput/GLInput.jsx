import "./GLInput.scss";

const GLInput = ({
  style,
  value,
  helperText,
  error,
  id,
  required,
  type,
  onChange,
  label,
  name,
  autoFocus,
  inputProps,
  containerProps,
  inputClasses,
}) => {
  return (
    <>
      <div className="w-100per column pos-rel place_div" {...containerProps}>
        <input
          onChange={onChange}
          value={value}
          className={`zoom_f gl_input ${value ? "filled" : ""} place_input ${
            error ? "validation" : ""
          }  ${inputClasses}`}
          type={type}
          name={name}
          style={{ ...style }}
          id={id}
          required={required}
          autoFocus={autoFocus}
          spellCheck="false"
          {...inputProps}
        />
        <span htmlFor="name" className="fs-16px pos-abs place_holder">
          {label}
        </span>
      </div>
      {helperText && (
        <div className={`helper_text ${error ? "validation" : ""}`}>
          {helperText} {required && "Required"}
        </div>
      )}
    </>
  );
};

export default GLInput;
