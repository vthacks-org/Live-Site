import React from "react"
import Layout from "../components/layout"
import { loadMarkdownPage, MarkdownPage } from "../lib/markdown"
import MarkdownView, { MarkdownPageProps } from "../views/MarkdownView"

const Submissions: React.FC<MarkdownPageProps> = ({ data }) => {
  const { markdown } = data
  return (
    <Layout title="Submission Guidelines">
      <MarkdownView templateKey="submission_guidelines" markdown={markdown} />
    </Layout>
  )
}

export default Submissions

export const getStaticProps = async () => {
  const markdown = await loadMarkdownPage(MarkdownPage.SUBMISSION_GUIDELINES)

  return {
    props: {
      data: {
        markdown,
      },
    },
  }
}
