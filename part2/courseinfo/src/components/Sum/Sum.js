const Sum = ({ course }) => {
  const total = course.parts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises,
    0
  );
  return <p style={{ fontWeight: "bold" }}>total of {total} exercises</p>;
};

export default Sum;
