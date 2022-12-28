import cn from "classnames";
import React from "react";

import s from "./button.module.scss";

interface Props extends React.ComponentPropsWithoutRef<"button"> {
  btnStyle?: "primary" | "secondary";
  btnSize?: "XS" | "SM" | "MD" | "LG";
  fullWidth?: boolean;
  noDetail?: boolean;
  customClass?: string;
}

export default function Button({
  children,
  btnStyle = "primary",
  btnSize = "SM",
  fullWidth = false,
  noDetail = false,
  customClass,
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={cn(s.btn, s[btnStyle], s[btnSize], customClass, {
        [s.fullWidth]: fullWidth,
        [s.detail]: !noDetail,
      })}
    >
      {children}
    </button>
  );
}
