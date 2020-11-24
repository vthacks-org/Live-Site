import React from "react"

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import "./FooterComponent.css"

const FooterComponent = () => {
  return (
    <footer>
      <hr />
      <Container id="info-view" fluid>
        <Row className="links">
          <Col>
            <a href="https://discord.gg/b5pveB" target="_blank">
              <img
                className="discord"
                src={require("../assets/brand-logos/Discord-Logo-Color.svg")}
                alt="Discord Server Link"
              />
            </a>
            <a href="https://twitter.com/VT_Hacks/" target="_blank">
              <img
                src={require("../assets/brand-logos/Twitter_Social_Icon_Rounded_Square_Color.svg")}
                alt="Twitter Page Link"
              />
            </a>
            <a href="https://www.facebook.com/vthacks/" target="_blank">
              <img
                className="facebook"
                src={require("../assets/brand-logos/f_logo_RGB-Blue_512.png")}
                alt="Facebook Page Link"
              />
            </a>
            <a href="https://www.instagram.com/vthacks/" target="_blank">
              <img
                className="instagram"
                src="re.com"
                alt="Instagram Page Link"
              />
            </a>
          </Col>
        </Row>
        <Row></Row>
      </Container>
    </footer>
  )
}

export default FooterComponent
