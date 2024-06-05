import { idProofs } from "@/constants/constants";
import React, { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
// import { useToast } from "../../components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
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
let initialData = [
  {
    row: 0,
    columns: [
      {
        id: "company",
        label: "Company",
        parentId: "occupation",
        placeholder: "Enter your Company",
        maxlength: 50,
        maxLengthMessage: "Company cannot be more than 50 characters",
        minlength: 3,
        required: true,
        minLengthMessage: "Company must be at least 3 characters",
        color: "",
        disabled: false,
        readonly: false,
        value: "",
        validation: "",
        validationMessage: "",
      },
      {
        id: "monthlySalary",
        label: "Monthly Salary",
        parentId: "income",
        placeholder: "Enter your Monthly Salary",
        maxlength: 20,
        maxLengthMessage: "Monthly Salary cannot be more than 20 characters",
        minlength: 1,
        required: true,
        minLengthMessage: "Monthly Salary must be at least 1 character",
        color: "",
        disabled: false,
        readonly: false,
        value: "",
        validation: "^[0-9]+(\\.[0-9]{1,2})?$",
        validationMessage: "Invalid Monthly Salary format",
      },
    ],
  },
  {
    row: 1,
    columns: [
      {
        id: "company",
        label: "Company",
        parentId: "occupation",
        placeholder: "Enter your Company",
        maxlength: 50,
        maxLengthMessage: "Company cannot be more than 50 characters",
        minlength: 3,
        required: true,
        minLengthMessage: "Company must be at least 3 characters",
        color: "",
        disabled: false,
        readonly: false,
        value: "",
        validation: "",
        validationMessage: "",
      },
      {
        id: "monthlySalary",
        label: "Monthly Salary",
        parentId: "income",
        placeholder: "Enter your Monthly Salary",
        maxlength: 20,
        maxLengthMessage: "Monthly Salary cannot be more than 20 characters",
        minlength: 1,
        required: true,
        minLengthMessage: "Monthly Salary must be at least 1 character",
        color: "",
        disabled: false,
        readonly: false,
        value: "",
        validation: "^[0-9]+(\\.[0-9]{1,2})?$",
        validationMessage: "Invalid Monthly Salary format",
      },
    ],
  },
];
const NewForm = ({data=[],setData}) => {
  console.log("@@@@@@@2data",data)
  // const [data, setData] = useState(initialState);
  const { toast } = useToast();
  const handleDrop = (
    event,
    rowIndex,
    isNewRow,
    subRowIndex = "",
    subColumnIndex = ""
  ) => {
    const item = event.dataTransfer.getData("text/plain");
    const value = idProofs[0].columns.filter((items) => items.id === item)[0];
    const newData = JSON.parse(JSON.stringify(data));
    const threeInOneRow =
      newData?.filter((item) => item?.row == rowIndex)[0]?.columns?.length >= 3;
    const condition = newData?.some((item) => {
      return item?.columns.some((news) => news.id === "button");
    });
    if (subRowIndex && subColumnIndex) {
      newData[rowIndex].columns[subRowIndex].columns.push(value);
    }
    console.log(
      event,
      rowIndex,
      isNewRow,
      subRowIndex,
      subColumnIndex,
      "hiiii"
    );

    if (condition && value.id != "button") {
      toast({
        variant: "destructive",
        title: "Could not add row after button",
        description: `You are trying to add row after an button`,
      });
      return;
    }
    if (threeInOneRow) {
      toast({
        variant: "destructive",
        title: "Try to make new row",
        description: `More then three input fields in one row is not allowed`,
      });
      return;
    }
    console.log(value, event, rowIndex, isNewRow, subRowIndex, subColumnIndex);
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
    setData(newData);
  };
  const handleDragEnter = (rowIndex) => {
    // console.log(rowIndex);
  };
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleSubmit=()=>{
    console.log(initialData)
  }
  console.log(data, "newData");
  return (
    <div className="bg-white w-90 h-100 max-w-md mx-auto  shadow-lg relative bg-gradient-to-b from-gray-100 to-white rounded-xl">
      <div className="h-[calc(100vh-70px)] p-2 bg-gray-50 rounded-b-xl overflow-y-auto scrollbar-mobile">
        {data.map((row, rowIndex) =>
          row.id === "section" ? (
            <div key={rowIndex} className="flex flex-col">
              <div
                // contentEditable="true"
                // onInput={(e) => console.log(e.target.textContent, row)}
                className="mb-2 border-gray-300 p-2 w-full text-gray-700 text-xl font-semibold"
                onDrop={(event) => handleDrop(event, rowIndex, false)}
                onDragEnter={() => handleDragEnter(rowIndex)}
                onDragOver={(event) => handleDragOver(event)}
              >
                {row.label}
              </div>
              <div>
                {row.columns.map((subRow, subRowIndex) =>
                  subRow.columns.map((subColumn, subColumnIndex) => (
                    <div
                      key={subColumnIndex}
                      className={`flex flex-col ml-2 mb-2 p-[5px] ${getColumnWidth(
                        subRow.columns.length
                      )}`}
                      onDragEnter={() => handleDragEnter(subRowIndex)}
                      ondragover={(event) => handleDragOver(event, subRow)}
                      onDrop={(event) =>
                        handleDrop(
                          event,
                          rowIndex,
                          false,
                          subRowIndex,
                          subColumnIndex
                        )
                      }
                    >
                      {subColumn.id === "button" ? (
                        <button className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 transition-colors duration-300">
                          {subColumn.label}
                        </button>
                      ) : (
                        <div className="flex flex-col justify-between">
                          <label className="mb-1 text-gray-700 text-sm font-semibold">
                            {subColumn.label}
                          </label>
                          <input
                            type={subColumn.type || "text"}
                            placeholder={subColumn.placeholder}
                            maxLength={subColumn.maxlength}
                            minLength={subColumn.minlength}
                            required={subColumn.required}
                            className="border border-gray-300 p-2 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            value={subColumn.value}
                          />
                          {subColumn.required && subColumn.value === "" && (
                            <span className="text-red-500 text-xs mt-1">
                              {subColumn.validationMessage}
                            </span>
                          )}
                          {(subColumn.minlength || subColumn.maxlength) && (
                            <span className="text-red-500 text-xs mt-1">
                              {subColumn.minLengthMessage ||
                                subColumn.maxLengthMessage}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : (
            <div
              key={rowIndex}
              className="flex flex-wrap w-full"
              onDragOver={handleDragOver}
              onDrop={(event) => handleDrop(event, rowIndex, false)}
            >
              {row.columns.map((subColumn, subColumnIndex) => (
                <div
                  key={subColumnIndex}
                  className={`flex flex-col mb-2 p-[5px] ${getColumnWidth(
                    row.columns.length
                  )}`}
                  onDragEnter={() => handleDragEnter(rowIndex)}
                >
                  {subColumn.id === "button" ? (
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 transition-colors duration-300">
                      {subColumn.label}
                    </button>
                  ) : (
                    <div className="flex flex-col justify-between">
                      <label className="mb-1 text-gray-700 text-sm font-semibold">
                        {subColumn.label}
                      </label>
                      <input
                        type={subColumn.type || "text"}
                        placeholder={subColumn.placeholder}
                        maxLength={subColumn.maxlength}
                        minLength={subColumn.minlength}
                        required={subColumn.required}
                        className="border border-gray-300 p-2 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        value={subColumn.value}
                      />
                      {subColumn.required && subColumn.value === "" && (
                        <span className="text-red-500 text-xs mt-1">
                          {subColumn.validationMessage}
                        </span>
                      )}
                      {(subColumn.minlength || subColumn.maxlength) && (
                        <span className="text-red-500 text-xs mt-1">
                          {subColumn.minLengthMessage ||
                            subColumn.maxLengthMessage}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )
        )}
        <div
          onDrop={(event) => handleDrop(event, data.length, true)}
          onDragOver={handleDragOver}
          className="p-4 mb-2 bg-white text-center rounded-lg shadow-md border-dashed border-2 border-gray-300 flex flex-col items-center justify-center w-full"
        >
          <FaPlusCircle className="text-blue-500 text-6xl mb-2 animate-bounce" />
          <span className="text-gray-500 text-base font-semibold">
            Drop For New row
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewForm;