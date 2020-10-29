import React from "react"
import "./ContactView.css"
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"

import DiscordComponent from "../components/DiscordComponent"
import TwitterComponent from "../components/TwitterComponent"
import FacebookComponent from "../components/FacebookComponent"

const ContactView: React.FC = () => {
  return (
    <Container id="contact-view" fluid>
      <Col>
        <h2>Contact</h2>
        <h4>Peter Murphy</h4>
        <p>(xxx) - xxx - xxxx</p>
        <h4>Patrick Riley</h4>
        <p>(xxx) - xxx - xxxx</p>
      </Col>
      <DiscordComponent />
      <TwitterComponent account="VT_Hacks" limit={1} />
      <div className="facebook">
        <FacebookComponent />
      </div>
    </Container>
  )
}

export default ContactView
