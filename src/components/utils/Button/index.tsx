import React from 'react'
import { Button as AntdButton } from 'antd';
import ButtonProps from './type'
import styles from "./button.module.css"
import type { SizeType } from 'antd/es/config-provider/SizeContext';

const Button = ({ btnType ,htmlType, btnLabel, btnSize, btnShape , btnIcon, btnDisable, btnStyles ,handleClick ,btnDanger, btnBlock} : ButtonProps) => {
  return (
      <>
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
              className={`${btnStyles} ${styles[btnType]}`}
          >{btnLabel}</AntdButton>
      </>
  )
}

export default Button