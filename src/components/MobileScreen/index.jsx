import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { finalSpaceCharacters, idProofs } from "@/constants/constants";
import SheetSide from "../Drawer/Drawer";
import { FaPlusCircle } from "react-icons/fa";
import { useToast } from "../ui/use-toast";
import { useSelector } from "react-redux";
const getColumnWidth = (columnsLength) => {
  switch (columnsLength) {
    case 1:
      return "w-full";
    case 2:
      return "w-1/2";
    case 3:
      return "w-1/3";
    default:
      return "w-full";
  }
};

const FixedMobileScreen = ({ createSingleFormName }) => {
  const [data, setData] = useState([]);
  const template = useSelector((state) => state.screen.template);
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const { toast } = useToast();
  const screenId = useMemo(() => {
    return id;
  }, [id]);
  const [screens, setScreens] = useState(finalSpaceCharacters);
  const [datas, setDatas] = useState([]);
  // const location = useLocation();
  // const state = location.state;
  // console.log(state, template, "state");
  const handleDrop = (event, rowIndex, isNewRow) => {
    event.preventDefault();
    const item = event.dataTransfer.getData("text/plain");
    const value = idProofs[0].columns.filter((items) => items.id === item)[0];
    const newData = JSON.parse(JSON.stringify(data));
    const threeInOneRow =
      newData?.filter((item) => item?.row == rowIndex)[0]?.columns?.length >= 3;
    console.log(newData, value, isNewRow, rowIndex, "", "newData");
    if (threeInOneRow) {
      toast({
        variant: "destructive",
        title: "Try to make new row",
        description: `More then three input fields in one row is not allowed`,
      });
      return;
    }
    const condition = newData?.some((item) => {
      return item?.columns.some((news) => news.id === "button");
    });
    if (condition && value.id != "button") {
      toast({
        variant: "destructive",
        title: "Could not add row after button",
        description: `More then three input fields in one row is not allowed`,
      });
      return;
    }
    if (value) {
      if (isNewRow) {
        if (value.id === "section" && value.label === "Section") {
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
        if (value.id === "section" && value.label === "Section") {
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
  const handleSave = (rowIndex, columnIndex, formValue) => {
    const newData = JSON.parse(JSON.stringify(data));
    Object.assign(
      newData.filter((item) => item.row === rowIndex)[0].columns[columnIndex],
      formValue
    );
    setData(newData);
  };
  const handleDragEnter = (id) => {
    console.log(id);
  };
  const handleDelete = (rowIndex, columnIndex) => {
    const newData = JSON.parse(JSON.stringify(data));
    const b = newData.filter((item) => item.row === rowIndex)[0];
    console.log(columnIndex, rowIndex, b, "hihi");
  };
  const handleValueChange = () => {};
  useEffect(() => {
    const a = fetch(`http://10.101.28.30:8080/api/findScreenById/${1}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJEZWVwYWt5YWRhdjkxNUBnbWFpbC5jb20iLCJpYXQiOjE3MTY5ODkxMzAsImV4cCI6MTcxNzAyNTEzMH0.HUxfHns_tB1uOmts7jSU1IlFrhQ3DPrB4qdVkdIUF3M",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setDatas(data?.data?.fieldsMapList);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  console.log(datas, data, createSingleFormName, "datas");
  return (
    <div className="bg-white w-90 h-160 max-w-md mx-auto overflow-y-auto scrollbar-mobile shadow-lg relative bg-gradient-to-b from-gray-100 to-white rounded-xl">
      <div className="p-4 flex justify-center">
        {/* <h1
          contenteditable="true"
          onInput={(e) => console.log(e.target.textContent, screenId)}
          className="text-blue-500 text-xl font-bold cursor-pointer text-center"
        >
          {screens.find((item) => item.id === screenId)?.name || ""}
        </h1> */}
      </div>

      <div className="h-[calc(100vh-80px)] p-2  bg-gray-50 rounded-b-xl">
        {data?.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex flex-wrap w-full"
            onDragOver={handleDragOver}
            onDrop={(event) => handleDrop(event, rowIndex, false)}
          >
            {row?.label ? (
              <div>
                <div
                  contenteditable="true"
                  onInput={(e) => console.log(e.target.textContent, row)}
                  className=" mb-2 border-gray-300 p-2 w-full text-gray-700 text-xl font-semibold "
                >
                  {row?.label}
                </div>
                <>
                  {row?.columns?.map((column, columnIndex) => {
                    <div
                      key={columnIndex}
                      className={`flex flex-col mb-4 p-[5px] 
                   ${getColumnWidth(row.columns.length)}
                 }`}
                      onDragEnter={() => handleDragEnter(rowIndex)}
                    >
                      {column.id === "button" ? (
                        <button className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 transition-colors duration-300">
                          {column.label}
                        </button>
                      ) : (
                        <>
                          <div className="flex justify-between ">
                            <label className="mb-2 text-gray-700 text-sm font-semibold">
                              {column.label}
                            </label>
                            {/* <button>
                              </button> */}
                            {/* <SheetSide
                              column={column}
                              screenId={screenId}
                              screens={screens}
                              parentId={row.row}
                              handleSave={handleSave}
                              columnIndex={columnIndex}
                              handleDelete={handleDelete}
                            /> */}
                          </div>
                          <input
                            type={column.type}
                            placeholder={column.placeholder}
                            maxLength={column.maxlength}
                            minLength={column.minlength}
                            required={column.required}
                            onChange={() => {
                              "";
                            }}
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
                              {column.minLengthMessage ||
                                column.maxLengthMessage}
                            </span>
                          )}
                        </>
                      )}
                    </div>;
                  })}
                </>
              </div>
            ) : (
              row?.columns?.map((column, columnIndex) => (
                <div
                  key={columnIndex}
                  className={`flex flex-col mb-2 p-[5px] 
                  ${getColumnWidth(row.columns.length)}
                }`}
                  onDragEnter={() => handleDragEnter(rowIndex)}
                >
                  {column.id === "button" ? (
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 transition-colors duration-300">
                      {column.label}
                    </button>
                  ) : (
                    <>
                      <div className="flex justify-between ">
                        <label className="mb-2 text-gray-700 text-sm font-semibold">
                          {column.label}
                        </label>
                        {/* <SheetSide
                          column={column}
                          screenId={screenId}
                          screens={screens}
                          parentId={row.row}
                          handleSave={handleSave}
                          columnIndex={columnIndex}
                          handleDelete={handleDelete}
                        /> */}
                      </div>
                      <input
                        type={column.type}
                        placeholder={column.placeholder}
                        maxLength={column.maxlength}
                        minLength={column.minlength}
                        required={column.required}
                        onChange={(event) =>
                          handleValueChange(column, row, event)
                        }
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
              ))
            )}
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
