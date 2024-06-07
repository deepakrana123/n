"use client";
import FixedMobileScreen from "@/components/MobileScreen";
import Sidebar from "@/components/Sidebar";
import NewForm from "./newForm";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { LuPencilLine } from "react-icons/lu";
import { IoPencilOutline } from "react-icons/io5";
import Sidebar2 from "../Auth/Sidebar2";
const CreateScreens = () => {
  const { state } = useLocation();
  const [editOn, setEditOn] = useState(false);
  const user = JSON.parse(useSelector((state) => state.screen.user));
  const headerRef = useRef();
  useEffect(() => {
    if (state) {
      setCurrentScreenState(state?.fieldsMap || []);
    }
  }, [state]);
  const [currentScreenState, setCurrentScreenState] = useState(
    state?.fieldsMap || []
  );
  const handleSubmit = () => {
    fetch(`http://15.207.88.248:8080/api/updateScreenTemplateDetail`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        ...state,
        // templateId: "6659e4186e35a10301c5870e", // need to remove this lne
        fieldsMap: currentScreenState,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.code == 200) {
          console.log(data.code, "data", data);
          // setTemplateVisited([...data.data]);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  return (
    <>
      <main className="flex flex-col w-full overflow-x-hidden">
        <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
          <h2 className="truncate font-medium flex">
            <p className="text-muted-foreground mr-2">Screen:</p>
            {editOn ? (
              <input
                ref={headerRef}
                type="text"
                placeholder="enter your name"
                onChange={(event) => (state.screenName = event.target.value)}
                onBlue={() => setEditOn((prev) => !prev)}
              />
            ) : (
              <>
                <IoPencilOutline
                  className="mt-2 mr-2"
                  onClick={() => setEditOn((prev) => !prev)}
                />
                <p className="text-muted-foreground">{state?.screenName}</p>
              </>
            )}
          </h2>
          <div className="flex items-center gap-2">
            <button
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 gap-2"
              type="button"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="radix-:r4:"
              data-state="closed"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 24 24"
                className="h-6 w-6"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14c1.1 0 2-.9 2-2V5a2 2 0 00-2-2zm0 16H5V7h14v12zm-5.5-6c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5zM12 9c-2.73 0-5.06 1.66-6 4 .94 2.34 3.27 4 6 4s5.06-1.66 6-4c-.94-2.34-3.27-4-6-4zm0 6.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"></path>
              </svg>
              Preview
            </button>
            <button
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 gap-2"
              onClick={() => {
                console.log("@@@@@@@@@@@@save", currentScreenState);
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
            <button
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary shadow hover:bg-primary/90 h-9 px-4 py-2 gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400"
              type="button"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="radix-:r7:"
              data-state="closed"
            >
              <svg
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
            </button>
          </div>
        </nav>
        <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[602px] bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)] overflow-x-hidden">
          <div className="flex w-full h-full">
            <Sidebar />
            <NewForm
              data={currentScreenState}
              setData={setCurrentScreenState}
            />
            {/* <Sidebar2 /> */}
          </div>
        </div>
      </main>
    </>
  );
};

export default CreateScreens;
