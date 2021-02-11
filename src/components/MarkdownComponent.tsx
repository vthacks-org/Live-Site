import "./MarkdownComponent.css"
import React from "react"
import { MarkdownContent } from "../interfaces"

const MarkdownComponent = ({ node }: MarkdownContent) => {
  const renderTitle = () => {
    if (node.frontmatter.shouldDisplayTitle) {
      return <h1>{node.frontmatter.title}</h1>
    }
    return null
  }
  return (
    <div className="markdown-content">
      {renderTitle()}
      <div dangerouslySetInnerHTML={{ __html: node.html }}></div>
    </div>
  )
}

export default MarkdownComponent
