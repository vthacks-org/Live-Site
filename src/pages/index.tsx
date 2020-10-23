import React from "react"
import Layout from "../components/layout"
import ScheduleView from "../views/ScheduleView"
import "bootstrap/dist/css/bootstrap.min.css"

const Index = () => {
  return (
    <Layout title="Schedule">
      <ScheduleView />
    </Layout>
  )
}

export default Index
