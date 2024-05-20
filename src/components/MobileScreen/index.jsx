
import React from "react";
import Form from "../FormComponent/Form";
import { useParams } from "react-router-dom";

const FixedMobileScreen = ({ id }) => {
  const { screenId } = useParams();

  return (
    <React.Fragment>
    <div className="w-[375px] h-[712px] ">
      <Form
        screenId={screenId}
      />
    </div>
    </React.Fragment>
  );
};

export default FixedMobileScreen;
