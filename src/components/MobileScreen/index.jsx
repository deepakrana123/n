import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { finalSpaceCharacters, idProofs } from "@/constants/constants";
import { useSelector, useDispatch } from "react-redux";
import { Input } from "../ui/input";
import SheetSide from "../Drawer/Drawer";
import { Label } from "@radix-ui/react-label";
import { addScreen } from "@/services/reducer/ScreenReducer";
import { FaPlusCircle } from "react-icons/fa";

const FixedMobileScreen = () => {
  const [data, setData] = useState([]);
  const [isScrollable, setIsScrollable] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const screenId = useMemo(() => {
    return id;
  }, [id]);
  const [screens, setScreens] = useState(finalSpaceCharacters);
  // const handleDrop = (event, rowIndex, isNewRow) => {
  //   event.preventDefault();
  //   const item = event.dataTransfer.getData("text/plain");
  //   const value = idProofs.find((items) => items.id === item);
  //   const newData = JSON.parse(JSON.stringify(data));
  //   if (newData) {
  //     if (isNewRow && value.id === "header" && value.label === "Header") {
  //       newData.push({
  //         row: rowIndex,
  //         columns: [],
  //         ...value,
  //       });
  //     } else if (
  //       isNewRow === false &&
  //       value.id === "header" &&
  //       value.label === "Header"
  //     ) {
  //       newData.push({
  //         row: rowIndex,
  //         columns: [],
  //         ...value,
  //       });
  //     } else if (
  //       value.dependableField != undefined &&
  //       value.dependableField.length > 0
  //     ) {
  //       let col = [...value.dependableField];
  //       delete value.dependableField;
  //       col.push(value);
  //       if (isNewRow) {
  //         newData.push({
  //           row: rowIndex,
  //           columns: [col],
  //         });
  //       } else {
  //         newData.push({
  //           row: rowIndex + 1,
  //           columns: [col],
  //         });
  //       }
  //     }
  //     else if(isNewRow && value.dependableField===undefined){
  //       newData.push({
  //         row:rowIndex+1,
  //         columns:[value]
  //       })
  //     }
  //     else if(isNewRow===False && value.dependableField===undefined){
  //       newData[rowIndex].columns.push(value)
  //     }
  //   }
  //   setData(newData);
  // };

  const handleDrop = (event, rowIndex, isNewRow) => {
    event.preventDefault();
    const item = event.dataTransfer.getData("text/plain");

    const value = idProofs[0].columns.filter((items) => items.id === item)[0];
    const newData = JSON.parse(JSON.stringify(data));
    console.log(value, isNewRow, rowIndex, "hiii");

    if (value) {
      if (isNewRow) {
        if (value.id === "header" && value.label === "Header") {
          newData.push({
            row: rowIndex,
            columns: [],
            ...value,
          });
        } else if (
          value.dependableField !== undefined &&
          value.dependableField.length > 0
        ) {
          let col = [...value.dependableField];
          delete value.dependableField;
          col.push(value);
          newData.push({
            row: rowIndex,
            columns: col,
          });
        } else if (value.dependableField === undefined) {
          newData.push({
            row: rowIndex,
            columns: [value],
          });
        }
      } else {
        if (value.id === "header" && value.label === "Header") {
          newData.push({
            row: rowIndex + 1,
            columns: [],
            ...value,
          });
        } else if (
          value.dependableField !== undefined &&
          value.dependableField.length > 0
        ) {
          let col = [...value.dependableField];
          delete value.dependableField;
          col.push(value);
          newData[rowIndex].columns.push(...col);
        } else if (value.dependableField === undefined) {
          newData[rowIndex].columns.push(value);
        }
      }
    }

    setData(newData);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const newScreen = screens.map((header) => {
      if (header.id === screenId) {
        return { ...header, name: inputValue };
      }
      return header;
    });
    setScreens(newScreen);
    // dispatch(saveScreen([screenId, newScreen]));
  };
  const handleSave = (id, formValue) => {
    console.log(id, data, formValue);
    const newData = JSON.parse(JSON.stringify(data));
    const screen = newData;
    if (screen && formValue) {
      const itemsToUpdate = screen
        .filter((item) => item.id === id)
        .filter((item) => item.id === formValue.id);
      console.log(itemsToUpdate, "itemsToUpdate");
      itemsToUpdate.forEach((item) => {
        Object.assign(item, formValue);
      });
      console.log(newData, "newData");
      return newData;
    } else {
      return newData;
    }
  };
  console.log(data, "idmm");
  return (
    <div className="w-[375px] h-[667px] border border-gray-300 mx-auto overflow-hidden shadow-md relative bg-gradient-to-b from-gray-100 to-white">
      {isEditing ? (
        <div className="p-2">
          <Input
            type="text"
            value={screens.find((item) => item.id === screenId)?.name || ""}
            onChange={handleInputChange}
            onBlur={() => setIsEditing(false)}
            className="border p-1 w-full rounded-md"
          />
        </div>
      ) : (
        <div className="p-2 flex justify-center">
          <h1
            className="text-blue-500 text-xl font-bold cursor-pointer text-center"
            onClick={() => setIsEditing((prev) => !prev)}
          >
            {screens.find((item) => item.id === screenId)?.name || ""}
          </h1>
        </div>
      )}

      <div className={`h-[550px] p-2 overflow-y-auto scrollbar-mobile`}>
        {data?.map((row, rowIndex) => (
          <div
            key={rowIndex}
            // className="flex flex-col gap-2 p-2 mb-2 bg-white rounded-md shadow-sm"
            className="flex flex-col w-full mb-1"
            style={{ width: row.columns.length === 1 ? "100%" : "50%" }}
            onDragOver={handleDragOver}
            onDrop={(event) => handleDrop(event, rowIndex, false)}
          >
            {row?.columns?.map((column, columnIndex) => (
              <div key={columnIndex} className="flex flex-col w-full mb-1">
                {column.id === "header" ? (
                  <h1 className="text-blue-500 text-lg font-bold cursor-pointer">
                    {column.label}
                  </h1>
                ) : (
                  <div className="flex flex-col w-full mb-1">
                    <Label className="mb-1 text-gray-700 text-sm">
                      {column.label}
                      <SheetSide />
                    </Label>
                    {column.id.startsWith("textarea") ? (
                      <textarea
                        placeholder={column.placeholder}
                        maxLength={column.maxlength}
                        minLength={column.minlength}
                        required={column.required}
                        className="border border-gray-300 p-1 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        value={column.value}
                      />
                    ) : column.id.startsWith("select") ? (
                      <select
                        required={column.required}
                        className="border border-gray-300 p-1 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        value={column.value}
                      >
                        {/* Options should be mapped here */}
                      </select>
                    ) : column.id.startsWith("date") ? (
                      <Input
                        type="date"
                        placeholder={column.placeholder}
                        required={column.required}
                        className="border border-gray-300 p-1 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        value={column.value}
                      />
                    ) : column.id.startsWith("text") ? (
                      <Input
                        type="text"
                        placeholder={column.placeholder}
                        maxLength={column.maxlength}
                        minLength={column.minlength}
                        required={column.required}
                        className="border border-gray-300 p-1 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        value={column.value}
                      />
                    ) : column.id.startsWith("number") ? (
                      <Input
                        type="text"
                        placeholder={column.placeholder}
                        maxLength={column.maxlength}
                        minLength={column.minlength}
                        required={column.required}
                        className="border border-gray-300 p-1 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        value={column.value}
                      />
                    ) : (
                      <Input
                        type="text"
                        placeholder={column.placeholder}
                        maxLength={column.maxlength}
                        minLength={column.minlength}
                        required={column.required}
                        className="border border-gray-300 p-1 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        value={column.value}
                      />
                    )}
                    {column.required && column.value === "" && (
                      <span className="text-red-500 text-xs mt-1">
                        {column.validationMessage || "This field is required"}
                      </span>
                    )}
                    {(column.value.length < column.minlength ||
                      column.value.length > column.maxlength) && (
                      <span className="text-red-500 text-xs mt-1">
                        {column.minLengthMessage ||
                          column.maxLengthMessage ||
                          "Invalid length"}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}

        <div
          onDrop={(event) => handleDrop(event, data.length, true)}
          onDragOver={handleDragOver}
          className="p-2 mb-2 bg-white text-center rounded-md shadow-sm border-dashed border-2 border-gray-300 flex flex-col items-center justify-center"
        >
          <FaPlusCircle className="text-blue-500 text-2xl mb-1" />
          <span className="text-gray-500 text-sm">
            Drop here to create a new row
          </span>
        </div>
      </div>
    </div>
  );
};

export default FixedMobileScreen;
