import { useEffect, useRef, useState } from "react";
import s from "./Knob.module.scss";
type KnobProps = {
  value: number;
  min: number;
  max: number;
};
const R2D = 180 / Math.PI;
const Knob = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [startAngle, setStartAngle] = useState(0);
  const [angle, setAngle] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [active, setActive] = useState(false);
  const [center, setCenter] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!ref.current) return;
    const { top, left, height, width } = ref.current.getBoundingClientRect();
    const center = { x: left + width / 2, y: top + height / 2 };
    setCenter(center);
  }, []);

  const handleStart = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    ev.preventDefault();
    const nx = ev.clientX - center.x;
    const ny = ev.clientY - center.y;
    setStartAngle(R2D * Math.atan2(ny, nx));
    setActive(true);
  };

  const handleRotate = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    ev.preventDefault();
    let d, x, y;
    x = ev.clientX - center.x;
    y = ev.clientY - center.y;
    d = R2D * Math.atan2(y, x);
    setRotation(d - startAngle);
    if (active && ref.current)
      ref.current.style.transform = `rotate(${rotation + angle}deg)`;
  };

  const handleStop = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    ev.preventDefault();
    setActive(false);
    setRotation((r) => r);
    setAngle((r) => r + rotation);
  };

  useEffect(() => {}, [rotation]);
  return (
    <div
      ref={ref}
      onMouseDown={handleStart}
      onMouseMove={(e) => handleRotate(e)}
      onMouseUp={handleStop}
      onMouseOut={handleStop}
      className={s.knob}
    />
  );
};

export default Knob;
//   const ang = Math.floor((max * value) / 360);
