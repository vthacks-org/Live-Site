import React from "react"

const JudgeComponent = ({ judge }) => {
  return <div dangerouslySetInnerHTML={{ __html: judge.html }}></div>
}

export default JudgeComponent
