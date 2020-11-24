import React from "react"

const PrizeComponent = ({ prize }) => {
  return <div dangerouslySetInnerHTML={{ __html: prize.html }}></div>
}

export default PrizeComponent
