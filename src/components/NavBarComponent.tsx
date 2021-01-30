import React, { useEffect, useState } from "react"
import "./NavBarComponent.css"
import "../App.css"
import "../index.css"

import { RoutePath, EventListener } from "../enums"
import {
  MOBILE_BREAKPOINT_WIDTH,
  ONE_MINUTE_MILLISECOND,
  ROUTES_WITH_TITLES,
} from "../constants"

import { Link } from "gatsby"

import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"

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
      setDummy({})
    }, ONE_MINUTE_MILLISECOND)

    return () => {
      window.removeEventListener(EventListener.Resize, updateDimensions)
      clearInterval(interval)
    }
  })

  const brandName = mobile ? null : (
    <Link id="wordmark" to={RoutePath.Schedule} onClick={collapse}>
      VTHacks8
    </Link>
  )
  const placeHolder = mobile ? <a style={{ width: "56px" }}> </a> : null
  const marginRight = mobile ? "0px" : "1rem"
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

        <Navbar.Brand id="brand" style={{ marginRight: marginRight }}>
          <img src="/Logo_Mountains.svg" alt="Logo" />
          {brandName}
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
