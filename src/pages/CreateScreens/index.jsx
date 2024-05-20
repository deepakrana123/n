
"use client"
import FixedMobileScreen from "@/components/MobileScreen";
import Sidebar from "@/components/Sidebar";
const CreateScreens = () => {
  return (
    <div className="flex justify-between bg-gray-200">
      <Sidebar/>
      <FixedMobileScreen/>
      <div></div>
    </div>
  );
};

export default CreateScreens;
