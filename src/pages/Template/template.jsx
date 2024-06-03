import { useToast } from "@/components/ui/use-toast";
import { finalSpaceCharacters } from "@/constants/constants";
import { addTemplate } from "@/services/reducer/ScreenReducer";
import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
let a = {
  templateId: "create",
  templateName: "Create Work Flow",
  description: "Creating an new workflow",
};
const Template = () => {
  const [template, setTemplate] = useState([]);
  const user = JSON.parse(useSelector((state) => state.screen.user));
  console.log(user, user.token, "user");
  const { toast } = useToast();
  const naviagte = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("http://15.207.88.248:8080/api/findAll", {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${user?.token}`,
          },
        });

        const data = await response.json();

        if (response.ok && data.code === 200) {
          setTemplate([...data?.data, a]);
          toast({
            description: data?.message,
          });
        } else if (response.status === 401) {
          toast({
            title: "Authentication Error",
            description: "Either email or password is incorrect",
          });
        } else {
          toast({
            title: "Error",
            description: data?.message || "An unknown error occurred",
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Network Error",
          description:
            "Failed to connect to the server. Please try again later.",
        });
      }
    })();
  }, []);
  console.log(template, "template");
  return (
    <div className="w-full min-h-screen p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {template?.map(
          ({ templateId, templateName, templateType, description }, index) => (
            <>
              {templateId === "create" ? (
                <button
                  class="rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground px-4 py-2 group border border-primary/20 h-[190px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4"
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
                <div
                  class="rounded-xl border bg-card text-card-foreground shadow"
                  key={templateId}
                >
                  <div class="flex flex-col space-y-1.5 p-6">
                    <h3 class="font-semibold leading-none tracking-tight flex items-center gap-2 justify-between">
                      <span class="truncate font-bold">{templateName}</span>
                      <div class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80">
                        {templateType}
                      </div>
                    </h3>
                  </div>
                  <div class="flex items-center p-6 pt-0">
                    <Link
                      class="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2 w-full mt-2 text-md gap-4"
                      to={`/getAllScreenOfTemplate/${templateId}`}
                    >
                      View {templateName}{" "}
                    </Link>
                  </div>
                </div>
              )}
            </>
          )
        )}
      </div>
    </div>
  );
};

export default Template;
