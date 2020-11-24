import React from "react"
import { Container, Col } from "react-bootstrap"
import _ from "lodash"
import NoContentComponent from "../components/NoContentComponent"
import SubGuidelineComponent from "../components/SubGuidelineComponent"

const SubmissionsView = ({ guidelines }) => {
  //TODO: Use Netlify CMS

  const renderSubmissions = () => {
    if (!guidelines.length) {
      return <NoContentComponent name="Submission Guidlines" />
    }

    return _.map(guidelines, guideline => {
      const node = guideline.node
      return (
        <div key={node.id}>
          <SubGuidelineComponent guideline={node} />
        </div>
      )
    })
  }
  return (
    <Container id="submissions-guidelines-view">
      <Col>{renderSubmissions()}</Col>
    </Container>
  )
}
/* <div>
          <h3>DevPost</h3>
          <p>
            Submission rules can be found
            <a href="" target="_blank">
              {" "}
              here
            </a>
          </p>
        </div>
        <div>
          <h3>Rules</h3>
          <p>
            Rules have yet to be updated. Please check back another time to see
            the rules
          </p>
        </div>
        <div>
          <h3>Submission Guidelines</h3>
          <p>
            Guidelines have yet to be updated. Please check back another time to
            see the guidelines
          </p>
        </div>
        <div>
          <h3>Example Submission</h3>
          <p>
            An example submission can be found
            <a href="" target="_blank">
              {" "}
              here
            </a>
          </p>
        </div> */
export default SubmissionsView
