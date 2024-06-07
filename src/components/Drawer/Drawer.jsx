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
import { useSelector } from "react-redux";

const SheetSide = ({
  column = "",
  parentId = "",
  handleSave,
  columnIndex = "",
  handleDelete,
}) => {
  const [formValues, setFormData] = useState({
    ...column,
  });
  const [optionsValue,setOptionValue]=useState([])
  const user=JSON.parse(useSelector((state)=>state.screen.user))

  const handleInputChange = (e, fieldId) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({
      ...formValues,
      [fieldId]: value,
    });
  };

  useEffect(()=>{
    fetch(`http://15.207.88.248:8080/api/getByfilter/${formValues.type}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.code == 200) {
          setOptionValue(data?.data)
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        return []
      });
  },[])
  
  return (
    <div className="flex flex-col gap-2 overflow-y-auto">
      <Sheet>
        <SheetTrigger asChild>
          <HiOutlinePencilSquare className="cursor-pointer" />
        </SheetTrigger>
        <SheetContent
          className={`bg-white shadow-md rounded-lg w-[500px]`}
          style={{
            backdropFilter: "blur(2px)",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
          }}
          size="large"
          side="right"
        >
          <form className="grid grid-cols-2 gap-x-4 gap-y-6">
            <div className="flex flex-col">
              <label htmlFor="label" className="font-semibold">
                Label:
              </label>
              <input
                type="text"
                id="label"
                name="label"
                value={formValues.label}
                onChange={(event)=>handleInputChange(event,"label")}
                placeholder="Enter Label"
                className="p-2 border rounded"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="placeholder" className="font-semibold">
                Placeholder:
              </label>
              <input
                type="text"
                id="placeholder"
                name="placeholder"
                value={formValues.placeholder}
                onChange={(event)=>handleInputChange(event,"placeholder")}
                placeholder="Enter Placeholder"
                className="p-2 border rounded"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="maxlength" className="font-semibold">
                Max Length:
              </label>
              <input
                type="number"
                id="maxlength"
                name="maxlength"
                value={formValues.maxlength}
                onChange={(event)=>handleInputChange(event,"maxlength")}
                placeholder="Enter Max Length"
                className="p-2 border rounded"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="minlength" className="font-semibold">
                Min Length:
              </label>
              <input
                type="number"
                id="minlength"
                name="minlength"
                value={formValues.minlength}
                onChange={(event)=>handleInputChange(event,"minlength")}
                placeholder="Enter Min Length"
                className="p-2 border rounded"
              />
            </div>

            <div className="flex flex-col space-y-3">
              <div className="flex items-center space-x-3">
                <label htmlFor="required" className="font-semibold">
                  Required:
                </label>
                <input
                  type="checkbox"
                  id="required"
                  name="required"
                  checked={formValues.required}
                  onChange={(event)=>handleInputChange(event,"required")}
                  className="h-5 w-5"
                />
              </div>
              <div className="flex items-center space-x-3">
                <label htmlFor="disabled" className="font-semibold">
                  Disabled:
                </label>
                <input
                  type="checkbox"
                  id="disabled"
                  name="disabled"
                  checked={formValues.disabled}
                  // onChange={handleInputChange}
                  onChange={(event)=>handleInputChange(event,"disabled")}
                  className="h-5 w-5"
                />
              </div>

              <div className="flex items-center space-x-3">
                <label htmlFor="readonly" className="font-semibold">
                  Read-Only:
                </label>
                <input
                  type="checkbox"
                  id="readonly"
                  name="readonly"
                  checked={formValues.readonly}
                  // onChange={handleInputChange}
                  onChange={(event)=>handleInputChange(event,"readonly")}
                  className="h-5 w-5"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="validation" className="font-semibold">
                Validation:
              </label>
              <input
                type="text"
                id="validation"
                name="validation"
                value={formValues.validation}
                // onChange={handleInputChange}
                onChange={(event)=>handleInputChange(event,"validation")}
                placeholder="Enter Validation Regex"
                className="p-2 border rounded"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="validationMessage" className="font-semibold">
                Validation Message:
              </label>
              <input
                type="text"
                id="validationMessage"
                name="validationMessage"
                value={formValues.validationMessage}
                // onChange={handleInputChange}
                onChange={(event)=>handleInputChange(event,"validationMessage")}
                placeholder="Enter Validation Message"
                className="p-2 border rounded"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="value" className="font-semibold">
                Value:
              </label>
              <input
                type="text"
                id="value"
                name="value"
                value={formValues.value}
                // onChange={handleInputChange}
                onChange={(event)=>handleInputChange(event,"value")}
                placeholder="Enter Value"
                className="p-2 border rounded"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="icon" className="font-semibold">
                Icon:
              </label>
              <input
                type="text"
                id="icon"
                name="icon"
                value={formValues.icon}
                onChange={(event)=>handleInputChange(event,"icon")}
                placeholder="Enter Icon"
                className="p-2 border rounded"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="field" className="font-semibold">
                Field:
              </label>
              <select
                id="field"
                name="field"
                value={formValues.field}
                onChange={(event)=>handleInputChange(event,"field")}
                className="p-2 border rounded"
              >
                {optionsValue.map((item)=>(
                <option value={item.value}>{item.label}</option>
                ))}
              </select>
            </div>
          </form>

          <SheetFooter className="flex justify-end mt-2">
            <SheetClose asChild>
              <>
                <Button
                  type="submit"
                  onClick={() => handleSave(parentId, columnIndex, formValues)}
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
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SheetSide;
