const Notification = ({ message, ...others }) => {
  return (
    <div>
      <div className={`notification jc-c column pos-fix ${message || "none"}`} {...others}>
        <div className="ta-c  fs-14px">{message}</div>
      </div>
    </div>
  );
};

export default Notification;
