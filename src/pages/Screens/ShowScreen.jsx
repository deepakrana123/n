import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { PopoverDemo } from "@/components/PopOver/popOver";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowRight, FaMoon } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo/Logo";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BsWindowDesktop } from "react-icons/bs";
import { IoMdSunny } from "react-icons/io";
import { and, finalSpaceCharacters } from "@/constants/constants";

const ShowScreen = () => {
  const { id: templateId } = useParams();
  console.log(templateId, "id");
  const user = JSON.parse(useSelector((state) => state.screen.user));
  const [screen, setScreen] = useState([]);
  const [targetValue, setTargetValue] = useState("");
  const { theme, setTheme } = useState("light");
  const { toast } = useToast();
  const swapIds = (id1, id2) => {
    let index1 = screen.findIndex((screen) => screen.id === id1);
    let index2 = screen.findIndex((screen) => screen.id === id2);
    const newArray = [...screen];
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

  // useEffect(() => {
  //   // const b = and.filter((item) => item.templateId === templateId);
  //   // console.log(b, "b");
  //   // setScreen(b);
  //   // user.orgId=101
  //   // fetch(
  //   //   `http://15.207.88.248:8080/api/getScreenByTemplateId/${templateId}`,
  //   //   {
  //   //     method: "GET",
  //   //     headers: {
  //   //       "Content-type": "application/json; charset=UTF-8",
  //   //       Authorization: `Bearer ${user.token}`,
  //   //     },
  //   //   }
  //   // )
  //   //   .then((res) => {
  //   //     if (!res.ok) {
  //   //       throw new Error("Network response was not ok");
  //   //     }
  //   //     return res.json();
  //   //   })
  //   //   .then((data) => {
  //   //     setScreen(data?.data);
  //   //   })
  //   //   .catch((error) => {
  //   //     console.error("Error fetching data:", error);
  //   //   });
  // }, []);
  useEffect(() => {
    fetch(
      `http://15.207.88.248:8080/api/findAllScreenMaster/${"6659e4186e35a10301c5870e"||templateId}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${user.token}`,
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.code == 200) {
          console.log(data.code, "data", data);
          // setTemplateVisited([...data.data]);
          setScreen(data?.data)
        }
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
  return (
    <>
      <div className="w-full min-h-screen p-6">
        <Button className="text-white h-8 mb-2 bg-black" onClick={() => ""}>
          Submit
        </Button>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[
            ...screen,
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
                fieldsMap,
                isMandatory,
                templateId,
                ...rest
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
                <div class="rounded-xl border bg-card text-card-foreground shadow">
                  <div class="flex flex-col space-y-1.5 p-6">
                    <h3 class="font-semibold leading-none tracking-tight flex items-center gap-2 justify-between">
                      <span class="truncate font-bold">{screenName}</span>
                      <div class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80">
                        {isMandatory === "Y" ? "Mandatory" : "Not Mandatory"}
                      </div>
                    </h3>
                  </div>
                  <div class="p-6 pt-0 h-[20px] truncate text-sm text-muted-foreground">
                    {/* {description} */}
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
                        ...rest
                      }}
                    >
                      Edit {screenName}{" "}
                    </Link>
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
