import React, { useEffect, useState } from "react"
import "./NavBarComponent.css"
import "../App.css"
import "../index.css"

import { RoutePath, EventListener } from "../enums"
import { MOBILE_BREAKPOINT_WIDTH, ONE_MINUTE_MILLISECOND } from "../constants"

import { Link } from "gatsby"

import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"

const ROUTES_WITH_TITLES = [
  {
    title: "Schedule",
    path: "/",
  },
  {
    title: "Challenges",
    path: "/challenges",
  },
  {
    title: "Workshops",
    path: "/workshops",
  },
  {
    title: "Resources",
    path: "/resources",
  },
  {
    title: "Submission Guidelines",
    path: "/submission_guidelines",
  },
  {
    title: "Prizes",
    path: "/prizes",
  },
]

const NavBarComponent = () => {
  const [expanded, setExpanded] = useState(false)
  const [mobile, setMobile] = React.useState(true)
  const [, setDummy] = React.useState()

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

  React.useEffect(() => {
    updateDimensions()
    window.addEventListener(EventListener.Resize, updateDimensions)
    const interval = setInterval(() => {
      setDummy({})
    }, ONE_MINUTE_MILLISECOND)

    return () => {
      window.removeEventListener(EventListener.Resize, updateDimensions)
      clearInterval(interval)
    }
  })

  const brandName = mobile ? "" : "VTHacks8"
  const placeHolder = mobile ? <a> </a> : null

  return (
    <>
      <div
        id="navbar-hidden-overlay"
        style={{
          display: expanded ? "block" : "none",
        }}
        onClick={collapse}
      />
      <Navbar id="navbar-main" expanded={expanded} expand="lg">
        {placeHolder}
        <Navbar.Brand id="brand">
          <img src="/LogoFinal.svg" alt="" />
          <Link id="wordmark" to={RoutePath.Home} onClick={collapse}>
            {brandName}
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={toggle}
          style={{ color: "white" }}
        />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
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
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default NavBarComponent
