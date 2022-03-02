import React from "react"
import Layout from "../components/layout"
import MarkdownView, { MarkdownPageProps } from "../views/MarkdownView"

import { loadMarkdownPage, MarkdownPage } from "../lib/markdown"

const Submissions: React.FC<MarkdownPageProps> = ({ data }) => {
  const { markdown } = data
  return (
    <Layout title="Getting Started">
      <MarkdownView templateKey="getting_started" markdown={markdown} />
    </Layout>
  )
}

export default Submissions

export const getStaticProps = async () => {
  const markdown = await loadMarkdownPage(MarkdownPage.GETTING_STARTED)

  return {
    props: {
      data: {
        markdown,
      },
    },
  }
}
