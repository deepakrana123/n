import React from "react";
import { useLocation } from "react-router-dom";
import { DialogOpenClose } from "./dailog";
import CreateScreens from "../CreateScreens";

const CreateSingleForm = () => {
  const { state } = useLocation();
  const setCreateScreenHeader = (event) => {
    console.log(state, event, "State");
    event.id = event.screenName;
    if (event) {
      state.pop();
      state.push(event);
    }
  };
  console.log(state, "createScreenHeader");
  return (
    <>
      <DialogOpenClose
        open={true}
        setCreateScreenHeader={setCreateScreenHeader}
      />
      <CreateScreens template={state} />
    </>
  );
};

export default CreateSingleForm;
