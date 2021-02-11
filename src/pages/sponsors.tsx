import { graphql } from "gatsby"
import React from "react"
import Layout from "../components/layout"
import MarkdownView from "../views/MarkdownView"

import { MarkdownProps } from "../types"

const Sponsors: React.FC<MarkdownProps> = ({
  data: {
    allMarkdownRemark: { edges: sponsors },
  },
}) => {
  return (
    <Layout title="Sponsors">
      <MarkdownView templateKey="sponsors" list={sponsors} />
    </Layout>
  )
}

export default Sponsors

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "sponsors" } } }
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
