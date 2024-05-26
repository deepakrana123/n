import { ColorPicker,Saturation,Hue } from "react-color-palette";
import "react-color-palette/css";

const Color = ({ color, setColor }) => {
  return (
    <div className="custom-layout">
      <Saturation height={300} color={color} onChange={setColor} />
      <Hue color={color} onChange={setColor} />
    </div>
  );
};
export default Color;
