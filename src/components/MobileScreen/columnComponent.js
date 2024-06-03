import React from "react";

const ColumnComponent = () => {
  return (
    <div
      key={columnIndex}
      className={`flex flex-col mb-2 p-[5px] ${getColumnWidth(
        row.columns.length
      )}`}
      onDragEnter={() => handleDragEnter(rowIndex)}
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
    </div>
  );
};

export default ColumnComponent;
