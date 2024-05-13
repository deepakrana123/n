import React from "react";
import { Sheet } from "../ui/sheet";

const MySheet = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <Sheet>
      <Sheet.Container>
        <Sheet.Header>
          <h1 className="text-xl font-bold">Loan Application</h1>
          <button className="text-gray-500 hover:text-gray-700" onClick={() => console.log("Close sheet")}>Close</button>
        </Sheet.Header>
        <Sheet.Content>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
              <input type="text" id="firstName" name="firstName" className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
              <input type="text" id="lastName" name="lastName" className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input type="email" id="email" name="email" className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
            </div>
            {/* Add more form fields as needed */}
            <div className="mt-4">
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Submit</button>
            </div>
          </form>
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
};

export default MySheet;
