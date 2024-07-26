import React from "react";
import { Switch as AntdSwitch } from "antd";

interface Props {
  onHandleSwitch: (checked: boolean) => void;
  value: boolean;
}

const Switch = ({ onHandleSwitch, value }: Props) => {
  return <AntdSwitch value={value} onChange={onHandleSwitch} />;
};

export default Switch;
