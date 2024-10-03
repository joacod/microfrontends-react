import { useState } from "react";
import "./ToggleButton.css";

export const ToggleButton = ({ callback }) => {
  const [isOn, setIsOn] = useState(false);

  const toggle = () => {
    setIsOn(!isOn);
    callback(!isOn);
  };

  return (
    <label className={`switch ${isOn ? "on" : "off"}`}>
      <input type="checkbox" onChange={toggle} />
      <span className={`slider ${isOn ? "on" : "off"}`} />
    </label>
  );
};
