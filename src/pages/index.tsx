import React from "react"
import Layout from "../components/layout"
import ScheduleView from "../views/ScheduleView"

import { IEvent } from "../interfaces"
import { loadSchedule } from "../lib/schedule"

type IndexPageProps = {
  data: {
    schedule: IEvent[]
  }
}

const Index: React.FC<IndexPageProps> = ({ data }) => {
  // allScheduleJson: { nodes: schedule }
  const { schedule } = data
  return (
    <Layout title="Schedule">
      <ScheduleView schedule={schedule} />
    </Layout>
  )
}

export default Index

export const getStaticProps = async () => {
  const schedule = await loadSchedule()

  return {
    props: {
      data: {
        schedule,
      },
    },
  }
}

// export const pageQuery = graphql`
//   query {
//     allScheduleJson {
//       nodes {
//         name
//         subtitle
//         start
//         duration
//         location
//         category
//         description
//         contentLink
//         callLink
//         display
//       }
//     }
//   }
// `
