import React from "react";
import ReactSelect from "react-select";
import Knob from "../Knob";

import s from "./ToolBar.module.scss";

const ToolBar = () => {
  return (
    <div className={s.toolbar}>
      <div className={s.column}>
        <div className={s.inputWrapper}>
          <label className={s.label}>strenght</label>
          <input type="range" />
        </div>
      </div>
      <div className={s.column}>
        <div className={s.inputWrapper}>
          <label className={s.label}>rotation</label>
          <Knob />
          <Knob />
          <Knob />
        </div>
        <div className={s.inputWrapper}>
          <label className={s.label}>scale</label>
          <input type="range" />
          <input type="range" />
          <input type="range" />
        </div>
        <div className={s.inputWrapper}>
          <label className={s.label}>PALETTE</label>
          <ReactSelect />
        </div>
      </div>
    </div>
  );
};

export default ToolBar;
