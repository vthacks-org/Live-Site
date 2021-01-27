import React from "react"

interface Props {
  name: string
}

const NoContentComponent = ({ name }: Props) => {
  const formattedName = name.replace("_", " ")

  return (
    <div>
      <h2>No {formattedName} to be found here! </h2>
      <p>More info will be posted closer to the date of the event!</p>
    </div>
  )
}

export default NoContentComponent
