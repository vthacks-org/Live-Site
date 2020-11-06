import React from "react"
import NavBarComponent from "./NavBarComponent"
import { Helmet } from "react-helmet"
import "../App.css"
import "../index.css"
import FooterComponent from "./FooterComponent"

const Layout = ({ children, title = "" }) => {
  return (
    <>
      <div className="App">
        <Helmet>
          <title>VTHacks - {title}</title>
          <link rel="icon" type="image/svg+xml" href="/LogoFinal.svg"></link>
        </Helmet>
        <NavBarComponent />
        <div className="app-content" id="switch">
          {children}
        </div>
        <FooterComponent />
      </div>
    </>
  )
}

export default Layout
