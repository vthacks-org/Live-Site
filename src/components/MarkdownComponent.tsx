import "./MarkdownComponent.css"
import React from "react"
import { MarkdownContent } from "../interfaces"

const MarkdownComponent = ({ node }: MarkdownContent) => {
  const renderTitle = () => {
    if (node.frontmatter.shouldDisplayTitle) {
      return <h2>{node.frontmatter.title}</h2>
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
