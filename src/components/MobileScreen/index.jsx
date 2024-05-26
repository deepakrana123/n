import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { finalSpaceCharacters, idProofs } from "@/constants/constants";
import { useSelector, useDispatch } from "react-redux";
import { Input } from "../ui/input";
import SheetSide from "../Drawer/Drawer";
import { Label } from "@radix-ui/react-label";
import { addScreen } from "@/services/reducer/ScreenReducer";
import { FaPlusCircle } from "react-icons/fa";
const getColumnWidth = (columnsLength) => {
  switch (columnsLength) {
    case 1:
      return "100%";
    case 2:
      return "50%";
    case 3:
      return "33.33%";
    default:
      return "100%";
  }
};

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
        } else if (isNewRow === false && value.dependableField === undefined) {
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
  const handleDragEnter = (id) => {
    // setTargetValue(id);
    console.log(id);
  };
  console.log(data, "idmm");
  return (
    <div className="w-full h-full max-w-md mx-auto overflow-hidden shadow-lg relative bg-gradient-to-b from-gray-100 to-white rounded-xl">
      {isEditing ? (
        <div className="p-4">
          <input
            type="text"
            value={screens.find((item) => item.id === screenId)?.name || ""}
            onChange={handleInputChange}
            onBlur={() => setIsEditing(false)}
            className="border p-2 w-full rounded-md shadow-sm"
          />
        </div>
      ) : (
        <div className="p-4 flex justify-center">
          <h1
            className="text-blue-500 text-xl font-bold cursor-pointer text-center"
            onClick={() => setIsEditing((prev) => !prev)}
          >
            {screens.find((item) => item.id === screenId)?.name || ""}
          </h1>
        </div>
      )}
      <div className="h-[calc(100vh-120px)] p-4 overflow-y-auto scrollbar-mobile bg-gray-50 rounded-b-xl">
        {data.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex flex-wrap w-full"
            onDragOver={handleDragOver}
            onDrop={(event) => handleDrop(event, rowIndex, false)}
          >
            {row.columns.map((column, columnIndex) => (
              <div
                key={columnIndex}
                className={`flex flex-col mb-4 p-2 ${
                  row.columns.length === 1
                    ? "w-full"
                    : `w-1/${row.columns.length}`
                }`}
                onDragEnter={() => handleDragEnter(rowIndex)}
              >
                {column.id === "button" ? (
                  <button className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 transition-colors duration-300">
                    {column.label}
                  </button>
                ) : (
                  <>
                    <label className="mb-2 text-gray-700 text-sm font-semibold">
                      {column.label}
                    </label>
                    <input
                      type={column.type}
                      placeholder={column.placeholder}
                      maxLength={column.maxlength}
                      minLength={column.minlength}
                      required={column.required}
                      className="border border-gray-300 p-2 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      value={column.value}
                    />
                    {column.required && column.value === "" && (
                      <span className="text-red-500 text-xs mt-1">
                        {column.validationMessage}
                      </span>
                    )}
                    {(column.minlength || column.maxlength) && (
                      <span className="text-red-500 text-xs mt-1">
                        {column.minLengthMessage || column.maxLengthMessage}
                      </span>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        ))}

        <div
          onDrop={(event) => handleDrop(event, data.length, true)}
          onDragOver={handleDragOver}
          className="p-4 mb-2 bg-white text-center rounded-lg shadow-md border-dashed border-2 border-gray-300 flex flex-col items-center justify-center w-full"
        >
          <FaPlusCircle className="text-blue-500 text-3xl mb-2 animate-bounce" />
          <span className="text-gray-500 text-base font-semibold">
            Drop here to create a new row
          </span>
        </div>
      </div>
    </div>
  );
};

export default FixedMobileScreen;
