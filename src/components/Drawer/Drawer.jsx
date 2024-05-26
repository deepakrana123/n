// import { useState } from "react";
// import { Button } from "../ui/button";
// import { Input } from "../ui/input";
// import { Label } from "../ui/label";
// import {
//   Sheet,
//   SheetTrigger,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetDescription,
//   SheetFooter,
//   SheetClose,
// } from "../ui/sheet";
// import { HiOutlinePencilSquare } from "react-icons/hi2";
// import { useSelector } from "react-redux";
// import Color from "../ColorPicker/ColorPicker";
// import InputColor from "react-input-color";

// const SheetSide = ({ screenId, sheetWidth = "w-[500px]" }) => {
//   const rowValue = useSelector((state) => state.screen.screens);
//   const data = useSelector((state) => state.screen.data);
//   const [inputFields, setInputFields] = useState([
//     {
//       id: "required",
//       type: "checkbox",
//       label: "Field is required",
//       value: "required",
//     },
//     {
//       id: "placeholder",
//       type: "text",
//       label: "Change Placeholder",
//       placeholder: "Do you wants change placeholder",
//       value: "placeholder",
//     },
//     { id: "label", type: "text", label: "Change the label", value: "Label" },
//     {
//       id: "maxLength",
//       type: "number",
//       label: "Maximum length",
//       value: "0",
//     },
//     {
//       id: "maxLengthMessage",
//       type: "text",
//       label: "MaxLength Message",
//       value: "0",
//     },
//     {
//       id: "minLength",
//       type: "number",
//       label: "Minimum length",
//       value: "0",
//     },
//     {
//       id: "minLengthMessage",
//       type: "text",
//       label: "Minlength Message",
//       value: "0",
//     },
//   ]);
//   const [color, setColor] = useState("");
//   const [formData, setFormData] = useState({
//     required: "",
//     placeholder: "",
//     label: "",
//     maxLength: "",
//     maxLengthMessage: "",
//     minLengthMessage: "",
//     minLength: "",
//   });
//   const handleInputChange = (e, fieldId) => {
//     const value =
//       e.target.type === "checkbox" ? e.target.checked : e.target.value;
//     setFormData({
//       ...formData,
//       [fieldId]: value,
//     });
//   };
//   const handleSave = (id, formValue) => {
//     const newData = JSON.parse(JSON.stringify(data));
//     const screen = newData[id];
//     if (screen) {
//       const itemsToUpdate = screen.filter((item) => item.id === id.id);
//       itemsToUpdate.forEach((item) => {
//         Object.assign(item, formValue);
//       });
//       dispatch(editScreenDeatils([newData, screenId]));
//       return newData;
//     } else {
//       return newData;
//     }
//   };
//   console.log(color, screenId, "fij:K/ebgfKbn");
//   return (
//     <div className="flex flex-col gap-2">
//       <Sheet>
//         <SheetTrigger asChild>
//           <HiOutlinePencilSquare className="cursor-pointer" />
//         </SheetTrigger>
//         <SheetContent
//           className={`bg-white shadow-md rounded-lg ${sheetWidth}`}
//           size="large"
//           side="right"
//         >
//           <SheetHeader>
//             <SheetTitle>
//               {rowValue.filter((item) => item.id === screenId)[0].screenName}
//             </SheetTitle>
//             <SheetDescription>
//               Edit{" "}
//               {rowValue.filter((item) => item.id === screenId)[0].screenName}{" "}
//               Properties
//             </SheetDescription>
//           </SheetHeader>
//           <div className="p-1 flex flex-wrap justify-between">
//             <InputColor
//               initialValue="#5e72e4"
//               onChange={setColor}
//               placement="right"
//             />
//             {inputFields.map((field) => (
//               <div key={field.id}>
//                 {/* <div><Color color={color} setColor={setColor}/></div>
//                  */}

