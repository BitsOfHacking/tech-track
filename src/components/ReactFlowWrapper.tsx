import React, { useState, useEffect, useCallback } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";
import Semester from "./Semester";
import { courses } from "@/pages";
import Course from "./Course";

const initBgColor = "#1A192B";

function TestTest() {
  return <div className="p-4 bg-red-300">hello</div>;
}

const connectionLineStyle = { stroke: "#000" };
const nodeTypes = {
  semesterNode: Semester,
  courseNode: Course
};

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

export default function ReactFlowWrapper() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [bgColor, setBgColor] = useState(initBgColor);

  useEffect(() => {
    const onChange = (event: any) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id !== "2") {
            return node;
          }

          const color = event.target.value;

          setBgColor(color);

          return {
            ...node,
            data: {
              ...node.data,
              color,
            },
          };
        })
      );
    };

    const semesters = [
      "Transfer",
      "Fall 2024",
      "Spring 2025",
      "Summer 2025",
      "Fall 2025",
      "Spring 2026",
      "Summer 2027",
    ];

    const semesterNodes = semesters.map((semester, index) => {
      return {
        id: semester,
        type: "semesterNode",
        draggable: false,
        data: { courses: courses, title: semester },
        position: { x: index * 200, y: 0 },
      };
    });

    const courseNodes = courses.map((course, index) => {
      return {
        id: index + "",
        type: 'courseNode',
        draggable: true,
        
        data: { category: courses[0] },
        position: { x: index * 200, y: 400 }
      }
    })

    setNodes([...semesterNodes, ...courseNodes]);

    setEdges([
      
    ]);
  }, []);

  const onConnect = useCallback(
    (params: any) =>
      setEdges((eds) =>
        addEdge({ ...params, animated: true, style: { stroke: "#000" } }, eds)
      ),
    []
  );
  return (
    <ReactFlow
      // maxZoom={0.8}
      // minZoom={0.8}
      panOnDrag={false}
      zoomOnScroll={false}
      zoomOnDoubleClick={false}
      zoomOnPinch={false}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      // style={{ background: bgColor }}
      nodeTypes={nodeTypes}
      connectionLineStyle={connectionLineStyle}
      snapToGrid={true}
      snapGrid={[200, 100]}
      defaultViewport={defaultViewport}
      fitView
      attributionPosition="bottom-left"
    ></ReactFlow>
  );
}
