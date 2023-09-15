const Total = ({parts}) => {
  console.log(parts);
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);
  console.log(total);
  return (
    <>
      <p>
        <b>
          Total of {total} exercises
        </b>
      </p>
    </>
  )
};

export default Total;