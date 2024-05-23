import React, {  useState } from "react";
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

const ShowScreen = () => {
  const [dragValue, setDragValue] = useState(finalSpaceCharacters);
  const [targetValue, setTargetValue] = useState("");

  const swapIds = (id1, id2) => {
    let index1 = dragValue.findIndex((screen) => screen.id === id1);
    let index2 = dragValue.findIndex((screen) => screen.id === id2);
    const newArray = [...dragValue];
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
    } else {
      console.log("Elements are not draggable");
    }
    setDragValue(newArray);
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
        {dragValue?.map(({ id, screenName, thumb, isDraggable }, index) => (
          <div
            className="relative group border border-gray-200 rounded-lg shadow-lg overflow-hidden bg-white"
            draggable={isDraggable}
            onDragStart={(event) => handleDragStart(event, id)}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={() => handleDragEnter(id)}
            key={id}
          >
            <button
              className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 focus:outline-none flex items-center justify-center"
              onClick={() => console.log(`Delete item with id: ${id}`)}
            >
              <FaTimes />
            </button>
            <Link to={`/screen/${id}`}>
              <Card className="w-full h-full cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">{screenName}</CardTitle>
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

