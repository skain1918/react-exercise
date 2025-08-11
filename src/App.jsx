import { useState } from 'react'
import rawData from '../programmersData.json'
import ProgrammersList from './components/ProgrammersList'
import ProgrammersForm from './components/ProgrammerForm'

function App() {
  const [listOfProgrammers, setListOfProgrammers] = useState(
    rawData.programmers
  )

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
  return (
    <div className="container-fluid bg-dark text-light">
      <div className="row">
        <div className="col-12 text-center">
          <h1>React - cvičení 11.8.2025</h1>
        </div>
      </div>{' '}
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
    </div>
  )
}

export default App
