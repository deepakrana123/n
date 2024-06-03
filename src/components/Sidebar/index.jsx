import { idProofs } from "@/constants/constants";
import { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

const Sidebar = () => {
  const [dragEnd, setDragEnd] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const handleDragStart = (event, item) => {
    event.dataTransfer.setData("text/plain", item);
    setDragEnd(item);
    setIsDragging(true);
  };
  useEffect(() => {
    const a = fetch("http://15.207.88.248:8080/admin/findAllInputMaster", {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        // setIdProofs((prev)=>prev[0].columns[])
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleDragEnd = () => {
    setDragEnd(null);
    setIsDragging(false);
  };

  return (
    <aside className="w-[400px]  h-[600px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto 
    scrollbar-mobile smooth-auto">
      <div>
        <p className="text-sm text-foreground/70">Drag and drop elements</p>
        <Separator className="my-2" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center">
          {idProofs.map((item, index) => (
            <>
              <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start">
                {item.header}
              </p>
              {item.draggable &&
                item.columns?.map((newItem, index) => (
                  <Button
                    key={newItem?.label + "" + String(index)}
                    draggable
                    onDragStart={(event) => handleDragStart(event, newItem?.id)}
                    onDragEnd={(event) => handleDragEnd(event)}
                    className="flex flex-col gap-2 h-[80px] w-[120px] cursor-grab"
                  >
                    <p className="text-xs">{newItem?.label}</p>
                  </Button>
                ))}
              {item.draggable == false &&
                item.columns?.map((newItem, index) => (
                  <Button
                    key={newItem?.label + "" + String(index)}
                    className="flex flex-col gap-2 h-[80px] w-[120px] cursor-grab"
                  >
                    <p className="text-xs">{newItem?.label}</p>
                  </Button>
                ))}
            </>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
