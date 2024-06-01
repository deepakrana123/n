import { idProofs } from "@/constants/constants";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const [dragEnd, setDragEnd] = useState(null);
  const [isDragging, setIsDragging] = useState(false); 
  const handleDragStart = (event, item) => {
    event.dataTransfer.setData("text/plain", item);
    setDragEnd(item);
    setIsDragging(true)
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
    setIsDragging(false)
  };

  return (
    <aside className="fixed top-0 z-30 bg-gray-900 w-full md:w-[25%] shrink-0 md:sticky md:block p-4 shadow-lg">
      <div
        className={`${
          idProofs.length > 0
            ? "h-[512px] overflow-y-auto scrollbar-mobile smooth-auto"
            : ""
        }`}
      >
        {idProofs.map((item, index) => (
          <div key={index} className="mb-6">
            <h1 className="text-2xl text-white mb-4">{item.header}</h1>
            {item.draggable &&
              item.columns?.map((newItem, index) => (
                <div
                  key={newItem?.label + "" + String(index)}
                  draggable
                  onDragStart={(event) => handleDragStart(event, newItem?.id)}
                  onDragEnd={(event) => handleDragEnd(event)}
                  className={`cursor-grab p-2 mb-2 text-white bg-gray-800 hover:bg-violet-800 focus:outline-none focus:ring focus:ring-violet-300 rounded-md 
                  ${dragEnd === newItem?.id ? 'bg-green-800 opacity-50' : ''}`}
                >
                  {newItem?.label}
                </div>
              ))}
            <div className="flex flex-row gap-3 flex-wrap">
              {!item.draggable &&
                item.columns?.map((newItem, index) => (
                  <div
                    key={newItem?.label + "" + String(index)}
                    className="cursor-pointer p-2 mb-2 text-white bg-gray-800 hover:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-300 rounded-md transition duration-200"
                  >
                    {newItem?.label}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
