import { Icon, Upload } from "lucide-react";

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
          required={column.isRequired}
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
          required={column.isRequired}
          className="border border-gray-300 p-2 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm mt-2"
          value={column.value}
          disabled={true}
        />
      );
    case "date":
      return (
        <input
          type="date"
          required={column.isRequired}
          className="border border-gray-300 p-2 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm mt-2"
          value={column.value}
          disabled={true}
        />
      );
    case "select":
      return (
        <select
          required={column.isRequired}
          className="border border-gray-300 p-2 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm mt-2"
          value={column.value}
          // onChange={(event) => handleValueChange(rowIndex, columnIndex, event)}
        >
          {column.options?.map((option, index) => (
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
        // <input
        //   type="file"
        //   required={column.isRequired}
        //   accept={column.accept}
        //   className="border border-gray-300 p-2 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm mt-2"
        //   onChange={(event) => handleValueChange(rowIndex, columnIndex, event)}
        // />
        <div style={{ ...styles.button, ...styles.container }}>
          <p style={styles.buttonText}>Capture or Browse Files</p>
          <Upload as={Upload} width={20} color={"#a9a9a9"} />
        </div>
      );
    case "checkbox":
      return (
        <input
          type="checkbox"
          required={column.isRequired}
          disabled={true}
          readOnly={column.readonly}
          className="form-checkbox h-5 w-5 text-blue-500 mt-2 rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          checked={column.value}
        />
      );

    case "radio":
      return (
        <input
          type="radio"
          required={column.isRequired}
          disabled={true}
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

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: "dashed",
    borderColor: "#00000090",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    flex: 1,
    width: "100%",
  },
  buttonText: {
    color: "#00000090",
    fontSize: 16,
    marginRight: 10,
  },
  fileInfo: {
    // marginTop: 20,
    gap: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  fileName: {
    flex: 1,
    fontSize: 14,
    marginRight: 20,
    color: "blue",
    textDecorationLine: "underline",
    // marginBottom: 10,
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
};
