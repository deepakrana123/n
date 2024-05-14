import FixedMobileScreen from "@/components/MobileScreen";
import Sidebar from "@/components/Sidebar";
import { idProofs } from "@/constants/constants";
import { useState } from "react";
import ColorPicker, { useColorPicker } from "react-best-gradient-color-picker";

const CreateScreens = () => {
  const [color, setColor] = useState(
    "linear-gradient(90deg, rgba(96,93,93,1) 0%, rgba(255,255,255,1) 100%)"
  );
  const { setSolid, setGradient } = useColorPicker(color, setColor);
  const [id,setId]=useState("")
  return (
    <div className="flex justify-between bg-gray-200">
      <Sidebar IdProofs={idProofs} setId={setId}/>
      <FixedMobileScreen color={color} id={id}/>
      <div>
        <button onClick={setSolid}>Solid</button>
        <button onClick={setGradient}>Gradient</button>
        <ColorPicker value={color} onChange={setColor} />
      </div>
    </div>
  );
};

export default CreateScreens;
