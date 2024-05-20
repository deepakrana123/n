import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { finalSpaceCharacters } from "../../constants/constants";
import { Link } from "react-router-dom";
const ShowScreen = () => {
  const [dragValue, setDragValue] = useState(finalSpaceCharacters);
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(dragValue);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    if (result.destination.index !== result.source.index) {
      const draggedItem = dragValue[result.source.index];
      const droppedItem = dragValue[result.destination.index];
      items[result.source.index] = droppedItem;
      items[result.destination.index] = draggedItem;
    }
    setDragValue(items);
  };
  useEffect(() => {
    // http://localhost:5173/
   const a= fetch('http://10.101.29.84:8080/lending/api/all',{
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
    }
   })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        
        setDragValue(data);
      });
  }, []);
  // console.log(photos)

console.log(dragValue,"dragValue")
  return (
    <div className="w-full bg-slate-300 min-h-screen p-4">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="characters">
          {(provided) => (
            <div
              className="grid grid-cols-3 gap-4"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {dragValue?.map(({ id, screenName, thumb, isDraggable }, index) => (
               
                <React.Fragment key={id}>
                  {isDraggable ? (
                    <Draggable draggableId={id} index={index}>
                      {(provided) => (
                        <Link to={`/screen/${id}`}>
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-white rounded-lg shadow-md"
                          >
                             <div> 
                              <img
                                src={thumb}
                                alt={name}
                                className="w-full h-40 object-cover rounded-t-lg"
                              /> 
                               <div className="p-4"> 
                                <p className="text-center font-semibold">
                                  {screenName}
                                </p>
                              </div> 
                             </div>
                          </div>
                        </Link>
                      )}
                    </Draggable>
                  ) : (
                    <Link to={`/screen/${id}`}>
                      <div className="bg-white rounded-lg shadow-md">
                        {/* <img
                          src={thumb}
                          alt={name}
                          className="w-full h-40 object-cover rounded-t-lg"
                        /> */}
                        <div className="p-4">
                          <p className="text-center font-semibold">{screenName}</p>
                        </div>
                      </div>
                    </Link>
                  )}
                </React.Fragment>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ShowScreen;
