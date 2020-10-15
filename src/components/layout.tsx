import React from "react"
import NavBarComponent from './NavBarComponent';
import {Helmet} from 'react-helmet';
import '../App.css';
import '../index.css'

const Layout = ({children, title = '' }) => {
  return (
    <div className="App">
      <Helmet>
        <title>VTHacks - {title}</title>
        <link rel="shortcut icon" type="image/png" href="/favicon.png"></link>
      </Helmet>
      <NavBarComponent />
      <div id="switch">
        {children}
      </div>
    </div>
  )
}

export default Layout
