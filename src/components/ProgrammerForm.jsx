import React from 'react'
import { useState } from 'react'

function ProgrammerForm({ data, onAdd }) {
  const [newProgrammer, setNewProgrammer] = useState({
    id: data.length > 0 ? Math.max(...data.map((prog) => prog.id)) + 1 : 1,
    name: '',
    level: 'junior',
  })

  //handler for radio buttons
  const handleLevel = (e) => {
    setLevel(e.target.value)
  }
  //validation data
  const [valid, setValid] = useState(false)
  const validateData = (programmer) => {
    if (!(programmer.name.trim() === '' || programmer.level.trim() === '')) {
      setValid(true)
    } else {
      setValid(false)
    }
  }
  //reset new programmer form
  const resetNewProgrammer = () => {
    setNewProgrammer({
      id: newProgrammer.id + 1,
      name: '',
      level: '',
    })
  }
  //Add new programmer handler
  const handleChange = (e) => {
    let source = e.target.name
    let value = e.target.value
    let updatedProgrammer
    switch (source) {
      case 'name':
        updatedProgrammer = { ...newProgrammer, name: value }
        break
      case 'level':
        updatedProgrammer = { ...newProgrammer, level: value }
        break
      default:
        break
    }
    setNewProgrammer(updatedProgrammer)
    validateData(updatedProgrammer)
  }
  return (
    <div className="row g-3">
      <div className="col-auto">
        <label htmlFor="name" className="col-form-label me-2">
          Name
        </label>
        <input
          className="col-form-control"
          type="text"
          name="name"
          id="name"
          onChange={handleChange}
          value={newProgrammer.name}
          placeholder="Enter a name"
        />
      </div>
      <div className="col-auto">
        <label className="form-check-label me-3" htmlFor="senior-level">
          Senior
        </label>
        <input
          className="form-check-input"
          type="radio"
          name="level"
          id="senior-level"
          value="senior"
          checked={newProgrammer.level === 'senior'}
          onChange={handleChange}
        />
      </div>
      <div className="col-auto">
        <label className="form-checklabel me-3" htmlFor="junior-level">
          Junior
        </label>
        <input
          className="form-check-input"
          type="radio"
          name="level"
          id="junior-level"
          value="junior"
          checked={newProgrammer.level === 'junior'}
          onChange={handleChange}
        />
      </div>
      <div className="col-auto">
        <button
          className="btn btn-primary"
          disabled={!valid}
          onClick={() => {
            onAdd(newProgrammer)
            resetNewProgrammer()
          }}
        >
          Add
        </button>
      </div>
    </div>
  )
}

export default ProgrammerForm
