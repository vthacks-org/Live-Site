import React from "react"

const PrizeComponent = ({ sponsor }) => {
  return <div dangerouslySetInnerHTML={{ __html: sponsor.html }}></div>
}

export default PrizeComponent
