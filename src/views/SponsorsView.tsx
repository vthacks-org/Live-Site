import React from "react"
import { Container, Col } from "react-bootstrap"
import SponsorComponent from "../components/SponsorComponent"
import NoContentComponent from "../components/NoContentComponent"
import _ from "lodash"

const SponsorsView = ({ sponsors }) => {
  // TODO: Convert to using netlify CMS rather than hard coding

  const renderSponsors = () => {
    if (!sponsors.length) {
      return <NoContentComponent name="Sponsors" />
    }

    return _.map(sponsors, sponsor => {
      const node = sponsor.node
      return (
        <div key={node.id}>
          <SponsorComponent sponsor={node} />
        </div>
      )
    })
  }

  return (
    <Container id="judges-view">
      <Col>{renderSponsors()}</Col>
    </Container>
  )
}

export default SponsorsView
