import { graphql } from "gatsby"
import React from "react"
import Layout from "../components/layout"
import WorkshopView from "../views/WorkshopView"
import { IEvent } from "../interfaces"
import { EventCategory as EC } from "../enums"

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
      <WorkshopView schedule={schedule} name="workshops" blacklist={[EC.UX]} />
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
