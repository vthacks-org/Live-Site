import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import ScheduleView from "../views/ScheduleView"
import "bootstrap/dist/css/bootstrap.min.css"
import { IEvent } from "../interfaces"

type Props = {
  data: {
    allScheduleJson: {
      nodes: IEvent[]
    }
    newcomer: boolean
  }
}

const Index: React.FC<Props> = ({
  data: {
    allScheduleJson: { nodes: schedule },
  },
}) => {
  return (
    <Layout title="Schedule">
      <ScheduleView schedule={schedule} />
    </Layout>
  )
}

export default Index

export const pageQuery = graphql`
  query {
    allScheduleJson {
      nodes {
        name
        subtitle
        start
        duration
        location
        category
        description
        contentLink
        callLink
        display
      }
    }
  }
`
