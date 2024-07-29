import React from "react";
import { Switch as AntdSwitch, ConfigProvider } from "antd";
import { useThemeContext } from "@/contexts/ThemeContext";
import { Colors } from "@/theme";

interface Props {
  onHandleSwitch: (checked: boolean) => void;
  value: boolean;
}

const Switch = ({ onHandleSwitch, value }: Props) => {
  const { theme } = useThemeContext();
  const color = Colors[theme];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: color.active,
        },
      }}
    >
      <AntdSwitch value={value} onChange={onHandleSwitch} />
    </ConfigProvider>
  );
};

export default Switch;
