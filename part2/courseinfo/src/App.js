import Course from "./components/Course"

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  // const Course = ({ course }) => {
  //   return (
  //     <div>
  //       <Header course={course} />
  //       <Content course={course} />
  //       <Total course={course} />
  //     </div>
  //   )
  // }

  // const Header = ({ course }) => <h1>{course.name}</h1>

  // const Content = ({ course }) => {
  //   return (
  //     <div>
  //       {course.parts.map(part => <Part part={part} key={part.id} />)}
  //     </div>
  //   )
  // }

  // const Total = ({ course }) => {
  //   const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0)
  //   return <strong>total of {totalExercises} exercises</strong>
  // }

  // const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

  return (
    <div>
      {courses.map(course => <Course course={course} key={course.id} />)}
    </div>
  )
}

export default App