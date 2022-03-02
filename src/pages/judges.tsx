import React from "react"
import Layout from "../components/layout"
import MarkdownView, { MarkdownPageProps } from "../views/MarkdownView"

import { loadMarkdownPage, MarkdownPage } from "../lib/markdown"

const Judges: React.FC<MarkdownPageProps> = ({ data }) => {
  const { markdown } = data
  return (
    <Layout title="Judges">
      <MarkdownView templateKey="judges" markdown={markdown} />
    </Layout>
  )
}

export default Judges

export const getStaticProps = async () => {
  const markdown = await loadMarkdownPage(MarkdownPage.JUDGES)

  return {
    props: {
      data: {
        markdown,
      },
    },
  }
}
