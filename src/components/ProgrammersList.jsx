import React from 'react'

function ProgramersList({data, onDelete}) {
  return (
    <div>
      {data.map((item) => {
        return (
          <div key={item.id}>
                  <table className="table table-dark table-striped">
                    <tr><td>
                    <span> {item.name} - {item.level}</span>
                    <button
                      className="btn btn-danger ms-5"
                      onClick={() => onDelete(item.id)}
                    >
                      X
                    </button></td></tr>
                  </table>
          </div>
        )
      })}
    </div>
  )
}

export default ProgramersList
