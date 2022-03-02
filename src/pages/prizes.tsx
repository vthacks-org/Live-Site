import React from "react"
import Layout from "../components/layout"
import { loadMarkdownPage, MarkdownPage } from "../lib/markdown"
import MarkdownView, { MarkdownPageProps } from "../views/MarkdownView"

const Prizes: React.FC<MarkdownPageProps> = ({ data }) => {
  const { markdown } = data
  return (
    <Layout title="Prizes">
      <MarkdownView templateKey="prizes" markdown={markdown} />
    </Layout>
  )
}

export default Prizes

export const getStaticProps = async () => {
  const markdown = await loadMarkdownPage(MarkdownPage.PRIZES)

  return {
    props: {
      data: {
        markdown,
      },
    },
  }
}
