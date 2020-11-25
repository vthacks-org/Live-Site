import { graphql } from "gatsby"
import React from "react"
import Layout from "../components/layout"
import WorkshopView from "../views/WorkshopView"
import { IEvent } from "../interfaces"

type Props = {
  data: {
    allScheduleJson: {
      nodes: IEvent[]
    }
  }
}

const Workshops: React.FC<Props> = ({
  data: {
    allScheduleJson: { nodes: schedule },
  },
}) => {
  return (
    <Layout>
      <WorkshopView schedule={schedule} />
    </Layout>
  )
}

export default Workshops

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
        contentLink
        callLink
      }
    }
  }
`
