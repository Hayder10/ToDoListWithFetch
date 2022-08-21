import React from 'react'

function Task({ text }) {
  return (
    <div className="taskbox">
        <div className="task">{text}</div>
        <button>X</button>
    </div>
  )
}

export default Task