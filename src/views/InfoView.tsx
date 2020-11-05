/**
 * Deprecated.
 */
import React from "react"
import "./InfoView.css"

import { Container, Col } from "react-bootstrap"

const InfoView: React.FC = () => {
  return (
    <Container id="info-view" fluid>
      <Col>
        <div>
          <h2>WiFi Networks</h2>
          <h4>eduroam</h4>
          <p>
            eduroam is a campus-wide network. Feel free to join this network if
            your school email supports it.
          </p>
          <h4>guOttawa</h4>
          <p>
            This network is in the CRX building only. It is an open connection
            with no authentication required.
          </p>
        </div>
      </Col>
    </Container>
  )
}

export default InfoView
