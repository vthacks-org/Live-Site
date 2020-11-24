import { graphql } from "gatsby"
import React from "react"
import SubmissionsView from "../views/SubmissionsView"
import Layout from "../components/layout"

import { MarkdownProps } from "../types"

const Submissions: React.FC<MarkdownProps> = ({
  data: {
    allMarkdownRemark: { edges: submission_guidlines },
  },
}) => {
  return (
    <Layout title="Submission Guidlines">
      <SubmissionsView guidelines={submission_guidlines} />
    </Layout>
  )
}

export default Submissions

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { title: { eq: "submission_guidelines" } } }
    ) {
      edges {
        node {
          id
          html
          frontmatter {
            title
          }
        }
      }
    }
  }
`
