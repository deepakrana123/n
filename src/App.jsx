// import "./App.css";
// import Header from "./components/NavBar/Header";
// import ShowScreen from "./pages/Screens/ShowScreen";
// import { Route, Routes } from "react-router-dom";
// import CreateScreens from "./pages/CreateScreens";

// function App() {
//   return (
//     <>
//       <Header />
//       <Routes>
//         <Route path="/" element={<ShowScreen />} />
//         <Route path="/screen/:screenId" element={<CreateScreens />} />
//       </Routes>
//     </>
//   );
// }

// export default App;
import React, { useCallback } from "react";
import ReactFlow, { useNodesState, useEdgesState, addEdge } from "reactflow";
import { Handle, Position } from "reactflow";
import "reactflow/dist/style.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const handleStyle = { left: 10 };
const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

const Cards = ({}) => {
  <>
    <Handle type="target" position={Position.Top} />
    <Card className="w-[300px] h-[200px] cursor-pointer">
      <CardHeader>
        <CardTitle>{"name"}</CardTitle>
        <CardDescription>Card Description</CardDescription>
        <CardContent>
          {/* <img
            src={""}
            alt={name}
            className="w-full h-40 object-cover rounded-t-lg"
          /> */}
        </CardContent>
      </CardHeader>
    </Card>
    <Handle type="source" position={Position.Bottom} id="a" />
    <Handle
      type="source"
      position={Position.Bottom}
      id="b"
      style={handleStyle}
    />
  </>;
};

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      />
    </div>
  );
}
