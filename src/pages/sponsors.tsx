import React from "react"
import Layout from "../components/layout"
import MarkdownView, { MarkdownPageProps } from "../views/MarkdownView"

import { loadMarkdownPage, MarkdownPage } from "../lib/markdown"

const Sponsors: React.FC<MarkdownPageProps> = ({ data }) => {
  const { markdown } = data
  return (
    <Layout title="Sponsors">
      <MarkdownView templateKey="sponsors" markdown={markdown} />
    </Layout>
  )
}

export default Sponsors

export const getStaticProps = async () => {
  const markdown = await loadMarkdownPage(MarkdownPage.SPONSORS)

  return {
    props: {
      data: {
        markdown,
      },
    },
  }
}
