import React from "react"
import { Container, Col } from "react-bootstrap"
import JudgeComponent from "../components/JudgeComponent"
import NoContentComponent from "../components/NoContentComponent"
import _ from "lodash"

const JudgesView = ({ judges }) => {
  const renderJudges = () => {
    if (!judges.length) {
      return <NoContentComponent name="Judges" />
    }

    return _.map(judges, judge => {
      const node = judge.node
      return (
        <div key={node.id}>
          <JudgeComponent judge={node} />
        </div>
      )
    })
  }

  return (
    <Container id="judges-view">
      <Col>{renderJudges()}</Col>
    </Container>
  )
}

export default JudgesView
