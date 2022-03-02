import React from "react"
import Layout from "../components/layout"
import WorkshopView from "../views/WorkshopView"
import { IEvent } from "../interfaces"
import { EventCategory as EC } from "../enums"
import { loadScheduleSorted } from "../lib/schedule"

type UXPageProps = {
  data: {
    schedule: IEvent[]
  }
}

const UxPage: React.FC<UXPageProps> = ({ data }) => {
  const { schedule } = data
  return (
    <Layout>
      <WorkshopView schedule={schedule} name="UX events" whitelist={[EC.UX]} />
    </Layout>
  )
}

export default UxPage

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
