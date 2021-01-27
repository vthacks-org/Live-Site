import React from "react"
import NavBarComponent from "./NavBarComponent"
import { Helmet } from "react-helmet"
import "../App.css"
import "../index.css"
import FooterComponent from "./FooterComponent"
import { Modal, Button } from "react-bootstrap"

import useUserLog from "../hooks/useUserLog"

const Layout = ({ children, title = "" }) => {
  const [newcomer, setNewcomer] = useUserLog()

  const renderTutorial = () => {
    if (newcomer) {
      const tutorialData = {
        header: "Welcome to the VTHacks Live-Site!",
        body:
          "The Live-Site is the tool that will be used on the day of the event! Access the schedule, a list of workshops, resources to use, and see what prizes you can win",
        footer: ["Got it!"],
      }
      const { header, body, footer } = tutorialData

      const close = () => setNewcomer(false)
      return (
        <Modal show={newcomer} onHide={close}>
          <Modal.Header closeButton>
            <Modal.Title>{header}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{body}</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={close}>
              {footer[0]}
            </Button>
          </Modal.Footer>
        </Modal>
      )
    }
    return null
  }

  return (
    <>
      <div className="App">
        <Helmet>
          <title>VTHacks - {title}</title>
          <link rel="icon" type="image/svg+xml" href="/LogoFinal.svg"></link>
        </Helmet>
        <NavBarComponent />
        {renderTutorial()}
        <div className="app-content" id="switch">
          {children}
        </div>
        <FooterComponent />
      </div>
    </>
  )
}

export default Layout
