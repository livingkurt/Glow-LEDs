const ToggleSwitch = ({ setting, update_function }) => {
  return (
    <div className="mv-10px ai-c">
      <div className="w-14rem">{setting.label}</div>
      <div className="switch">
        <input
          type="checkbox"
          name={setting.name}
          defaultChecked={setting.value === 1 ? true : false}
          onChange={e => update_function(e.target.name, e.target.checked === true ? 1 : 0)}
        />
        <span className="slider round" />
      </div>
    </div>
  );
};

export default ToggleSwitch;
