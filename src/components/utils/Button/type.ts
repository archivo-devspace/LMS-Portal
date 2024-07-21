import { MouseEventHandler, ReactNode } from "react";

export default interface ButtonProps {
    btnType: "primary" | "default" | "link" | "text" | "dashed",
    htmlType: "submit" | "button"
    btnLabel: string,
    btnVarient?: 'success' | 'warning' | "default" ,
    btnSize?: "large" | "middle" | "small",
    btnShape?:"circle" | "default" | "round",
    btnIcon?: ReactNode,
    btnDisable?: boolean,
    btnStyles?: string,
    btnDanger?: boolean,
    btnBlock?: boolean,
    handleClick?: MouseEventHandler<HTMLButtonElement>;
}