import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { idProofs } from "@/constants/constants";
import { useSelector, useDispatch } from "react-redux";
import { Input } from "../ui/input";

const FixedMobileScreen = () => {
  const [data, setData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const { screenId } = useParams();
  const dispatch = useDispatch();
  const screens = useSelector((state) => state.screen.screens);
  const handleDrop = (event, rowIndex, isNewRow) => {
    event.preventDefault();
    const item = event.dataTransfer.getData('text/plain');
    const value = idProofs.find((items) => items.id === item);
    if (value) {
      const newData = [...data];
      if(value.dependableField !=undefined && value.dependableField.length>0){
        let col=[...value.dependableField]
        delete value.dependableField
        col.push(value)
        newData.push({
          row:isNewRow?rowIndex:rowIndex+1,
          columns:col
        })
       isNewRow=false
      }
      else if (isNewRow && value.dependableField == undefined) {
        newData.push({
          row: rowIndex,
          columns: [value],
        });
      }
       else {
        newData[rowIndex].columns.push(value);
      }
      setData(newData);
    }
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
    dispatch(saveScreen(newScreen));
  };
  console.log(data,"data")

  return (
    <div className="w-[375px] h-[667px] border border-gray-300 mx-auto overflow-hidden shadow-md relative">
      {isEditing ? (
        <div className="p-8">
          <Input
            type="text"
            value={screens.find((item) => item.id === screenId)?.name || ''}
            onChange={handleInputChange}
            onBlur={() => setIsEditing(false)}
            className="border p-2"
          />
        </div>
      ) : (
        <div className="p-8 flex">
          <h1
            className="text-blue text-3xl font-bold cursor-pointer"
            onClick={() => setIsEditing((prev) => !prev)}
          >
            {screens.find((item) => item.id === screenId)?.name || ''}
          </h1>
        </div>
      )}
      {data.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex gap-2 p-2 mb-2 bg-gray-100"
          onDragOver={handleDragOver}
          onDrop={(event) => handleDrop(event, rowIndex, false)}
        >
          {row.columns.map((column, columnIndex) => (
            <div key={columnIndex} className="p-2 border bg-white shadow-sm rounded-md"
            style={{ width: row.columns.length === 1 ? '100%' : '50%' }}>
              <input
                type="text"
                value={column.label}
                onChange={() => {}}
                className="w-[50%]"
              />
            </div>
          ))}
        </div>
      ))}
      <div
        onDrop={(event) => handleDrop(event, data.length, true)}
        onDragOver={handleDragOver}
        className="p-2 mb-2 bg-gray-100"
      >
        Drop here to create a new row
      </div>
    </div>
  );
};

export default FixedMobileScreen;


