import React from "react"

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import "./FooterComponent.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"

library.add(fab)

const FooterComponent = () => {
  return (
    <footer>
      <hr />
      <Container id="info-view" fluid>
        <Row className="links">
          <Col>
            <a
              href="https://discord.gg/b5pveB"
              target="_blank"
              className="icon"
            >
              <FontAwesomeIcon
                icon={["fab", "discord"]}
                className="icon"
              ></FontAwesomeIcon>
            </a>

            <a href="https://twitter.com/VT_Hacks/" target="_blank">
              <FontAwesomeIcon icon={["fab", "twitter"]} className="icon" />
            </a>
            <a href="https://www.facebook.com/vthacks/" target="_blank">
              <FontAwesomeIcon icon={["fab", "facebook"]} className="icon" />
            </a>
            <a href="https://www.instagram.com/vthacks/" target="_blank">
              <FontAwesomeIcon icon={["fab", "instagram"]} className="icon" />
            </a>
            <a href="mailto:hacker@vthacks.com" target="_blank">
              <FontAwesomeIcon icon={faEnvelope} className="icon" />
            </a>
          </Col>
        </Row>
        <Row></Row>
      </Container>
    </footer>
  )
}

export default FooterComponent
