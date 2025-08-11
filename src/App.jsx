import { useEffect, useState } from 'react'
import rawData from '../programmersData.json'
import ProgrammersList from './components/ProgrammersList'
import ProgrammersForm from './components/ProgrammerForm'

function App() {
  const [listOfProgrammers, setListOfProgrammers] = useState(
    rawData.programmers
  )
  const [activeTab, setActiveTab] = useState(1)
  const [taskLines, setTaskLines] = useState('')
  const [taskDays, setTaskDays] = useState('')
  const [activeButton, setActiveButton] = useState(false)

  //handler for adding new programmer
  const handleAdd = (programmerToAdd) => {
    const programmersToUpdate = [...listOfProgrammers]
    programmersToUpdate.push(programmerToAdd)
    setListOfProgrammers(programmersToUpdate)
  }

  const handleDelete = (idToDelete) => {
    const temp = listOfProgrammers.filter(
      (programmer) => programmer.id !== idToDelete
    )
    setListOfProgrammers(temp)
  }

  //handler for task planning
  const handleTask = (e) => {
    const source = e.target.name
    const value = e.target.value
    switch (source) {
      case 'linesOfCode':
        if (value !== '') {
          setTaskLines(parseInt(value))
          return
        }
        break
      case 'timeLimit':
        if (value !== '') {
          setTaskDays(parseInt(value))
          return
        }
        break
      default:
        break
    }
  }
  useEffect(() => {
    if (taskLines !== '' && taskDays !== '') {
      //number of senior programmers
      const seniorCount = listOfProgrammers.filter(
        (programmer) => programmer.level === 'senior'
      ).length
      //number of junior programmers
      const juniorCount = listOfProgrammers.filter(
        (programmer) => programmer.level === 'junior'
      ).length
      //number of lines of code per day
      const linesPerDay = seniorCount * 200 + juniorCount * 100
      const lines = parseInt(taskLines)
      const days = parseInt(taskDays)
      if (lines > 0 && days > 0) {
        if (lines / days <= linesPerDay) {
          setActiveButton(lines / days <= linesPerDay)
        } else {
          console.log(taskLines, taskDays, linesPerDay)
          setActiveButton(false)
        }
      } else if (taskLines === 0 || taskDays === 0) {
        setActiveButton(false)
      }
    }
  }, [taskLines, taskDays, listOfProgrammers])
  const handleButtonClick = () => {
    if (activeButton) {
      window.alert(`You can do it!`)
    }
  }
  return (
    <div className="container-fluid bg-dark text-light">
      <div className="row mb-3">
        <div className="col-12 text-center">
          <h1 className="text-info">React - cvičení 11.8.2025</h1>
          <h2 className="text-secondary">Toggle view</h2>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-6 text-center">
          <button
            className={
              activeTab === 1 ? 'btn btn-success' : 'btn btn-outline-warning'
            }
            name="list-of-programmers"
            onClick={() => {
              setActiveTab(1)
            }}
          >
            List of programmers
          </button>
        </div>
        <div className="col-6 text-center">
          <button
            className={
              activeTab === 2 ? 'btn btn-success' : 'btn btn-outline-warning'
            }
            name="form-for-planning"
            onClick={() => {
              setActiveTab(2)
            }}
          >
            Form for planning tasks
          </button>
        </div>
      </div>
      {activeTab === 1 && (
        <>
          <div className="container text-center">
            <ProgrammersList
              data={listOfProgrammers}
              onDelete={handleDelete}
            ></ProgrammersList>
            <ProgrammersForm
              data={listOfProgrammers}
              onAdd={handleAdd}
            ></ProgrammersForm>
          </div>
        </>
      )}
      {activeTab === 2 && (
        <div className="container text-center">
          <h3 className="text-primary">Your task</h3>
          <p>Here you can plan tasks for programmers.</p>
          <label htmlFor="linesOfCode" className="col-form-label me-2">
            lines of code
          </label>
          <input
            className="col-form-control me-2"
            type="number"
            name="linesOfCode"
            id="linesOfCode"
            min="0"
            placeholder="lines"
            value={taskLines}
            onChange={handleTask}
          />
          <label htmlFor="timeLimit" className="col-form-label me-2">
            time-limit [days]
          </label>
          <input
            className="col-form-control me-2"
            type="number"
            name="timeLimit"
            id="timeLimit"
            min="0"
            placeholder="days"
            value={taskDays}
            onChange={handleTask}
          />
          <button
            className={activeButton ? 'btn btn-success' : 'btn btn-danger'}
            onClick={handleButtonClick}
            disabled={!activeButton}
          >
            {activeButton ? 'Do it!' : 'Impossible '}
          </button>
        </div>
      )}
    </div>
  )
}

export default App
