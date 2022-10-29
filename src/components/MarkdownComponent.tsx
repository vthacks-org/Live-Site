import "./MarkdownComponent.css"
import React from "react"
import { MarkdownContent } from "../interfaces"

const MarkdownComponent = ({ node }: MarkdownContent) => {
  const renderTitle = () => {
    if (node.frontmatter.shouldDisplayTitle) {
      return <h1 className="markdown-title">{node.frontmatter.title}</h1>
    }
    return null
  }
  return (
    <div>
      {renderTitle()}
      <div className="markdown-content">
        <div dangerouslySetInnerHTML={{ __html: node.html }}></div>
      </div>
    </div>
  )
}

export default MarkdownComponent
