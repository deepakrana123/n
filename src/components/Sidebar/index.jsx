import { idProofs } from "@/constants/constants";
import { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import {
  MdArrowDropDownCircle,
  MdRadioButtonChecked,
  MdCheckBox,
  MdDateRange,
  MdWorkOutline,
} from "react-icons/md";
import { AiOutlineFileText, AiOutlineFontSize } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaArrowLeft, FaEdit, FaSave, FaUniversity } from "react-icons/fa";
import { LuUpload } from "react-icons/lu";
import { TbNumber123 } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { sidebarStatus } from "@/services/reducer/ScreenReducer";

const getIcon = {
  numberField: <TbNumber123 className="h-8 w-8 text-black cursor-grab" />,
  textField: <AiOutlineFontSize className="h-8 w-8 text-black cursor-grab" />,
  selectDropdown: (
    <MdArrowDropDownCircle className="h-8 w-8 text-black cursor-grab" />
  ),
  radio: <MdRadioButtonChecked className="h-8 w-8 text-black cursor-grab" />,
  checkbox: <MdCheckBox className="h-8 w-8 text-black cursor-grab" />,
  pincode: <RiLockPasswordLine className="h-8 w-8 text-black cursor-grab" />,
  bank: <FaUniversity className="h-8 w-8 text-black cursor-grab" />,
  dateField: <MdDateRange className="h-8 w-8 text-black cursor-grab" />,
  occupation: <MdWorkOutline className="h-8 w-8 text-black cursor-grab" />,
  textArea: <AiOutlineFileText className="h-8 w-8 text-black cursor-grab" />,
  save: <FaSave className="h-8 w-8 text-black cursor-grab" />,
  back: <FaArrowLeft className="h-8 w-8 text-black cursor-grab" />,
  update: <FaEdit className="h-8 w-8 text-black cursor-grab" />,
  upload: <LuUpload className="h-8 w-8 text-black cursor-grab" />,
};

const Sidebar = () => {
  const [dragEnd, setDragEnd] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const dispatch=useDispatch()
  const handleDragStart = (event, item) => {
    console.log(item, "hihi");
    let obj = {
      type: item,
      where: "sidebar",
    };
    event.dataTransfer.setData("text/plain", JSON.stringify(obj));
    dispatch(sidebarStatus(true))

    // setDragEnd(item);
    // setIsDragging(true);
  };

  const handleDragEnd = () => {
    // setDragEnd(null);
    // setIsDragging(false);
  };

  return (
    <aside
      className="w-[350px]  h-[730px] max-w-[350px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto 
    scrollbar-mobile smooth-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 place-items-center">
        {idProofs.map(({ header, columns, draggable, icon }, index) => (
          <>
            <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start">
              {header}
            </p>
            {draggable &&
              columns?.map((newItem, index) => (
                <Button
                  variant={"outline"}
                  key={newItem?.label + "" + String(index)}
                  draggable
                  onDragStart={(event) => handleDragStart(event, newItem?.id)}
                  onDragEnd={(event) => handleDragEnd(event)}
                  className="flex flex-col gap-2 h-[80px] w-[120px] cursor-grab"
                >
                  {getIcon[newItem?.icon]}
                  <p className="text-xs">{newItem?.label}</p>
                </Button>
              ))}
            {draggable == false &&
              columns?.map((newItem, index) => (
                <Button
                  variant={"outline"}
                  key={newItem?.label + "" + String(index)}
                  className="flex flex-col gap-2 h-[80px] w-[120px] cursor-grab"
                >
                  {getIcon[icon]}
                  <p className="text-xs">{newItem?.label}</p>
                </Button>
              ))}
          </>
        ))}
      </div>
    </aside>
  );
};
export default Sidebar;
