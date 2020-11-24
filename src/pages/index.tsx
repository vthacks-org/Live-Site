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
  }
}

const Index: React.FC<Props> = ({
  data: {
    allScheduleJson: { nodes: schedule },
  },
}) => {
  console.log(schedule)
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
        location
        start
        duration
        category
        description
      }
    }
  }
`
