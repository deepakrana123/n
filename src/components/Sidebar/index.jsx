import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addScreen } from "@/services/reducer/ScreenReducer";
import { idProofs } from "@/constants/constants";

const Sidebar = () => {
  const { screenId } = useParams();
  const dispatch = useDispatch();
  const onDragEnd = (result) => {
    dispatch(addScreen([idProofs[result?.source?.index], screenId]));
  };
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <aside className="fixed top-14 z-30 h-[calc(100vh-3.5rem)] bg-gray-100 w-1/5 shrink-0 md:sticky md:block p-4 shadow-lg">
          <div className="h-full w-full rounded-md overflow-hidden">
            <div className="min-w-full table">
              <div className="w-full">
                <div className="pb-4">
                  <h4 className="mb-4 text-lg font-semibold text-gray-800">
                    Getting Started
                  </h4>
                  <Droppable droppableId="characters">
                    {(provided) => (
                      <div
                        className="flex-grow space-y-2"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {idProofs?.map(({ id, label }, index) => (
                          <div
                            className="grid grid-flow-row auto-rows-max text-sm"
                            key={index}
                          >
                            <Draggable key={id} draggableId={id} index={index}>
                              {(provided) => (
                                <span
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="group flex items-center p-2 rounded-md border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 cursor-pointer"
                                >
                                  {label}
                                </span>
                              )}
                            </Draggable>
                          </div>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </DragDropContext>
    </>
  );
};

export default Sidebar;
