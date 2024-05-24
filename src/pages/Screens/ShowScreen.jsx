import React, { useState } from "react";
import { finalSpaceCharacters } from "../../constants/constants";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { PopoverDemo } from "@/components/PopOver/popOver";
import { useDispatch, useSelector } from "react-redux";
import { saveScreen } from "@/services/reducer/ScreenReducer";
import { FaArrowRight } from "react-icons/fa";
const ShowScreen = () => {
  const screensDrag = useSelector((state) => state.screen.screens);
  const dispatch = useDispatch();
  const [targetValue, setTargetValue] = useState("");
  const { toast } = useToast();
  const swapIds = (id1, id2) => {
    let index1 = screensDrag.findIndex((screen) => screen.id === id1);
    let index2 = screensDrag.findIndex((screen) => screen.id === id2);
    const newArray = [...screensDrag];
    if (
      newArray[index1].isDraggable === true &&
      newArray[index2].isDraggable === true &&
      index1 >= 0 &&
      index1 < newArray.length &&
      index2 >= 0 &&
      index2 < newArray.length
    ) {
      let temp = newArray[index1];
      newArray[index1] = newArray[index2];
      newArray[index2] = temp;
      toast({
        title: "There is some chnages in the screen",
        description: `${newArray[index1].screenName} and ${newArray[index2].screenName} are swapped`,
      });
    } else {
      console.log("hlo not done");
      toast({
        variant: "destructive",
        title: "You are trying to move a freezed screen",
        description: "Freezed screen cannot be moved",
      });
    }
    dispatch(saveScreen(newArray));
  };

  const handleDragStart = (event, item) => {
    event.dataTransfer.setData("text/plain", item);
  };

  const handleDrop = (event) => {
    const item = event.dataTransfer.getData("text/plain");
    swapIds(item, targetValue);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDragEnter = (id) => {
    setTargetValue(id);
  };

  return (
    <div className="w-full bg-gray-900 opacity-1 min-h-screen p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {screensDrag?.map(
          ({ id, screenName, description, thumb, isDraggable }, index) => (
            <div
              className="max-w-7xl mx-auto "
              draggable={isDraggable}
              onDragStart={(event) => handleDragStart(event, id)}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragEnter={() => handleDragEnter(id)}
              key={id}
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative px-7 py-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-8 h-[200px] w-[300px]">
                  <svg
                    className="w-20 h-20 text-purple-800"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M6.75 6.75C6.75 5.64543 7.64543 4.75 8.75 4.75H15.25C16.3546 4.75 17.25 5.64543 17.25 6.75V19.25L12 14.75L6.75 19.25V6.75Z"
                    ></path>
                  </svg>
                  {/* <div className="space-y-2 gap-3">
                  <div className="flex justify-between">

                  <p className="text-slate-900 ">{screenName}</p>
                  <PopoverDemo />
                  </div>
                  <p className="text-slate-300">
                   {description}
                  </p>
                  <span className="flex space-x-1">
                    <Link
                      to={`/screen/${id}`}
                      className="block text-indigo-400 group-hover:text-slate-800 transition duration-200"
                      target="_blank"
                    >
                      Change Screen
                    </Link>
                    <FaArrowRight className="block text-indigo-400 group-hover:text-slate-800 transition duration-200" />
                  </span>
                </div> */}
                  <div className="space-y-2 gap-3">
                    <div className="flex flex-col justify-between h-full">
                      <div className="flex justify-between">
                        <p className="text-slate-900">{screenName}</p>
                        <PopoverDemo />
                      </div>

                      <p className="text-slate-300 flex-1.5">{description}</p>

                      <span className="flex space-x-1">
                        <Link
                          to={`/screen/${id}`}
                          className="block text-indigo-400 group-hover:text-slate-800 transition duration-200"
                          target="_blank"
                        >
                          Change Screen
                        </Link>
                        <FaArrowRight className="block text-indigo-400 group-hover:text-slate-800 transition duration-200" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ShowScreen;
