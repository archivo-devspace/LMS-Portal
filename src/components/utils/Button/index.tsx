import React from "react";
import { Button as AntdButton, ConfigProvider, Space } from "antd";
import ButtonProps from "./type";
import { useThemeContext } from "@/contexts/ThemeContext";
import { Colors } from "@/theme";

const Button = ({
  btnType,
  htmlType,
  btnLabel,
  btnSize,
  btnShape,
  btnIcon,
  btnDisable,
  btnStyles,
  handleClick,
  btnDanger,
  btnBlock,
}: ButtonProps) => {
  const { theme } = useThemeContext();
  const color = Colors[theme];

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: color.active,
            colorBgBase: color.primary_strong,
            colorTextBase: color.text,
          },
        }}
      >
        <AntdButton
          type={btnType}
          htmlType={htmlType}
          shape={btnShape}
          size={btnSize}
          icon={btnIcon}
          danger={btnDanger}
          disabled={btnDisable}
          onClick={handleClick}
          block={btnBlock}
          className={btnStyles}
        >
          {btnLabel}
        </AntdButton>
      </ConfigProvider>
    </>
  );
};

export default Button;
