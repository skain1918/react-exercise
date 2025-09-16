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
      <div className="col-auto m-auto">
        
          <label htmlFor="name" className="col-form-label me-2">
            Name
          </label>
          <input
            className="col-form-control me-5"
            type="text"
            name="name"
            id="name"
            onChange={handleChange}
            value={newProgrammer.name}
            placeholder="Enter a name"
          />
        
        
          <label className="form-check-label me-3" htmlFor="senior-level">
            Senior
          </label>
          <input
            className="form-check-input me-5"
            type="radio"
            name="level"
            id="senior-level"
            value="senior"
            checked={newProgrammer.level === 'senior'}
            onChange={handleChange}
          />
        
        
          <label className="form-checklabel me-3" htmlFor="junior-level">
            Junior
          </label>
          <input
            className="form-check-input me-5"
            type="radio"
            name="level"
            id="junior-level"
            value="junior"
            checked={newProgrammer.level === 'junior'}
            onChange={handleChange}
          />
        
          <button
            className="btn btn-primary me-3"
            disabled={!valid}
            onClick={() => {
              onAdd(newProgrammer)
              resetNewProgrammer()
            }}
          >
            Add
          </button>
      </div>

  )
}

export default ProgrammerForm
