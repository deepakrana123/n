import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
const createTemplate = [
  {
    id: "singleForm",
    screenName: "Single Form",
    to: "createSingleForm",
  },
  {
    id: "personal_info",
    screenName: "Step Form",
    to: "createStepForm",
  },
];
const CreateTemplate = () => {
  const { state } = useLocation();
  console.log(state, "state");
  return (
    <div className="w-full bg-gray-900 opacity-1 min-h-screen p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {createTemplate?.map(({ id, screenName, description, to }, index) => (
          <div className="max-w-7xl mx-auto " key={id}>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative px-7 py-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-8 h-[200px] w-[300px]">
                <div className="space-y-2 gap-3">
                  <div className="flex flex-col justify-between h-full">
                    <div className="flex justify-between">
                      <p className="text-slate-900">{screenName}</p>
                    </div>
                    <p className="text-slate-300 flex-1.5">{description}</p>
                    <span className="flex space-x-1">
                      <Link
                        to={`/${to}`}
                        className="block text-indigo-400 group-hover:text-slate-800 transition duration-200"
                        state={state}
                     >
                        Create {screenName}
                      </Link>
                      <FaArrowRight className="block text-indigo-400 group-hover:text-slate-800 transition duration-200" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateTemplate;
