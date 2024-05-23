import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import SheetSide from "../Drawer/Drawer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { editScreenDeatils, saveSceen } from "@/services/reducer/ScreenReducer";
import { Button } from "../ui/button";
import { useParams } from "react-router-dom";
const a = [
  {
    row: 1,
    columns: [
      {
        field: "pincode",
        type: "input",
        value: "202001",
        row: "single",
        id: 1,
        rowId: 1,
      },
      {
        field: "Mobile Number",
        type: "input",
        value: "9412678723",
        row: "double",
        rowId: 2,
        id: 2,
      },
    ],
  },
  {
    row: 2,
    columns: [
      {
        field: "Address",
        type: "input",
        value: "xxxxxxyy",
        row: "double",
        id: 3,
        rowId: 1,
      },
    ],
  },
  {
    row: 3,
    columns: [
      {
        field: "pincode",
        type: "input",
        value: "202001",
        row: "single",
        id: 1,
        rowId: 1,
      },
    ],
  },
  {
    row: 4,
    columns: [
      {
        field: "Mobile Number",
        type: "input",
        value: "9412678723",
        row: "double",
        rowId: 2,
        id: 2,
      },
    ],
  },
];
const newRows = {
  row: 1,
  columns: [],
};
const Form = () => {
  const dispatch = useDispatch();
  const { screenId }=useParams()
  const [isEditing, setIsEditing] = useState(false);
  const [tableData, setTableData] = useState([]);
  const screens = useSelector((state) => state.screen.screens);
  const row = useSelector((state) => state.screen.data)[screenId];
  const data = useSelector((state) => state.screen.data);
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const newScreen = JSON.parse(JSON.stringify(screens));
    const updatedData = newScreen.map((header) => {
      if (header.id === screenId) {
        header.name = inputValue;
        return header;
      } else {
        return header;
      }
    });
    dispatch(saveSceen(updatedData));
  };
  function addRowHeader(tableData, columnHeaderId) {
    console.log(columnHeaderId, "columnHeaderId");
    if (tableData.length === 0) {
      const newRow = {
        row: 1,
        columns: [],
      };
      if (columnHeaderId != undefined)
        newRow.columns.push(columnHeaderId[columnHeaderId?.length - 1]);
      tableData.push(newRow);
    } else if (tableData.length >= 1) {
      if (
        tableData[tableData.length - 1].columns.length > 0 &&
        tableData[tableData.length - 1].columns.length < 2
      ) {
        tableData[tableData.length - 1].columns.push(
          columnHeaderId[columnHeaderId?.length - 1]
        );
      } else {
        const newRow = {
          row: tableData.length - 1,
          columns: [],
        };
        newRow.columns.push(columnHeaderId[columnHeaderId?.length - 1]);
        tableData.push(newRow);
      }
    }

    setTableData(tableData);
  }
  useEffect(() => {
    addRowHeader(tableData, row);
  }, [row]);
  console.log(tableData, "tableData");
  const handleSepratedFunction = (id, formValue) => {
    const newData = JSON.parse(JSON.stringify(data));
    const screen = newData[screenId];
    if (screen) {
      const itemsToUpdate = screen.filter((item) => item.id === id.id);
      itemsToUpdate.forEach((item) => {
        Object.assign(item, formValue);
      });
      dispatch(editScreenDeatils([newData, screenId]));
      return newData;
    } else {
      return newData;
    }
  };
  return (
    <React.Fragment>
      <div className="w-[500px] h-[700px] mt- 4 bg-white shadow-md rounded-lg">
        {isEditing ? (
          <div className="p-8 ">
            <Input
              type="text"
              value={screens.filter((item) => item.id === screenId)[0].name}
              onChange={(event) => handleInputChange(event)}
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
              {screens.filter((item) => item.id === screenId)[0].name}
            </h1>
          </div>
        )}

        <div className="container">
          <div id="rows-container">
            {tableData?.map((row, index) => (
              <div key={index} className="flex justify-center mb-[16px]" contentEditable>
                {row.columns &&
                  row.columns.length > 0 &&
                  row.columns.map((item, index) => (
                    <div
                      key={index}
                      className="grid w-full max-w-md items-center gap-2"
                    >
                      <div className="flex justify-between">
                        <Label
                          htmlFor={item.label}
                          className="block mb-1 text-sm font-medium text-gray-700"
                        >
                          {item.label}{" "}
                        </Label>
                        <SheetSide
                          rowValue={item}
                          handleSepratedFunction={handleSepratedFunction}
                        />
                      </div>
                      <Input
                        type={item.field}
                        id="email"
                        placeholder={item.label}
                        className="w-full p-3 focus:ring-2 focus:ring-blue-500 bg-transparent"
                      />
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Form;
