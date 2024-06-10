import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { TemplateDialog } from "./dailog";
import { SingleScreenDialog } from "./dialogSingleScreen";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { useSelector } from "react-redux";
import useApiCallHandler from "@/useApiCallHandler";
let a = {
  id: "create",
  screenName: "Create Your step form",
  description: "Creating your first form ",
};
const CreateStepForm = () => {
  const [createStepForm, setCreateStepForm] = useState([a]);
  const [open, setOpen] = useState(false);
  const { state } = useLocation();
  const user = JSON.parse(useSelector((state) => state.screen.user));
  // const handleStepForm = () => {
  //   setOpen((prev) => !prev);
  // };
  // const createScreenHeader = (event) => {
  //   let abc = [...createStepForm];
  //   console.log(abc, "Abc");
  //   abc.unshift(event);
  //   setCreateStepForm(abc);
  //   // setOpen(abc);
  // };

  const { handleApiCall } = useApiCallHandler({
    onSuccess: (response) => {
      setCreateStepForm([...response?.data?.data, a]);
    },
  });
  useEffect(() => {
    if (state.templateId) {
      handleApiCall({
        id: `/api/findAllScreenMaster/${state.templateId}`,
      });
    }
  }, [state.templateId]);

  return (
    <>
      <div className="w-full min-h-screen p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {createStepForm?.map(
            (
              {
                id,
                isMandatory,
                thumb,
                isDraggable,
                screenName,
                description,
                fieldsMap,
                templateId,
                to,
              },
              index
            ) => (
              <>
                {id === "create" ? (
                  <SingleScreenDialog />
                ) : (
                  <div
                    className={`rounded-xl border bg-card text-card-foreground shadow  hover:scale-160  hover:cursor-pointer hover:shadow-md transition duration-500 
                  
                  `}
                  >
                    <div className="flex flex-col space-y-1.5 p-6">
                      <h3 className="font-semibold leading-none tracking-tight flex items-center gap-2 justify-between">
                        <span className="truncate font-bold">{screenName}</span>
                        <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80">
                          {isMandatory === "Y" ? <MdOutlinePrivacyTip /> : ""}
                        </div>
                      </h3>
                    </div>
                    <div className="p-6 pt-0 h-[20px] truncate text-sm text-muted-foreground">
                      {description}
                    </div>
                    <div className="flex items-center p-6 pt-0">
                      <Link
                        className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2 w-full mt-2 text-md gap-4"
                        to={"/createScreen"}
                        state={{
                          id,
                          screenName,
                          description,
                          thumb,
                          isDraggable,
                          fieldsMap,
                          isMandatory,
                          templateId,
                          ...rest,
                        }}
                      >
                        Edit {screenName}{" "}
                      </Link>
                    </div>
                  </div>
                )}
              </>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default CreateStepForm;
