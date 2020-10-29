import React from "react"
import NavBarComponent from "./NavBarComponent"
import { Helmet } from "react-helmet"
import "../App.css"
import "../index.css"
import FooterComponent from "./FooterComponent"

const Layout = ({ children, title = "" }) => {
  return (
    <div>
      <div className="App">
        <Helmet>
          <title>VTHacks - {title}</title>
          <link
            rel="shortcut icon"
            type="image/png"
            href="/LogoFinal.svg"
          ></link>
        </Helmet>
        <NavBarComponent />
        <div id="switch">{children}</div>
      </div>
      <FooterComponent />
    </div>
  )
}

export default Layout
