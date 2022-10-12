const Part = ({name, exercises}) => {
  return (
    <p>
      {name} {exercises}
    </p>
  )
}

const Total = ({parts}) => {
  const exercisesTotal = parts.reduce(
    (sum, currentPart) => (sum += currentPart.exercises),
    0,
  )
  return <b>total of {exercisesTotal} exercises</b>
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(p => (
        <Part key={p.id} name={p.name} exercises={p.exercises} />
      ))}
    </div>
  )
}

const Header = ({title}) => {
  return <h2>{title}</h2>
}

const Course = ({course}) => {
  return (
    <div>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course
