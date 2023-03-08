const Sum = ({ course }) => {
  return (
    <p style={{ fontWeight: "bold" }}>
      total of{" "}
      {course.parts.reduce(
        (accumulator, currentValue) => accumulator + currentValue.exercises,
        0
      )}{" "}
      exercises
    </p>
  );
};

export default Sum;
