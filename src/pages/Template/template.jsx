import { useToast } from "@/components/ui/use-toast";
import { finalSpaceCharacters } from "@/constants/constants";
import { addTemplate } from "@/services/reducer/ScreenReducer";
import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useNavigation } from "react-router-dom";

let a = {
  id: "create",
  templateName: "Create Work Flow",
  description: "Creating an new workflow",
};
const Template = () => {
  const naviagte = useNavigate();
  const [template, setTemplate] = useState(finalSpaceCharacters);
  useEffect(() => {
    (async () => {})();
    fetch("http://15.207.88.248:8080/api/findAll", {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2aWthc2hAZ21haWwuY29tIiwiaWF0IjoxNzE3NDEyNTg3LCJleHAiOjE3MTc0NDg1ODd9.WseEY7wRmQt9Thv_7rtmtcia3ThXO9YvM1kem6uU9cQ",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.code == 200) {
          console.log(data.code, "data", data);
          setTemplate([...data.data,a]);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    
  }, []);
  console.log(template, "template");
  return (
    <div className="w-full   min-h-screen p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {template?.map(({ id, templateName,templateType, description }, index) => (
          <>
            {id === "create" ? (
              <button
                className="rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground px-4 py-2 group border border-primary/20 h-[190px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4"
                type="button"
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls="radix-:Rdllb6la:"
                data-state="closed"
                onClick={() => naviagte("/createTemplate")}
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 16 16"
                  class="h-8 w-8 text-muted-foreground group-hover:text-primary"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z"></path>
                  <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"></path>
                </svg>
                <p class="font-bold text-xl text-muted-foreground group-hover:text-primary">
                  {templateName}
                </p>
              </button>
            ) : (
              <div class="rounded-xl border bg-card text-card-foreground shadow">
                <div class="flex flex-col space-y-1.5 p-6">
                  <h3 class="font-semibold leading-none tracking-tight flex items-center gap-2 justify-between">
                    <span class="truncate font-bold">{templateName}</span>
                    <div class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80">
                      {templateType}
                    </div>
                  </h3>
                  {/* <p class="flex items-center justify-between text-muted-foreground text-sm">
                    1 day ago
                  </p> */}
                </div>
                <div class="p-6 pt-0 h-[20px] truncate text-sm text-muted-foreground">
                  {description}
                </div>
                <div className="flex items-center p-6 pt-0">
                  <Link
                    className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2 w-full mt-2 text-md gap-4"
                    href="/builder/13000"
                  >
                    View Screen{" "}
                    {/* <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 576 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"></path>
                    </svg> */}
                  </Link>
                </div>
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default Template;
