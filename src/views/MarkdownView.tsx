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

    return _.map(list, item => {
      const { node } = item
      return (
        <div key={node.id}>
          <MarkdownComponent node={node} />
        </div>
      )
    })
  }

  const id = `${templateKey}-view`
  return (
    <Container id={id}>
      <Col>{renderMarkdown()}</Col>
    </Container>
  )
}

export default MarkdownView
