import React from "react";
import Header from "../Header/Header";
import Content from "../Content/Content";
import Sum from "../Sum/Sum";

const Course = ({ course }) => {
  return (
    <div>
      <Header courseName={course.name} />
      <Content course={course} />
      <Sum course={course} />
    </div>
  );
};

export default Course;
