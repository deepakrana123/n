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

const abc = (data, value) => {
  return data.filter((item) => item.type == value.id);
};
const SheetSide = ({
  column,
  screenId,
  screens,
  parentId,
  handleSave,
  columnIndex,
  handleDelete,
  sheetWidth = "w-[500px]",
}) => {
  const [color, setColor] = useState("#5e72e4");
  const [formData, setFormData] = useState({
    ...column,
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
  console.log(
    formData
  );

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
            <SheetTitle>
              {screens.filter((item) => item.id === screenId)[0].screenName}
            </SheetTitle>
            <SheetDescription>
              Edit{" "}
              {screens.filter((item) => item.id === screenId)[0].screenName}{" "}
              Properties
            </SheetDescription>
          </SheetHeader>
          <div className="grid grid-cols-2 gap-4 p-2">
            {drawerConstant.map((field) => (
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
                    {field?.options &&
                      abc(field.options, column)?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                  </select>
                )}
              </div>
            ))}
          </div>
          <SheetFooter className="flex justify-end">
            <SheetClose asChild>
              <>
                <Button
                  type="submit"
                  onClick={() => handleSave(parentId,columnIndex, formData)}
                >
                  Save
                </Button>
                <Button
                  type="submit"
                  onClick={() => handleDelete(parentId,columnIndex)}
                >
                  Delete
                </Button>
              </>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SheetSide;
