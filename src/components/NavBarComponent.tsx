import React, { useEffect, useState } from "react"
import styles from "./NavBarComponent.module.css"
import Image from "next/image"

import { RoutePath, EventListener } from "../enums"
import {
  MOBILE_BREAKPOINT_WIDTH,
  ONE_SECOND_MILLISECOND,
  ROUTES_WITH_TITLES,
  DEVPOST_SUBMISSION_OPEN,
} from "../constants"

import Link from "next/link"
import config from "../config.json"

import { Navbar, Nav, Button } from "react-bootstrap"

const NavBarComponent = (): JSX.Element => {
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
    <Link href={RoutePath.Schedule}>
      <a id={styles["wordmark"]} onClick={collapse}>
        {config.title}
      </a>
    </Link>
  )

  const renderSubmit = () => {
    if (Date.now() > DEVPOST_SUBMISSION_OPEN.getTime()) {
      return null
    }

    return (
      <Button variant="outline-primary" id={styles["navbar-link"]}>
        <a
          id={styles["devpost-submit"]}
          target="_blank"
          href="https://vthacks-ix.devpost.com/"
          style={{ paddingRight: "11vw" }}
        >
          Submit to Devpost
        </a>
      </Button>
    )
  }

  const placeHolder = mobile ? <a style={{ width: "56px" }}> </a> : null
  const marginRight = mobile ? "0px" : "1rem"

  return (
    <>
      <div
        id={styles["navbar-hidden-overlay"]}
        style={{
          display: expanded ? "block" : "none",
        }}
        onClick={collapse}
      />
      <Navbar id={styles["navbar-main"]} expanded={expanded} expand="lg">
        {placeHolder}

        <Navbar.Brand id={styles["brand"]} style={{ marginRight: marginRight }}>
          <img src="/favicon.svg" alt="Logo" />
          {brandName}
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={toggle}
          style={{ color: "white" }}
        />

        <Navbar.Collapse id={styles["basic-navbar-nav"]}>
          <Nav className={styles["mr-auto"]}>
            {ROUTES_WITH_TITLES.map((routeItem, index) => (
              <Link
                href={
                  Array.isArray(routeItem.path)
                    ? routeItem.path[0]
                    : routeItem.path
                }
                key={`route-path-link-${index}`}
              >
                <a onClick={collapse} className={styles["navbar-link"]}>
                  {routeItem.title}
                </a>
              </Link>
            ))}
          </Nav>
          <Nav className={styles["ml-auto"]}>{renderSubmit()}</Nav>
          <a
            id={styles["mlh-trust-badge"]}
            href="https://mlh.io/seasons/2021/events"
            target="_blank"
          >
            <Image
              src="https://s3.amazonaws.com/logged-assets/trust-badge/2022/mlh-trust-badge-2022-white.svg"
              alt="Major League Hacking 2022 Hackathon Season"
              width={400}
              height={700}
            />
          </a>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default NavBarComponent
