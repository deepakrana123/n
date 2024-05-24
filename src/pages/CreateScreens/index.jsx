"use client";
import FixedMobileScreen from "@/components/MobileScreen";
import Sidebar from "@/components/Sidebar";
import bg from "../../../public/home-background.png";
const CreateScreens = () => {
  return (
    <>
      
      <div className="relative flex justify-between w-full h-full bg-gray-200 bg-opacity-50"
     >
        <Sidebar />
        <FixedMobileScreen />
        <div></div>
      </div>
    </>
  );
};

export default CreateScreens;
