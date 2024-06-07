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
import { MdOutlinePrivacyTip } from "react-icons/md";

function performAction(input) {
  const normalizedInput = input % 3;
  if (normalizedInput === 0) {
    return "shadow-blue-600";
  } else if (normalizedInput === 1) {
    return "shadow-yellow-600";
  } else if (normalizedInput === 2) {
    return "shadow-red-600";
  } else {
    return "shadow-green-600";
  }
}

const ShowScreen = () => {
  const { id: templateId } = useParams();
  // const { toast } = useToast();
  const user = JSON.parse(useSelector((state) => state.screen.user));
  const [screen, setScreen] = useState([]);
  const [targetValue, setTargetValue] = useState("");
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
    swapScreens(item, targetValue);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDragEnter = (id) => {
    setTargetValue(id);
  };
  // const swapScreens = (sourceId, targetId) => {
  //   const updatedScreens = [...screen];
  //   const sourceIndex = updatedScreens.findIndex((s) => s.id === sourceId);
  //   const targetIndex = updatedScreens.findIndex((s) => s.id === targetId);
  //   if (sourceIndex !== -1 && targetIndex !== -1) {
  //     const temp = updatedScreens[sourceIndex];
  //     updatedScreens[sourceIndex] = updatedScreens[targetIndex];
  //     updatedScreens[targetIndex] = temp;

  //     const arePreScreenBefore = (swapScreen) => {
  //       const currentPreScreens = swapScreen.preScreens.split(",");
  //       const currentIndex = updatedScreens.findIndex(
  //         (swap) => (swap.id = swapScreen.id)
  //       );
  //       const invalidPreScreens = [];
  //       for (const preScreens of currentPreScreens) {
  //         const preScreenIndex = updatedScreens.findIndex(
  //           (s) => s.id === preScreen
  //         );
  //         if (preScreenIndex === -1 || preScreenIndex >= currentIndex) {
  //           invalidPreScreens.push(preScreen);
  //         }
  //       }
  //       return invalidPreScreens;
  //     };
  //     const arePostScreensAfter = (currentScreen) => {
  //       const currentPostScreens = currentScreen.postScreens.split(",");
  //       const currentIndex = updatedScreens.findIndex(
  //         (s) => s.id === currentScreen.id
  //       );
  //       const invalidPostScreens = [];
  //       for (const postScreen of currentPostScreens) {
  //         const postScreenIndex = updatedScreens.findIndex(
  //           (s) => s.id === postScreen
  //         );
  //         if (postScreenIndex === -1 || postScreenIndex <= currentIndex) {
  //           invalidPostScreens.push(postScreen);
  //         }
  //       }
  //       return invalidPostScreens;
  //     };

  //     setScreen(updatedScreens);
  //   }
  // };
  const swapScreens = (sourceId, targetId) => {
    const updatedScreens = [...screen];
    const sourceIndex = updatedScreens.findIndex((s) => s.id === sourceId);
    const targetIndex = updatedScreens.findIndex((s) => s.id === targetId);

    // Helper function to check if all preScreens are before the given screen
    const arePreScreensBefore = (currentScreen) => {
      const currentPreScreens = currentScreen.preScreens.split(",");
      const currentIndex = updatedScreens.findIndex(
        (s) => s.id === currentScreen.id
      );
      const invalidPreScreens = [];
      for (const preScreen of currentPreScreens) {
        const preScreenIndex = updatedScreens.findIndex(
          (s) => s.id === preScreen
        );
        if (preScreenIndex === -1 || preScreenIndex >= currentIndex) {
          invalidPreScreens.push(preScreen);
        }
      }
      return invalidPreScreens;
    };

    // Helper function to check if all postScreens are after the given screen
    const arePostScreensAfter = (currentScreen) => {
      const currentPostScreens = currentScreen.postScreens.split(",");
      const currentIndex = updatedScreens.findIndex(
        (s) => s.id === currentScreen.id
      );
      const invalidPostScreens = [];
      for (const postScreen of currentPostScreens) {
        const postScreenIndex = updatedScreens.findIndex(
          (s) => s.id === postScreen
        );
        if (postScreenIndex === -1 || postScreenIndex <= currentIndex) {
          invalidPostScreens.push(postScreen);
        }
      }
      return invalidPostScreens;
    };

    if (sourceIndex !== -1 && targetIndex !== -1) {
      const sourceScreen = updatedScreens[sourceIndex];
      const targetScreen = updatedScreens[targetIndex];

      // Check if all preScreens are before the source target
      const invalidPreScreensSource = arePreScreensBefore(sourceScreen);
      const invalidPreScreensTarget = arePreScreensBefore(targetScreen);
      if (
        invalidPreScreensSource.length > 0 ||
        invalidPreScreensTarget.length > 0
      ) {
        console.error(
          "Error: Some preScreens are not before the source or target screen."
        );
        console.error(
          `Invalid preScreens for source screen ${
            sourceScreen.screenName
          }: ${invalidPreScreensSource.join(", ")}`
        );
        console.error(
          `Invalid preScreens for target screen ${
            targetScreen.screenName
          }: ${invalidPreScreensTarget.join(", ")}`
        );
        return;
      }

      // Check if all postScreens are after the source target
      const invalidPostScreensSource = arePostScreensAfter(sourceScreen);
      const invalidPostScreensTarget = arePostScreensAfter(targetScreen);
      if (
        invalidPostScreensSource.length > 0 ||
        invalidPostScreensTarget.length > 0
      ) {
        console.error(
          "Error: Some postScreens are not after the source or target screen."
        );
        console.error(
          `Invalid postScreens for source screen ${
            sourceScreen.screenName
          }: ${invalidPostScreensSource.join(", ")}`
        );
        console.error(
          `Invalid postScreens for target screen ${
            targetScreen.screenName
          }: ${invalidPostScreensTarget.join(", ")}`
        );
        toast({
          title: "Email or password is wrong",
          description: `${
            sourceScreen.screenName
          }: ${invalidPostScreensSource.join(", ")}`,
          // position: "top-",
        });
        return;
      }

      // Swap the screens
      updatedScreens[sourceIndex] = targetScreen;
      updatedScreens[targetIndex] = sourceScreen;
      setScreen(updatedScreens);
    } else {
      console.error("Error: Source or target screen not found.");
    }
  };

  useEffect(() => {
    fetch(`http://15.207.88.248:8080/api/findAllScreenMaster/${templateId}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.code == 200) {
          console.log(data.code, "data", data);
          // setTemplateVisited([...data.data]);
          setScreen(data?.data);
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
                isDraggable = true,
                fieldsMap,
                isMandatory,
                templateId,
                ...rest
              },
              index
            ) => (
              <div
                className="w-[250px]  "
                draggable={isDraggable}
                onDragStart={(event) => handleDragStart(event, id)}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragEnter={() => handleDragEnter(id)}
                key={id}
              >
                <div
                  className={`rounded-xl border bg-card text-card-foreground shadow  hover:scale-160  hover:cursor-pointer hover:shadow-md transition duration-500  ${performAction(
                    index
                  )}`}
                >
                  <div className="flex flex-col space-y-1.5 p-6">
                    <h3 className="font-semibold leading-none tracking-tight flex items-center gap-2 justify-between">
                      <span className="truncate font-bold">{screenName}</span>
                      <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80">
                        {isMandatory === "Y" ? <MdOutlinePrivacyTip /> : ""}
                      </div>
                    </h3>
                  </div>
                  <div className="p-6 pt-0 h-[20px] truncate text-sm text-muted-foreground">
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
                        ...rest,
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
        <Button
          className="text-white h-8 mb-2 bg-black mt-2"
          onClick={() => ""}
        >
          Submit
        </Button>
      </div>
    </>
  );
};

export default ShowScreen;
