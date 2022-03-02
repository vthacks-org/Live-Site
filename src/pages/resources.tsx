import React from "react"
import Layout from "../components/layout"
import MarkdownView, { MarkdownPageProps } from "../views/MarkdownView"

import { loadMarkdownPage, MarkdownPage } from "../lib/markdown"
import { Markdown } from "../interfaces"

const Resources: React.FC<MarkdownPageProps> = ({ data }) => {
  const { markdown } = data

  return (
    <Layout title="Resources">
      <MarkdownView templateKey="resources" markdown={markdown} />
    </Layout>
  )
}

export default Resources

export const getStaticProps = async () => {
  const markdown = await loadMarkdownPage(MarkdownPage.RESOURCES)

  return {
    props: {
      data: {
        markdown,
      },
    },
  }
}
