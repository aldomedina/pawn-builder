/**
 * TODO: INTEGRATE WALLET CONNECTION
 * TODO: INTEGRATE META BAR CONTENT
 */
import Marquee from "react-fast-marquee";
import cn from "classnames";
import React, { useState } from "react";
import { ibm } from "../../styles/fonts";
import Button from "../Button";

import s from "./nav.module.scss";
import { useRouter } from "next/router";

const Nav: React.FC<{ metabarContent: string | React.ReactNode }> = ({
  metabarContent,
}) => {
  const { push } = useRouter();
  const [isConnected, setIsConnected] = useState<
    "w-connected" | "w-disconnected"
  >("w-disconnected");

  return (
    <div className={s.nav}>
      {/* <Button customClass={s.btn} noDetail onClick={() => push("/")}>
        <span>MENU</span>
      </Button> */}
      <Button
        customClass={cn(s.btn, s[isConnected])}
        noDetail
        onClick={() => setIsConnected("w-connected")}
      >
        {/* <span>WALLET</span> */}
      </Button>
      <div className={cn(s.metabar, ibm.className)}>
        <Marquee gradient={false}> {metabarContent}</Marquee>
      </div>
    </div>
  );
};

export default Nav;
