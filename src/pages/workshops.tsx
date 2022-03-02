import React from "react"
import Layout from "../components/layout"
import WorkshopView from "../views/WorkshopView"
import { IEvent } from "../interfaces"
import { EventCategory as EC } from "../enums"
import { loadScheduleSorted } from "../lib/schedule"

type WorkshopsPageProps = {
  data: {
    schedule: IEvent[]
  }
}

const Workshops: React.FC<WorkshopsPageProps> = ({ data }) => {
  const { schedule } = data
  return (
    <Layout>
      <WorkshopView
        schedule={schedule}
        name="workshops"
        whitelist={[EC.Workshop]}
      />
    </Layout>
  )
}

export default Workshops

export const getStaticProps = async () => {
  const schedule = await loadScheduleSorted()

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
//         location
//         start
//         duration
//         category
//         description
//         contentLink
//         callLink
//         display
//       }
//     }
//   }
// `
