
const Course = ({ course }) => {
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
    )
}

const Header = ({ course }) => <h1>{course.name}</h1>

const Content = ({ course }) => {
    return (
        <div>
            {course.parts.map(part => <Part part={part} key={part.id} />)}
        </div>
    )
}

const Total = ({ course }) => {
    const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0)
    return <strong>total of {totalExercises} exercises</strong>
}

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

export default Course