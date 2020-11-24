import React from "react"

const SubGuidelineComponent = ({ guideline }) => {
  return <div dangerouslySetInnerHTML={{ __html: guideline.html }}></div>
}

export default SubGuidelineComponent
