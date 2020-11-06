import React from "react"
import { Container, Row, Col } from "react-bootstrap"

const ResourceView = () => {
  // TODO: Convert to using netlify CMS rather than hard coding
  return (
    <Container id="resource-view">
      <Col>
        <div>
          <h3>Discord</h3>
          <p>
            We will be using{" "}
            <a href="https://discord.com/" target="_blank">
              Discord
            </a>{" "}
            to communicate with hackers, sponsors, and judges. If you are
            unfamiliar with Discord, please check out the{" "}
            <a href="" target="_blank">
              How to use Discord{" "}
            </a>{" "}
            Document
          </p>
        </div>

        <div>
          <h3>MLH</h3>
          <ul>
            <li>
              <strong>Domain.com</strong>: register a free <code>.tech</code>,{" "}
              <code>.online</code>, or <code>.space</code> domain through
              Domain.com using the code <code>SPOOKYSCARY</code> at checkout
            </li>
            <li>
              <strong>Google Cloud</strong>: redeem up to $100 dollars in credit
              using either the form you received via email, or the form at{" "}
              <a href="https://hackp.ac/GoogleCloudCredits" rel="nofollow">
                https://hackp.ac/GoogleCloudCredits
              </a>
              . DM me to redeem more credits if you need 👍
            </li>
            <li>
              <strong>Hardware Hack</strong>: Feel free to use any hardware you
              may have on hand, or an emulator such as{" "}
              <a href="https://echosim.io/welcome" rel="nofollow">
                https://echosim.io/welcome
              </a>{" "}
              (for Amazon Alexa simulation), or{" "}
              <a
                href="https://developers.google.com/assistant/conversational/overview"
                rel="nofollow"
              >
                https://developers.google.com/assistant/conversational/overview
              </a>{" "}
              (for Google hardware simulation), or anything else that fits your
              use case!
            </li>
            <li>
              <strong>CoackroachDB</strong>: Head over to{" "}
              <a href="https://hackp.ac/CockroachDB" rel="nofollow">
                https://hackp.ac/CockroachDB
              </a>{" "}
              and use code <code>CRDB30</code> to get started!
            </li>
            <li>
              <strong>Github Student Developer Pack</strong>: Get GitHub Pro
              status along with tons of credits and tutorials on how to use em
              over at{" "}
              <a href="https://hackp.ac/learn" rel="nofollow">
                https://hackp.ac/learn
              </a>
            </li>
          </ul>
        </div>
      </Col>
    </Container>
  )
}

export default ResourceView
