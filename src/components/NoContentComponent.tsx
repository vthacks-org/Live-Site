import React from "react"

interface Props {
  name: string
}

const NoContentComponent = ({ name }: Props) => {
  const formattedName = name.replace("_", " ")

  return (
    <div>
      <h2>No {formattedName} to be found here! </h2>
      <p>
        Unfortunately we have no {formattedName.toLowerCase()} to populate this
        area at the moment. Please look again later!
      </p>
    </div>
  )
}

export default NoContentComponent
