import { idProofs } from "@/constants/constants";
import React, { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
// import { useToast } from "../../components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import SheetSide from "@/components/Drawer/Drawer";
import { useDispatch, useSelector } from "react-redux";
import {
  drawerOpenClose,
  sidebarStatus,
} from "@/services/reducer/ScreenReducer";
import { HiOutlinePencilSquare } from "react-icons/hi2";
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
const getHieghtSection = (columnsLength) => {
  switch (columnsLength) {
    case 0:
      return "h-[100px]";
    case 1:
      return "h-[200px]";
    case 2:
      return "h-[300px]";
    default:
      return "h-[300px]";
  }
};

const NewForm = ({ data = [], setData }) => {
  const [open, setOpen] = useState(false);
  // const [data, setData] = useState(initialState);
  const sidebarStatus1 = useSelector((state) => state.screen.sidebarStatus);
  const drawerOpens = useSelector((state) => state.screen.drawerOpen);
  const [targetIndex, setTargetIndex] = useState("");
  const [startIndex, setStartIndex] = useState("");
  const dispatch = useDispatch();
  const { toast } = useToast();
  const handleDrop = (
    event,
    rowIndex,
    isNewRow,
    subRowIndex = "",
    subColumnIndex = ""
  ) => {
    event.preventDefault();
    const item = JSON.parse(event.dataTransfer.getData("text/plain"));
    const value = idProofs[0].columns.filter(
      (items) => items.id === item.type
    )[0];
    const newData = JSON.parse(JSON.stringify(data));
    const threeInOneRow =
      newData?.filter((item) => item?.row == rowIndex)[0]?.columns?.length >= 3;
    const condition = newData?.some((item) => {
      return item?.columns.some((news) => news.id === "button");
    });
    // if (subRowIndex && subColumnIndex) {
    //   newData[rowIndex].columns[subRowIndex].columns.push(value);
    // }
    if (condition && value.id != "button") {
      toast({
        variant: "destructive",
        title: "Could not add row after button",
        description: `You are trying to add row after an button`,
      });
      return;
    }
    if (threeInOneRow) {
      if (newData[rowIndex].id === "section") {
        toast({
          variant: "destructive",
          title: "Try to make new row",
          description: `More then three row is not allowed`,
        });
        return;
      } else {
        toast({
          variant: "destructive",
          title: "Try to make new row",
          description: `More then three input fields in one row is not allowed`,
        });
        return;
      }
    }
    if (isNewRow) {
      if (value.id === "section") {
        newData.push({
          row: rowIndex,
          ...value,
          columns: [],
        });
      }
      if (value.dependableField) {
        let freezedValue = JSON.parse(JSON.stringify(value));
        let col = [...freezedValue.dependableField];
        delete freezedValue.dependableField;
        col.push(freezedValue);
        newData.push({
          row: rowIndex,
          columns: col,
        });
      } else if (value.id !== "section") {
        newData.push({
          row: rowIndex,
          columns: [value],
        });
      }
    } else {
      if (value.dependableField) {
        let freezedValue = JSON.parse(JSON.stringify(value));
        let col = [...freezedValue.dependableField];
        delete freezedValue.dependableField;
        col.push(freezedValue);
        newData.push({
          row: rowIndex + 1,
          columns: col,
        });
      } else {
        if (newData[rowIndex].id === "section") {
          newData[rowIndex].columns.push({
            row: newData[rowIndex].columns.length,
            columns: [value],
          });
        } else if (subRowIndex && newData[rowIndex].id === "section") {
          newData[rowIndex].columns[subRowIndex].columns.push(value);
        } else {
          newData[rowIndex].columns.push(value);
        }
      }
    }
    dispatch(sidebarStatus(false));
    setData(newData);
  };

  const handleDragOver = (event) => {
    // console.log(event, "event");
    event.preventDefault();
  };

  const handleSave = (parentId, columnIndex, formData) => {
    let newArr = JSON.parse(JSON.stringify(data));
    if (
      parentId < newArr.length &&
      columnIndex < newArr[parentId]["columns"].length
    ) {
      newArr[parentId]["columns"][columnIndex] = formData;
    }
    setData(newArr);
    setOpen((prev) => !prev);
  };

  const handleDelete = (parentId, columnIndex) => {
    let newArr = JSON.parse(JSON.stringify(data));
    if (
      parentId < newArr.length &&
      columnIndex < newArr[parentId]["columns"].length
    ) {
      newArr[parentId]["columns"].splice(columnIndex, 1);
    }
    setData(newArr);
  };
  const handleValueChange = (parentId, columnIndex, event) => {
    let newArr = JSON.parse(JSON.stringify(data));
    console.log(parentId, columnIndex, event.target.value, "hii");
    if (
      parentId < newArr.length &&
      columnIndex < newArr[parentId]["columns"].length
    ) {
      newArr[parentId]["columns"][columnIndex].value = event.target.value;
      setData(newArr);
    }
  };
  const handleDragEnter = (event, id) => {
    event.preventDefault();
    setTargetIndex(id);
  };
  const handleDropRow = (event, rowIndex) => {
    event.preventDefault();
    const { rowIndex: draggedRowIndex } = JSON.parse(
      event.dataTransfer.getData("application/json")
    );
    if (startIndex !== null) {
      const newArray = [...data];
      const temp = newArray[startIndex];
      newArray[startIndex] = newArray[rowIndex];
      newArray[rowIndex] = temp;
      setData(newArray);
      setStartIndex(null); // Reset start index
    }
  };

  const handleDragStart = (event, rowIndex) => {
    event.dataTransfer.setData("application/json", JSON.stringify(rowIndex));
    setStartIndex(rowIndex);
  };
  console.log(data, "data");
  const handleSaves = () => {
    a.forEach((item) => {
      item.columns.forEach((column) => {
        if (column.label === abc.label) {
          console.log("Not allowed");
          return;
        }
      });
    });
  };
  return (
    <div className="bg-white w-full h-160 max-w-md mx-auto  shadow-2xl relative   rounded-xl">
      <div className=" p-2 bg-gray-50 rounded-b-xl overflow-y-auto scrollbar-mobile">
        {data?.map((row, rowIndex) =>
          row.id === "section" ? (
            <div
              key={rowIndex}
              className={`flex flex-col
                    hover:border-primary hover:cursor-pointer border-dashed
                    group border-2 border-primary/20 ${getHieghtSection(
                      row.columns.length
                    )}`}
            >
              <div className="pl-1 w-full text-gray-700 text-xl font-semibold">
                {row.label}
              </div>
              <div>
                {row.columns.map((subRow, subRowIndex) =>
                  subRow.columns.map((subColumn, subColumnIndex) => (
                    <div className="flex flex-col justify-between">
                      <label className="mb-1 text-gray-700 text-sm font-semibold">
                        {subColumn.label} {subColumn.required ? "*" : ""}
                      </label>
                      <input
                        type={subColumn.type || "text"}
                        placeholder={subColumn.placeholder}
                        maxLength={subColumn.maxLength}
                        minLength={subColumn.minLength}
                        required={subColumn.required}
                        className="border border-gray-300 p-2 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        value={subColumn.value}
                      />
                    </div>
                  ))
                )}
              </div>
              <div
                onDrop={(event) => handleDrop(event, rowIndex, false)}
                onDragEnter={() => handleDragEnter(rowIndex)}
                onDragOver={(event) => handleDragOver(event)}
                className="text-center p-2 flex flex-col items-center"
              >
                <FaPlusCircle className="text-blue-500 text-2xl mb-2 " />
                <span className="text-gray-500 text-base font-semibold">
                  Drop For a row ,you can make it collapseable or nested
                </span>
              </div>
            </div>
          ) : (
            <div
              className={`flex flex-wrap mt-1 mb-1 w-full border-dashed
                group border-2 border-primary/20 p-3 ${
                  targetIndex === rowIndex ? "bg-gray-100" : ""
                }`}
              draggable={true}
              onDragStart={(event) => handleDragStart(event, rowIndex)}
              onDragOver={handleDragOver}
              onDragEnter={(event) => handleDragEnter(event, rowIndex)}
              onDrop={(event) => handleDropRow(event, rowIndex)}
            >
              <div
                key={rowIndex}
                onDragOver={handleDragOver}
                className="flex flex-wrap 
                group border-2 border-primary/20 w-full"
                onDrop={(event) => handleDrop(event, rowIndex, false)}
              >
                {row.columns.map((subColumn, subColumnIndex) => (
                  <div
                    key={subColumnIndex}
                    className={`flex flex-col mb-2 p-[5px] ${getColumnWidth(
                      row.columns.length
                    )}`}
                    // onDragEnter={() => handleDragEnter(rowIndex)}
                  >
                    <div className="flex flex-col justify-between">
                      <label className="mb-1 text-gray-700 text-sm font-semibold flex">
                        <div>{subColumn.label}</div>
                        <div>
                          <span className="text-red-500 text-xs mt-1">
                            {subColumn.required ? "*" : ""}
                          </span>
                        </div>
                        <div className="ml-2 mt-1">
                          <SheetSide
                            open={open}
                            setOpen={setOpen}
                            column={subColumn}
                            handleSave={handleSave}
                            handleDelete={handleDelete}
                            columnIndex={subColumnIndex}
                            parentId={rowIndex}
                          />
                        </div>
                      </label>
                      <input
                        type={subColumn.type || "text"}
                        placeholder={subColumn.placeholder}
                        maxLength={subColumn.maxlength}
                        minLength={subColumn.minlength}
                        required={subColumn.required}
                        className="border border-gray-300 p-2 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        value={subColumn.value}
                        onChange={(event) =>
                          handleValueChange(rowIndex, subColumnIndex, event)
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
        <div
          onDrop={(event) => handleDrop(event, data.length, true)}
          onDragOver={handleDragOver}
          className="p-4 mb-2 mt-1 bg-white text-center rounded-lg shadow-md border-dashed border-2 border-gray-300 flex flex-col items-center justify-center w-full"
        >
          <FaPlusCircle className="text-blue-500 text-6xl mb-2" />
          <span className="text-gray-500 text-base font-semibold">
            Drop For New row
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewForm;
