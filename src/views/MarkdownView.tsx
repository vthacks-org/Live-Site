import React from "react"
import { Container, Col } from "react-bootstrap"
import MarkdownComponent from "../components/MarkdownComponent"
import NoContentComponent from "../components/NoContentComponent"
import _ from "lodash"

// import { MarkdownContent } from "../interfaces"
import { GrayMatterFile } from "gray-matter"
import { Markdown } from "../interfaces"

type MarkdownViewProps = {
  templateKey: string
  markdown: Markdown[]
}

const MarkdownView: React.FC<MarkdownViewProps> = ({
  templateKey,
  markdown,
}) => {
  const renderMarkdown = () => {
    if (!markdown.length) {
      return <NoContentComponent name={templateKey} />
    }
    var numDisp = 0
    const items = _.map(markdown, (item, i) => {
      const { display } = item.data
      if (!display) {
        return null
      }
      numDisp++
      return (
        <div key={`markdown-content-${i}`}>
          <MarkdownComponent markdown={item} />
        </div>
      )
    })
    if (numDisp == 0) {
      return <NoContentComponent name={templateKey} />
    }
    return items
  }

  const id = `${templateKey}-view`
  return (
    <Container id={id}>
      <Col>{renderMarkdown()}</Col>
    </Container>
  )
}

export default MarkdownView

export type MarkdownPageProps = {
  data: {
    markdown: Markdown[]
  }
}
