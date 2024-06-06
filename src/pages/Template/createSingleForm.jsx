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
  const [open, setOpen] = useState(true);
  const user = JSON.parse(useSelector((state) => state.screen.user));
  const {state}=useLocation()
  const setCreateScreenHeader = async (event) => {
    if (event) {
      a.orgId = 101;
      a.templateField = event.screenName.split(" ").join("_");
      a.templateName = event.screenName;
      a.templateType = "singleForm";
      a.description = event.description;
      await fetch("http://15.207.88.248:8080/api/saveCustomTemplate", {
        method: "POST",
        body: JSON.stringify(a),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.code === 200) {
            console.log(a, "a");
            a.templateId = data.data;
            setOpen((prev) => !prev);
            navigate("/createScreen", { state: { ...a, fieldsMap: [] } });
          }
        });
    }
  };
  console.log(open);
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
