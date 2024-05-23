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
    <div className="w-full bg-slate-300 min-h-screen p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {screensDrag?.map(({ id, screenName, thumb, isDraggable }, index) => (
          <div
            className="relative group border border-gray-200 rounded-lg shadow-lg overflow-hidden bg-white"
            draggable={isDraggable}
            onDragStart={(event) => handleDragStart(event, id)}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={() => handleDragEnter(id)}
            key={id}
          >
            <PopoverDemo screenId={id} />
            <Link to={`/screen/${id}`}>
              <Card className="w-full h-full cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    {screenName}
                  </CardTitle>
                  <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <img
                    src={thumb}
                    alt={screenName}
                    className="w-full h-40 object-cover"
                  />
                </CardContent>
              </Card>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowScreen;
