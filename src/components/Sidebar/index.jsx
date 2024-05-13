import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Sidebar = ({ IdProofs, setId }) => {
  console.log(IdProofs, "IdProofs");
  const handleOnDragEnd = (result) => {
    console.log(result,IdProofs,result?.source?.index,IdProofs[result?.source?.index], "result");
    setId(IdProofs[result?.source?.index])
  };
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <aside className="fixed top-14 z-30   hidden h-[calc(100vh-3.5rem)] bg-background/95 w-1/5 shrink-0 md:sticky md:block">
        <div
          data-radix-scroll-area-viewport=""
          className="h-full w-full rounded-[inherit]"
          style={{ overflow: "hidden scroll" }}
        >
          <div style={{ minWidth: "100%", display: "table" }}>
            <div className="w-full">
              <div className="pb-4">
                <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
                  Getting Started
                </h4>
                <Droppable droppableId="characters">
                  {(provided) => (
                    <div
                      className="flex-grow "
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {IdProofs?.map(({ id, label }, index) => (
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
                                className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline text-muted-foreground"
                              >
                                {label}
                              </span>
                            )}
                          </Draggable>
                        </div>
                      ))}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </DragDropContext>
  );
};

export default Sidebar;
