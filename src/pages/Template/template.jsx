import { finalSpaceCharacters } from "@/constants/constants";
import { addTemplate } from "@/services/reducer/ScreenReducer";
import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Template = () => {
  // const template = useSelector((state) => state.screen.template);
  // const dispatch = useDispatch();
  const [template, setTemplate] = useState(finalSpaceCharacters);
  useEffect(() => {
    (async () => {})();
    let a = {
      id: "create",
      screenName: "Create Work Flow",
      description: "Creating an new workflow",
    };
    // finalSpaceCharacters.push(a);

    // dispatch(addTemplate([...template, ...finalSpaceCharacters, a]));
    setTemplate((prev) => {
      return [...prev, a];
    });
  }, []);
  console.log(template, "template");
  return (
    <div className="w-full bg-gray-900 opacity-1 min-h-screen p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {template?.map(({ id, screenName, description }, index) => (
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
                    {id === "create" ? (
                      <span className="flex space-x-1">
                        <Link
                          to={`/createTemplate`}
                          className="block text-indigo-400 group-hover:text-slate-800 transition duration-200"
                          state={template}
                        >
                          Create Work Flow
                        </Link>
                        <FaArrowRight className="block text-indigo-400 group-hover:text-slate-800 transition duration-200" />
                      </span>
                    ) : (
                      <>
                        <span className="flex space-x-1">
                          <Link
                            to={"/getAllScreenOfTemplate"}
                            className="block text-indigo-400 group-hover:text-slate-800 transition duration-200"
                          >
                            Check {screenName}
                          </Link>
                          <FaArrowRight className="block text-indigo-400 group-hover:text-slate-800 transition duration-200" />
                        </span>
                      </>
                    )}
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

export default Template;
