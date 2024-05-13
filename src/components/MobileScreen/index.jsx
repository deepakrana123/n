import React from "react";

const FixedMobileScreen = () => {
  return (
    <div className="w-[375px] h-[812px] bg-gradient-to-b from-blue-500 to-blue-700 rounded-lg border-6 border-blue-900 shadow-md overflow-hidden">
      <div className="p-8">
        <h1 className="text-white text-center text-3xl mb-6">Loan Application</h1>
        <div className="flex flex-wrap -mx-4 mb-4">
          <div className="w-1/2 px-4 mb-4">
            <input type="text" placeholder="First Name" className="w-full px-4 py-3 bg-white text-gray-800 placeholder-gray-500 rounded-md shadow-sm" />
            <p className="text-red-500 text-sm">Error message goes here</p>

          </div>
          <div className="w-1/2 px-4 mb-4">
            <input type="text" placeholder="Last Name" className="w-full px-4 py-3 bg-white text-gray-800 placeholder-gray-500 rounded-md shadow-sm" />
            <p className="text-red-500 text-sm">Error message goes here</p>

          </div>
          <div className="w-full px-4 mb-4">
            <input type="email" placeholder="Email Address" className="w-full px-4 py-3 bg-white text-gray-800 placeholder-gray-500 rounded-md shadow-sm" />
            <p className="text-red-500 text-sm">Error message goes here</p>

          </div>
        </div>
        <div className="flex flex-wrap -mx-4 mb-8">
          <div className="w-1/2 px-4 mb-4">
            <input type="text" placeholder="Phone Number" className="w-full px-4 py-3 bg-white text-gray-800 placeholder-gray-500 rounded-md shadow-sm" />
            <p className="text-red-500 text-sm">Error message goes here</p>

          </div>
          <div className="w-1/2 px-4 mb-4">
            <input type="text" placeholder="Address" className="w-full px-4 py-3 bg-white text-gray-800 placeholder-gray-500 rounded-md shadow-sm" />
            <p className="text-red-500 text-sm">Error message goes here</p>

          </div>
        </div>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4 mb-4">
            <textarea placeholder="Message" rows="3" className="w-full px-4 py-3 bg-white text-gray-800 placeholder-gray-500 rounded-md shadow-sm"></textarea>
            <p className="text-red-500 text-sm">Error message goes here</p>

          </div>
          <div className="w-full px-4">
            <button className="w-full bg-blue-600 text-white py-3 rounded-md shadow-md hover:bg-blue-700 transition duration-300">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixedMobileScreen;
