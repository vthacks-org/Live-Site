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
            <span className="discord">
              <a href="https://discord.gg/5TAJxqtApf" target="_blank">
                <FontAwesomeIcon
                  icon={["fab", "discord"]}
                  className="icon"
                ></FontAwesomeIcon>
              </a>
            </span>
            <span className="twitter">
              <a href="https://twitter.com/VT_Hacks/" target="_blank">
                <FontAwesomeIcon icon={["fab", "twitter"]} className="icon" />
              </a>
            </span>
            <span className="facebook">
              <a href="https://www.facebook.com/vthacks/" target="_blank">
                <FontAwesomeIcon icon={["fab", "facebook"]} className="icon" />
              </a>
            </span>
            <span className="instagram">
              <a href="https://www.instagram.com/vthacks/" target="_blank">
                <FontAwesomeIcon icon={["fab", "instagram"]} className="icon" />
              </a>
            </span>
            <span className="youtube">
              <a
                href="https://www.youtube.com/channel/UCepvJUogPymOsjKma24SMgg"
                target="_blank"
              >
                <FontAwesomeIcon icon={["fab", "youtube"]} className="icon" />
              </a>
            </span>
            <span className="mail">
              <a href="mailto:hacker@vthacks.com" target="_blank">
                <FontAwesomeIcon icon={faEnvelope} className="icon" />
              </a>
            </span>
            <span className="devpost">
              <a
                className="devPostLink"
                href="https://vthacks-x.devpost.com/"
                target="_blank"
              >
                <svg
                  version="1.1"
                  id="Layer_1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 280.3 242"
                  enableBackground="new 0 0 280.3 242"
                  color="red"
                >
                  <g id="XMLID_1_">
                    <path
                      id="XMLID_6_"
                      d="M133.7,76H118v90h14.7c30.9,0,45.1-18.1,45.1-45C177.8,90.9,164.9,76,133.7,76z"
                    />
                    <path
                      id="XMLID_9_"
                      d="M210.2,0H70.1L0,121l70.1,121h140.1l70.1-121L210.2,0z M132.7,195H89V47h45.8c42.1,0,73.3,20.1,73.3,74
		C208.1,172.8,170.6,195,132.7,195z"
                    />
                  </g>
                </svg>
              </a>
            </span>
          </Col>
        </Row>
        <Row></Row>
      </Container>
    </footer>
  )
}

export default FooterComponent
