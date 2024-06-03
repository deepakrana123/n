import React, { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import toast from "react-hot-toast";

const getColumnWidth = (length) => {
  if (length === 1) return "w-full";
  if (length === 2) return "w-1/2";
  return "w-1/3";
};

const handleDragEnter = (rowIndex) => {
  // Handle drag enter logic here
};

const ColumnComponent = ({ column, handleValueChange, row }) => {
  return (
    <div
      className={`flex flex-col mb-4 p-[5px] ${getColumnWidth(
        row.columns.length
      )}`}
      onDragEnter={() => handleDragEnter(row.row)}
    >
      {column.id === "button" ? (
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 transition-colors duration-300">
          {column.label}
        </button>
      ) : (
        <>
          <div className="flex justify-between">
            <label className="mb-2 text-gray-700 text-sm font-semibold">
              {column.label}
            </label>
          </div>
          <input
            type={column.type || "text"}
            placeholder={column.placeholder}
            maxLength={column.maxlength}
            minLength={column.minlength}
            required={column.required}
            onChange={(event) => handleValueChange(column, row, event)}
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
      {column.columns && column.columns.length > 0 && (
        <div className="ml-4">
          {column.columns.map((subColumn, subColumnIndex) => (
            <ColumnComponent
              key={subColumnIndex}
              column={subColumn}
              handleValueChange={handleValueChange}
              row={row}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const DynamicForm = () => {
  const [data, setData] = useState([
    {
      row: 0,
      columns: [
        {
          row: 0,
          columns: [
            // {
            //   id: "textarea",
            //   label: "Textarea",
            //   placeholder: "Enter text here",
            //   maxlength: 50,
            //   maxLengthMessage: "",
            //   minlength: 3,
            //   required: true,
            //   minLengthMessage: "",
            //   color: "",
            //   disabled: false,
            //   readonly: false,
            //   value: "",
            //   validation: "",
            //   validationMessage: "",
            // },
            // {
            //   id: "textarea",
            //   label: "Textarea",
            //   placeholder: "Enter text here",
            //   maxlength: 50,
            //   maxLengthMessage: "",
            //   minlength: 3,
            //   required: true,
            //   minLengthMessage: "",
            //   color: "",
            //   disabled: false,
            //   readonly: false,
            //   value: "",
            //   validation: "",
            //   validationMessage: "",
            // },
          ],
          id: "textarea",
          label: "Textarea",
          placeholder: "Enter text here",
          maxlength: 50,
          maxLengthMessage: "",
          minlength: 3,
          required: true,
          minLengthMessage: "",
          color: "",
          disabled: false,
          readonly: false,
          value: "",
          validation: "",
          validationMessage: "",
        },
        {
          row: 0,
          columns: [
            {
              id: "textarea",
              label: "Textarea",
              placeholder: "Enter text here",
              maxlength: 50,
              maxLengthMessage: "",
              minlength: 3,
              required: true,
              minLengthMessage: "",
              color: "",
              disabled: false,
              readonly: false,
              value: "",
              validation: "",
              validationMessage: "",
            },
            {
              id: "textarea",
              label: "Textarea",
              placeholder: "Enter text here",
              maxlength: 50,
              maxLengthMessage: "",
              minlength: 3,
              required: true,
              minLengthMessage: "",
              color: "",
              disabled: false,
              readonly: false,
              value: "",
              validation: "",
              validationMessage: "",
            },
            {
              id: "textarea",
              label: "Textarea",
              placeholder: "Enter text here",
              maxlength: 50,
              maxLengthMessage: "",
              minlength: 3,
              required: true,
              minLengthMessage: "",
              color: "",
              disabled: false,
              readonly: false,
              value: "",
              validation: "",
              validationMessage: "",
            },
          ],
          id: "textarea",
          label: "Textarea",
          placeholder: "Enter text here",
          maxlength: 50,
          maxLengthMessage: "",
          minlength: 3,
          required: true,
          minLengthMessage: "",
          color: "",
          disabled: false,
          readonly: false,
          value: "",
          validation: "",
          validationMessage: "",
        },
        {
          row: 0,
          columns: [],
          id: "textarea",
          label: "Textarea",
          placeholder: "Enter text here",
          maxlength: 50,
          maxLengthMessage: "",
          minlength: 3,
          required: true,
          minLengthMessage: "",
          color: "",
          disabled: false,
          readonly: false,
          value: "",
          validation: "",
          validationMessage: "",
        },
      ],
      id: "section",
      label: "Section",
      color: "",
    },
    // {
    //   row: 1,
    //   columns: [
    //     {
    //       id: "textarea",
    //       label: "Textarea",
    //       placeholder: "Enter text here",
    //       maxlength: 50,
    //       maxLengthMessage: "",
    //       minlength: 3,
    //       required: true,
    //       minLengthMessage: "",
    //       color: "",
    //       disabled: false,
    //       readonly: false,
    //       value: "",
    //       validation: "",
    //       validationMessage: "",
    //     },
    //     {
    //       id: "textarea",
    //       label: "Textarea",
    //       placeholder: "Enter text here",
    //       maxlength: 50,
    //       maxLengthMessage: "",
    //       minlength: 3,
    //       required: true,
    //       minLengthMessage: "",
    //       color: "",
    //       disabled: false,
    //       readonly: false,
    //       value: "",
    //       validation: "",
    //       validationMessage: "",
    //     },
    //     {
    //       id: "textarea",
    //       label: "Textarea",
    //       placeholder: "Enter text here",
    //       maxlength: 50,
    //       maxLengthMessage: "",
    //       minlength: 3,
    //       required: true,
    //       minLengthMessage: "",
    //       color: "",
    //       disabled: false,
    //       readonly: false,
    //       value: "",
    //       validation: "",
    //       validationMessage: "",
    //     },
    //   ],
    // },
    // {
    //   row: 2,
    //   columns: [
    //     {
    //       id: "select",
    //       label: "Select Dropdown",
    //       placeholder: "Enter text here",
    //       maxlength: 50,
    //       maxLengthMessage: "",
    //       minlength: 3,
    //       required: true,
    //       minLengthMessage: "",
    //       color: "",
    //       disabled: false,
    //       readonly: false,
    //       value: "",
    //       validation: "",
    //       validationMessage: "",
    //     },
    //     {
    //       id: "select",
    //       label: "Select Dropdown",
    //       placeholder: "Enter text here",
    //       maxlength: 50,
    //       maxLengthMessage: "",
    //       minlength: 3,
    //       required: true,
    //       minLengthMessage: "",
    //       color: "",
    //       disabled: false,
    //       readonly: false,
    //       value: "",
    //       validation: "",
    //       validationMessage: "",
    //     },
    //   ],
    // },
    // {
    //   row: 3,
    //   columns: [
    //     {
    //       id: "select",
    //       label: "Select Dropdown",
    //       placeholder: "Enter text here",
    //       maxlength: 50,
    //       maxLengthMessage: "",
    //       minlength: 3,
    //       required: true,
    //       minLengthMessage: "",
    //       color: "",
    //       disabled: false,
    //       readonly: false,
    //       value: "",
    //       validation: "",
    //       validationMessage: "",
    //     },
    //   ],
    // },
  ]);

  const handleValueChange = (column, row, event) => {
    const updatedData = data.map((r) => {
      if (r.row === row.row) {
        return {
          ...r,
          columns: r.columns.map((col) => {
            if (col.id === column.id) {
              return {
                ...col,
                value: event.target.value,
              };
            }
            return col;
          }),
        };
      }
      return r;
    });
    setData(updatedData);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (
    event,
    rowIndex,
    isNewRow,
    parent = {},
    columnIndex = 0
  ) => {
    event.preventDefault();
    const item = event.dataTransfer.getData("text/plain");
    const value = data[0].columns.filter((items) => items.id === item)[0];
    const newData = JSON.parse(JSON.stringify(data));
    const threeInOneRow =
      newData?.filter((item) => item?.row === rowIndex)[0]?.columns?.length >=
      3;

    if (threeInOneRow) {
      toast({
        variant: "destructive",
        title: "Try to make a new row",
        description: "More than three input fields in one row is not allowed",
      });
      return;
    }

    const condition = newData?.some((item) => {
      return item?.columns.some((news) => news.id === "button");
    });

    if (condition && value.id !== "button") {
      toast({
        variant: "destructive",
        title: "Could not add row after button",
        description: "More than three input fields in one row is not allowed",
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
        } else if (
          isNewRow === false &&
          parent.id === "section" &&
          value.dependableField === undefined
        ) {
          newData[rowIndex].columns[columnIndex].columns.push(value);
        } else if (isNewRow === false && value.dependableField === undefined) {
          newData[rowIndex].columns.push(value);
        }
      }
    }

    setData(newData);
  };

  return (
    <div className="h-[calc(100vh-80px)] p-2 bg-gray-50 rounded-b-xl">
      {data.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex flex-wrap w-full"
          onDragOver={handleDragOver}
          onDrop={(event) => handleDrop(event, rowIndex, false, row)}
        >
          {row.label ? (
            <div>
              <div
                contentEditable="true"
                onInput={(e) => console.log(e.target.textContent, row)}
                className="mb-2 border-gray-300 p-2 w-full text-gray-700 text-xl font-semibold"
              >
                {row.label}
              </div>
              {row.columns.map((column, columnIndex) => (
                <ColumnComponent
                  key={columnIndex}
                  column={column}
                  handleValueChange={handleValueChange}
                  row={row}
                />
              ))}
            </div>
          ) : (
            row.columns.map((column, columnIndex) => (
              <ColumnComponent
                key={columnIndex}
                column={column}
                handleValueChange={handleValueChange}
                row={row}
              />
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
  );
};

export default DynamicForm;
