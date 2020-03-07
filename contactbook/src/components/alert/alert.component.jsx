import React, { useContext } from "react";
import AlertContext from "./../../context/alert/alertContext";

const Alerts = () => {
  const alertContext = useContext(AlertContext);
  const { alert, setAlert } = alertContext;

  return (
    alert.length > 0 &&
    alert.map(alert => (
      <div key={alert.id} className={`alert alert-${alert.type}`}>
        <i className="fa fa-info-circle"></i> {alert.msg}
      </div>
    ))
  );
};

export default Alerts;
