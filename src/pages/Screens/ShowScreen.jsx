import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { PopoverDemo } from "@/components/PopOver/popOver";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowRight, FaMoon } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo/Logo";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BsWindowDesktop } from "react-icons/bs";
import { IoMdSunny } from "react-icons/io";
import { finalSpaceCharacters } from "@/constants/constants";

const ShowScreen = () => {
  const [screen, setScreen] = useState([]);
  const [targetValue, setTargetValue] = useState("");
  const { theme, setTheme } = useState("light");
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
      console.log("hihi");
      toast({
        variant: "destructive",
        title: "You are trying to move a freezed screen",
        description: `${
          newArray[index1].isDraggable === true
            ? newArray[index1].screenName
            : newArray[index2].screenName
        } this screen is freezed`,
      });
    }
    setScreen(newArray);
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

  useEffect(() => {
    fetch("http://15.207.88.248:8080/api/findAllScreenMaster", {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkZXZlbmRyYS5yYW5hQHNhc3RlY2hzdHVkaW8uY29tIiwiaWF0IjoxNzE3MTYwNDEwLCJleHAiOjE3MTcxOTY0MTB9.Vr1yfr5bLlg44SIzeslwgw5P9nAiL5uYG06x1xWZIb0",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setScreen(data?.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const handleSaveData = () => {
    fetch(`http://10.101.28.30:8080/api/findScreenById/${1}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJEZWVwYWt5YWRhdjkxNUBnbWFpbC5jb20iLCJpYXQiOjE3MTY5ODkxMzAsImV4cCI6MTcxNzAyNTEzMH0.HUxfHns_tB1uOmts7jSU1IlFrhQ3DPrB4qdVkdIUF3M",
      },
      body: JSON.stringify({
        email: "Deepakyadav915@gmail.com",
        password: "Deepak",
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        // setDatas(data?.data?.fieldsMapList)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  console.log(screen, "screen");
  return (
    <>
      <div className="w-full bg-gray-900 opacity-1 min-h-screen p-6">
        <Button className="text-black-300 h-8 mb-2 bg-white" onClick={() => ""}>
          Submit
        </Button>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[
            ...finalSpaceCharacters,
            {
              id: "create",
              screenName: "Create Work",
              description: "Creating an new screen",
            },
          ]?.map(
            (
              {
                id,
                screenName,
                description,
                thumb,
                isDraggable,
                fieldsMapList,
              },
              index
            ) => (
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
                    {/* <svg
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
                  </svg> */}
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
                            state={fieldsMapList}
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
    </>
  );
};

export default ShowScreen;
