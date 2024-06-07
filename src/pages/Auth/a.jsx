export const renderInputField = (column, rowIndex, columnIndex) => {
  switch (column.type) {
    case "text":
    case "pincode":
    case "ifsc":
    case "occupation":
    case "state":
    case "city":
      return (
        <input
          type="text"
          placeholder={column.placeholder}
          maxLength={column.maxlength}
          minLength={column.minlength}
          required={column.required}
          className="border border-gray-300 p-2 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm mt-2"
          value={column.value}
          disabled={true}
        />
      );
    case "number":
      return (
        <input
          type="number"
          placeholder={column.placeholder}
          max={column.max}
          min={column.min}
          required={column.required}
          className="border border-gray-300 p-2 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm mt-2"
          value={column.value}
          disabled={true}
        />
      );
    case "date":
      return (
        <input
          type="date"
          required={column.required}
          className="border border-gray-300 p-2 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm mt-2"
          value={column.value}
          disabled={true}
        />
      );
    case "select":
      return (
        <select
          required={column.required}
          className="border border-gray-300 p-2 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm mt-2"
          value={column.value}
          // onChange={(event) => handleValueChange(rowIndex, columnIndex, event)}
        >
          {column.options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    // case "save":
    //   return (
    //     <button
    //       className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
    //       onClick={() => handleSave(rowIndex, columnIndex)}
    //     >
    //       Save
    //     </button>
    //   );
    case "file":
      return (
        <input
          type="file"
          required={column.required}
          accept={column.accept}
          className="border border-gray-300 p-2 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm mt-2"
          onChange={(event) => handleValueChange(rowIndex, columnIndex, event)}
        />
      );
    case "checkbox":
      return (
        <input
          type="checkbox"
          required={column.required}
          disabled={column.disabled}
          readOnly={column.readonly}
          className="form-checkbox h-5 w-5 text-blue-500 mt-2 rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          checked={column.value}
        />
      );

    case "radio":
      return (
        <input
          type="radio"
          required={column.required}
          disabled={column.disabled}
          readOnly={column.readonly}
          className="form-radio h-5 w-5 text-blue-500 mt-2"
          checked={column.value}
          onChange={(event) => handleValueChange(rowIndex, columnIndex, event)}
        />
      );
    case "save":
      return (
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2">
          Save
        </button>
      );
    case "back":
      return (
        <button
          className="bg-gray-400 text-white px-4 py-2 rounded-md shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 mt-2"
          onClick={handleBack}
        >
          Back
        </button>
      );
    default:
      return null;
  }
};
