import React from "react"

const ResourceComponent = ({ resource }) => {
  return <div dangerouslySetInnerHTML={{ __html: resource.html }}></div>
}

export default ResourceComponent