//                 {field.type === "checkbox" ? (
//                   <div className="flex flex-col">
//                     <Label
//                       htmlFor={field.id}
//                       className=" text-right text-sm text-muted-foreground mt-1"
//                     >
//                       {field.label}
//                     </Label>
//                     <input
//                       id={field.id}
//                       type="checkbox"
//                       defaultChecked={formData[field.id]}
//                       className="mt-4 border rounded "
//                       onChange={(e) => handleInputChange(e, field.id)}
//                     />
//                   </div>
//                 ) : field.type === "text" || field.type === "number" ? (
//                   <>
//                     <Label
//                       htmlFor={field.id}
//                       className=" text-right text-sm text-muted-foreground"
//                     >
//                       {field.label}
//                     </Label>
//                     <Input
//                       id={field.id}
//                       placeholder={field.placeholder}
//                       defaultValue={formData[field.id]}
//                       className="col-span-2 p-2 border rounded"
//                       type={field.type}
//                       onChange={(e) => handleInputChange(e, field.id)}
//                     />
//                   </>
//                 ) : (
//                   <select
//                     id={field.id}
//                     className="col-span-2 p-2 border rounded"
//                     value={formData[field.id]}
//                     onChange={(e) => handleInputChange(e, field.id)}
//                   >
//                     {field.options.map((option) => (
//                       <option key={option} value={option}>
//                         {option}
//                       </option>
//                     ))}
//                   </select>
//                 )}
//               </div>
//             ))}
//           </div>
//           <SheetFooter className="flex justify-end">
//             <SheetClose asChild>
//               <Button
//                 type="submit"
//                 onClick={() => handleSave(rowValue, formData)}
//               >
//                 Save
//               </Button>
//             </SheetClose>
//           </SheetFooter>
//         </SheetContent>
//       </Sheet>
//     </div>
//   );
// };

// export default SheetSide;
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "../ui/sheet";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { useSelector, useDispatch } from "react-redux";
import InputColor from "react-input-color";
import { editScreenDeatils } from "@/services/reducer/ScreenReducer";
import { drawerConstant } from "@/constants/constants";

const SheetSide = ({
  // screens,
  // parentId,
  // childValue,
  // screenId,
  // handleSave,
  sheetWidth = "w-[500px]",
}) => {
  const [inputFields, setInputFields] = useState(drawerConstant);
  const [color, setColor] = useState("#5e72e4");
  const [formData, setFormData] = useState({
    required: "",
    placeholder: "",
    label: "",
    maxLength: "",
    maxLengthMessage: "",
    minLengthMessage: "",
    minLength: "",
    color: "#5e72e4",
    // ...childValue,
  });

  const handleInputChange = (e, fieldId) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [fieldId]: value,
    });
  };

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
    setFormData({
      ...formData,
      color: newColor.hex,
    });
  };
  // console.log(screens, parentId, childValue, screenId,formData, handleSave);
  return (
    <div className="flex flex-col gap-2">
      <Sheet>
        <SheetTrigger asChild>
          <HiOutlinePencilSquare className="cursor-pointer" />
        </SheetTrigger>
        <SheetContent
          className={`bg-white shadow-md rounded-lg ${sheetWidth}`}
          size="large"
          side="right"
        >
          <SheetHeader>
            {/* <SheetTitle>
              {screens.filter((item) => item.id === screenId)[0].screenName}
            </SheetTitle>
            <SheetDescription>
              Edit{" "}
              {screens.filter((item) => item.id === screenId)[0].screenName}{" "}
              Properties
            </SheetDescription> */}
          </SheetHeader>
          <div className="grid grid-cols-2 gap-4 p-2">
            {inputFields.map((field) => (
              <div key={field.id} className="flex flex-col">
                <Label
                  htmlFor={field.id}
                  className="text-right text-sm text-muted-foreground"
                >
                  {field.label}
                </Label>
                {field.type === "color" ? (
                  <InputColor
                    initialValue={field.value}
                    onChange={handleColorChange}
                    placement="left"
                    className=" w-5 h-5 p-2 rounded-md  ml-20 mt-4 border "
                  />
                ) : field.type === "checkbox" ? (
                  <input
                    id={field.id}
                    type="checkbox"
                    defaultChecked={formData[field.id]}
                    className=" w-5 h-5 p-2 ml-20 mt-4 border rounded"
                    onChange={(e) => handleInputChange(e, field.id)}
                  />
                ) : field.type === "text" || field.type === "number" ? (
                  <Input
                    id={field.id}
                    placeholder={field.placeholder}
                    defaultValue={formData[field.id]}
                    className="mt-1 p-2 border rounded"
                    type={field.type}
                    onChange={(e) => handleInputChange(e, field.id)}
                  />
                ) : (
                  <select
                    id={field.id}
                    className="mt-1 p-2 border rounded"
                    value={formData[field.id]}
                    onChange={(e) => handleInputChange(e, field.id)}
                  >
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            ))}
          </div>
          <SheetFooter className="flex justify-end">
            <SheetClose asChild>
              {/* <Button
                type="submit"
                onClick={() => handleSave(parentId, formData)}
              >
                Save
              </Button> */}
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SheetSide;
