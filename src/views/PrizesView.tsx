import React from "react"
import { Container, Col } from "react-bootstrap"
import PrizeComponent from "../components/PrizeComponent"
import NoContentComponent from "../components/NoContentComponent"
import _ from "lodash"

const PrizesView = ({ prizes }) => {
  const renderPrizes = () => {
    if (!prizes.length) {
      return <NoContentComponent name="Prizes" />
    }

    return _.map(prizes, prize => {
      const node = prize.node
      return (
        <div key={node.id}>
          <PrizeComponent prize={node} />
        </div>
      )
    })
  }

  return (
    <Container id="prizes-view">
      <Col>{renderPrizes()}</Col>
    </Container>
  )
}

export default PrizesView

/* <div>
          <h3>DevPost</h3>
          <p>
            A list of prizes can be found
            <a href="" target="_blank">
              {" "}
              here
            </a>
          </p>
        </div>
        <div>
          <h3>MLH Prizes</h3>
          <ul>
            <li>
              <strong>Best Domain Name</strong>: funniest/most clever domain
              registered through Domain.com - Domain.com backpacks
            </li>
            <li>
              <strong>Best use of Google Cloud</strong>: Google Home Minis
            </li>
            <li>
              <strong>Best Hardware Hack Sponsored by Digi-Key</strong>: Grove
              Beginner Kit, with Arduino Uno R3
            </li>
            <li>
              <strong>Best use of CockroachDB</strong>: Branded 3D Printing Pen
              (IN ORDER TO BE ELIGIBLE FOR THIS PRIZE/THE T-SHIRT, YOU MUST
              INCLUDE A PICTURE OF YOUR ADMIN DASHBOARD IN YOUR DEVPOST
              SUBMISSION)
            </li>
            <li>
              <strong>GitHub Draw an Octocat Win an Octocat</strong>: Tweet your
              own Octocat to{" "}
              <a
                className="user-mention"
                data-hovercard-type="user"
                data-hovercard-url="/users/githubeducation/hovercard"
                data-octo-click="hovercard-link-click"
                data-octo-dimensions="link_type:self"
                href="https://github.com/githubeducation"
              >
                @githubeducation
              </a>
              ,{" "}
              <a
                className="user-mention"
                data-hovercard-type="user"
                data-hovercard-url="/users/mlhacks/hovercard"
                data-octo-click="hovercard-link-click"
                data-octo-dimensions="link_type:self"
                href="https://github.com/mlhacks"
              >
                @mlhacks
              </a>{" "}
              with the hashtags #MyOctocat, #demonhacks
            </li>
            <li>
              <strong>USAF CTF Challenge</strong>: US-based participants of this
              mini event who complete all the challenges will be entered to win
              some cool prizes. The event will take place at 11 AM CDT, on
              Saturday, link TBA in #mlh-ctf-challenge
            </li>
          </ul>
        </div> */
