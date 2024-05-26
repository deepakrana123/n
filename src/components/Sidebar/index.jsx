import { idProofs } from "@/constants/constants";

const Sidebar = () => {
  const handleDragStart = (event, item) => {
    event.dataTransfer.setData("text/plain", item);
  };
  return (
    <aside className="fixed top-0 z-30 bg-gray-100 w-[25%] shrink-0 md:sticky md:block p-4 shadow-lg">
      <div
        className={`${
          idProofs.length > 2
            ? "h-[656px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
            : ""
        }`}
      >
        {idProofs.map((item, index) => (
          <div key={index}>
            <h1 className="text-xl">{item.header}</h1>
            {item.draggable &&
              item.columns?.map((newItem, index) => (
                <div
                  key={newItem?.label + "" + String(index)}
                  draggable
                  onDragStart={(event) => handleDragStart(event, newItem?.id)}
                  className="cursor-pointer p-2 mb-1 hover:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-300 rounded-md"
                >
                  {newItem?.label}
                </div>
              ))}
            <div className="flex flex-row gap-3 flex-wrap">
              {item.draggable == false &&
                item.columns?.map((newItem, index) => (
                  <div
                    key={newItem?.label + "" + String(index)}
                    className="cursor-pointer  mb-1 hover:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-300 rounded-md"
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
