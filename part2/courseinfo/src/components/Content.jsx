import Part from './Part';
import Total from './Total';

const Content = ({ course }) => {
  return (
    <>
      {course.parts.map((part) => <Part key={''.concat(course.id).concat('_').concat(part.id)} name={part.name} exercise={part.exercises} />)}
      <Total parts={course.parts} />
    </>
  )
};

export default Content;