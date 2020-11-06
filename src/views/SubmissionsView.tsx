import React from "react"
import { Container, Col } from "react-bootstrap"

const SubmissionsView = () => {
  //TODO: Use Netlify CMS
  return (
    <Container id="submissions-guidelines-view">
      <Col>
        <div>
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
        </div>
      </Col>
    </Container>
  )
}

export default SubmissionsView
