const renderInputField = (column, rowIndex, columnIndex) => {
  switch (column.id) {
    case "text":
    case "pincode":
    case "ifsc":
    case "occupation":
      return (
        <div className="flex flex-col justify-between">
          <label className="mb-1 text-gray-700 text-sm font-semibold flex">
            <div>{column.label}</div>
            <div>
              <span className="text-red-500 text-xs mt-1">
                {column.required ? "*" : ""}
              </span>
            </div>
            <div className="ml-2 mt-1">
              <SheetSide
                open={open}
                setOpen={setOpen}
                column={column}
                handleSave={handleSave}
                handleDelete={handleDelete}
                columnIndex={columnIndex}
                parentId={rowIndex}
              />
            </div>
          </label>
          <input
            type="text"
            placeholder={column.placeholder}
            maxLength={column.maxlength}
            minLength={column.minlength}
            required={column.required}
            className="border border-gray-300 p-2 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            value={column.value}
            onChange={(event) =>
              handleValueChange(rowIndex, columnIndex, event)
            }
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
        </div>
      );
    case "number":
      return (
        <div className="flex flex-col justify-between">
          <label className="mb-1 text-gray-700 text-sm font-semibold flex">
            <div>{column.label}</div>
            <div>
              <span className="text-red-500 text-xs mt-1">
                {column.required ? "*" : ""}
              </span>
            </div>
            <div className="ml-2 mt-1">
              <SheetSide
                open={open}
                setOpen={setOpen}
                column={column}
                handleSave={handleSave}
                handleDelete={handleDelete}
                columnIndex={columnIndex}
                parentId={rowIndex}
              />
            </div>
          </label>
          <input
            type="number"
            placeholder={column.placeholder}
            max={column.max}
            min={column.min}
            required={column.required}
            className="border border-gray-300 p-2 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            value={column.value}
            onChange={(event) =>
              handleValueChange(rowIndex, columnIndex, event)
            }
          />
          {column.required && column.value === "" && (
            <span className="text-red-500 text-xs mt-1">
              {column.validationMessage}
            </span>
          )}
          {(column.min || column.max) && (
            <span className="text-red-500 text-xs mt-1">
              {column.minMessage || column.maxMessage}
            </span>
          )}
        </div>
      );
    case "radio":
      return (
        <div className="flex items-center">
          <label className="mb-1 text-gray-700 text-sm font-semibold flex">
            <div>{column.label}</div>
            <div>
              <span className="text-red-500 text-xs mt-1">
                {column.required ? "*" : ""}
              </span>
            </div>
            <div className="ml-2 mt-1">
              <SheetSide
                open={open}
                setOpen={setOpen}
                column={column}
                handleSave={handleSave}
                handleDelete={handleDelete}
                columnIndex={columnIndex}
                parentId={rowIndex}
              />
            </div>
          </label>
          <input
            type="radio"
            required={column.required}
            disabled={column.disabled}
            readOnly={column.readonly}
            className="ml-2"
            value={column.value}
            onChange={(event) =>
              handleValueChange(rowIndex, columnIndex, event)
            }
          />
        </div>
      );
    case "checkbox":
      return (
        <div className="flex items-center">
          <label className="mb-1 text-gray-700 text-sm font-semibold flex">
            <div>{column.label}</div>
            <div>
              <span className="text-red-500 text-xs mt-1">
                {column.required ? "*" : ""}
              </span>
            </div>
            <div className="ml-2 mt-1">
              <SheetSide
                open={open}
                setOpen={setOpen}
                column={column}
                handleSave={handleSave}
                handleDelete={handleDelete}
                columnIndex={columnIndex}
                parentId={rowIndex}
              />
            </div>
          </label>
          <input
            type="checkbox"
            required={column.required}
            disabled={column.disabled}
            readOnly={column.readonly}
            className="ml-2"
            value={column.value}
            onChange={(event) =>
              handleValueChange(rowIndex, columnIndex, event)
            }
          />
        </div>
      );
    case "file":
      return (
        <div className="flex flex-col justify-between">
          <label className="mb-1 text-gray-700 text-sm font-semibold flex">
            <div>{column.label}</div>
            <div>
              <span className="text-red-500 text-xs mt-1">
                {column.required ? "*" : ""}
              </span>
            </div>
            <div className="ml-2 mt-1">
              <SheetSide
                open={open}
                setOpen={setOpen}
                column={column}
                handleSave={handleSave}
                handleDelete={handleDelete}
                columnIndex={columnIndex}
                parentId={rowIndex}
              />
            </div>
          </label>
          <input
            type="file"
            required={column.required}
            accept={column.accept}
            className="border border-gray-300 p-2 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            onChange={(event) =>
              handleValueChange(rowIndex, columnIndex, event)
            }
          />
          {column.required && !column.value && (
            <span className="text-red-500 text-xs mt-1">
              {column.validationMessage}
            </span>
          )}
        </div>
      );
    default:
      return null;
  }
};
