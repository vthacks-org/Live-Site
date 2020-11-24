import React from "react"

const NoContentComponent = ({ name }) => {
  return (
    <div>
      <h2>No {name} to be found here! </h2>
      <p>
        Unfortunately we have no {name.toLowerCase()} to populate this area at
        the moment. Please look again later!
      </p>
    </div>
  )
}

export default NoContentComponent
