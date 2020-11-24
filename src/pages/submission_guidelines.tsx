import { graphql } from "gatsby"
import React from "react"
import Layout from "../components/layout"
import MarkdownView from "../views/MarkdownView"

import { MarkdownProps } from "../types"

const Submissions: React.FC<MarkdownProps> = ({
  data: {
    allMarkdownRemark: { edges: submission_guidelines },
  },
}) => {
  return (
    <Layout title="Submission Guidelines">
      <MarkdownView
        templateKey="submission_guidelines"
        list={submission_guidelines}
      />
    </Layout>
  )
}

export default Submissions

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "submission_guidelines" } } }
    ) {
      edges {
        node {
          id
          html
          frontmatter {
            title
            templateKey
            shouldDisplayTitle
          }
        }
      }
    }
  }
`
