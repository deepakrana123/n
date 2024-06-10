"use client";
import Sidebar from "@/components/Sidebar";
import NewForm from "./newForm";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaPencilAlt } from "react-icons/fa";
import useApiCallHandler from "@/useApiCallHandler";

const CreateScreens = () => {
  const { state } = useLocation();
  const [editOn, setEditOn] = useState(false);
  const user = JSON.parse(useSelector((state) => state.screen.user));
  const headerRef = useRef();
  const naviagte = useNavigate();
  useEffect(() => {
    if (state) {
      setCurrentScreenState(state?.fieldsMap || []);
    }
  }, [state]);
  const [currentScreenState, setCurrentScreenState] = useState(
    state?.fieldsMap || []
  );

  const { handleApiCall } = useApiCallHandler({
    defaultData: [],
    onSuccess: (response) => {},
    showToast: true,
  });
  const handleSubmit = () => {
    handleApiCall({
      id: "/api/updateScreenTemplateDetail",
      data: {
        ...state,
        fieldsMap: currentScreenState,
      },
    });
  };
  return (
    <>
      <main
        className="flex flex-col w-full overflow-x-hidden"
        style={{
          height: "100vh",
        }}
      >
        <nav className="flex justify-between border-b-2 p-4 gap-3 items-center bg-white">
          <h2 className="flex items-center font-medium">
            <IoMdArrowRoundBack className="mr-2" onClick={() => naviagte(-1)} />
            {/* <p className="text-muted-foreground mr-2">Screen</p> */}
            {editOn ? (
              <input
                ref={headerRef}
                type="text"
                placeholder="Enter your name"
                onChange={(event) => (state.screenName = event.target.value)}
                onBlur={() => setEditOn((prev) => !prev)}
                className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            ) : (
              <>
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary shadow hover:bg-primary/90 h-9 px-4 py-2 gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400">
                  <p className="text-white">{state?.screenName}</p>
                  <FaPencilAlt
                    className="mt-1 mr-2 cursor-pointer"
                    onClick={() => setEditOn((prev) => !prev)}
                  />
                </button>
              </>
            )}
          </h2>

          <div className="flex items-center gap-2">
            <button
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary shadow hover:bg-primary/90 h-9 px-4 py-2 gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400"
              onClick={() => {
                handleSubmit();
              }}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 20 20"
                aria-hidden="true"
                className="h-4 w-4"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.707 7.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L13 8.586V5h3a2 2 0 012 2v5a2 2 0 01-2 2H8a2 2 0 01-2-2V7a2 2 0 012-2h3v3.586L9.707 7.293zM11 3a1 1 0 112 0v2h-2V3z"></path>
                <path d="M4 9a2 2 0 00-2 2v5a2 2 0 002 2h8a2 2 0 002-2H4V9z"></path>
              </svg>
              Save
            </button>
            {/* <button
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary shadow hover:bg-primary/90 h-9 px-4 py-2 gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400"
              type="button"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="radix-:r7:"
              data-state="closed"
            > */}
            {/* <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 24 24"
                className="h-4 w-4"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M5 4h14v2H5zm0 10h4v6h6v-6h4l-7-7-7 7zm8-2v6h-2v-6H9.83L12 9.83 14.17 12H13z"></path>
              </svg>
              Publish
            </button> */}
          </div>
        </nav>
        <div
          className="flex w-full flex-grow  relative overflow-y-auto h-full bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)] overflow-x-hidden"
          style={{
            flex: 1,
            width: window.innerWidth,
            height: "100vh",
          }}
        >
          <Sidebar />
          <NewForm data={currentScreenState} setData={setCurrentScreenState} />
        </div>
      </main>
    </>
  );
};

export default CreateScreens;
