import React from "react"
import Layout from "../components/layout"
import { Container, Col } from "react-bootstrap"

const NotFoundPage = () => {
  return (
    <Layout>
      <Container>
        <Col>
          <h1>404: Not Found</h1>
          <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
        </Col>
      </Container>
    </Layout>
  )
}

export default NotFoundPage
