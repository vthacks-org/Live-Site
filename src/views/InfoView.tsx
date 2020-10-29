import React from "react"
import "./InfoView.css"

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

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
          <h2>Free stuff!</h2>
          <p>Hackers will get:</p>
          <ul className="free-stuff">
            <li>
              <b>Voiceflow</b>
              <p>
                Free year of business plan license for every hacker (valued at
                $99/month)
              </p>
              <a href="https://www.voiceflow.com/hackathon/uottahack">
                Register Here!
              </a>
            </li>
            <li>
              <b>DigitalOcean</b>
              <p>
                $50, 30-day free trial for all attendees using this link:{" "}
                <a href="https://do.co/studenthackathon">
                  do.co/studenthackathon
                </a>
              </p>
            </li>
            <li>
              <b>Balsamiq</b>
              <p>
                Promo Code:&nbsp;
                <code>BQCVZWFUV020620</code>
              </p>
              <p>
                <span>
                  Product: <a href="https://balsamiq.cloud/">Balsamiq Cloud</a>
                </span>
              </p>
              <p>Code Expiration: June 01, 2020</p>
              <p>
                <a href="https://support.balsamiq.com/sales/cloudpromo/">
                  Instructions for promo code redemption
                </a>
              </p>
            </li>
          </ul>
        </div>
      </Col>
    </Container>
  )
}

export default InfoView
