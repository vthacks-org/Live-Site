import React from "react"
import { Container, Col } from "react-bootstrap"
import MarkdownComponent from "../components/MarkdownComponent"
import NoContentComponent from "../components/NoContentComponent"
import _ from "lodash"

import { MarkdownContent } from "../interfaces"

type Props = {
  templateKey: string
  list: [MarkdownContent]
}

const MarkdownView = ({ templateKey, list }: Props) => {
  const renderMarkdown = () => {
    if (!list.length) {
      return <NoContentComponent name={templateKey} />
    }
    var numDisp = 0
    const items = _.map(list, item => {
      const { node } = item

      if (!node.frontmatter.display) {
        return null
      }
      numDisp++
      return (
        <div key={node.id}>
          <MarkdownComponent node={node} />
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
