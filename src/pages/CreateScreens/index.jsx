"use client";
import FixedMobileScreen from "@/components/MobileScreen";
import Sidebar from "@/components/Sidebar";

const CreateScreens = () => {
  return (
    <>
      
      <div className="relative flex justify-between w-full  bg-gray-900 
      min-h-screen"
     >
        <Sidebar />
        <FixedMobileScreen />
        <div></div>
      </div>
    </>
  );
};

export default CreateScreens;
