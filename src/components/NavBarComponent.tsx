import React, { useEffect, useState } from "react"
import "./NavBarComponent.css"
import "../App.css"
import "../index.css"

import { RoutePath, EventListener } from "../enums"
import {
  MOBILE_BREAKPOINT_WIDTH,
  ONE_SECOND_MILLISECOND,
  ROUTES_WITH_TITLES,
  DEVPOST_SUBMISSION_OPEN,
} from "../constants"

import { Link } from "gatsby"
import config from "../config.json"

import { Navbar, Nav, Button } from "react-bootstrap"
import { url } from "inspector"

const NavBarComponent = () => {
  const [expanded, setExpanded] = useState(false)
  const [mobile, setMobile] = useState(true)
  const [, setDummy] = useState()

  const toggle = () => {
    setExpanded(!expanded)
  }

  const collapse = () => {
    setExpanded(false)
  }

  const updateDimensions = () => {
    const isMobile = window.innerWidth < MOBILE_BREAKPOINT_WIDTH
    if (mobile !== isMobile) {
      setMobile(isMobile)
    }
  }

  useEffect(() => {
    updateDimensions()
    window.addEventListener(EventListener.Resize, updateDimensions)
    const interval = setInterval(() => {
      //@ts-expect-error
      setDummy({})
    }, ONE_SECOND_MILLISECOND)

    return () => {
      window.removeEventListener(EventListener.Resize, updateDimensions)
      clearInterval(interval)
    }
  })

  const brandName = mobile ? null : (
    <Link id="wordmark" to={RoutePath.Schedule} onClick={collapse}>
      {config.title}
    </Link>
  )

  const renderSubmit = () => {
    if (Date.now() > DEVPOST_SUBMISSION_OPEN.getTime()) {
      return null
    }

    return (
      <a
        id="devpost-submit"
        target="_blank"
        href="https://vthacks-ix.devpost.com/"
        style={{ paddingRight: "11vw" }}
      >
        <Button variant="outline-primary" className="navbar-link" disabled>
          Submit to Devpost
        </Button>
      </a>
    )
  }

  const placeHolder = mobile ? <a style={{ width: "56px" }}> </a> : null
  const marginRight = mobile ? "0px" : "1rem"
  return (
    <>
      <Navbar id="navbar-main" expanded={expanded} expand="lg">
        {placeHolder}

        <a href="/" id="logo-link">
          <img src="/navLogo.png" alt="Logo" id="logo-image" />
        </a>
        
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={toggle}
          style={{
            borderColor: '#333'
          }}
        />  

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" id="links-div">
            {ROUTES_WITH_TITLES.map((routeItem, index) => (
              <Link
                key={`route-path-link-${index}`}
                to={
                  Array.isArray(routeItem.path)
                    ? routeItem.path[0]
                    : routeItem.path
                }
                onClick={collapse}
                className="navbar-link"
              >
                {routeItem.title}
              </Link>
            ))}
          </Nav>
          <Nav className="ml-auto">{renderSubmit()}</Nav>
            <a
              id="mlh-trust-badge"
              href="https://mlh.io/seasons/2023/events"
              target="_blank"
            >
              <img
                src="https://s3.amazonaws.com/logged-assets/trust-badge/2023/mlh-trust-badge-2023-black.svg"
                alt="Major League Hacking 2023 Hackathon Season"
              />
            </a>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default NavBarComponent
