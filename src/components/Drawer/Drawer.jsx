import { useEffect, useState } from "react";
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
import { editScreenDeatils } from "@/services/reducer/ScreenReducer";
import { drawerConstant } from "@/constants/constants";

const abc = (data, value) => {
  return data.filter((item) => item.type == value.id);
};
const SheetSide = ({
  column="",
  parentId="",
  handleSave,
  columnIndex="",
  handleDelete,
}) => {
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
  console.log(formData,"formDta")

  return (
    <div className="flex flex-col gap-2">
      <Sheet >
        <SheetTrigger asChild>
      <HiOutlinePencilSquare className="cursor-pointer"/>
        </SheetTrigger>
        <SheetContent
          className={`bg-white shadow-md rounded-lg w-[500px]`}
          style={{ backdropFilter: 'blur(2px)', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
          size="large"
          side="right"
        >
          <div className="grid grid-cols-1 gap-1 p-2">
            {drawerConstant.map((field) => (
              <div key={field.id} className="flex flex-col">
                <Label
                  htmlFor={field.id}
                  className="text-left text-sm text-muted-foreground"
                >
                  {field.label}
                </Label>
                { field.type === "checkbox" ? (
                  <input
                    id={field.id}
                    type="checkbox"
                    defaultChecked={formData[field.id]}
                    className=" w-5 h-5 p-2 ml-2 mt-4 border rounded"
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
                        <option key={option.value} value={option.label}>
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
