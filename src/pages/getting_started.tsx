import { graphql } from "gatsby"
import React from "react"
import Layout from "../components/layout"
import MarkdownView from "../views/MarkdownView"

import { MarkdownProps } from "../types"

const Submissions: React.FC<MarkdownProps> = ({
  data: {
    allMarkdownRemark: { edges: getting_started },
  },
}) => {
  return (
    <Layout title="Getting Started">
      <MarkdownView templateKey="getting_started" list={getting_started} />
    </Layout>
  )
}

export default Submissions

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "getting_started" } } }
    ) {
      edges {
        node {
          id
          html
          frontmatter {
            title
            templateKey
            shouldDisplayTitle
            display
          }
        }
      }
    }
  }
`
