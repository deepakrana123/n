import React from "react";
import { useCallback, useState } from "react";
import ReactFlow, {
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
  MiniMap,
  Controls,
  Background,
} from "reactflow";
import "reactflow/dist/style.css";


// const data = [
//     {
//       templateId: "66619fe9aef3ba1cd59078b4",
//       templateName: "KYC Form",
//       screens: [
//         { id: "66619fe9aef3ba1cd59078b5", screenName: "Client Detail" },
//         { id: "66619fe9aef3ba1cd59078b6", screenName: "Family Details" },
//         { id: "66619fe9aef3ba1cd59078b7", screenName: "Address Details" },
//         { id: "66619fe9aef3ba1cd59078b8", screenName: "Bank Details" },
//         { id: "66619fe9aef3ba1cd59078b9", screenName: "Product Details" },
//         { id: "66619fe9aef3ba1cd59078ba", screenName: "Documents" },
//       ],
//     },
//     // {
//     //   templateId: "66619fe9aef3ba1cd59078b4",
//     //   templateName: "KYC ",
//     //   screens: [
//     //     { id: "66619fe9aef3ba1cd59078b5", screenName: "Client Detail" },
//     //     { id: "66619fe9aef3ba1cd59078b6", screenName: "Family Details" },
//     //     { id: "66619fe9aef3ba1cd59078b7", screenName: "Address Details" },
//     //     { id: "66619fe9aef3ba1cd59078b8", screenName: "Bank Details" },
//     //     { id: "66619fe9aef3ba1cd59078b9", screenName: "Product Details" },
//     //     { id: "66619fe9aef3ba1cd59078ba", screenName: "Documents" },
//     //   ],
//     // },
//     // {
//     //   templateId: "66619fe9aef3ba1cd59078b4",
//     //   templateName: "No Form",
//     //   screens: [
//     //     { id: "66619fe9aef3ba1cd59078b1", screenName: "Client Detail" },
//     //     { id: "66619fe9aef3ba1cd59078b3", screenName: "Family Details" },
//     //     { id: "66619fe9aef3ba1cd59078b2", screenName: "Address Details" },
//     //     { id: "66619fe9aef3ba1cd59078b0", screenName: "Bank Details" },
//     //     { id: "66619fe9aef3ba1cd59078c2", screenName: "Product Details" },
//     //     { id: "66619fe9aef3ba1cd59078cs", screenName: "Doc" },
//     //   ],
//     // },
//   ];
  
const transformDataToFlow = (data) => {
    const nodes = [];
    const edges = [];
    const rootNodeId = "no-code";
    const yOffsetIncrement = 200; // Vertical offset for each template branch
    const xOffsetIncrement = 200; // Horizontal offset for each screen node
  
    // Add the root "no-code" node
    nodes.push({
      id: rootNodeId,
      data: { label: "No Code" },
      position: { x: 0, y: 0 },
      type: "input",
    });
  
    data.forEach((template, templateIndex) => {
      const yOffset = templateIndex * yOffsetIncrement; // Offset each template tree vertically
      const templateNodeId = `template-${template.templateId}`;
  
      // Add template node
      nodes.push({
        id: templateNodeId,
        data: { label: template.templateName },
        position: { x: 200, y: yOffset },
        type: "default",
      });
  
      // Add edge from root node to template node
      edges.push({
        id: `e${rootNodeId}-${templateNodeId}`,
        source: rootNodeId,
        target: templateNodeId,
        animated: true,
      });
  
      // Add screen nodes and edges
      template.screens.forEach((screen, screenIndex) => {
        const screenNodeId = screen.id;
  
        nodes.push({
          id: screenNodeId,
          data: { label: screen.screenName },
          position: { x: 200 + (screenIndex + 1) * xOffsetIncrement, y: yOffset },
          type: "default",
        });
  
        edges.push({
          id: `e${templateNodeId}-${screenNodeId}`,
          source: templateNodeId,
          target: screenNodeId,
          animated: true,
        });
  
        // Edge to connect screens sequentially within the same template
        if (screenIndex > 0) {
          const previousScreenNodeId = template.screens[screenIndex - 1].id;
          edges.push({
            id: `e${previousScreenNodeId}-${screenNodeId}`,
            source: previousScreenNodeId,
            target: screenNodeId,
            animated: true,
          });
        }
      });
    });
  
    return { nodes, edges };
  };
  
  const data = {
    id: "root",
    data: {
      templateId: "66619fe9aef3ba1cd59078b4",
      templateName: "KYC Form",
    },
    children: [
      {
        id: "66619fe9aef3ba1cd59078b5",
        data: { label: "Client Detail" },
        position: { x: 100, y: 100 },
      },
      {
        id: "66619fe9aef3ba1cd59078b6",
        data: { label: "Family Details" },
        position: { x: 300, y: 100 },
      },
      {
        id: "66619fe9aef3ba1cd59078b7",
        data: { label: "Address Details" },
        position: { x: 100, y: 250 },
      },
      {
        id: "66619fe9aef3ba1cd59078b8",
        data: { label: "Bank Details" },
        position: { x: 300, y: 250 },
      },
      {
        id: "66619fe9aef3ba1cd59078b9",
        data: { label: "Product Details" },
        position: { x: 100, y: 400 },
      },
      {
        id: "66619fe9aef3ba1cd59078ba",
        data: { label: "Documents" },
        position: { x: 300, y: 400 },
      },
    ],
  };
  const createEdges = (nodes) => {
    const edges = [];
    for (let i = 0; i < nodes.length - 1; i++) {
      edges.push({ id: `edge-${i}`, source: nodes[i].id, target: nodes[i + 1].id });
    }
    return edges;
  };  
  
  
const bc = [
  { id: "el1-2", source: "1", target: "2" },
  { id: "el2-3", source: "2", target: "3", animated: true },
  { id: "el2-4", source: "2", target: "4", animated: true },
  { id: "el2-5", source: "2", target: "5", animated: true },
  { id: "el6-1", source: "1", target: "6", label: "Back to Input" },
];

const ReactFlows = () => {
    const { nodes: initialNodes, edges: initialEdges } = transformDataToFlow(data);
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodeChange = useCallback(
    (x) => setNodes((newNode) => applyNodeChanges(x, newNode)),
    [setNodes]
  );

  const onEdgeChange = useCallback(
    (x) => setEdges((eds) => applyEdgeChanges(x, eds)),
    [setEdges]
  );

  const onEdgeConnect = useCallback(
    (x) => setEdges((eds) => addEdge({ ...x, animated: true }, eds)),
    [setEdges]
  );
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodeChange}
        onEdgesChange={onEdgeChange}
        onConnect={onEdgeConnect}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default ReactFlows;
