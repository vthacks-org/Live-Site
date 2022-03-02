import styles from "./MarkdownComponent.module.css"
import React from "react"
import { Markdown } from "../interfaces"
import ReactMarkdown from "react-markdown"

type MarkdownComponentProps = {
  markdown: Markdown
}

const MarkdownComponent: React.FC<MarkdownComponentProps> = ({ markdown }) => {
  const renderTitle = () => {
    if (markdown.data.shouldDisplayTitle) {
      return <h1 className={styles["markdown-title"]}>{markdown.data.title}</h1>
    }
    return null
  }
  return (
    <div>
      {renderTitle()}
      {/* <div className={styles["markdown-content"]}>
        <div dangerouslySetInnerHTML={{ __html: node.html }}></div>
      </div> */}
      <ReactMarkdown
        source={markdown.content}
        className={styles["react-markdown"]}
      />
    </div>
  )
}

export default MarkdownComponent
