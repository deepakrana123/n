import React, { useState } from "react";
import { TemplateDialog } from "./dailog";
import CreateScreens from "../CreateScreens";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
let a = {
  templateField: "kyc_form",
  templateName: "KYC Form",
  templateType: "multiStepForm",
  icon: "",
  description: "",
  templateId: "",
};
const CreateSingleForm = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  return (
    <>
      {/* <TemplateDialog
        open={open}
        setOpen={setOpen}
        setCreateScreenHeader={setCreateScreenHeader}
      /> */}
      <CreateScreens template={state} />
    </>
  );
};

export default CreateSingleForm;
