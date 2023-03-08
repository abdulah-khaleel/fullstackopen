const Content = (props) => {
  const parts = props.parts.map((part) => {
    return (
      <p key={Math.random()}>
        {part.name}: {part.exercises}
      </p>
    );
  });
  return <div>{parts}</div>;
};

const Header = (props) => {
  return <h1>{props.course.name}</h1>;
};

const Total = (props) => {
  const partsTotal = props.parts.reduce(
    (acc, currentVal) => acc + currentVal.exercises,
    0
  );
  return <p>Number of exercises: {partsTotal} </p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
