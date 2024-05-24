import { idProofs } from "@/constants/constants";

const Sidebar = () => {
  const handleDragStart = (event, item) => {
    event.dataTransfer.setData("text/plain", item);
  };
  return (
    <aside className="fixed top-0 z-30 h-full bg-gray-100 w-[25%] shrink-0 md:sticky md:block p-4 shadow-lg">
      <div>
        {idProofs?.map((item, index) => (
          <div
            key={item?.label + "" + String(index)}
            draggable
            onDragStart={(event) => handleDragStart(event, item?.id)} // Pass unique id as a parameter
            className="cursor-pointer p-2 mb-2 hover:bg-violet-600  focus:outline-none focus:ring focus:ring-violet-300 "
          >
            { item?.label}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
