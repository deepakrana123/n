import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { drawerConstant } from "@/constants/constants";
import { drawerOpenClose } from "@/services/reducer/ScreenReducer";
import React, { useState } from "react";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";

const abc = (data, value) => {
  return data.filter((item) => item.type == value.id);
};
const Sidebar2 = ({
  column = "",
  screenId = "",
  screens = "",
  parentId = "",
  handleSave,
  columnIndex = "",
  handleDelete,
}) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    ...column,
  });
  const isOpen = useSelector((state) => state.screen.drawerOpen);
  const handleInputChange = (e, fieldId) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [fieldId]: value,
    });
  };
  console.log(isOpen, "isOpen");

  const handleClose = () => {
    //   onClose();
    dispatch(drawerOpenClose(isOpen));
  };
  return (
    // <div
    //   className={`fixed top-0 right-0 bottom-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 transform ${
    //     isOpen ? "translate-x-full" : "translate-x-0"
    //   }`}
    // >
    <>
      <HiOutlinePencilSquare
        className="cursor-pointer"
        onClick={() => dispatch(drawerOpenClose(!drawerOpens))}
      />
      <aside
        className={`w-[350px]  h-[600px] max-w-[350px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto 
    scrollbar-mobile smooth-auto ${
      isOpen ? "translate-x-full" : "translate-x-0"
    }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 place-items-center">
          <div className="grid grid-cols-1 gap-1 p-2">
            {drawerConstant.map((field) => (
              <div key={field.id} className="flex flex-col">
                <Label
                  htmlFor={field.id}
                  className="text-left text-sm text-muted-foreground"
                >
                  {field.label}
                </Label>
                {field.type === "checkbox" ? (
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
          <>
            <Button
              type="submit"
              onClick={() => handleSave(parentId, columnIndex, formData)}
            >
              Save
            </Button>
            <Button
              type="submit"
              onClick={() => handleDelete(parentId, columnIndex)}
            >
              Delete
            </Button>
          </>
        </div>
      </aside>
    </>
    // </div>
  );
};

export default Sidebar2;
