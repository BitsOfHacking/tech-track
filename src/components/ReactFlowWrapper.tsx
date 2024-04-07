import React, { useState, useEffect, useCallback } from "react";
import ReactFlow, { useNodesState, useEdgesState, addEdge } from "reactflow";
import "reactflow/dist/style.css";
import Semester from "./Semester";
// import { courses } from "@/pages";
import Course from "./Course";
import { category } from "@/types/courseTypes";

const initBgColor = "#1A192B";

const connectionLineStyle = { stroke: "#000" };
const nodeTypes = {
  semesterNode: Semester,
  courseNode: Course,
};

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

interface Props {
  courses: category[];
}

export default function ReactFlowWrapper({ courses }: Props) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    const semesters = [
      "Transfer",
      "Fall 2024",
      "Spring 2025",
      "Summer 2025",
      "Fall 2025",
      "Spring 2026",
      "Summer 2027",
    ];



    setEdges([]);

    fetch("https://gt-scheduler.github.io/crawler/202008.json")
      .then((res: any) => res.json())
      .then((data: any) => {
        data = data.courses;

        const searchData = Object.entries(data).map(([k, v]) => {
          return {
            key: k,
            value: k,
          };
        });

        let courseNodes: any[];
        const creditsPerSemester: { [ key: number ]: number } = { 0: 0 };
 
        if (courses) {
          courseNodes = courses.map((course, index) => {
            if (creditsPerSemester[course.semesterIndex]) {
              creditsPerSemester[course.semesterIndex] += course.courses[course.selectedCourse].credits;
            } else {
              creditsPerSemester[course.semesterIndex] = course.courses[course.selectedCourse].credits;
            }

            return {
              id: index + "",
              type: "courseNode",
              draggable: true,
              data: { searchData: searchData, category: course },
              position: {
                x: course.semesterIndex * 200,
                y: course.semesterIndex != 0 ? ((index % 5) * 100) + 100 : (index * 75) + 75
              },
            };
          });
        } else {
          courseNodes = [];
        }

        const semesterNodes = semesters.map((semester, index) => {
          return {
            id: semester,
            type: "semesterNode",
            draggable: false,
            data: { courses: courses, title: semester, credits: creditsPerSemester[index] },
            position: { x: index * 200, y: 0 },
          };
        });

        setNodes([...semesterNodes, ...courseNodes]);

        setEdges([]);
    })
  }, [ courses ]);

  const onConnect = useCallback(
    (params: any) =>
      setEdges((eds) =>
        addEdge({ ...params, animated: true, style: { stroke: "#000" } }, eds)
      ),
    []
  );

  // console.log(searchData);
  return (
    <ReactFlow
      panOnDrag={false}
      zoomOnScroll={false}
      zoomOnDoubleClick={false}
      zoomOnPinch={false}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
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
